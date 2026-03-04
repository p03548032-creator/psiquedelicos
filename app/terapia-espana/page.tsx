import { Metadata } from 'next';
import TherapySpainSection from '@/sections/TherapySpainSection';

export const metadata: Metadata = {
    title: 'Terapia Psicodélica en España — PortalPSY',
    description: 'Estado actual de la terapia psicodélica en España: ensayos clínicos activos, centros de investigación, cronología y marco legal. Mapa de investigación actualizado 2026.',
    keywords: ['terapia psicodélica España', 'psilocibina España', 'MDMA terapia', 'esketamina', 'AEMPS', 'ensayos clínicos España'],
};

export default function TerapiaEspanaPage() {
    return (
        <main className="min-h-screen pt-20">
            <TherapySpainSection />
        </main>
    );
}
