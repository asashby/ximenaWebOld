
export const state = () => ({
	details: {},
	list: [],
	params: {
		limit: 8,
		page: 1,
		search: null,
		time: null
	},
	totalCountOfRecipes: 0
})

export const actions = {
	async filter ({ commit, dispatch }, filter) {
		const filterUpdated = filter === 'todos' ? null : filter
		commit('SET_RECIPES_FITLER', filterUpdated)
		commit('SET_NEW_PAGE', 1)
		await dispatch('getList', true)
	},
	async getList ({ commit, state }, flagReset) {
		const { params } = state
		try {
			const [response] = await Promise.all([
				this.$http.get('recipes', { params })
			])

			const finalList = flagReset ? response.data.data : state.list.concat(response.data.data)
			commit('SET_RECIPE_LIST', finalList)
			commit('SET_TOTAL_RECIPES', response.data.total)
		} catch (err) {
			console.log('error al cargar listado de recetas', err)
		}
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
			const { data: response } = await this.$http.get(`recipes/${slug}`)
			commit('SET_RECIPES_DETAILS', response)
		} catch (err) {
			console.log('error al cargar detalle de receta', err)
		}
	}
}

export const getters = {
	showSeeMoreButton (state) {
		return state.list.length < state.totalCountOfRecipes
	}
}

export const mutations = {
	SET_RECIPE_DATA_PAGE (state, recipeDataPage) {
		state.tipsDataPage = { ...recipeDataPage }
	},
	SET_RECIPE_LIST (state, recipeList) {
		state.list = recipeList
	},
	SET_NEW_PAGE (state, page) {
		state.params.page = page
	},
	SET_SEARCH_VALUE (state, searchValue) {
		state.params.search = searchValue
	},
	SET_RECIPES_DETAILS (state, recipeDetails) {
		state.details = recipeDetails
	},
	SET_RECIPES_FITLER (state, filter) {
		state.params.time = filter
	},
	SET_TOTAL_RECIPES (state, totalCount) {
		state.totalCountOfRecipes = totalCount
	}
}
