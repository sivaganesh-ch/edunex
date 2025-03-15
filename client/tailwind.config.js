import { transform } from 'framer-motion';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
		keyframes: {
			'infinite-scroll': {
				'0%': { transform : 'translateX(120px)', opacity:'0.5' },
				'50%': { transform : 'translateX(0px)' , opacity:'1'},
				'100%': { transform : 'translateX(-120px)' , opacity:'0.3'},
			},
			'trans-left': {
				'0%': { transform : 'translateX(100px)' },
				'100%': { transform : 'translateX(0px)' },
			},
			'trans-right': {
				'0%': { transform : 'translateX(-100px)' },
				'100%': { transform : 'translateX(0px)' },
			},
			'appear': {
				'0%': {opacity:'0'},
				'100%': {opacity: '1'}
			}
		},
		animation: {
			'trans-left': 'trans-left 1.5s ease-out',
			'trans-right': 'trans-right 1.5s ease-out',
			'appear': 'appear ease-in-out',
			'infinite-scroll': 'infinite-scroll 6s infinite ',
		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
