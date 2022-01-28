<template>
  <div class="profile-my-data--main-container">
    <ProfilePageTitle title="Datos personales" />

    <form class="profile-my-data--main-container__data_wrapper">
      <v-text-field
        v-model="user.name"
        outlined
        hide-details
        class="x-text-field profile-my-data--main-container__data_wrapper-field"
        label="Nombre"
      />
      <v-text-field
        v-model="user.last_name"
        outlined
        hide-details
        class="x-text-field profile-my-data--main-container__data_wrapper-field"
        label="Apellido"
      />
      <v-text-field
        v-model="user.email"
        outlined
        hide-details
        class="x-text-field profile-my-data--main-container__data_wrapper-field"
        label="Correo Electronico"
        readonly
      />
    </form>

    <div class="profile-my-data--main-container__additional_information">
      <div class="profile-my-data--main-container__additional_information--objectives-wrapper">
        <h2>Objetivos</h2>
        <v-radio-group v-model="user.goal" class="x-radio-button-group">
          <v-radio
            v-for="(obj, indObj) in objectives"
            :key="indObj"
            class="mb-4"
            :label="obj.title"
            :value="obj.value"
          />
        </v-radio-group>
      </div>

      <div class="spacer-line" />

      <div class="profile-my-data--main-container__additional_information--additional-info-wrapper">
        <h2>Datos Adicionales</h2>
        <Selector
          v-model="user.addittional_info.age"
          class="mb-4"
          :items="ages"
          label="Edad"
        />
        <Selector
          v-model="user.addittional_info.weight"
          class="mb-4"
          :items="weights"
          label="Peso"
        />
        <Selector
          v-model="user.addittional_info.size"
          class="mb-8"
          :items="sizes"
          label="Talla"
        />
      </div>
    </div>

    <div class="profile-my-data--main-container__btn_wrapper">
      <NuxtLink to="/perfil/">
        <button type="button" class="x-btn x-btn__red profile-my-data--main-container__btn_wrapper-btn">
          Cancelar
        </button>
      </NuxtLink>
      <button
        type="button"
        class="x-btn x-btn__green profile-my-data--main-container__btn_wrapper-btn"
        @click="saveInformation"
      >
        Guardar
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Selector from '~/components/Selector'
import ProfilePageTitle from '~/components/Profile/ProfilePageTitle'

async function saveInformation () {
	await this.$store.dispatch('profile/editUser', this.user)
}

function fetch () {
	this.user.name = this.isUserProfile.name
	this.user.last_name = this.isUserProfile.sur_name
	this.user.email = this.isUserProfile.email
	this.user.goal = this.isAccountData.goal
	this.user.addittional_info.age = this.isAccountData.addittional_info.age
	this.user.addittional_info.size = this.isAccountData.addittional_info.size
	this.user.addittional_info.weight = this.isAccountData.addittional_info.weight
}

function data () {
	return {
		objectives: [
			{ title: 'Sacar Musculo', value: 'muscle' },
			{ title: 'Adelgazar', value: 'slim down' },
			{ title: 'Tonificar', value: 'tone up' }
		],
		user: {
			name: null,
			last_name: null,
			goal: '',
			email: null,
			addittional_info: {
				age: null,
				size: null,
				weight: null
			}
		}
	}
}
export default {
	name: 'PaginaMisDatos',
	components: {
		ProfilePageTitle,
		Selector
	},
	methods: {
		saveInformation
	},
	computed: {
		...mapState({
			ages: state => state.ages,
			sizes: state => state.sizes,
			weights: state => state.weights
		}),
		...mapGetters('profile', [
			'isAccountData',
			'isUserProfile'
		])
	},
	layout: 'profileLayout',
	data,
	fetch
}
</script>

<style lang="scss" scoped>
.profile-my-data--main-container {

	@media screen and (min-width: 600px) {
		@apply mx-auto;
		@apply pb-4;
		max-width: 756px;
	}

	&__data_wrapper {
		@apply pt-8;

		@media screen and (min-width: 600px) {
			@apply grid grid-cols-2 gap-x-8;
		}

		&-field {
			@apply mb-6;

			@media screen and (min-width: 600px) {
				&:last-child {
					@apply col-span-2;
				}
			}
		}
	}

	&__additional_information {
		@apply flex flex-col items-center;
		@apply mb-4;

		@media screen and (min-width: 600px) {
			@apply flex-row justify-center;
		}

		&--objectives-wrapper,
		&--additional-info-wrapper {
			@apply w-full;
			@apply mt-6;

			@media screen and (min-width: 600px) {
				@apply flex flex-col items-center;
			}

			h2 {
				@apply text-gray-light text-lg font-bold;

				@media screen and (min-width: 600px) {
					@apply w-full;
					@apply mb-2;
				}
			}

			.x-radio-button-group {
				@apply w-full;
				max-width: 600px;
			}

			.x-selector {
				@apply w-full;
				max-width: 600px;
			}
		}

		.spacer-line {
			@media screen and (min-width: 600px) {
				@apply bg-gray-heavy bg-opacity-30;
				@apply h-auto;
				@apply my-0 mx-4;
				width: 2px;
			}
		}
	}

	&__btn_wrapper {
		@apply flex items-center justify-between;

		&-btn {
			@apply w-1/2;
			@apply ml-2;
		}

		a {
			@apply w-1/2;

			button {
				@apply w-full;
				@apply mr-2 ml-0;
			}
		}
	}
}
</style>
