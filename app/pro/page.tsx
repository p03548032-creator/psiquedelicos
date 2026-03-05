'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { Check, Star, Zap, Music, Headphones, Brain, ArrowRight, Shield } from 'lucide-react';

const proFeatures = [
    { icon: Music, text: '30+ sesiones de viaje de alta calidad (sin anuncios)' },
    { icon: Brain, text: 'Modo Sesión Guiada IA — playlist personalizada por intención' },
    { icon: Headphones, text: 'Generador Binaural completo con presets avanzados' },
    { icon: Zap, text: 'Soundscape Studio con 8 capas mezclables' },
    { icon: Star, text: 'Acceso anticipado a nuevas herramientas y contenidos' },
    { icon: Shield, text: 'Sin anuncios en toda la experiencia sonora' },
];

const freeFeatures = [
    '6 sesiones de viaje básicas',
    '3 presets binaurales',
    '4 capas de soundscape',
    'Acceso a la comunidad',
    'Calculadoras de herramientas',
];

export default function ProPage() {
    const [loading, setLoading] = useState(false);
    const [userPlan, setUserPlan] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const supabase = createClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL!,
                process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
            );
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setUserId(user.id);
                setUserEmail(user.email ?? null);
                const { data: profile } = await supabase.from('profiles').select('plan').eq('id', user.id).single();
                setUserPlan(profile?.plan ?? 'free');
            }
        };
        fetchUser();
    }, []);

    const handleCheckout = async () => {
        if (!userId) {
            window.location.href = '/login?next=/pro';
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const res = await fetch('/api/stripe/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, email: userEmail }),
            });
            const { url, error: err } = await res.json();
            if (err) { setError(err); return; }
            window.location.href = url;
        } catch (e: any) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    const handlePortal = async () => {
        if (!userId) return;
        setLoading(true);
        const res = await fetch('/api/stripe/portal', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId }),
        });
        const { url } = await res.json();
        window.location.href = url;
    };

    const isPro = userPlan === 'pro';

    return (
        <main className="min-h-screen bg-psyche-bg text-white pt-24 pb-20 px-6">
            {/* Background */}
            <div className="fixed inset-0 pointer-events-none opacity-30">
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-amber-500/20 rounded-full blur-[150px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-psyche-violet/20 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 vesica-btn px-5 py-2 glass-sacred text-sm text-amber-400 mb-6">
                        <Star size={14} fill="currentColor" />
                        Plan PRO — Sala de Viaje Completa
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">
                        <span className="text-white/90">Desbloquea la </span>
                        <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #f59e0b, #ef4444)' }}>
                            experiencia completa
                        </span>
                    </h1>
                    <p className="text-white/40 text-lg max-w-xl mx-auto">
                        Accede a todas las sesiones de viaje, el Modo Sesión Guiada y las herramientas de audio avanzadas.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-16">

                    {/* FREE Card */}
                    <div className="glass-sacred rounded-2xl p-8 border border-white/5">
                        <h2 className="text-xl font-bold text-white/70 mb-1">Explorador</h2>
                        <p className="text-4xl font-black text-white mb-1">Gratis</p>
                        <p className="text-white/30 text-sm mb-6">Con registro</p>
                        <ul className="space-y-3 mb-8">
                            {freeFeatures.map(f => (
                                <li key={f} className="flex items-center gap-3 text-sm text-white/50">
                                    <Check size={14} className="text-white/30 flex-shrink-0" /> {f}
                                </li>
                            ))}
                        </ul>
                        <Link href="/login" className="vesica-btn block text-center px-6 py-3 glass-sacred text-sm text-white/60 hover:text-white transition-colors">
                            {userId ? 'Tu plan actual' : 'Crear cuenta gratis'}
                        </Link>
                    </div>

                    {/* PRO Card */}
                    <div
                        className="relative rounded-2xl p-8 border overflow-hidden"
                        style={{
                            borderColor: '#f59e0b50',
                            background: 'linear-gradient(135deg, rgba(245,158,11,0.08), rgba(239,68,68,0.05), transparent)',
                            boxShadow: '0 0 60px rgba(245,158,11,0.15)',
                        }}
                    >
                        <div className="absolute top-4 right-4">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: 'linear-gradient(135deg, #f59e0b, #ef4444)', color: 'white' }}>
                                <Star size={8} fill="white" strokeWidth={0} /> RECOMENDADO
                            </span>
                        </div>

                        <h2 className="text-xl font-bold text-amber-400 mb-1">Navegante PRO</h2>
                        <div className="flex items-baseline gap-2 mb-1">
                            <span className="text-4xl font-black text-white">4,90€</span>
                            <span className="text-white/40 text-sm">/mes</span>
                        </div>
                        <p className="text-white/30 text-sm mb-6">Cancela cuando quieras · Sin compromiso</p>

                        <ul className="space-y-3 mb-8">
                            {proFeatures.map(({ icon: Icon, text }) => (
                                <li key={text} className="flex items-start gap-3 text-sm text-white/80">
                                    <Icon size={14} className="text-amber-400 flex-shrink-0 mt-0.5" />
                                    {text}
                                </li>
                            ))}
                        </ul>

                        {error && <p className="text-red-400 text-xs mb-4">{error}</p>}

                        {isPro ? (
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-amber-400 text-sm font-semibold">
                                    <Star size={14} fill="currentColor" /> ¡Ya tienes el plan PRO activo!
                                </div>
                                <button onClick={handlePortal} className="vesica-btn w-full py-3 text-sm text-white/60 glass-sacred hover:text-white transition-colors cursor-pointer">
                                    Gestionar suscripción →
                                </button>
                                <Link href="/bienestar" className="vesica-btn block text-center w-full py-3 text-sm gradient-psyche text-white font-semibold">
                                    Ir a la Sala de Viaje PRO →
                                </Link>
                            </div>
                        ) : (
                            <button
                                onClick={handleCheckout}
                                disabled={loading}
                                className="vesica-btn w-full py-3.5 font-bold text-white flex items-center justify-center gap-2 transition-all hover:scale-[1.02] cursor-pointer disabled:opacity-50"
                                style={{ background: 'linear-gradient(135deg, #f59e0b, #ef4444)', boxShadow: '0 8px 30px rgba(245,158,11,0.3)' }}
                            >
                                {loading ? (
                                    <span className="animate-spin">⟳</span>
                                ) : (
                                    <><Star size={14} fill="white" strokeWidth={0} /> Activar PRO ahora <ArrowRight size={14} /></>
                                )}
                            </button>
                        )}
                    </div>
                </div>

                {/* Trust signals */}
                <div className="flex flex-wrap items-center justify-center gap-6 text-white/25 text-xs">
                    <span className="flex items-center gap-1"><Shield size={12} /> Pago seguro con Stripe</span>
                    <span className="flex items-center gap-1"><Shield size={12} /> Cancela en cualquier momento</span>
                    <span className="flex items-center gap-1"><Shield size={12} /> Sin compromisos de permanencia</span>
                </div>
            </div>
        </main>
    );
}
