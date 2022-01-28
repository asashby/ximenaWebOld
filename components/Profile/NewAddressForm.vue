<template>
	<div class="profile--new-address">
		<form class="profile--new-address-form">
			<v-text-field
				outlined
				hide-details
				class="x-text-field"
				label="Alias"
				v-model="newAddress.alias"
			></v-text-field>

			<v-text-field
				outlined
				hide-details
				class="x-text-field"
				label="Direccion"
				v-model="newAddress.address"
			></v-text-field>

			<v-text-field
				outlined
				hide-details
				class="x-text-field"
				label="Nro"
				v-model="newAddress.nro"
			></v-text-field>

			<Selector
				class="mb-4"
				:items="provinces"
				itemText="name"
				label="Provincias"
				v-model="newAddress.provinceId"
			></Selector>

			<Selector
				class="mb-4"
				:items="districts"
				itemText="name"
				label="Distrito"
				v-model="newAddress.parishId"
			></Selector>
			<button
				type="button"
				class="add--new-adress-btn"
			>
				<span>+</span>
				<span>Agregar</span>
			</button>
		</form>

		<div class="profile--new-address__action-btn--container">
			<button
				type="button"
				class="x-btn x-btn__red"
				@click="handleCancelClick"
			>Cancelar</button>
			<button
				type="button"
				class="x-btn x-btn__green"
			>Guardar</button>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
	computed: {
		...mapState({
			provinces: state => state.ubigeo.provinces,
			districts: state => state.ubigeo.districts
		})
	},
	data: () => ({
		newAddress: {
			address: '',
			alias: '',
			nro: '',
			parishId: null,
			provinceId: null
		}
	}),
	methods: {
		handleCancelClick () {
			this.$emit('close-modal')
		}
	}
}
</script>

<style lang="scss" scoped>
.profile--new-address {
	&-form {
		@apply grid gap-4;
		@apply mt-8;

		@media screen and (min-width: 600px) {
			grid-template-columns: 1fr 1fr 1fr;

			.x-selector {
				max-width: 1000px !important;
			}
		}

		@media screen and (min-width: 768px) {
			grid-template-columns: 1fr 1fr 0.5fr;
		}

		.add--new-adress-btn {
			@apply hidden;

			@media screen and (min-width: 600px) {
				@apply block;
				@apply bg-gray-heavy;
				@apply text-gray-light font-bold text-lg;
				@apply h-16;
				@apply rounded-lg;

				& span:last-child {
					@apply hidden;
				}
			}

			@media screen and (min-width: 768px) {
				& span:last-child {
					@apply inline;
				}
			}
		}
	}

	&__action-btn--container {
		@apply flex items-center justify-between;
		@apply w-full;
		@apply px-4;
		@apply absolute bottom-0 left-0;

		@media screen and (min-width: 600px) {
			@apply hidden;
		}

		button {
			@apply w-1/2;

			&:first-child {
				@apply mr-2;
			}

			&:last-child {
				@apply ml-2;
			}
		}
	}
}
</style>
