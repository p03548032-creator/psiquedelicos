'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { Lock, Eye, EyeOff, CheckCircle } from 'lucide-react';

export default function ResetPasswordPage() {
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [sessionReady, setSessionReady] = useState(false);
    const router = useRouter();

    // Verificar que hay una sesión activa (viene del enlace de recuperación)
    useEffect(() => {
        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );
        supabase.auth.getSession().then(({ data }) => {
            if (data.session) {
                setSessionReady(true);
            } else {
                router.replace('/login');
            }
        });
    }, [router]);

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (password.length < 8) {
            setError('La contraseña debe tener al menos 8 caracteres.');
            return;
        }
        if (password !== confirm) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        setLoading(true);
        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );

        const { error: updateError } = await supabase.auth.updateUser({ password });

        if (updateError) {
            setError(updateError.message);
        } else {
            setSuccess(true);
            // Redirigir al login tras 3 segundos
            setTimeout(() => router.push('/comunidad'), 3000);
        }
        setLoading(false);
    };

    if (!sessionReady) {
        return (
            <main className="min-h-screen flex items-center justify-center">
                <div className="text-white/30 text-sm animate-pulse">Verificando enlace…</div>
            </main>
        );
    }

    return (
        <main className="min-h-screen pt-32 pb-20 flex items-center justify-center px-6">
            {/* Background glows */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-psyche-violet/15 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 max-w-md w-full">
                <div className="glass-sacred rounded-3xl p-8 border border-white/5">
                    {success ? (
                        <div className="text-center py-6">
                            <CheckCircle size={52} className="text-green-400 mx-auto mb-4" strokeWidth={1.5} />
                            <h1 className="text-2xl font-black text-white mb-2">¡Contraseña actualizada!</h1>
                            <p className="text-white/40 text-sm">Redirigiendo a tu perfil en unos segundos…</p>
                        </div>
                    ) : (
                        <>
                            <div className="text-center mb-8">
                                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                                    style={{ background: 'linear-gradient(135deg, #7c3aed30, #7c3aed10)' }}>
                                    <Lock size={24} className="text-psyche-violet" strokeWidth={1.5} />
                                </div>
                                <h1 className="text-2xl font-black text-white mb-1">Nueva contraseña</h1>
                                <p className="text-white/40 text-sm">Introduce tu nueva contraseña para PortalPSY</p>
                            </div>

                            <form onSubmit={handleReset} className="space-y-4">
                                {/* Campo contraseña */}
                                <div className="relative">
                                    <input
                                        type={showPass ? 'text' : 'password'}
                                        placeholder="Nueva contraseña (mín. 8 caracteres)"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-psyche-violet/50 pr-12"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPass(s => !s)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors cursor-pointer"
                                    >
                                        {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>

                                {/* Confirmar contraseña */}
                                <input
                                    type={showPass ? 'text' : 'password'}
                                    placeholder="Confirmar contraseña"
                                    value={confirm}
                                    onChange={e => setConfirm(e.target.value)}
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-psyche-violet/50"
                                />

                                {/* Indicador de fortaleza */}
                                {password.length > 0 && (
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4].map(i => (
                                            <div
                                                key={i}
                                                className="flex-1 h-1 rounded-full transition-colors"
                                                style={{
                                                    background: password.length >= i * 3
                                                        ? (password.length >= 12 ? '#10b981' : '#f59e0b')
                                                        : 'rgba(255,255,255,0.08)',
                                                }}
                                            />
                                        ))}
                                    </div>
                                )}

                                {error && (
                                    <p className="text-red-400 text-xs bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">
                                        {error}
                                    </p>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="vesica-btn w-full py-3.5 font-semibold text-sm gradient-psyche text-white hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer"
                                >
                                    {loading ? 'Actualizando…' : 'Guardar nueva contraseña'}
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </main>
    );
}
