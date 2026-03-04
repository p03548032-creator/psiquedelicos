import { Metadata } from 'next';
import SoundSection from '@/sections/SoundSection';

export const metadata: Metadata = {
    title: 'Bienestar y Sonido — PortalPSY',
    description: 'Música, sonidos binaurales y prácticas de bienestar para la preparación, el acompañamiento y la integración de experiencias psicodélicas.',
    keywords: ['sonidos binaurales psicodélicos', 'música integración', 'bienestar mental', 'meditación'],
};

export default function BienestarPage() {
    return (
        <main className="min-h-screen pt-20">
            <SoundSection />
        </main>
    );
}
