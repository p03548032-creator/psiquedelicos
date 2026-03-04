import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './sections/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                'psyche-violet': '#7c3aed',
                'psyche-indigo': '#4f46e5',
                'psyche-pink': '#db2777',
                'psyche-magenta': '#c026d3',
                'psyche-cyan': '#06b6d4',
                'psyche-teal': '#14b8a6',
                'psyche-amber': '#d97706',
                'psyche-rose': '#e11d48',
                void: '#050510',
                abyss: '#0a0a1a',
                deep: '#0f0f2e',
                nebula: '#1a0a3e',
            },
        },
    },
    plugins: [],
};

export default config;
