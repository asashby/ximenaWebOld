<template>
	<div class="app-menu--main-container">
		<MenuItem
			v-for="(m, mIndex) in menu"
			:key="mIndex"
			:menuItem="m"
		/>
	</div>
</template>

<script>
import MenuItem from '~/components/AppMenu/MenuItem'

export default {
	name: 'AppMenu',
	components: { MenuItem },
	props: {
		menu: {
			default: () => [],
			type: Array
		}
	}
}
</script>

<styles lang="scss" scoped>
.app-menu--main-container {
	@apply grid gap-4 items-start justify-center;
	@apply sticky top-16;
	grid-template-columns: repeat(2, 9rem);
	grid-template-rows: repeat(auto-fit, minmax(3rem, 1fr));
}
</styles>
