<template>
	<v-dialog
		:value="value"
		content-class="modal-container"
	>
		<div class="modal--finished-workout">
			<div class="modal--finished-workout__close">
				<button
					type="button"
					@click="closeModal"
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

			<div class="modal--finished-workout__summary text-center">
				<div class="modal--finished-workout__summary-card">
					<h5 class="title-data orange-title">
						{{ summaryData[0].name }}
					</h5>
					<div class="numbers-unit">
						<h1>{{ getTime }}</h1>
						<span>{{ summaryData[0].unit }}</span>
					</div>
				</div>
				<div class="modal--finished-workout__summary-card">
					<h5 class="title-data green-title">
						{{ summaryData[2].name }}
					</h5>
					<div class="title-data numbers-unit">
						<h1>{{ getDay }}/{{ getDays }}</h1>
						<span>{{ summaryData[2].unit }}</span>
					</div>
				</div>
				<div class="modal--finished-workout__summary-card">
					<h5 class="yellow-title">
						{{ summaryData[3].name }}
					</h5>
					<div class="numbers-unit">
						<h1>{{ getUsers }}</h1>
						<span>{{ summaryData[3].unit }}</span>
					</div>
				</div>
			</div>
			<div class="modal--finished-workout__rating">
				<h2>¿Que te parecio?</h2>
				<v-rating
					@input="addRating($event)"
					empty-icon="mdi-star-outline"
					full-icon="mdi-star"
					half-icon="mdi-star-halfFull"
					length="5"
					color="orange"
					size="36"
					:value="0"
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
</template>

<script>
export default {
	name: 'finished-workout',
	data: () => ({
		summaryData: [
			{ name: 'Tiempo', data: 27, unit: 'minutos' },
			{ name: 'Calorias', data: 230, unit: null },
			{ name: 'Dia', data: '1/30', unit: 'dias' },
			{ name: 'Usuarios', data: 45, unit: 'personas' }
		]
	}),
	computed: {
		getDay () {
			const arrayRoute = this.$route.params.slugRutina.split('id:')
			const unitId = arrayRoute[1]
			const day = this.$store.getters['challenges/getDay'](unitId)
			return day
		},
		getDays () {
			const days = this.$store.getters['challenges/getDays']
			return days
		},
		getUsers () {
			const users = this.$store.getters['challenges/getUsers']
			return users
		},
		getTime () {
			const time = this.$store.getters['challenges/getTime']
			return time
		}
	},
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
		},
		addRating (value) {
			if (value !== '') {
				this.$emit('open-modal-comment', value)
			}
		}
	},
	props: {
		value: null
	}
}
</script>

<style lang="scss" scoped>
.modal--finished-workout {
	@apply bg-gray-light;
	@apply rounded-3xl;
	@apply p-4 mx-auto;
	max-width: 600px;

	@media screen and (min-width:600px) {
		@apply p-8;
	}

	&__close {
		@apply flex items-center justify-end;
		@apply mb-4;

		.theme--light.v-icon {
			@apply text-green-base;
			@apply text-6xl;
		}
	}

	&__title {
		@apply text-black-base font-bold text-3xl;
		@apply flex flex-col items-center justify-center;
		@apply mb-6;

		h3 {
			@apply font-normal text-base;
		}
	}

	&__summary {
		@apply grid gap-4 grid-cols-2;

		@media screen and (min-width:600px) {
			@apply grid-cols-3
		}

		&-card {
			@apply bg-gray-heavy bg-opacity-50;
			@apply rounded-2xl;
			@apply p-4;
			@apply flex flex-col items-start justify-center;

			.title-data {
				@apply font-bold text-sm;
				@apply mb-4;

				&.orange-title {
					color: #fe5712;
				}

				&.fucsia-title {
					color: #fe375f;
				}

				&.green-title {
					color: #30d38b;
				}

				&.yellow-title {
					color: #da8c0d;
				}
			}

			.numbers-unit {
				@apply text-4xl font-bold;
				@apply flex items-end;

				span {
					@apply text-xs font-normal;
				}
			}
		}
	}

	&__rating {
		@apply flex flex-col items-center;
		@apply mt-8 mb-16;

		h2 {
			@apply font-bold text-xl;
		}
	}

	&__btns {
		@apply w-full;
		@apply grid gap-4;

		@media screen and (min-width:600px) {
			@apply grid-cols-2;
		}
	}
}

.modal-container {
	box-shadow: none !important;
}
</style>
