'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Newspaper } from 'lucide-react';
import { getIconComponent } from '@/lib/iconMap';

interface NewsImageProps {
    src: string;
    alt: string;
    iconName?: string;
}

// Mapa de emergencia para corregir enlaces rotos de Unsplash detectados
const BROKEN_IMAGES_MAP: Record<string, string> = {
    '1576086202517-c81eb50c9502': 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&q=80', // MDMA/Therapy
    '1559757175-9b2f6385ab0f': 'https://images.unsplash.com/photo-1508213638299-5fbc362c3463?w=800&q=80', // Psilocybin/Lab
};

export default function NewsImage({ src, alt, iconName = 'FileText' }: NewsImageProps) {
    const [error, setError] = useState(false);
    
    // Corregir URL si es un enlace roto conocido
    let finalSrc = src;
    if (src) {
        Object.entries(BROKEN_IMAGES_MAP).forEach(([brokenId, workingUrl]) => {
            if (src.includes(brokenId)) {
                finalSrc = workingUrl;
            }
        });
    }

    const Icon = getIconComponent(iconName);

    if (error || !finalSrc) {
        return (
            <div className="absolute inset-0 bg-void flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-psyche-violet/20 to-psyche-pink/10 opacity-40" />
                <Icon size={48} className="text-white/10" />
            </div>
        );
    }

    return (
        <Image
            src={finalSrc}
            alt={alt}
            fill
            unoptimized
            className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
            onError={() => setError(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
    );
}
