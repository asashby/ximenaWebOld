/* eslint-disable no-tabs */
import { isEmpty, getPropertysValue } from 'functionallibrary'

const alreadyInTheState = (state, prop) => {
	return !(isEmpty(state[prop]))
}

const buildArrayOfItems = (init, end) => {
	const arr = []
	for (let i = init; i <= end; i += 1) {
		arr.push(i)
	}
	return arr
}

export const state = () => ({
	ages: buildArrayOfItems(18, 80),
	company: {},
	isMovil: false,
	loading: false,
	menu: [],
	months: [
		'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
	],
	sizes: buildArrayOfItems(130, 210),
	ubigeo: {
		districts: [
			{ name: 'Surquillo', id: 1 },
			{ name: 'Surco', id: 2 },
			{ name: 'San Juan de Miraflores', id: 3 }
		],
		provinces: [
			{ name: 'Lima', id: 1 },
			{ name: 'Arequipa', id: 2 },
			{ name: 'Tumbes', id: 3 }
		]
	},
	weights: buildArrayOfItems(40, 120),
	ximena: {},
	tokenMaki: ''
})

export const actions = {
	async getMenuData ({ commit, state }) {
		if (alreadyInTheState(state, 'menu')) {
			commit('SET_MENU_DATA', state.menu)
		} else {
			const { data: menuData } = await this.$httpPublic.get('sections')
			commit('SET_MENU_DATA', menuData)
		}
	},
	async companyData ({ commit, state }) {
		const noCompanyData = isEmpty(state.company)

		if (noCompanyData) {
			const { data: response } = await this.$http.get('company/public')
			commit('SET_COMPANY_DATA', response)
		}
	},
	async getXimenaData ({ commit, state }) {
		if (isEmpty(state.ximena)) {
			try {
				const { data: response } = await this.$http.get('/about/sobre-ximena')
				commit('SET_XIMENA_DATA', response)
			} catch (err) {
				console.log('ocurrio un error al cargar datos sobre Ximena', err)
			}
		}
	},
	setUserData ({ commit, state }, userData) {
		const userUpdated = {
			...state.auth.user,
			...userData
		}
		commit('SET_AUTH_USER_DATA', userUpdated)
	},
	async logout ({ state }, $auth) {
		if (state.auth.loggedIn) {
			await $auth.logout()
		}
	},
	setTokenMaki ({ commit }, tokenMaki) {
		commit('SET_TOKEN_MAKI', tokenMaki)
	},
	setLoading ({ commit, state }) {
		commit('SET_LOADING', state.loading)
	}
}

export const mutations = {
	SET_MENU_DATA (state, menuData) {
		state.menu = [].concat(menuData)
	},
	SET_TOKEN_MAKI (state, tokenMaki) {
		state.tokenMaki = tokenMaki
	},
	SET_COMPANY_DATA (state, companyData) {
		state.company = { ...companyData }
	},
	SET_IS_MOVIL (state, isMovil) {
		state.isMovil = isMovil
	},
	SET_XIMENA_DATA (state, ximenaData) {
		state.ximena = { ...ximenaData }
	},
	SET_AUTH_USER_DATA (state, userData) {
		state.auth.user = { ...userData }
	},
	SET_USER_DATA (state, data) {
		const newUser = { ...state.auth.user }
		newUser.name = data.name
		newUser.sur_name = data.last_name
		state.auth.user = { ...newUser }
	},
	SET_LOADING (state, value) {
		state.loading = value
	}
}

export const getters = {
	termsAndConditionsData (state) {
		return getPropertysValue('company.data.helpCenter.description', state)
	},
	politicsAndPrivacyData (state) {
		return getPropertysValue('company.data.privacyPolicy.description', state)
	},
	isGoogle (state) {
		return getPropertysValue('auth.strategy', state) === 'google'
	},
	isFacebook (state) {
		return getPropertysValue('auth.strategy', state) === 'facebook'
	},
	isUser (state) {
		return getPropertysValue('auth.user', state)
	},
	isLoading (state) {
		return getPropertysValue('loading', state)
	},
	getTokenMaki (state) {
		return state.tokenMaki
	}
}
