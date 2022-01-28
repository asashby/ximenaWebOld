import { getPropertysValue } from 'functionallibrary'

export const state = () => ({
	address: {
		list: [
			{ name: 'Mi Casa', address: 'Avenida Jose Pardo 123, Miraflores, Lima, Peru', id: 1, flagFavorite: true },
			{ name: 'Mi Trabajo', address: 'Avenida Independencia 123, Miraflores, Lima, Peru', id: 2, flagFavorite: false }
		]
	},
	orders: {
		list: [
			{
				createdAt: '2021/04/20',
				total: 100,
				orderNumber: '119-333234',
				status: 'Entregado',
				deliveryAddress: 'Calle Robinson L30, La Calera de la Merced, Surquillo, Lima, Peru',
				wayPayment: 'Tarjeta de credito o debito',
				details: [
					{ name: 'Carritos de juguetes armables', quantity: 1, price: 50, total: 50 },
					{ name: 'Rompecabezas del Cusco desde Machupichu', quantity: 1, price: 50, total: 50 },
					{ name: 'Zapatos Nike rojos', quantity: 2, price: 12, total: 24 },
					{ name: 'Tizana helada', quantity: 2, price: 12, total: 24 }
				]
			},
			{
				createdAt: '2021/04/27',
				total: 500,
				orderNumber: '309-483294',
				status: 'En camino',
				deliveryAddress: 'Calle Robinson L30, La Calera de la Merced, Surquillo, Lima, Peru',
				wayPayment: 'Tarjeta de credito o debito',
				details: [
					{ name: 'Zapatos Nike runner', quantity: 2, price: 250, total: 500 },
					{ name: 'Tizana helada', quantity: 4, price: 2, total: 8 }
				]
			}
		]
	},
	accountData: {
		goal: '',
		addittional_info: {}
	}
})

export const actions = {
	async updateObjectives ({ commit }, { selectedObjective, ...rest }) {
		const url = 'current/update'
		const body = {
			goal: selectedObjective,
			addittional_info: { ...rest }
		}
		try {
			const { data: response } = await this.$http.post(url, body)
			console.log('RESPONSE', response)
			commit('SET_ACCCOUNT_DATA', body)
		} catch (err) {
			console.log('error al guardar los objetivos de usuario', err)
		}
	},
	async editUser ({ commit }, user) {
		const url = 'current/update'
		const body = { ...user }
		delete body.email
		try {
			const { data: response } = await this.$http.post(url, body)
			console.log('RESPONSE', response)
			const dataAccount = {
				goal: body.goal,
				addittional_info: { ...body.addittional_info }
			}
			const dataUser = {
				name: body.name,
				last_name: body.last_name
			}
			commit('SET_ACCCOUNT_DATA', dataAccount)
			commit('SET_USER_DATA', dataUser, { root: true })
		} catch (err) {
			console.log('error al guardar los objetivos de usuario', err)
		}
	}
}

export const getters = {
	userPhoto (_, __, rootState) {
		return getPropertysValue('auth.user.picture.data.url', rootState) ||
			getPropertysValue('auth.user.picture', rootState)
	},
	userName (_, __, rootState) {
		const firstName = getPropertysValue('auth.user.given_name', rootState) ||
			getPropertysValue('auth.user.first_name', rootState)
		const lastName = getPropertysValue('auth.user.family_name', rootState) ||
			getPropertysValue('auth.user.last_name', rootState)
		const name = `${firstName} ${lastName}`
		return name
	},
	isAccountData (state) {
		return getPropertysValue('accountData', state)
	},
	isUserProfile (_, __, rootState) {
		return getPropertysValue('auth.user', rootState)
	}
}

export const mutations = {
	SET_ACCCOUNT_DATA (state, body) {
		state.accountData = { ...body }
	}
}
