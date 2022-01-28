export default ({ from, store, route, redirect, req }) => {
	if (process.server) {
		console.log('req', req)
	}
	const { isMovil } = store.state

	if (isMovil && (from.name === 'inicio-sesion' || from.name === 'objetivos')) {
		redirect('/menu-opciones')
	}
}
