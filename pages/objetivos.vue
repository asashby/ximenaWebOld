<template>
  <div class="objectives-main-container">
    <!-- contenedor para imagen de fondo -->
    <div class="objectives-background-image-container">
      <picture>
        <source
          media="(min-width: 600px)"
          srcset="~/assets/images/objetivos/background-desktop.jpg"
        >
        <source
          media="(min-width: 600px)"
          srcset="~/assets/images/objetivos/background-desktop@2x.jpg 1.5x"
        >
        <source
          media="(min-width: 600px)"
          srcset="~/assets/images/objetivos/background-desktop@3x.jpg 2x"
        >
        <source
          media="(max-width: 599px)"
          srcset="~/assets/images/objetivos/background-mobile@2x.jpg 1.5x"
        >
        <source
          media="(max-width: 599px)"
          srcset="~/assets/images/objetivos/background-mobile@3x.jpg 2x"
        >
        <img
          class="objectives-background-image"
          src="~/assets/images/objetivos/background-mobile.jpg"
        >
      </picture>
    </div>
    <div class="objectives-wrapper">
      <picture>
        <img
          class="objectives-logo"
          src="~/assets/icons/ximena_logo.svg"
          alt="Logo_Ximena_Hoyos"
        >
      </picture>
      <div
        class="objectives-container-form"
      >
        <div
          class="objectives-container-form__header-title"
        >
          <p class="mb-0">
            Hola {{ userName }}
          </p>
          <p class="mb-0">
            ¿Cuales son tus objetivos?
          </p>
        </div>

        <form class="objectives-container-form__wrapper-form">
          <div class="objective">
            <h3 class="objective-title">
              Objetivo
            </h3>
            <v-radio-group
              v-model="model.selectedObjective"
              class="x-radio-button-group"
            >
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

          <div class="additional-information">
            <h3 class="additional-information-title">
              Datos adicionales
            </h3>
            <Selector
              v-model="model.age"
              class="mb-4"
              :items="ages"
              label="Edad"
            />
            <Selector
              v-model="model.weight"
              class="mb-4"
              :items="weights"
              label="Peso"
            />
            <Selector
              v-model="model.size"
              class="mb-8"
              :items="sizes"
              label="Talla"
            />
          </div>
        </form>

        <div class="objectives-container-form__btn-container">
          <button
            :disabled="invalidForm"
            type="button"
            class="x-btn x-btn__green"
            @click="saveObjectives"
          >
            Listo para empezar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import Selector from '~/components/Selector'

function mounted () {
	this.$nextTick(() => {
		this.$nuxt.$loading.start()
	})
	if (this.$auth.$state.loggedIn) {
		this.loginLocal(this.$auth.$state)
	} else {
		this.$nextTick(() => {
			setTimeout(() => this.$nuxt.$loading.finish(), 1000)
		})
	}
}

async function loginLocal ({ user, strategy }) {
	const {
		email,
		family_name: googleLastName,
		first_name: name,
		given_name: googleName,
		id,
		last_name: lastName,
		sub
	} = user
	const body = {
		email,
		last_name: googleLastName || lastName,
		name: googleName || name,
		origin: strategy,
		password: sub ? window.btoa(sub) : window.btoa(id)
	}
	const { data: response } = await this.$http.post('login-social', body)
	const { token, tokenMaki, user: userResponse } = response
	this.$store.$auth.strategies.local.token.set(token)
	this.$store.dispatch('setTokenMaki', tokenMaki)
	if (userResponse) {
		const { addittional_info: additionalInfo } = userResponse
		if (additionalInfo) {
			const { age, size, weight } = additionalInfo
			if (age && size && weight) {
				this.reditectTo()
			}
		}
	}
	this.$nextTick(() => {
		this.$nuxt.$loading.finish()
	})
}

async function saveObjectives () {
	await this.$store.dispatch('profile/updateObjectives', this.model)
	this.reditectTo()
}

function reditectTo () {
	if (window.innerWidth < 1024) {
		this.$router.push('/perfil')
	} else {
		this.$router.push('/perfil')
	}
}

function invalidForm () {
	return [
		this.model.age,
		this.model.selectedObjective,
		this.model.size,
		this.model.weight
	].some(item => !item)
}

function data () {
	return {
		model: {
			age: null,
			selectedObjective: '',
			size: null,
			weight: null
		},
		objectives: [
			{ title: 'Sacar Musculo', value: 'muscle' },
			{ title: 'Adelgazar', value: 'slim down' },
			{ title: 'Tonificar', value: 'tone up' }
		]
	}
}

export default {
	name: 'PaginaObjetivos',
	components: {
		Selector
	},
	layout: 'headless',
	data,
	computed: {
		...mapState({
			ages: state => state.ages,
			sizes: state => state.sizes,
			weights: state => state.weights
		}),
		...mapGetters('profile', [
			'userName'
		]),
		invalidForm
	},
	mounted,
	methods: {
		loginLocal,
		reditectTo,
		saveObjectives
	}
}
</script>

<style lang="scss">
.objectives {
	&-main-container {
		@apply text-gray-light;
		@apply flex;
		@apply px-3;

		@media screen and (min-width: 600px) {
			@apply items-center justify-center;
			@apply min-h-screen;
		}
	}

	&-background-image-container {
		@apply absolute top-0 left-0 z-0;
		@apply h-full;

		@media screen and (min-width: 600px) {
			@apply h-full;
		}
	}

	&-background-image {
		@apply w-full h-full;
		@apply object-fill;

		@media screen and (min-width: 600px) {
			@apply object-cover;
		}
	}

	&-wrapper {
		@apply w-full;
		@apply self-end;
		@apply z-10;
		@apply pb-4 mt-8;
		max-width: 880px;

		@media screen and (min-width: 600px) {
			@apply self-auto;
		}
	}

	&-logo {
		@apply h-16;
		@apply m-auto mb-6;
	}

	&-container-form {
		@apply bg-black-base bg-opacity-80;
		@apply rounded-3xl;
		@apply pt-10 px-10 pb-8;

		&__header-title {
			@apply text-lg font-bold;
			@apply mb-6;

			& p {
				@apply text-center text-base;
			}

			& p:last-child {
				@apply font-bold text-lg;
			}
		}

		&__wrapper-form {
			@apply text-gray-light;
			@apply flex flex-col;
			max-width: 825px;

			@media screen and (min-width: 600px) {
				@apply flex-row justify-center;
				@apply mb-8;
			}

			.objective {
				&-title {
					@apply text-lg font-bold;
					@apply mb-4;
				}
			}

			.additional-information {
				&-title {
					@apply text-lg font-bold;
					@apply mb-4;
				}
			}

			.spacer-line {
				@apply w-full;
				@apply bg-gray-heavy bg-opacity-30;
				@apply my-4;
				height: 2px;

				@media screen and (min-width: 600px) {
					@apply h-auto;
					@apply my-0 mx-4;
					width: 2px;
				}
			}
		}

		&__btn-container {
			@apply w-full;
			@apply flex justify-center items-center;
		}
	}

}
</style>
