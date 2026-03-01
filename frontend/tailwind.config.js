import typography from '@tailwindcss/typography';
import containerQueries from '@tailwindcss/container-queries';
import animate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['index.html', 'src/**/*.{js,ts,jsx,tsx,html,css}'],
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px'
            }
        },
        extend: {
            fontFamily: {
                heading: ['"Playfair Display"', 'Georgia', 'serif'],
                display: ['"Cinzel"', 'serif'],
                body: ['"Lato"', 'sans-serif'],
                accent: ['"Poppins"', 'sans-serif'],
            },
            colors: {
                border: 'oklch(var(--border))',
                input: 'oklch(var(--input))',
                ring: 'oklch(var(--ring) / <alpha-value>)',
                background: 'oklch(var(--background))',
                foreground: 'oklch(var(--foreground))',
                primary: {
                    DEFAULT: 'oklch(var(--primary) / <alpha-value>)',
                    foreground: 'oklch(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'oklch(var(--secondary) / <alpha-value>)',
                    foreground: 'oklch(var(--secondary-foreground))'
                },
                destructive: {
                    DEFAULT: 'oklch(var(--destructive) / <alpha-value>)',
                    foreground: 'oklch(var(--destructive-foreground))'
                },
                muted: {
                    DEFAULT: 'oklch(var(--muted) / <alpha-value>)',
                    foreground: 'oklch(var(--muted-foreground) / <alpha-value>)'
                },
                accent: {
                    DEFAULT: 'oklch(var(--accent) / <alpha-value>)',
                    foreground: 'oklch(var(--accent-foreground))'
                },
                popover: {
                    DEFAULT: 'oklch(var(--popover))',
                    foreground: 'oklch(var(--popover-foreground))'
                },
                card: {
                    DEFAULT: 'oklch(var(--card))',
                    foreground: 'oklch(var(--card-foreground))'
                },
                chart: {
                    1: 'oklch(var(--chart-1))',
                    2: 'oklch(var(--chart-2))',
                    3: 'oklch(var(--chart-3))',
                    4: 'oklch(var(--chart-4))',
                    5: 'oklch(var(--chart-5))'
                },
                sidebar: {
                    DEFAULT: 'oklch(var(--sidebar))',
                    foreground: 'oklch(var(--sidebar-foreground))',
                    primary: 'oklch(var(--sidebar-primary))',
                    'primary-foreground': 'oklch(var(--sidebar-primary-foreground))',
                    accent: 'oklch(var(--sidebar-accent))',
                    'accent-foreground': 'oklch(var(--sidebar-accent-foreground))',
                    border: 'oklch(var(--sidebar-border))',
                    ring: 'oklch(var(--sidebar-ring))'
                },
                // DivyaVastrav Red Jaipuri theme tokens
                'crimson': {
                    DEFAULT: 'oklch(0.45 0.22 18)',
                    light: 'oklch(0.58 0.20 18)',
                    dark: 'oklch(0.32 0.18 18)',
                    deep: 'oklch(0.22 0.14 18)',
                    50: 'oklch(0.97 0.018 55)',
                    100: 'oklch(0.94 0.04 30)',
                    200: 'oklch(0.88 0.08 25)',
                    300: 'oklch(0.75 0.14 20)',
                    400: 'oklch(0.62 0.18 18)',
                    500: 'oklch(0.45 0.22 18)',
                    600: 'oklch(0.38 0.20 18)',
                    700: 'oklch(0.32 0.18 18)',
                    800: 'oklch(0.25 0.14 18)',
                    900: 'oklch(0.18 0.10 18)',
                },
                'golden': {
                    DEFAULT: 'oklch(0.75 0.18 75)',
                    light: 'oklch(0.88 0.14 80)',
                    dark: 'oklch(0.62 0.16 70)',
                    50: 'oklch(0.97 0.04 80)',
                    100: 'oklch(0.94 0.08 78)',
                    200: 'oklch(0.88 0.12 76)',
                    300: 'oklch(0.82 0.15 75)',
                    400: 'oklch(0.75 0.18 75)',
                    500: 'oklch(0.68 0.18 72)',
                    600: 'oklch(0.60 0.16 70)',
                },
                'warm-pink': {
                    DEFAULT: 'oklch(0.72 0.16 340)',
                    light: 'oklch(0.85 0.10 340)',
                    pale: 'oklch(0.94 0.05 340)',
                    deep: 'oklch(0.55 0.18 340)',
                },
                'royal-red': {
                    DEFAULT: 'oklch(0.35 0.20 18)',
                    dark: 'oklch(0.22 0.14 18)',
                    deep: 'oklch(0.16 0.10 18)',
                },
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            boxShadow: {
                xs: '0 1px 2px 0 rgba(0,0,0,0.05)',
                'warm': '0 4px 24px 0 rgba(160, 30, 30, 0.12)',
                'warm-lg': '0 8px 40px 0 rgba(160, 30, 30, 0.18)',
                'gold': '0 2px 12px 0 rgba(200, 150, 30, 0.40)',
                'crimson': '0 4px 24px 0 rgba(160, 20, 20, 0.22)',
                'divine': '0 8px 40px 0 rgba(200, 150, 30, 0.28), 0 2px 8px 0 rgba(160, 20, 20, 0.18)',
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' }
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' }
                },
                'shimmer': {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
                'float': {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-6px)' },
                },
                'glow-pulse': {
                    '0%, 100%': { boxShadow: '0 0 8px oklch(0.75 0.18 75 / 0.4)' },
                    '50%': { boxShadow: '0 0 24px oklch(0.75 0.18 75 / 0.85)' },
                },
                'shimmer-gold': {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'shimmer': 'shimmer 2s linear infinite',
                'float': 'float 3s ease-in-out infinite',
                'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
            }
        }
    },
    plugins: [typography, containerQueries, animate]
};
