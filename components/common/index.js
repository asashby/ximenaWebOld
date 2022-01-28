import Vue from 'vue'

import '~/components/common/index.styles.scss'

export const CounterTime = Vue.component('CounterTime', {
	data: () => ({
		counterDownId: null,
		minutes: '00',
		remainigTime: 0,
		seconds: '00'
	}),
	methods: {
		counterDown () {
			this.remainigTime = this.remainigTime - 1

			this.parsedTime()
			if (this.remainigTime === 0) {
				clearInterval(this.counterDownId)
				this.emitFinishRest()
			}
		},
		emitFinishRest () {
			this.$emit('rest-finished', true)
		},
		parsedTime () {
			if (this.remainigTime > 60) {
				const divTime = this.remainigTime / 60
				const minutes = Math.trunc(divTime)
				const seconds = Math.trunc((divTime - 1) * 60)
				this.minutes = minutes >= 10 ? minutes : `0${minutes}`
				this.seconds = seconds >= 10 ? seconds : `0${seconds}`
			} else {
				this.minutes = '00'
				this.seconds = this.remainigTime >= 10 ? this.remainigTime : `0${this.remainigTime}`
			}
		}
	},
	mounted () {
		this.remainigTime = this.time
		this.parsedTime()
		this.counterDownId = setInterval(
			this.counterDown,
			1000
		)
	},
	props: {
		time: { default: 0, type: Number }
	},
	render () {
		return (
			<div>
				<span>{ this.minutes }</span>
				<span>:</span>
				<span>{ this.seconds }</span>
			</div>
		)
	}
})
