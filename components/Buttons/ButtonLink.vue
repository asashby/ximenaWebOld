<template>
	<NuxtLink :to="to" class="btn-link--main-container">
		<p>{{ name }}</p>
		<v-icon large>mdi-chevron-right</v-icon>
	</NuxtLink>
</template>

<script>
export default {
	name: 'ButtonLink',
	props: {
		name: {
			default: '',
			type: String
		},
		to: {
			default: '',
			type: String
		}
	}
}
</script>

<style lang="scss" scoped>
.btn-link--main-container {
	@apply bg-gray-darkest;
	@apply text-gray-light;
	@apply rounded-2xl;
	@apply flex items-center justify-between;
	@apply px-4 py-8;

	p {
		@apply mb-0;
		@apply font-bold;
	}
}
</style>
