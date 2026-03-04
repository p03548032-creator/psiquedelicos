'use client';
import { useState } from 'react';

export default function ShareBar() {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== 'undefined' ? window.location.href : '';

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="glass-sacred rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-white/30">Compartir</p>
        <p className="text-sm text-white/60">Difunde conocimiento responsable.</p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={copyLink}
          className={`vesica-btn px-4 py-2 text-xs font-semibold transition cursor-pointer ${copied ? 'bg-emerald-500/20 text-emerald-300' : 'bg-white/5 text-white/50 hover:text-white/80'}`}
        >
          {copied ? '✓ Copiado' : '🔗 Copiar enlace'}
        </button>
        <a
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="vesica-btn px-3 py-2 text-xs bg-white/5 text-white/40 hover:text-white/70"
        >
          X
        </a>
        <a
          href={`https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="vesica-btn px-3 py-2 text-xs bg-white/5 text-white/40 hover:text-white/70"
        >
          WhatsApp
        </a>
        <a
          href={`https://t.me/share/url?url=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="vesica-btn px-3 py-2 text-xs bg-white/5 text-white/40 hover:text-white/70"
        >
          Telegram
        </a>
      </div>
    </div>
  );
}
