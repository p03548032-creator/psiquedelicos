'use client';
import { useEffect, useRef } from 'react';

/* ═══════════════════════════════════════════════════════
   COMPONENTES DE GEOMETRÍA SAGRADA
   ═══════════════════════════════════════════════════════ */

export function FlowerOfLifeCanvas({ className = '' }: { className?: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animId: number;
        let time = 0;

        const resize = () => {
            canvas.width = canvas.offsetWidth * window.devicePixelRatio;
            canvas.height = canvas.offsetHeight * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        };
        resize();
        window.addEventListener('resize', resize);

        const drawFlower = () => {
            const w = canvas.offsetWidth;
            const h = canvas.offsetHeight;
            ctx.clearRect(0, 0, w, h);

            const r = 40;
            const centers: [number, number][] = [];

            for (let row = -2; row < h / (r * 1.732) + 2; row++) {
                for (let col = -2; col < w / (r * 2) + 2; col++) {
                    const x = col * r * 2 + (row % 2 === 0 ? 0 : r);
                    const y = row * r * 1.732;
                    centers.push([x, y]);
                }
            }

            centers.forEach(([cx, cy]) => {
                const dist = Math.sqrt((cx - w / 2) ** 2 + (cy - h / 2) ** 2);
                const maxDist = Math.sqrt(w * w + h * h) / 2;
                const phase = dist / maxDist * Math.PI * 2;
                const opacity = 0.03 + 0.04 * Math.sin(time * 0.5 + phase);
                const hue = (time * 10 + dist * 0.1) % 360;

                ctx.beginPath();
                ctx.arc(cx, cy, r + Math.sin(time + phase) * 3, 0, Math.PI * 2);
                ctx.strokeStyle = `hsla(${270 + hue * 0.1}, 80%, 60%, ${opacity})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            });

            time += 0.01;
            animId = requestAnimationFrame(drawFlower);
        };

        drawFlower();
        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return <canvas ref={canvasRef} className={`absolute inset-0 w-full h-full ${className}`} />;
}

export function MetatronDivider() {
    return (
        <div className="relative w-full flex justify-center py-12">
            <svg viewBox="0 0 600 60" className="w-full max-w-2xl opacity-20" fill="none">
                <line x1="0" y1="30" x2="600" y2="30" stroke="url(#metatron-grad)" strokeWidth="0.5" />
                <circle cx="300" cy="30" r="15" stroke="url(#metatron-grad)" strokeWidth="0.5" className="animate-breathe" />
                <circle cx="300" cy="30" r="8" stroke="url(#metatron-grad)" strokeWidth="0.5" />
                <circle cx="300" cy="30" r="3" fill="url(#metatron-grad)" />
                {[0, 1, 2, 3, 4, 5].map(i => {
                    const angle = (i * 60 - 90) * Math.PI / 180;
                    const x = 300 + 15 * Math.cos(angle);
                    const y = 30 + 15 * Math.sin(angle);
                    return <circle key={i} cx={x} cy={y} r="2" fill="url(#metatron-grad)" />;
                })}
                {[0, 1, 2, 3, 4, 5].map(i => {
                    const angle = (i * 60 - 90) * Math.PI / 180;
                    const x1 = 300 + 15 * Math.cos(angle);
                    const y1 = 30 + 15 * Math.sin(angle);
                    const x2 = 300 + 15 * Math.cos(angle + Math.PI);
                    const y2 = 30 + 15 * Math.sin(angle + Math.PI);
                    return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="url(#metatron-grad)" strokeWidth="0.3" />;
                })}
                <defs>
                    <linearGradient id="metatron-grad" x1="0" y1="0" x2="600" y2="0">
                        <stop offset="0%" stopColor="transparent" />
                        <stop offset="30%" stopColor="#7c3aed" />
                        <stop offset="50%" stopColor="#db2777" />
                        <stop offset="70%" stopColor="#06b6d4" />
                        <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
}

export function SriYantraAccent({ size = 120, className = '' }: { size?: number; className?: string }) {
    const r = size / 2;
    return (
        <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} className={`opacity-15 ${className}`} fill="none">
            {[0.9, 0.65, 0.4, 0.2].map((s, i) => (
                <polygon
                    key={i}
                    points={`${r},${r - r * s} ${r + r * s * 0.866},${r + r * s * 0.5} ${r - r * s * 0.866},${r + r * s * 0.5}`}
                    stroke={i % 2 === 0 ? '#7c3aed' : '#db2777'}
                    strokeWidth="0.5"
                />
            ))}
            {[0.8, 0.55, 0.3].map((s, i) => (
                <polygon
                    key={`inv-${i}`}
                    points={`${r},${r + r * s} ${r + r * s * 0.866},${r - r * s * 0.5} ${r - r * s * 0.866},${r - r * s * 0.5}`}
                    stroke={i % 2 === 0 ? '#06b6d4' : '#7c3aed'}
                    strokeWidth="0.5"
                />
            ))}
            <circle cx={r} cy={r} r={r * 0.95} stroke="#7c3aed" strokeWidth="0.3" />
        </svg>
    );
}

export function SeedOfLifeIcon({ size = 40, color = '#7c3aed', className = '' }: { size?: number; color?: string; className?: string }) {
    const r = size * 0.25;
    const cx = size / 2;
    const cy = size / 2;
    return (
        <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} fill="none" className={className}>
            <circle cx={cx} cy={cy} r={r} stroke={color} strokeWidth="0.8" opacity="0.6" />
            {[0, 1, 2, 3, 4, 5].map(i => {
                const angle = (i * 60) * Math.PI / 180;
                return (
                    <circle
                        key={i}
                        cx={cx + r * Math.cos(angle)}
                        cy={cy + r * Math.sin(angle)}
                        r={r}
                        stroke={color}
                        strokeWidth="0.8"
                        opacity="0.6"
                    />
                );
            })}
        </svg>
    );
}

export function CosmicParticles() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animId: number;
        const dpr = window.devicePixelRatio || 1;

        const resize = () => {
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = window.innerWidth + 'px';
            canvas.style.height = window.innerHeight + 'px';
            ctx.scale(dpr, dpr);
        };
        resize();
        window.addEventListener('resize', resize);

        const particles: { x: number; y: number; vx: number; vy: number; size: number; hue: number; life: number; maxLife: number }[] = [];

        for (let i = 0; i < 80; i++) {
            particles.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3 - 0.1,
                size: Math.random() * 2 + 0.5,
                hue: 250 + Math.random() * 80,
                life: Math.random() * 1000,
                maxLife: 500 + Math.random() * 1000,
            });
        }

        const animate = () => {
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                p.life++;

                if (p.life > p.maxLife) {
                    p.x = Math.random() * window.innerWidth;
                    p.y = window.innerHeight + 10;
                    p.life = 0;
                }
                if (p.y < -10) p.y = window.innerHeight + 10;
                if (p.x < -10) p.x = window.innerWidth + 10;
                if (p.x > window.innerWidth + 10) p.x = -10;

                const alpha = Math.sin((p.life / p.maxLife) * Math.PI) * 0.6;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${p.hue}, 70%, 65%, ${alpha})`;
                ctx.fill();
            });

            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(124, 58, 237, ${0.06 * (1 - dist / 100)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            animId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
}

export function GoldenSpiral({ size = 300, className = '' }: { size?: number; className?: string }) {
    const points: string[] = [];
    const phi = 1.6180339887;
    for (let t = 0; t < 8 * Math.PI; t += 0.1) {
        const r2 = Math.pow(phi, t / (2 * Math.PI)) * 3;
        const x = size / 2 + r2 * Math.cos(t);
        const y = size / 2 + r2 * Math.sin(t);
        if (x >= 0 && x <= size && y >= 0 && y <= size) {
            points.push(`${x},${y}`);
        }
    }

    return (
        <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} className={`opacity-10 ${className}`} fill="none">
            <polyline
                points={points.join(' ')}
                stroke="url(#spiral-grad)"
                strokeWidth="1"
                strokeLinecap="round"
            />
            <defs>
                <linearGradient id="spiral-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#7c3aed" />
                    <stop offset="50%" stopColor="#db2777" />
                    <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
            </defs>
        </svg>
    );
}
