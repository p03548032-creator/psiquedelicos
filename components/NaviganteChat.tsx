'use client';

import { useState, useRef, useEffect } from 'react';
import { Zap, Send, AlertTriangle, Loader, RotateCcw, ChevronDown } from 'lucide-react';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

const suggestedQuestions = [
    '¿Cuál es la dosis segura para principiantes con setas?',
    '¿Cómo manejo un mal viaje si estoy solo?',
    '¿Es seguro tomar psilocibina con antidepresivos?',
    '¿Qué técnicas de grounding funcionan mejor en el pico?',
    '¿Cuánto tiempo debo esperar entre experiencias?',
    '¿Cómo preparo el espacio (setting) correctamente?',
    '¿Qué dice la ciencia sobre la terapia con psilocibina para depresión?',
    '¿Cómo integro lo que viví esta semana?',
];

const crisisMessages = [
    '🆘 Estoy en un mal viaje ahora mismo',
    '😰 Siento mucha ansiedad y no para',
    '💔 Estoy llorando sin saber por qué',
];

export default function NaviganteChat() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showSuggestions, setShowSuggestions] = useState(true);
    const [showCrisis, setShowCrisis] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = async (text: string) => {
        if (!text.trim() || loading) return;
        setError(null);
        setShowSuggestions(false);

        const userMsg: Message = { role: 'user', content: text.trim() };
        const newMessages = [...messages, userMsg];
        setMessages(newMessages);
        setInput('');
        setLoading(true);

        try {
            const res = await fetch('/api/ai/navegante', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: newMessages }),
            });
            const data = await res.json();
            if (data.error) {
                setError(data.error);
            } else {
                setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
            }
        } catch (e: any) {
            setError('Error de conexión. Comprueba tu conexión a internet.');
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage(input);
        }
    };

    const reset = () => {
        setMessages([]);
        setInput('');
        setError(null);
        setShowSuggestions(true);
    };

    const isCrisis = messages.some(m =>
        m.content.includes('mal viaje') || m.content.includes('crisis') || m.content.includes('miedo') || m.content.includes('ansiedad')
    );

    return (
        <div className="flex flex-col h-full" style={{ minHeight: '500px', maxHeight: '70vh' }}>
            {/* Header */}
            <div className="flex items-center justify-between mb-4 flex-shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                        <Zap size={18} className="text-cyan-400" strokeWidth={1.5} />
                    </div>
                    <div>
                        <h3 className="text-white font-black text-base">El Navegante</h3>
                        <div className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-emerald-400 text-xs">Conectado · Gemini 2.5 Flash</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {messages.length > 0 && (
                        <button onClick={reset}
                            className="flex items-center gap-1 text-xs text-white/30 hover:text-white/60 transition-colors cursor-pointer">
                            <RotateCcw size={12} /> Nueva consulta
                        </button>
                    )}
                </div>
            </div>

            {/* Crisis banner */}
            {isCrisis && (
                <div className="flex-shrink-0 mb-3 p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3">
                    <AlertTriangle size={14} className="text-red-400 flex-shrink-0" />
                    <div className="flex-1">
                        <p className="text-red-400 text-xs font-bold">Parece que estás pasando un momento difícil</p>
                        <p className="text-white/50 text-xs">Si hay riesgo físico real, llama al <strong className="text-white">112</strong> sin dudarlo.</p>
                    </div>
                </div>
            )}

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-1 mb-4" style={{ minHeight: 0 }}>
                {/* Welcome */}
                {messages.length === 0 && (
                    <div className="text-center py-6">
                        <div className="text-4xl mb-3">🧭</div>
                        <p className="text-white/60 text-sm leading-relaxed max-w-xs mx-auto">
                            Soy El Navegante. Estoy aquí para acompañarte con información rigurosa sobre preparación, seguridad e integración.
                        </p>
                        <p className="text-white/25 text-xs mt-2">Todo lo que compartas aquí es confidencial.</p>
                    </div>
                )}

                {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.role === 'assistant' && (
                            <div className="w-7 h-7 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0 mr-2 mt-0.5">
                                <Zap size={12} className="text-cyan-400" />
                            </div>
                        )}
                        <div
                            className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${msg.role === 'user'
                                ? 'bg-psyche-violet/20 text-white border border-psyche-violet/20 rounded-tr-sm'
                                : 'bg-white/[0.04] text-white/80 border border-white/5 rounded-tl-sm'
                                }`}
                            style={{ whiteSpace: 'pre-wrap' }}
                        >
                            {msg.content}
                        </div>
                    </div>
                ))}

                {loading && (
                    <div className="flex justify-start">
                        <div className="w-7 h-7 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0 mr-2 mt-0.5">
                            <Zap size={12} className="text-cyan-400" />
                        </div>
                        <div className="bg-white/[0.04] border border-white/5 rounded-2xl rounded-tl-sm px-4 py-3">
                            <div className="flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-white/30 animate-bounce" style={{ animationDelay: '0ms' }} />
                                <div className="w-1.5 h-1.5 rounded-full bg-white/30 animate-bounce" style={{ animationDelay: '150ms' }} />
                                <div className="w-1.5 h-1.5 rounded-full bg-white/30 animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                        ⚠️ {error}
                    </div>
                )}

                <div ref={bottomRef} />
            </div>

            {/* Suggested questions */}
            {showSuggestions && messages.length === 0 && (
                <div className="flex-shrink-0 mb-3 space-y-2">
                    <div className="flex items-center justify-between">
                        <p className="text-xs text-white/30 uppercase tracking-wider">Preguntas frecuentes</p>
                        <button onClick={() => setShowCrisis(!showCrisis)}
                            className="flex items-center gap-1 text-xs text-red-400/60 hover:text-red-400 transition-colors cursor-pointer">
                            <AlertTriangle size={10} /> Crisis
                            <ChevronDown size={10} className={`transition-transform ${showCrisis ? 'rotate-180' : ''}`} />
                        </button>
                    </div>
                    {showCrisis && (
                        <div className="space-y-1">
                            {crisisMessages.map(q => (
                                <button key={q} onClick={() => sendMessage(q)}
                                    className="w-full text-left px-3 py-2 rounded-xl bg-red-500/8 border border-red-500/15 text-red-400/80 text-xs hover:bg-red-500/15 transition-colors cursor-pointer">
                                    {q}
                                </button>
                            ))}
                        </div>
                    )}
                    <div className="flex flex-wrap gap-1.5">
                        {suggestedQuestions.slice(0, 4).map(q => (
                            <button key={q} onClick={() => sendMessage(q)}
                                className="text-left px-3 py-1.5 rounded-lg bg-white/5 border border-white/8 text-white/50 text-xs hover:bg-white/8 hover:text-white/70 transition-colors cursor-pointer">
                                {q}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Input */}
            <div className="flex-shrink-0 flex gap-2 items-end">
                <textarea
                    ref={inputRef}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Escribe tu pregunta… (Enter para enviar)"
                    rows={1}
                    className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-cyan-500/40 resize-none transition-colors"
                    style={{ maxHeight: '100px', overflowY: 'auto' }}
                />
                <button
                    onClick={() => sendMessage(input)}
                    disabled={!input.trim() || loading}
                    className="w-11 h-11 rounded-2xl flex items-center justify-center transition-all cursor-pointer disabled:opacity-30 flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #06b6d4, #7c3aed)' }}>
                    {loading ? <Loader size={16} className="animate-spin text-white" /> : <Send size={16} className="text-white" />}
                </button>
            </div>

            <p className="text-center text-white/15 text-[10px] mt-2 flex-shrink-0">
                El Navegante no sustituye atención médica. En emergencias llama al 112.
            </p>
        </div>
    );
}
