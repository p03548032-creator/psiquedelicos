'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SearchOverlay from '@/components/SearchOverlay';
import { createClient } from '@/lib/supabase/client';

import { FlaskConical, UserCheck, MessagesSquare, Newspaper, Unlock, Microscope, LayoutGrid } from 'lucide-react';

const navLinks = [
    { href: '/sustancias', label: 'Sustancias', icon: FlaskConical },
    { href: '/investigacion', label: 'Investigación', icon: Microscope },
    { href: '/herramientas', label: 'Herramientas', icon: LayoutGrid },
    { href: '/noticias', label: 'Noticias', icon: Newspaper },
    { href: '/comunidad', label: 'Comunidad', icon: MessagesSquare },
    { href: '/terapeutas', label: 'Terapeutas', icon: UserCheck },
    { href: '/sala-de-viajes', label: 'Sala de Viajes', icon: Unlock },
];

export default function Navigation() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [user, setUser] = useState<any>(null);
    const pathname = usePathname();

    useEffect(() => {
        const handler = () => setSearchOpen(true);
        window.addEventListener('open-search', handler as EventListener);
        return () => window.removeEventListener('open-search', handler as EventListener);
    }, []);

    useEffect(() => {
        const supabase = createClient();

        // Evitar llamar si las vars son dummy
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('aqui_tu_project')) {
            return;
        }

        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };

        getUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user || null);
        });

        return () => subscription.unsubscribe();
    }, []);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault(); setSearchOpen(true);
            }
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, []);

    // Close menu on route change
    useEffect(() => { setMenuOpen(false); }, [pathname]);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass-sacred py-3' : 'py-5'}`}>
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group flex-shrink-0" aria-label="PortalPSY — Inicio">
                    <svg viewBox="0 0 40 40" width="34" height="34" fill="none" className="group-hover:scale-110 transition-transform" aria-hidden="true">
                        <circle cx="20" cy="20" r="8" stroke="#7c3aed" strokeWidth="1" opacity="0.8" />
                        {[0, 1, 2, 3, 4, 5].map(i => {
                            const angle = (i * 60) * Math.PI / 180;
                            return <circle key={i} cx={20 + 8 * Math.cos(angle)} cy={20 + 8 * Math.sin(angle)} r={8}
                                stroke={i % 2 === 0 ? '#7c3aed' : '#db2777'} strokeWidth="0.6" opacity="0.5" />;
                        })}
                        <circle cx="20" cy="20" r="2.5" fill="url(#lg)" />
                        <defs><radialGradient id="lg"><stop offset="0%" stopColor="#a78bfa" /><stop offset="100%" stopColor="#7c3aed" /></radialGradient></defs>
                    </svg>
                    <span className="font-bold text-white/80 text-sm tracking-wide hidden sm:block">
                        PORTAL<span className="text-psyche-violet">PSY</span>
                    </span>
                </Link>

                {/* Desktop nav */}
                <div className="hidden xl:flex items-center gap-0.5">
                    {navLinks.map(link => {
                        const active = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href + '/'));
                        return (
                            <Link key={link.href} href={link.href}
                                className={`vesica-btn px-3 py-2 text-[11px] transition-all duration-300 relative group/link ${active
                                        ? 'text-white border-white/20'
                                        : 'text-white/50 hover:text-white/90'
                                    }`}>
                                {active && (
                                    <div className="absolute inset-0 bg-psyche-violet/20 border border-psyche-violet/30 rounded-full blur-[2px] -z-10" />
                                )}
                                <span className={active ? 'text-glow font-bold' : ''}>{link.label}</span>
                            </Link>
                        );
                    })}
                </div>

                {/* Right controls */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setSearchOpen(true)}
                        aria-label="Abrir buscador"
                        className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 text-xs text-white/60 hover:text-white transition"
                    >
                        <span aria-hidden="true">🔍</span>
                        <span className="hidden lg:inline">Buscar</span>
                        <kbd className="hidden lg:inline font-mono text-[10px] text-white/30" aria-label="Atajo de teclado Control K">⌘K</kbd>
                    </button>

                    <Link href="/newsletter"
                        className="hidden sm:flex items-center gap-1 vesica-btn px-3 py-1.5 text-xs bg-psyche-violet/15 text-psyche-violet border-psyche-violet/20 hover:bg-psyche-violet/25 transition-all">
                        <span>📬</span>
                        <span className="hidden lg:inline">Suscribirse</span>
                    </Link>

                    {user ? (
                        <div className="hidden sm:flex items-center gap-2">
                            <Link href="/sala-pro" className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 transition text-amber-400 text-xs font-bold">
                                ✦ Sala PRO
                            </Link>
                            <Link href="/perfil" className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 hover:bg-white/5 transition">
                                <span className="text-xs text-white/60">{user.user_metadata?.full_name?.split(' ')[0] || 'Mi Perfil'}</span>
                                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-psyche-violet to-psyche-pink flex items-center justify-center text-[10px] font-bold">
                                    {user.user_metadata?.full_name?.charAt(0) || 'U'}
                                </div>
                            </Link>
                        </div>
                    ) : (
                        <div className="hidden sm:flex items-center gap-2">
                            <Link href="/sala-pro" className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition text-white/50 text-xs font-medium group">
                                <span className="group-hover:text-amber-400 transition-colors">🔒 Sala PRO</span>
                            </Link>
                            <Link href="/login"
                                className="vesica-btn px-3 py-1.5 text-xs text-white/70 hover:text-white transition-all">
                                Entrar
                            </Link>
                        </div>
                    )}

                    {/* Mobile hamburger */}
                    <button className="xl:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-white/5 transition"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
                        aria-expanded={menuOpen}
                        aria-controls="mobile-menu"
                    >
                        <span className={`w-5 h-px bg-white/60 transition-all ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                        <span className={`w-5 h-px bg-white/60 transition-all ${menuOpen ? 'opacity-0' : ''}`} />
                        <span className={`w-5 h-px bg-white/60 transition-all ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div id="mobile-menu" className="xl:hidden glass-sacred mt-2 mx-4 rounded-2xl overflow-hidden">
                    <div className="p-4 grid grid-cols-2 gap-2">
                        {navLinks.map(link => {
                            const active = pathname.startsWith(link.href);
                            return (
                                <Link key={link.href} href={link.href}
                                    className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm transition-colors ${active ? 'text-white bg-white/8' : 'text-white/50 hover:text-white/80 hover:bg-white/5'
                                        }`}>
                                    <span><link.icon size={18} strokeWidth={1.5} /></span>
                                    <span>{link.label}</span>
                                </Link>
                            );
                        })}
                    </div>
                    <div className="border-t border-white/5 p-4 space-y-2">
                        {user ? (
                            <>
                                <Link href="/sala-pro" onClick={() => setMenuOpen(false)}
                                    className="block w-full px-4 py-3 rounded-xl text-sm text-center font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20 transition">
                                    ✦ Sala PRO
                                </Link>
                                <Link href="/perfil" onClick={() => setMenuOpen(false)}
                                    className="block w-full px-4 py-3 rounded-xl text-sm text-center font-medium bg-white/5 text-white/80 border border-white/10 hover:bg-white/10 transition">
                                    Mi Perfil
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link href="/sala-pro" onClick={() => setMenuOpen(false)}
                                    className="block w-full px-4 py-3 rounded-xl text-sm text-center font-medium bg-white/5 text-white/50 border border-white/10 hover:bg-white/10 hover:text-amber-400 transition group">
                                    <span className="group-hover:text-amber-400 transition-colors">🔒 Sala PRO</span>
                                </Link>
                                <Link href="/login" onClick={() => setMenuOpen(false)}
                                    className="block w-full px-4 py-3 rounded-xl text-sm text-center font-medium bg-psyche-violet/20 text-psyche-violet border border-psyche-violet/30 hover:bg-psyche-violet/30 transition">
                                    Iniciar sesión
                                </Link>
                            </>
                        )}
                        <button onClick={() => { setMenuOpen(false); setSearchOpen(true); }}
                            className="w-full px-4 py-3 rounded-xl text-sm text-left text-white/50 hover:bg-white/5 transition flex items-center justify-between">
                            <span>🔍 Buscar en el portal</span>
                            <kbd className="font-mono text-[10px] text-white/20 border border-white/10 px-1.5 py-0.5 rounded">⌘K</kbd>
                        </button>
                    </div>
                </div>
            )}

            <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} onNavigate={() => setMenuOpen(false)} />
        </nav>
    );
}
