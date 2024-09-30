/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			width: {
				36: "36rem",
			},
			height: {
				"42.": "42vh",
			},
			colors: {
				primaryBackground: "var(--primary-background)",
				secondaryBackground: "var(--secondary-background)",
				primaryForeground: "var(--primary-foreground)",
				secondaryForeground: "var(--secondary-foreground)",
				primary: "var(--primary)",
				secondary: "var(--secondary)",
				destructive: "var(--destructive)",
				accent: "var(--accent)",
				card: "var(--card)",
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
		},
	},
	plugins: [import("tailwindcss-animate")],
};
