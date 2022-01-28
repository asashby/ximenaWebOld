// import path from 'path'
// import fs from 'fs'

export default {
	// Target: https://go.nuxtjs.dev/config-target
	target: 'server',
	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		titleTemplate: '%s - X & H',
		title: 'Ximena Hoyos',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: '' }
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
		]
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [
		'~/assets/styles/global.scss',
		'~/assets/styles/vuetify/radioButtons.vuetify.scss',
		'~/assets/styles/vuetify/textField.vuetify.scss',
		'~/assets/styles/vuetify/selector.vuetify.scss',
		'~/assets/styles/vuetify/searcher.vuetify.scss',
		'~/assets/styles/vuetify/videoModal.vuetify.scss',
		'~/assets/styles/buttons.style.scss'
	],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [
		'~/plugins/axiosInstances.js',
		'~/plugins/axiosPublicInstances.js'
	],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		// https://go.nuxtjs.dev/eslint
		'@nuxtjs/eslint-module',
		// https://go.nuxtjs.dev/vuetify
		'@nuxtjs/vuetify',
		'@nuxtjs/tailwindcss',
		'@nuxtjs/google-fonts',
		'@nuxtjs/auth-next'
	],

	router: {
		middleware: [
			'auth',
			'detectingDevice',
			'firstDataToLoad',
			'redirectTo'
		]
	},
	auth: {
		redirect: {
			callback: '/inicio-sesion',
			home: '/inicio-sesion',
			login: '/inicio-sesion',
			logout: '/inicio-sesion'
		},
		strategies: {
			local: {
				token: {
					property: 'token'
				},
				user: {
					property: 'user'
				},
				endpoints: {
					login: { url: `${process.env.URL_BASE}login-social`, method: 'post' },
					logout: false,
					user: { url: `${process.env.URL_BASE}current`, method: 'get' }
				},
				redirectUri: '/inicio-sesion'
			},
			facebook: {
				clientId: process.env.FACEBOOK_CLIENT_ID,
				endpoints: {
					userInfo: 'https://graph.facebook.com/v6.0/me?fields=email,first_name,id,last_name,picture{url}'
				}
			},
			google: {
				clientId: process.env.GOOGLE_CLIENT_ID,
				scope: ['profile', 'email'],
				codeChallengeMethod: '',
				responseType: 'token id_token'
			}
		}
	},

	// importar fuentes
	googleFonts: {
		display: 'swap',
		families: {
			Poppins: [300, 500, 700, 900]
		},
		preload: true
	},

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		// https://go.nuxtjs.dev/axios
		'@nuxtjs/axios',
		// https://go.nuxtjs.dev/pwa
		'@nuxtjs/pwa',
		// https://github.com/nuxt-community/community-modules/tree/master/packages/toast
		'@nuxtjs/toast'
	],

	// Axios module configuration: https://go.nuxtjs.dev/config-axios
	axios: {},

	// PWA module configuration: https://go.nuxtjs.dev/pwa
	pwa: {
		manifest: {
			lang: 'es'
		}
	},

	// Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
	vuetify: {
		customVariables: ['~/assets/styles/variables.scss'],
		treeShake: true,
		theme: {
			disable: true
		}
	},

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {
		cache: false
	},

	// variables de entorno para ser usadas lado cliente
	env: {
		URL_TIENDA: process.env.URL_TIENDA,
		URL_BASE: process.env.URL_BASE,
		FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
		GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID
	},

	loading: '~/components/Loading.vue',

	loadingIndicator: {
		name: 'circle',
		color: '#ffffff',
		background: 'white'
	}

	// server: {
	// 	https: {
	// 		key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
	// 		cert: fs.readFileSync(path.resolve(__dirname, 'server.crt'))
	// 	}
	// }
}
