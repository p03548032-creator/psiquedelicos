import { Star } from 'lucide-react';

interface ProBadgeProps {
    size?: 'sm' | 'md';
}

export default function ProBadge({ size = 'sm' }: ProBadgeProps) {
    const isSm = size === 'sm';
    return (
        <span
            className={`inline-flex items-center gap-1 font-bold uppercase tracking-wider rounded-full`}
            style={{
                background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
                color: 'white',
                fontSize: isSm ? '9px' : '11px',
                padding: isSm ? '2px 7px' : '3px 10px',
            }}
        >
            <Star size={isSm ? 8 : 10} fill="white" strokeWidth={0} />
            PRO
        </span>
    );
}
