<template>
	<div class="menu-options--main-container">
		<AppMenuMovilTopUserData />
		<AppMenu :menu="menu" />
	</div>
</template>

<script>
import { mapState } from 'vuex'
import AppMenu from '~/components/AppMenu/AppMenu'
import AppMenuMovilTopUserData from '~/components/AppMenu/AppMenuMovilTopUserData'

export default {
	name: 'PantallaMenuOpciones',
	components: { AppMenu, AppMenuMovilTopUserData },
	computed: {
		...mapState({
			menu: state => state.menu
		})
	}
}
</script>

<style lang="scss" scoped>
.menu-options--main-container {
	@apply pt-16;
	@apply grid gap-6;
}
</style>
