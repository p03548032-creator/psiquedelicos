import type { LucideIcon } from 'lucide-react';
import { Eye, Leaf, Sparkles, Droplet, Beaker, TestTube, HeartPulse, Brain, ShieldAlert, Palette, Scale, Users, Home, Pill, AlertTriangle } from 'lucide-react';
import type { SubstanceCore } from '@/shared-data/substances';
import { substancesCore } from '@/shared-data/substances';
import type { ArticleCore } from '@/shared-data/articles';
import { articlesCore } from '@/shared-data/articles';

const substanceIconMap: Record<string, LucideIcon> = {
  Eye,
  Leaf,
  Sparkles,
  Droplet,
  Beaker,
};

const articleIconMap: Record<string, LucideIcon> = {
  TestTube,
  HeartPulse,
  Brain,
  Leaf,
  ShieldAlert,
  Palette,
};

export interface Substance extends SubstanceCore {
  icon: LucideIcon;
}

export const substances: Substance[] = substancesCore.map(substance => ({
  ...substance,
  icon: substanceIconMap[substance.iconKey] ?? Leaf,
}));

export interface Article extends ArticleCore {
  icon: LucideIcon;
}

export const articles: Article[] = articlesCore.map(article => ({
  ...article,
  icon: articleIconMap[article.iconKey] ?? TestTube,
}));

export const safetyRules = [
  { icon: Scale, title: 'Conoce tu sustancia', text: 'Usa kits de testeo (Ehrlich, Marquis, Mecke). Nunca consumas algo sin verificar.' },
  { icon: Beaker, title: 'Dosifica con precisión', text: 'Empieza bajo, sube despacio. Una báscula de miligramos cuesta 15€ y puede salvarte la vida.' },
  { icon: Users, title: 'Trip Sitter', text: 'Ten siempre a alguien sobrio de confianza, especialmente en primeras experiencias.' },
  { icon: Home, title: 'Set & Setting', text: 'Espacio seguro, cómodo y familiar. Estado mental positivo. Sin obligaciones al día siguiente.' },
  { icon: Pill, title: 'Interacciones', text: 'Consulta interacciones farmacológicas. ISRS, litio, IMAO y otros pueden ser peligrosos.' },
  { icon: AlertTriangle, title: 'Plan de emergencia', text: 'Ten a mano: agua, fruta, manta, música tranquila. Saber dónde está urgencias. 112 para emergencias.' },
];
