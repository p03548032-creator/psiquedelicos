'use client';
import Link from 'next/link';
import { Calculator, ShieldAlert, ArrowRight, Zap, Activity } from 'lucide-react';
import { MetatronDivider } from '@/components/SacredGeometry';

const TOOLS = [
    {
        title: 'Calculadora de Dosis',
        description: 'Herramienta de precisión para el cálculo de dosificación basada en peso y tipo de sustancia. Optimizado para reducción de daños.',
        href: '/herramientas/calculadora-dosis',
        icon: Calculator,
        color: 'from-psyche-violet to-psyche-pink',
        tag: 'Seguridad'
    },
    {
        title: 'Buscador de Interacciones',
        description: 'Base de datos contrastada para verificar incompatibilidades entre psicodélicos y medicación común o suplementos.',
        href: '/herramientas/interacciones',
        icon: ShieldAlert,
        color: 'from-psyche-cyan to-psyche-violet',
        tag: 'Prevención'
    }
];

export default function HerramientasHub() {
    return (
        <main className="min-h-screen pt-28 pb-20 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-1/4 -left-20 w-80 h-80 bg-psyche-violet/10 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-psyche-pink/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />

            <div className="max-w-5xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs text-white/60 mb-6 uppercase tracking-widest">
                        <Zap size={14} className="text-psyche-pink" />
                        Soporte & Reducción de Daños
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
                        Centro de <span className="gradient-text">Herramientas</span>
                    </h1>
                    <p className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">
                        Utilidades diseñadas para una navegación segura por los estados modificados de conciencia. 
                        Basadas en evidencia científica y protocolos de seguridad actuales.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    {TOOLS.map((tool, index) => (
                        <Link 
                            key={tool.href} 
                            href={tool.href}
                            className="group relative glass-sacred rounded-3xl p-8 border border-white/5 hover:border-white/20 transition-all duration-500 overflow-hidden"
                        >
                            {/* Gradient Glow */}
                            <div className={`absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-5 blur-[80px] transition-opacity duration-700`} />
                            
                            <div className="relative z-10">
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-black/20`}>
                                    <tool.icon size={28} className="text-white" />
                                </div>
                                
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/30 px-2 py-1 rounded bg-white/5 border border-white/5">
                                        {tool.tag}
                                    </span>
                                </div>

                                <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60 transition-all">
                                    {tool.title}
                                </h2>
                                
                                <p className="text-white/50 leading-relaxed mb-8">
                                    {tool.description}
                                </p>

                                <div className="flex items-center gap-2 text-white/40 text-sm font-medium group-hover:text-white transition-colors">
                                    Acceder a herramienta 
                                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <MetatronDivider />
                
                <div className="mt-16 text-center text-white/20 text-xs">
                    <p>Estas herramientas son informativas y no sustituyen el consejo médico profesional.</p>
                </div>
            </div>
        </main>
    );
}
