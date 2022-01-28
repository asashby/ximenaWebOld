import { getPropertysValue } from 'functionallibrary'

export default ({ redirect, route, $auth }) => {
	// determinar si el usuario ya tiene sus objetivos definidos
	const flagGoald = getPropertysValue('$state.user.flag_goald', $auth)
	if (flagGoald) {
		redirect('/perfil')
	}

	// la ruta / no esta permitida
	if (route.path === '/') {
		redirect('/inicio-sesion')
	}
}
