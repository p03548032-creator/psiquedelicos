'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { User, Mail, Shield, LogOut, Calendar } from 'lucide-react';

export default function ProfilePage() {
    const [user, setUser] = useState<any>(null);
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const supabase = createClient();
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push('/login');
                return;
            }
            setUser(user);

            const { data: profile } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();

            setProfile(profile);
            setLoading(false);
        };
        fetchUser();
    }, [router]);

    const handleSignOut = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push('/');
        router.refresh();
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-psyche-bg">
                <div className="animate-pulse text-white/20">Cargando perfil…</div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-psyche-bg text-white pt-32 pb-20 px-6">
            <div className="max-w-2xl mx-auto">
                <div className="glass-sacred rounded-3xl p-8 border border-white/5 relative overflow-hidden">
                    {/* Background glows */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-psyche-violet/10 blur-[100px] rounded-full" />

                    <div className="relative z-10">
                        <div className="flex flex-col sm:flex-row items-center gap-6 mb-10">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-psyche-violet to-psyche-pink flex items-center justify-center text-3xl font-bold border-4 border-white/5 shadow-2xl">
                                {user.user_metadata?.full_name?.charAt(0) || user.email?.charAt(0).toUpperCase()}
                            </div>
                            <div className="text-center sm:text-left">
                                <h1 className="text-3xl font-black mb-1">{user.user_metadata?.full_name || 'Explorador'}</h1>
                                <p className="text-white/40 flex items-center justify-center sm:justify-start gap-2">
                                    <Mail size={14} /> {user.email}
                                </p>
                                <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-2">
                                    <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-white/5 border border-white/10 rounded-full text-white/40 flex items-center gap-1">
                                        <Calendar size={10} /> Miembro desde {new Date(user.created_at).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-4 mb-10">
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Shield size={18} className="text-psyche-violet" />
                                    <div>
                                        <p className="text-sm font-bold">Estado de la cuenta</p>
                                        <p className="text-xs text-white/40">Verificada y activa</p>
                                    </div>
                                </div>
                                <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                            </div>
                        </div>

                        <div className="flex justify-between items-center border-t border-white/5 pt-8">
                            <button
                                onClick={handleSignOut}
                                className="flex items-center gap-2 text-red-500/60 hover:text-red-500 text-sm font-bold transition-colors cursor-pointer"
                            >
                                <LogOut size={16} /> Cerrar sesión
                            </button>

                            <button
                                onClick={() => router.push('/comunidad')}
                                className="text-white/30 hover:text-white/60 text-sm transition-colors cursor-pointer"
                            >
                                Ir a la Comunidad
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
