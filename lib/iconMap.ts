import { TestTube, HeartPulse, Brain, Leaf, ShieldAlert, Palette, FileText } from 'lucide-react';

export const iconMap: Record<string, React.ElementType> = {
    TestTube,
    HeartPulse,
    Brain,
    Leaf,
    ShieldAlert,
    Palette,
    FileText
};

export function getIconComponent(name: string) {
    return iconMap[name] || FileText;
}
