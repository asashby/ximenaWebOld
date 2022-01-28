<template>
  <div class="login-main-container">
    <!-- contenedor para imagen de fondo -->
    <div class="login-background-image-container">
      <picture>
        <source
          media="(min-width: 600px)"
          srcset="~/assets/images/login/background-desktop.webp"
        >
        <source
          media="(min-width: 600px)"
          srcset="~/assets/images/login/background-desktop@2x.webp 1.5x"
        >
        <source
          media="(min-width: 600px)"
          srcset="~/assets/images/login/background-desktop@2x.webp 2x"
        >
        <source
          media="(max-width: 599px)"
          srcset="~/assets/images/login/background-desktop@2x.webp 1.5x"
        >
        <source
          media="(max-width: 599px)"
          srcset="~/assets/images/login/background-desktop@3x.webp 2x"
        >
        <img
          class="login-background-image"
          src="~/assets/images/login/background-desktop@2x.webp"
        >
      </picture>
    </div>
    <div class="login-wrapper">
      <picture>
        <img
          class="login-logo"
          src="~/assets/icons/ximena_logo.svg"
          alt="Logo_Ximena_Hoyos"
        >
      </picture>
      <div
        class="login-container-form"
      >
        <div
          class="login-header-title"
        >
          Ingresa con
        </div>

        <div class="rrss-btns--container">
          <FacebookButton />

          <GoogleButton />
        </div>

        <NuxtLink
          to="/perfil/terminos-y-condiciones"
        >
          <p
            class="terms-and-conditions"
          >
            Terminos y Condiciones
          </p>
        </NuxtLink>

        <div class="bottom-bar" />
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-tabs */
import { compose, getPropertysValue, setNewProperty } from 'functionallibrary'
import { mapActions, mapGetters } from 'vuex'
import FacebookButton from '~/components/Buttons/Facebook.button'
import GoogleButton from '~/components/Buttons/Google.button'

export default {
	name: 'PaginaInicioSesion',
	auth: false,
	components: {
		FacebookButton,
		GoogleButton
	},
	layout: 'headless',
	data: () => ({
		userData: {
			name: '',
			last_name: '',
			email: '',
			image: '',
			password: '',
			origin: ''
		}
	}),
	computed: {
		...mapGetters([
			'isGoogle',
			'isFacebook'
		])
	},
	async mounted () {
		// Dejo esto como ayuda para que puedan revisar el objeto con toda la info
		// del provider
		// console.log('AUTH NUXT INFO', this.$auth)
		this.$nextTick(() => {
			this.$nuxt.$loading.start()
		})
		if (this.$auth.$state.loggedIn) {
			this.$router.push('/perfil')
			this.$nextTick(() => {
				this.$nuxt.$loading.finish()
			})
		} else {
			await this.checkLoginWithProviders()
		}
	},
	methods: {
		...mapActions([
			'logout'
		]),
		async checkLoginWithProviders () {
			if (location) {
				const hash = new URLSearchParams(location.hash)
				if (hash && this.isFacebook) {
					await this.loginWithFacebook(hash)
				} else if (hash && this.isGoogle) {
					await this.loginWithGoogle(hash)
				} else {
					this.$nextTick(() => {
						this.$nuxt.$loading.finish()
					})
				}
			} else {
				this.$nextTick(() => {
					this.$nuxt.$loading.finish()
				})
			}
		},
		loginWithFacebook (hash) {
			const facebookToken = hash.get('#access_token')
			if (facebookToken) {
				this.$router.push('/objetivos')
				this.$nextTick(() => {
					this.$nuxt.$loading.finish()
				})
			} else {
				this.$nextTick(() => {
					this.$nuxt.$loading.finish()
				})
				console.log('No hay token de facebook')
			}
		},
		loginWithGoogle () {
			this.$router.push('/objetivos')
			this.$nextTick(() => {
				this.$nuxt.$loading.finish()
			})
		},
		updateUserData (newUserData) {
			if (this.isFacebook) {
				this.userData = this.updateUserDataFromFacebook(newUserData)
			}
		},
		updateUserDataFromFacebook (facebookData) {
			const userImage = getPropertysValue('picture.data.url', facebookData)
			return compose(
				setNewProperty('name', facebookData.name),
				setNewProperty('last_name', facebookData.lastname),
				setNewProperty('password', window.btoa(facebookData.id)),
				setNewProperty('image', userImage),
				setNewProperty('email', facebookData.email),
				setNewProperty('origin', 'Facebook')
			)({})
		}
	}
}
</script>

<style lang="scss">
  .login {
    &-main-container {
      @apply text-gray-light;
      @apply flex;
      @apply px-3;
      @apply h-screen;

      @media screen and (min-width: 600px) {
        @apply items-center justify-center;
      }
    }

	&-background-image-container {
		@apply absolute inset-0 z-0;
	}

	&-background-image {
		@apply w-full h-full;
		@apply object-cover;
	}

	&-wrapper {
		@apply w-full;
		@apply self-end;
		@apply z-10;
		@apply pb-4;
		max-width: 480px;

		@media screen and (min-width: 600px) {
			@apply self-auto;
		}
	}

	&-logo {
		@apply h-16;
		@apply m-auto mb-6;
	}

	&-container-form {
		@apply bg-black-base;
		@apply rounded-3xl;
		@apply pt-10 px-10 pb-8;

		.rrss-btns--container {
			@apply grid gap-4;
		}

		.terms-and-conditions {
			@apply text-center;
			@apply w-full;
			@apply text-gray-heavy;
		}

		.bottom-bar {
			@apply w-32 h-1;
			@apply bg-gray-heavy bg-opacity-25;
			@apply rounded-full;
			@apply mx-auto mt-4;
		}
	}

	&-header-title {
		@apply flex justify-center;
		@apply text-lg font-bold;
		@apply mb-6;
	}
}
</style>
