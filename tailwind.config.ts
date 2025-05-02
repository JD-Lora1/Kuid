
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#9B59B6', /* Amethyst Purple */
					hover: '#8E44AD', /* Darker Amethyst for hover */
				},
				accent: {
					DEFAULT: '#E0BBE4', /* Bright Lilac */
					hover: '#D1A6D3', /* Darker Lilac for hover */
				},
				secondary: {
					accent: '#77C1C4', /* Muted Teal */
					DEFAULT: '#828282', /* Medium Neutral Gray */
				},
				dark: '#4F4F4F',    /* Dark Neutral Gray */
				light: '#FFFFFF',  /* White */
				'very-light-alt': '#F9F6FC', /* Very Light Purple Tint */
				warning: '#E74C3C', /* Clear red */
				idea: '#F1C40F',   /* Sunny yellow */
				'active-border': '#9B59B6',
				'active-bg': '#F4ECF7', /* Very light amethyst for active */
				'health': '#E74C3C', /* Red for Health emphasis */
				'income': '#F39C12', /* Orange/Gold for income */
				'children': '#9B59B6', /* Amethyst */
				'pets': '#AF7AC5', /* Slightly different purple for pets */
				whatsapp: '#25D366',
				whatsapp_hover: '#1DAE54',
			},
			fontFamily: {
				'poppins': ['Poppins', 'sans-serif'],
			},
			borderRadius: {
				lg: '0.5rem',
				md: '0.375rem',
				sm: '0.25rem'
			},
			boxShadow: {
				'kuid': '0 5px 15px rgba(155, 89, 182, 0.12)',
				'kuid-hover': '0 10px 20px rgba(155, 89, 182, 0.18)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
