import { atLeastOneTrue } from 'functionallibrary'

export default (context) => {
	let userAgent = null

	if (process.server) {
		userAgent = context.req ? context.req.headers['user-agent'] : ''
	} else {
		userAgent = navigator.userAgent
	}

	const device = {
		Android (userAgent) {
			return userAgent.match(/Android/i)
		},
		BlackBerry (userAgent) {
			return userAgent.match(/BlackBerry/i)
		},
		iOS (userAgent) {
			return userAgent.match(/iOS/i)
		},
		Opera (userAgent) {
			return userAgent.match(/Opera/i)
		},
		Windows (userAgent) {
			return userAgent.match(/Windows/i)
		},
		isMovile (userAgent) {
			return atLeastOneTrue([
				device.Android(userAgent),
				device.BlackBerry(userAgent),
				device.iOS(userAgent),
				device.Opera(userAgent),
				device.Windows(userAgent)
			])
		}
	}

	context.store.commit('SET_IS_MOVIL', device.isMovile(userAgent))
}
