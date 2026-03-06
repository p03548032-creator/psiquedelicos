'use client';

import { useEffect, useRef, useState } from 'react';
import { MousePointer2, RefreshCw, X } from 'lucide-react';

interface Particle {
    x: number;
    y: number;
    r: number; // radio
    color: string;
    vx: number; // velocidad x
    vy: number; // velocidad y
    life: number;
}

const colors = [
    '#f43f5e', // rose
    '#db2777', // pink
    '#7c3aed', // violet
    '#4f46e5', // indigo
    '#0ea5e9', // sky
    '#10b981', // emerald
    '#f59e0b', // amber
];

export default function InteractiveVisualizer() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [mode, setMode] = useState<'fluid' | 'constellation' | 'sacred'>('fluid');
    const [isHovering, setIsHovering] = useState(false);

    // Configuración del canvas y la animación
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.parentElement?.clientWidth || window.innerWidth;
        let height = 400; // Altura fija para el visualizador

        canvas.width = width;
        canvas.height = height;

        let particles: Particle[] = [];
        let mouse = { x: width / 2, y: height / 2, active: false };
        let animationFrameId: number;

        // Limpiar
        particles = [];

        const handleResize = () => {
            width = canvas.parentElement?.clientWidth || window.innerWidth;
            canvas.width = width;
        };
        window.addEventListener('resize', handleResize);

        const createParticle = (x: number, y: number, isMove = false) => {
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            const speed = isMove ? Math.random() * 2 + 1 : Math.random() * 4 + 1;
            const angle = Math.random() * Math.PI * 2;

            particles.push({
                x,
                y,
                r: mode === 'fluid' ? Math.random() * 25 + 5 : Math.random() * 3 + 1,
                color: randomColor,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1.0 // 1.0 a 0.0
            });
        };

        const drawFluid = () => {
            ctx.fillStyle = 'rgba(10, 10, 15, 0.2)'; // Efecto estela
            ctx.fillRect(0, 0, width, height);

            ctx.globalCompositeOperation = 'screen';

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;
                p.life -= 0.015; // Velocidad de desaparición

                if (p.life <= 0) {
                    particles.splice(i, 1);
                    i--;
                    continue;
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.life;
                ctx.fill();
            }
            ctx.globalAlpha = 1.0;
            ctx.globalCompositeOperation = 'source-over';
        };

        const drawConstellation = () => {
            ctx.fillStyle = '#0a0a0f';
            ctx.fillRect(0, 0, width, height);

            // Rellenar de estrellas lentamente si hay pocas
            if (particles.length < 100) {
                createParticle(Math.random() * width, Math.random() * height);
            }

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.x += p.vx * 0.2;
                p.y += p.vy * 0.2;

                // Mantenimiento de vida infinita rebotando en bordes
                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                // Atracción al ratón
                if (mouse.active) {
                    const dx = mouse.x - p.x;
                    const dy = mouse.y - p.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 150) {
                        p.vx += dx * 0.001;
                        p.vy += dy * 0.001;
                    }
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();

                // Conectar líneas
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 80) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = p.color;
                        ctx.globalAlpha = 1 - (dist / 80);
                        ctx.lineWidth = 1;
                        ctx.stroke();
                        ctx.globalAlpha = 1.0;
                    }
                }
            }
        };

        let angleBase = 0;
        const drawSacred = () => {
            ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
            ctx.fillRect(0, 0, width, height);

            angleBase += 0.01;
            const centerX = mouse.active ? mouse.x : width / 2;
            const centerY = mouse.active ? mouse.y : height / 2;

            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(angleBase);

            const nodes = 12;
            ctx.lineWidth = 2;

            for (let i = 0; i < nodes; i++) {
                const angle = (Math.PI * 2 / nodes) * i;
                const dist = Math.sin(angleBase * 2) * 100 + 150; // Respiro
                const x = Math.cos(angle) * dist;
                const y = Math.sin(angle) * dist;

                ctx.beginPath();
                ctx.arc(x, y, 40, 0, Math.PI * 2);
                ctx.strokeStyle = colors[i % colors.length];
                ctx.globalAlpha = 0.4;
                ctx.stroke();

                // Conectar centro con nodos
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(x, y);
                ctx.strokeStyle = '#3b82f6';
                ctx.globalAlpha = 0.2;
                ctx.stroke();
            }

            ctx.restore();
            ctx.globalAlpha = 1.0;
        };

        const animate = () => {
            if (mode === 'fluid') {
                if (mouse.active) {
                    for (let i = 0; i < 3; i++) createParticle(mouse.x, mouse.y, true);
                }
                drawFluid();
            } else if (mode === 'constellation') {
                drawConstellation();
            } else if (mode === 'sacred') {
                drawSacred();
            }
            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
            mouse.active = true;
            setIsHovering(true);
        };
        const handleMouseLeave = () => {
            mouse.active = false;
            setIsHovering(false);
        };
        const handleTouchMove = (e: TouchEvent) => {
            e.preventDefault(); // Prevenir scroll al dibujar
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.touches[0].clientX - rect.left;
            mouse.y = e.touches[0].clientY - rect.top;
            mouse.active = true;
            setIsHovering(true);
        };
        const handleTouchEnd = () => {
            mouse.active = false;
            setIsHovering(false);
        };

        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);
        canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
        canvas.addEventListener('touchend', handleTouchEnd);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
            canvas.removeEventListener('touchmove', handleTouchMove);
            canvas.removeEventListener('touchend', handleTouchEnd);
        };
    }, [mode]);

    return (
        <div className="flex flex-col h-full w-full">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-white font-black text-lg flex items-center gap-2">
                        <MousePointer2 size={18} className="text-pink-400" /> Anclaje Visual
                    </h3>
                    <p className="text-white/40 text-sm mt-0.5">Interactúa para enfocar tu mente</p>
                </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
                <button onClick={() => setMode('fluid')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${mode === 'fluid' ? 'bg-pink-500/20 text-pink-400 border border-pink-500/40' : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white border border-transparent'}`}>
                    Flujo Etéreo
                </button>
                <button onClick={() => setMode('constellation')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${mode === 'constellation' ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/40' : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white border border-transparent'}`}>
                    Red Neuronal
                </button>
                <button onClick={() => setMode('sacred')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${mode === 'sacred' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white border border-transparent'}`}>
                    Geometría Sagrada
                </button>
            </div>

            <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a0f] shadow-2xl">
                <canvas
                    ref={canvasRef}
                    className="w-full touch-none cursor-crosshair"
                    style={{ height: '400px' }}
                />

                {!isHovering && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mb-3 animate-pulse bg-black/40 backdrop-blur-sm">
                            <MousePointer2 size={24} className="text-white/50" />
                        </div>
                        <p className="text-white/60 text-sm font-medium tracking-wide bg-black/40 px-4 py-1.5 rounded-full backdrop-blur-sm">
                            Toca o arrastra para interactuar
                        </p>
                    </div>
                )}
            </div>

            <p className="text-white/30 text-xs text-center mt-4">
                Concéntrate en el movimiento de las partículas o formas para romper bucles de ansiedad.
            </p>
        </div>
    );
}
