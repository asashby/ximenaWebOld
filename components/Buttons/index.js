import Vue from 'vue'

import '~/components/Buttons/index.styles.scss'

export const ButtonLink = Vue.component('ButtonLink', {
	props: {
		name: {
			default: '',
			type: String
		},
		to: {
			default: '',
			type: String
		}
	},
	render () {
		return (
			<NuxtLink to={ this.to } class="btn-link--main-container">
				<p>{ this.name }</p>
				<v-icon large>mdi-chevron-right</v-icon>
			</NuxtLink>
		)
	}
})
