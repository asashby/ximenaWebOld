<template>
  <div class="nav--main-container">
    <v-app-bar
      class="nav--main-container__bar"
      flat
      fixed
      elevation="0"
    >
      <picture>
        <img
          class="login-logo"
          src="~/assets/icons/ximena_logo.svg"
          alt="Logo_Ximena_Hoyos"
        >
      </picture>

      <v-spacer />

      <NuxtLink
        v-for="m in menu"
        :key="m.slug"
        class="routes"
        :to="`/${m.route}`"
      >
        {{ m.name }}
      </NuxtLink>

      <a
        class="shopstore"
        target="_blank"
        @click="goToStore"
      >
        Tienda
      </a>

      <v-btn
        icon
      >
        <img src="~/assets/icons/bag.svg">
      </v-btn>

      <v-app-bar-nav-icon
        v-if="!hideMenu"
        class="hamburguer"
        dark
        @click="drawer = true"
      />

      <NuxtLink to="/perfil">
        <img :src="userPhoto" class="user-photo">
      </NuxtLink>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      class="nav--main-container__side-bar"
      fixed
      temporary
      width="95%"
    >
      <AppMenuMovil
        :menu="menu"
        @closeModal="drawer = false"
      />
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import AppMenuMovil from '~/components/AppMenu/AppMenuMovil'

function data () {
	return {
		drawer: false
	}
}
export default {
	name: 'BarraNavegacion',
	components: { AppMenuMovil },
	props: {
		hideMenu: {
			default: false,
			type: Boolean
		}
	},
	data,
	computed: {
		...mapGetters('profile', [
			'userPhoto'
		]),

		...mapState({
			menu: state => state.menu
		})
	},
	methods: {
		goToStore () {
			window.open(`https://tienda.ximehoyos.com/tienda/ximenahoyos?tokenRedirection=${this.$store.state.tokenMaki}`, '_blank')
			// window.location.href =
		}
	}

}
</script>

<style lang="scss">
.nav--main-container {

	&__bar.theme--light.v-app-bar.v-toolbar.v-sheet {
		@apply bg-transparent;

		@media screen and (min-width:800px) {
			@apply bg-gradient-to-b from-gray-900;
		}

		.v-toolbar__content {
			@apply mx-auto;
			max-width: $maxWidth;

			.login-logo {
				height: 24px;
			}
		}
	}

	&__side-bar.theme--light.v-navigation-drawer {
		@apply bg-black-heavy;
		@apply text-gray-light;
		@apply z-20;
	}

	.routes {
		@apply hidden;
		@apply text-gray-light;
		@apply mr-6;

		&.nuxt-link-active {
			@apply text-green-base;
		}

		@media screen and (min-width:800px) {
			@apply inline;
		}
	}

	.shopstore {
		@apply hidden;

		@media screen and (min-width:800px) {
			@apply inline;
			@apply text-green-base;
			@apply border border-solid border-green-base;
			@apply px-2 py-1 mr-4;
		}
	}

	.user-photo {
		@apply hidden;

		@media screen and (min-width:800px) {
			@apply inline;
			@apply w-8 h-8;
			@apply rounded-full;
		}
	}

	.hamburguer {

		@media screen and (min-width:800px) {
			@apply hidden;
		}
	}
}
</style>
