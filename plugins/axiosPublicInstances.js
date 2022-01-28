/* eslint-disable no-tabs */
export default ({ $axios, env, store }, inject) => {
	store.dispatch('setLoading', true)
	const http = $axios.create()
	http.setBaseURL(env.URL_BASE)
	store.dispatch('setLoading', false)
	inject('httpPublic', http)
}
