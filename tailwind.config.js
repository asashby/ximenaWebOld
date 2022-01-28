module.exports = {
	important: '#app',
	purge: [],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				black: {
					darkest: '#151515',
					heavy: '#242424',
					base: '#161616',
				},
				gray: {
					darkest: '#464646',
					heavy: '#949494',
					base: '#ececec',
					light: '#ffffff',
				},
				green: {
					base: '#30d38b',
					aqua: '#007885',
				},
				red: {
					base: '#C51B44',
				},
				orange: {
					base: '#ffb400',
				},
				blue: {
					heavy: '#0066da',
					base: '#0076fc',
				}
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
}
