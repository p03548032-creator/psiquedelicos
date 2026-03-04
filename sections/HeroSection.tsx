'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FlowerOfLifeCanvas, SriYantraAccent, GoldenSpiral } from '@/components/SacredGeometry';

export default function HeroSection() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleMouse = (e: MouseEvent) => {
            setMousePos({ x: (e.clientX / window.innerWidth - 0.5) * 2, y: (e.clientY / window.innerHeight - 0.5) * 2 });
        };
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('mousemove', handleMouse);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => { window.removeEventListener('mousemove', handleMouse); window.removeEventListener('scroll', handleScroll); };
    }, []);

    return (
        <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <FlowerOfLifeCanvas className="opacity-40" />

            <div className="absolute w-[500px] h-[500px] rounded-full animate-morph"
                style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)', left: `calc(38.2% + ${mousePos.x * 30}px)`, top: `calc(38.2% + ${mousePos.y * 30}px)`, transform: `translateY(${scrollY * -0.2}px)`, transition: 'left 0.8s ease-out, top 0.8s ease-out' }} />
            <div className="absolute w-[400px] h-[400px] rounded-full animate-morph"
                style={{ background: 'radial-gradient(circle, rgba(219,39,119,0.12) 0%, transparent 70%)', right: `calc(23.6% + ${mousePos.x * -20}px)`, bottom: `calc(23.6% + ${mousePos.y * -20}px)`, animationDelay: '3s', transform: `translateY(${scrollY * -0.1}px)`, transition: 'right 0.8s ease-out, bottom 0.8s ease-out' }} />
            <div className="absolute w-[300px] h-[300px] rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)', left: `calc(61.8% + ${mousePos.x * 15}px)`, top: `calc(14.6% + ${mousePos.y * 15}px)`, transition: 'left 1s ease-out, top 1s ease-out' }} />

            <SriYantraAccent size={200} className="absolute top-10 left-10 animate-spin-sacred" />
            <SriYantraAccent size={150} className="absolute bottom-20 right-10 animate-spin-reverse" />
            <GoldenSpiral size={400} className="absolute -right-20 top-1/4 animate-spin-sacred" />

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {[200, 324, 524].map((size, i) => (
                    <div key={i} className="absolute rounded-full border opacity-[0.04]"
                        style={{ width: size, height: size, borderColor: i === 0 ? '#7c3aed' : i === 1 ? '#db2777' : '#06b6d4', animation: `spin-sacred ${40 + i * 20}s linear infinite ${i % 2 ? 'reverse' : ''}` }} />
                ))}
            </div>

            <div className="relative z-10 text-center px-6 max-w-5xl mx-auto" style={{ transform: `translateY(${scrollY * 0.3}px)` }}>
                <div className="inline-flex items-center gap-2 vesica-btn px-6 py-2 glass-sacred text-sm text-psyche-violet mb-8">
                    <span className="w-2 h-2 rounded-full bg-psyche-violet animate-pulse" />
                    Portal Psicodélico — España 2026
                </div>

                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight mb-8">
                    <span className="block gradient-text">Explora</span>
                    <span className="block text-white/90 mt-2">tu</span>
                    <span className="block gradient-text-warm mt-2">Consciencia</span>
                </h1>

                <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-12 leading-relaxed">
                    El portal de referencia en España sobre sustancias psicodélicas.
                    <span className="text-white/70"> Información basada en evidencia, reducción de daños y cultura psiconáutica.</span>
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link href="/sustancias" className="vesica-btn px-10 py-4 gradient-psyche text-white font-semibold text-lg hover:scale-105 transition-transform duration-300 shadow-lg shadow-psyche-violet/25">
                        Explorar Sustancias
                    </Link>
                    <Link href="/sustancias" className="vesica-btn px-10 py-4 glass-sacred text-white/80 font-medium text-lg hover:scale-105 transition-transform duration-300">
                        Reducción de Daños
                    </Link>
                </div>

                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
                    <span className="text-white/30 text-xs tracking-widest uppercase">Scroll</span>
                    <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
                </div>
            </div>
        </section>
    );
}
