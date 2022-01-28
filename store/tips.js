import { isEmpty } from 'functionallibrary'

export const state = () => ({
	details: {},
	list: [],
	params: {
		limit: 8,
		page: 1,
		search: null
	},
	tipsDataPage: {}
})

export const actions = {
	async getDataPage ({ commit, state }) {
		if (isEmpty(state.tipsDataPage)) {
			const [responsePageData] = await Promise.all([
				this.$http.get('sections/tips')
			])
			commit('SET_TIPS_DATA_PAGE', responsePageData.data)
		}
	},
	async getList ({ commit, state }, flagReset) {
		const { params } = state
		const [responseTips] = await Promise.all([
			this.$http.get('tips', { params })
		])

		const finalList = flagReset ? responseTips.data.data : state.list.concat(responseTips.data.data)
		commit('SET_LIST_TIPS', finalList)
	},
	changePage ({ commit, state, dispatch }) {
		const { page } = state.params
		commit('SET_NEW_PAGE', page + 1)
	},
	async setSearch ({ commit, dispatch }, value) {
		commit('SET_NEW_PAGE', 1)
		commit('SET_SEARCH_VALUE', value)
		await dispatch('getList', true)
	},
	async getDetails ({ commit }, slug) {
		try {
			const { data: response } = await this.$http.get(`tips/${slug}`)
			commit('SET_TIPS_DETAILS', response)
		} catch (err) {
			console.log('error al cargar detalle de tips', err)
		}
	}
}

export const mutations = {
	SET_TIPS_DATA_PAGE (state, tipsDataPage) {
		state.tipsDataPage = { ...tipsDataPage }
	},
	SET_LIST_TIPS (state, listTips) {
		state.list = listTips
	},
	SET_NEW_PAGE (state, page) {
		state.params.page = page
	},
	SET_SEARCH_VALUE (state, searchValue) {
		state.params.search = searchValue
	},
	SET_TIPS_DETAILS (state, tipsDetails) {
		state.details = tipsDetails
	}
}
