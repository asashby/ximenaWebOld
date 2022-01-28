<template>
  <div class="perfil--main-container">
    <div class="perfil--main-container__data-avatar">
      <picture>
        <source>
        <img :src="userPhoto" class="perfil--main-container__data-avatar_img">
      </picture>

      <h1 class="perfil--main-container__data-welcome">
        <span>Hola</span>
        <span>
          {{ userName }}, Bienvenid@
        </span>
      </h1>
    </div>

    <div class="perfil--main-container__data-links-container">
      <ButtonLink
        v-for="(profile, profileIndex) in profilePages"
        :key="profileIndex"
        :to="profile.route"
        :name="profile.name"
      />
    </div>

    <div class="perfil--main-container__logout">
      <v-btn
        class="perfil--main-container__logout_btn"
        tile
        @click="handleClickOnLogout"
      >
        <v-icon left>
          mdi-logout
        </v-icon>
        Cerrar sesion
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ButtonLink from '~/components/Buttons/ButtonLink'

async function handleClickOnLogout () {
	await this.$store.dispatch('logout', this.$auth)
}

function data () {
	return {
		profilePages: [
			{ route: '/perfil/mis-datos', name: 'Datos personales' },
			{ route: '/perfil/mis-direcciones', name: 'Mis Direcciones' },
			{ route: '/perfil/mis-pedidos', name: 'Mis pedidos' },
			{ route: '/perfil/terminos-y-condiciones', name: 'Terminos y condiciones' },
			{ route: '/perfil/politicas-de-privacidad', name: 'Politicas de privacidad' }
		]
	}
}

export default {
	name: 'PaginaPerfil',
	components: {
		ButtonLink
	},
	layout: 'profileLayout',
	data,
	computed: {
		...mapGetters('profile', [
			'userPhoto',
			'userName'
		])
	},
	methods: {
		handleClickOnLogout
	}
}
</script>

<style lang="scss" scoped>
.perfil {

	&--main-container {

		&__data-avatar {
			@apply w-full;
			@apply flex flex-col items-center justify-center;
			@apply mb-4;

			@media screen and (min-width: 600px) {
				@apply flex-row justify-start;
				@apply pl-8;
			}

			&_img {
				@apply border-2 border-solid border-gray-light;
				@apply w-28 h-28;
				@apply rounded-full;
			}
		}

		&__data-welcome {
			@apply text-gray-light text-center text-2xl;
			@apply mt-4;

			@media screen and (min-width: 600px) {
				@apply mt-0 ml-6;
				@apply text-3xl;
				@apply flex flex-col items-start;

				& span:first-child {
					@apply font-bold;
				}

				& span:last-child {
					@apply text-2xl;
					@apply text-gray-heavy;
				}
			}
		}

		&__data-links-container {
			@apply grid gap-4;
			@apply mt-10 px-4 pb-4;

			@media screen and (min-width: 600px) {
				@apply grid-cols-2 gap-x-8;
			}
		}

		&__logout {
			@apply flex justify-end items-center;
			@apply pb-2;

			@media screen and (min-width: 600px) {
				@apply absolute bottom-0 right-0;
				@apply p-4;
			}

			&_btn.v-btn {
				@apply text-green-base;
				@apply bg-black-heavy;
			}
		}
	}

}
</style>
