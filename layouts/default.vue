<template>
  <v-app>
    <div class="default-layout__main">
      <NavBarComponent :hide-menu="isMenuOptions" />
      <div class="default-layout__content-container">
        <Nuxt />
      </div>
    </div>
  </v-app>
</template>

<script>
/* eslint-disable no-tabs */
import NavBarComponent from '~/components/Nav'

function mounted () {
	this.$nextTick(() => {
		this.$nuxt.$loading.start()
		setTimeout(() => this.$nuxt.$loading.finish(), 1000)
	})
}

function isMenuOptions () {
	const matches = this.$route.fullPath.match(/menu-opciones/i)
	const matchesExist = matches ? matches.length > 0 : false
	return matchesExist
}

export default {
	name: 'LayoutDefault',
	components: {
		NavBarComponent
	},
	computed: {
		isMenuOptions
	},
	mounted
}
</script>

<style>
.default-layout__main {
	@apply min-h-screen;
	@apply w-full;
}

</style>
