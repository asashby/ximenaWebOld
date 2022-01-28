<template>
	<v-app>
		<NavBarComponent />
		<div class="profile-layout--main-container">
			<aside class="profile-layout--main-container__aside">
				<AppMenu :menu="menu"/>
			</aside>
			<div class="profile-layout--main-container__content">
				<Nuxt />
			</div>
		</div>
	</v-app>
</template>

<script>
import { mapState } from 'vuex'
import AppMenu from '~/components/AppMenu/AppMenu'
import NavBarComponent from '~/components/Nav'

export default {
	name: 'ProfileLayout',
	components: { AppMenu, NavBarComponent },
	computed: {
		...mapState({
			menu: state => state.menu
		})
	}
}
</script>

<style lang="scss" scoped>
#__layout {

	.v-application.theme--light {
		@apply bg-black-heavy;
	}
}

.profile-layout--main-container {
	@apply pt-20;
	@apply grid;

	@media screen and (min-width: 1024px) {
		@apply gap-x-8;
		@apply h-full;
		grid-template-columns: 360px 1fr;
	}

	&__aside {
		@apply hidden;

		@media screen and (min-width: 1024px) {
			@apply block;
			@apply bg-black-darkest;
			@apply rounded-r-3xl;
			@apply pt-12;
		}
	}

	&__content {
		@apply px-6;

		@media screen and (min-width: 1024px) {
			@apply pb-8 pr-6 pl-0;
		}
	}
}
</style>
