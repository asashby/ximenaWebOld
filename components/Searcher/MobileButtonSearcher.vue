<template>
	<div>
		<button
			class="x-searcher--btn__mobile"
			@click="handleClickEvent"
		>
			<v-icon dark>mdi-magnify</v-icon>
		</button>
	</div>
</template>

<script>
export default {
	name: 'MobileButtonSearcher',
	methods: {
		handleClickEvent () {
			this.$emit('click')
		}
	}
}
</script>

<style lang="scss" scoped>
.x-searcher {
	&--btn__mobile {
		@apply bg-green-base;
		@apply rounded-full;
		@apply w-16 h-16;
		@apply z-0;

		@media screen and (min-width: 600px) {
			@apply hidden;
		}
	}
}
</style>
