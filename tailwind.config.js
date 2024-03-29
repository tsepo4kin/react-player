const withMT = require('@material-tailwind/react/utils/withMT')
module.exports = withMT({
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Open Sans', 'sans-serif'],
				serif: ['Open Sans', 'serif'],
				body: ['Open Sans', 'sans-serif']
			}
		}
	},
	plugins: []
})
