/* eslint-disable no-tabs */
export default ({ $axios, env, store, redirect, $auth }, inject) => {
	store.dispatch('setLoading', true)
	const http = $axios.create()
	http.setBaseURL(env.URL_BASE)

	// Agregar token en cada solicitud realizada
	http.onRequest((config) => {
		const headers = config.headers
		const tokenDev = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3hpbWVuYS5tYWtpcG9zLmxhL2FwaS9sb2dpbi1zb2NpYWwiLCJpYXQiOjE2MjIxMzE4NDMsImV4cCI6MTYyMjIxODI0MywibmJmIjoxNjIyMTMxODQzLCJqdGkiOiJKa2gzMWdXaTc5QW9kbW5DIiwic3ViIjoxNywicHJ2IjoiODdlMGFmMWVmOWZkMTU4MTJmZGVjOTcxNTNhMTRlMGIwNDc1NDZhYSJ9.h16kOWIk3TqZo4nvICArPtGmgL14jfd_SlI7ZClBKfE'
		const token = store.$auth.strategies.local.token.get() || tokenDev
		// const token = store.$auth.strategies.local.token.get()
		if (token) {
			headers.common.Authorization = token
		} else {
			store.$auth.logout()
		}
		store.dispatch('setLoading', false)
		return config
	})

	inject('http', http)
}
