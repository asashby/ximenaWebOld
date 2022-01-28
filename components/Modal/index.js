import Vue from 'vue'

import '~/components/Modal/index.styles.scss'

export const FinishedWorkout = Vue.component('FinishedWorkout', {
	data: () => ({
		summaryData: [
			{ name: 'Tiempo', data: 27, unit: 'minutos' },
			{ name: 'Calorias', data: 230, unit: null },
			{ name: 'Dia', data: '1/30', unit: 'dias' },
			{ name: 'Usuarios', data: 45, unit: 'personas' }
		]
	}),
	methods: {
		closeModal () {
			this.$emit('close-modal')
		},
		getTitleColor (index) {
			const base = 'title-data'

			if (index === 0) {
				return `${base} orange-title`
			} else if (index === 1) {
				return `${base} fucsia-title`
			} else if (index === 2) {
				return `${base} green-title`
			} else if (index === 3) {
				return `${base} yellow-title`
			}
		}
	},
	props: {
		value: null
	},
	render () {
		return (
			<v-dialog
				value={ this.value }
			>
				<div class="modal--finished-workout">
					<div class="modal--finished-workout__close">
						<button
							type="button"
							onClick={ this.closeModal }
						>
							<v-icon large>mdi-close</v-icon>
						</button>
					</div>

					<div
						class="modal--finished-workout__title"
					>
						<h3>Entrenamiento terminado</h3>
						<h1>RESUMEN</h1>
					</div>

					<div class="modal--finished-workout__summary">
						{this.summaryData.map((d, dInd) => (
							<div
								key={ dInd }
								class="modal--finished-workout__summary-card"
							>
								<h5
									class={ this.getTitleColor(dInd) }
								>{ d.name }</h5>

								<div class="numbers-unit">
									<h1>{ d.data }</h1>
									{d.unit ? <span>{ d.unit }</span> : null }
								</div>
							</div>
						))}
					</div>

					<div class="modal--finished-workout__rating">
						<h2>¿Que te parecio?</h2>
						<v-rating
							empty-icon="mdi-star-outline"
							full-icon="mdi-star"
							half-icon="mdi-star-halfFull"
							length="5"
							color="orange"
							size="36"
							value={ 0 }
						></v-rating>
					</div>

					<div class="modal--finished-workout__btns">
						<button
							class="x-btn x-btn__aqua"
						>Compartir</button>
						<button
							class="x-btn x-btn__green"
						>Terminar</button>
					</div>
				</div>
			</v-dialog>
		)
	}
})

export const VideoModal = Vue.component('VideoModal', {
	methods: {
		handleCloseVideoModal () {
			this.$emit('close-video-modal')
		}
	},
	props: {
		urlVideo: { default: '', type: String },
		value: null
	},
	render () {
		return (
			<v-dialog
				value={ this.value }
			>
				<v-card class="modal--meal-video">
					<v-btn
						class="close-video-modal"
						icon
						onClick={ this.handleCloseVideoModal }
					>
						<v-icon large>mdi-close</v-icon>
					</v-btn>

					<iframe
						allow="clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowfullscreen="allowfullscreen"
						height="400px"
						width="100%"
						src={ this.urlVideo }
					></iframe>
				</v-card>
			</v-dialog>
		)
	}
})
