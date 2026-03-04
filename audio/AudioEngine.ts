/* ═══════════════════════════════════════════════════════
   AUDIO ENGINE — Motor de audio centralizado
   Singleton global que gestiona TODAS las fuentes de audio
   del portal usando Web Audio API.
   
   Fixes aplicados:
   - Resume AudioContext en cada interacción (Chrome autoplay policy)
   - Cleanup robusto de nodos con try/catch
   - No se destruye nunca el contexto (persiste entre secciones)
   - Fade in/out suaves para evitar clicks
   ═══════════════════════════════════════════════════════ */

interface ActiveEntry {
  nodes: AudioNode[];
  gain: GainNode;
  oscillators: OscillatorNode[];
  sources: AudioBufferSourceNode[];
}

class AudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  private activeNodes: Map<string, ActiveEntry> = new Map();
  private noiseBuffers: Map<string, AudioBuffer> = new Map();

  /** Initialize or resume the AudioContext. Must be called from a user gesture. */
  async init(): Promise<AudioContext> {
    if (!this.ctx) {
      this.ctx = new AudioContext();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.5;
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 256;
      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }

    // Chrome/Safari require resume after user gesture
    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }

    return this.ctx;
  }

  getAnalyserData(): Uint8Array {
    if (!this.analyser) return new Uint8Array(128).fill(0);
    const data = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(data);
    return data;
  }

  setMasterVolume(v: number) {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(v, this.ctx.currentTime, 0.05);
    }
  }

  /** Get or create a noise buffer (cached) */
  private getNoiseBuffer(key: string): AudioBuffer {
    if (this.noiseBuffers.has(key)) return this.noiseBuffers.get(key)!;
    if (!this.ctx) throw new Error('AudioContext not initialized');
    
    const sampleRate = this.ctx.sampleRate;
    const length = sampleRate * 4; // 4 seconds loop
    const buffer = this.ctx.createBuffer(2, length, sampleRate);
    
    for (let ch = 0; ch < 2; ch++) {
      const data = buffer.getChannelData(ch);
      for (let i = 0; i < length; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.5;
      }
    }
    
    this.noiseBuffers.set(key, buffer);
    return buffer;
  }

  /** Simple tone with optional vibrato */
  async startTone(id: string, frequency: number, volume: number, waveform: OscillatorType = 'sine', addVibrato = true) {
    const ctx = await this.init();
    if (!this.masterGain) return;
    this.stopId(id);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.5);
    gain.connect(this.masterGain);

    const osc = ctx.createOscillator();
    osc.type = waveform;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    osc.connect(gain);
    osc.start();

    const oscillators: OscillatorNode[] = [osc];
    const allNodes: AudioNode[] = [osc, gain];

    if (addVibrato) {
      const lfo = ctx.createOscillator();
      lfo.frequency.setValueAtTime(0.15 + Math.random() * 0.1, ctx.currentTime);
      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(1.5, ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start();
      oscillators.push(lfo);
      allNodes.push(lfo, lfoGain);
    }

    this.activeNodes.set(id, { nodes: allNodes, gain, oscillators, sources: [] });
  }

  /** Rich tone with fundamental + octave + fifth + vibrato + tremolo */
  async startRichTone(id: string, frequency: number, volume: number) {
    const ctx = await this.init();
    if (!this.masterGain) return;
    this.stopId(id);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 1.0);
    gain.connect(this.masterGain);

    const oscillators: OscillatorNode[] = [];
    const allNodes: AudioNode[] = [gain];

    // Fundamental
    const osc1 = ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(frequency, ctx.currentTime);
    const g1 = ctx.createGain();
    g1.gain.setValueAtTime(0.6, ctx.currentTime);
    osc1.connect(g1);
    g1.connect(gain);
    osc1.start();
    oscillators.push(osc1);
    allNodes.push(osc1, g1);

    // Octave (subtle)
    const osc2 = ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(frequency * 2, ctx.currentTime);
    const g2 = ctx.createGain();
    g2.gain.setValueAtTime(0.15, ctx.currentTime);
    osc2.connect(g2);
    g2.connect(gain);
    osc2.start();
    oscillators.push(osc2);
    allNodes.push(osc2, g2);

    // Fifth harmonic (very subtle)
    const osc3 = ctx.createOscillator();
    osc3.type = 'sine';
    osc3.frequency.setValueAtTime(frequency * 1.5, ctx.currentTime);
    const g3 = ctx.createGain();
    g3.gain.setValueAtTime(0.08, ctx.currentTime);
    osc3.connect(g3);
    g3.connect(gain);
    osc3.start();
    oscillators.push(osc3);
    allNodes.push(osc3, g3);

    // Vibrato on fundamental
    const lfo = ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.12, ctx.currentTime);
    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(1.2, ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(osc1.frequency);
    lfo.start();
    oscillators.push(lfo);
    allNodes.push(lfo, lfoGain);

    // Tremolo (subtle amplitude modulation)
    const tremolo = ctx.createOscillator();
    tremolo.frequency.setValueAtTime(0.08, ctx.currentTime);
    const tremoloGain = ctx.createGain();
    tremoloGain.gain.setValueAtTime(0.03, ctx.currentTime);
    tremolo.connect(tremoloGain);
    tremoloGain.connect(gain.gain);
    tremolo.start();
    oscillators.push(tremolo);
    allNodes.push(tremolo, tremoloGain);

    this.activeNodes.set(id, { nodes: allNodes, gain, oscillators, sources: [] });
  }

  /** Binaural beat: two slightly different frequencies, one per ear */
  async startBinaural(id: string, baseFreq: number, beatFreq: number, volume: number) {
    const ctx = await this.init();
    if (!this.masterGain) return;
    this.stopId(id);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.8);

    const merger = ctx.createChannelMerger(2);
    merger.connect(gain);
    gain.connect(this.masterGain);

    const oscillators: OscillatorNode[] = [];

    // Left ear
    const oscL = ctx.createOscillator();
    oscL.type = 'sine';
    oscL.frequency.setValueAtTime(baseFreq, ctx.currentTime);
    const gainL = ctx.createGain();
    gainL.gain.setValueAtTime(1, ctx.currentTime);
    oscL.connect(gainL);
    gainL.connect(merger, 0, 0);
    oscL.start();
    oscillators.push(oscL);

    // Right ear
    const oscR = ctx.createOscillator();
    oscR.type = 'sine';
    oscR.frequency.setValueAtTime(baseFreq + beatFreq, ctx.currentTime);
    const gainR = ctx.createGain();
    gainR.gain.setValueAtTime(1, ctx.currentTime);
    oscR.connect(gainR);
    gainR.connect(merger, 0, 1);
    oscR.start();
    oscillators.push(oscR);

    this.activeNodes.set(id, { 
      nodes: [oscL, oscR, gainL, gainR, merger, gain], 
      gain, 
      oscillators,
      sources: [] 
    });
  }

  /** Filtered noise (rain, wind, ocean, fire, etc.) */
  async startNoise(id: string, filterFreq: number, volume: number, type: BiquadFilterType = 'lowpass') {
    const ctx = await this.init();
    if (!this.masterGain) return;
    this.stopId(id);

    const buffer = this.getNoiseBuffer(id);

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = type;
    filter.frequency.setValueAtTime(filterFreq, ctx.currentTime);
    filter.Q.setValueAtTime(0.7, ctx.currentTime);

    // Modulate filter slowly for organic movement
    const filterLFO = ctx.createOscillator();
    filterLFO.frequency.setValueAtTime(0.05 + Math.random() * 0.05, ctx.currentTime);
    const filterLFOGain = ctx.createGain();
    filterLFOGain.gain.setValueAtTime(filterFreq * 0.15, ctx.currentTime);
    filterLFO.connect(filterLFOGain);
    filterLFOGain.connect(filter.frequency);
    filterLFO.start();

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 1.5);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    source.start();

    this.activeNodes.set(id, { 
      nodes: [source, filter, filterLFO, filterLFOGain, gain], 
      gain, 
      oscillators: [filterLFO],
      sources: [source] 
    });
  }

  /** Tibetan singing bowl simulation with inharmonic partials */
  async startBowl(id: string, frequency: number, volume: number) {
    const ctx = await this.init();
    if (!this.masterGain) return;
    this.stopId(id);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.3);
    gain.connect(this.masterGain);

    const oscillators: OscillatorNode[] = [];
    const allNodes: AudioNode[] = [gain];

    // Real bowl partial ratios
    const partials = [1, 2.71, 5.40, 8.93];
    const amps = [0.5, 0.3, 0.15, 0.08];

    partials.forEach((ratio, i) => {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency * ratio, ctx.currentTime);
      const pGain = ctx.createGain();
      pGain.gain.setValueAtTime(amps[i], ctx.currentTime);
      osc.connect(pGain);
      pGain.connect(gain);

      // Beating between partials
      const lfo = ctx.createOscillator();
      lfo.frequency.setValueAtTime(0.2 + i * 0.15, ctx.currentTime);
      const lfoG = ctx.createGain();
      lfoG.gain.setValueAtTime(ratio * 0.5, ctx.currentTime);
      lfo.connect(lfoG);
      lfoG.connect(osc.frequency);
      lfo.start();

      osc.start();
      oscillators.push(osc, lfo);
      allNodes.push(osc, pGain, lfo, lfoG);
    });

    this.activeNodes.set(id, { nodes: allNodes, gain, oscillators, sources: [] });
  }

  /** Update volume for a running source */
  setVolume(id: string, volume: number) {
    const entry = this.activeNodes.get(id);
    if (entry && this.ctx) {
      entry.gain.gain.setTargetAtTime(volume, this.ctx.currentTime, 0.1);
    }
  }

  /** Check if a source is active */
  isActive(id: string): boolean {
    return this.activeNodes.has(id);
  }

  /** Stop a source with smooth fade-out */
  stopId(id: string) {
    const entry = this.activeNodes.get(id);
    if (!entry) return;

    // Remove from map immediately to prevent double-stop
    this.activeNodes.delete(id);

    const ctx = this.ctx;
    if (!ctx) return;

    try {
      // Fade out over 400ms
      entry.gain.gain.cancelScheduledValues(ctx.currentTime);
      entry.gain.gain.setValueAtTime(entry.gain.gain.value, ctx.currentTime);
      entry.gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.4);
    } catch {
      // Gain node may be in a bad state, just continue to cleanup
    }

    // Stop and disconnect after fade
    setTimeout(() => {
      // Stop all oscillators
      entry.oscillators.forEach(osc => {
        try { osc.stop(); } catch { /* already stopped */ }
        try { osc.disconnect(); } catch { /* already disconnected */ }
      });

      // Stop all buffer sources
      entry.sources.forEach(src => {
        try { src.stop(); } catch { /* already stopped */ }
        try { src.disconnect(); } catch { /* already disconnected */ }
      });

      // Disconnect all other nodes
      entry.nodes.forEach(node => {
        try { node.disconnect(); } catch { /* already disconnected */ }
      });
    }, 500);
  }

  /** Panic stop: silence everything immediately */
  stopAll() {
    const ids = Array.from(this.activeNodes.keys());
    ids.forEach(id => this.stopId(id));
  }

  /** Get number of active sources */
  getActiveCount(): number {
    return this.activeNodes.size;
  }
}

// Global singleton — NEVER destroyed during app lifecycle
const engine = new AudioEngine();
export default engine;
