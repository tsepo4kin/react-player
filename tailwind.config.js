const withMT = require('@material-tailwind/react/utils/withMT');
const colors = require('tailwindcss/colors');

module.exports = withMT({
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				...colors
			},
			fontFamily: {
				sans: ['Open Sans', 'sans-serif'],
				serif: ['Open Sans', 'serif'],
				body: ['Open Sans', 'sans-serif']
			},
			keyframes: {
				pulse: {
					'0%, 100%': {
						opacity: 0
					},
					'50%': {
						opacity: 0.12
					}
				}
			}
		}
	},
	plugins: []
});
