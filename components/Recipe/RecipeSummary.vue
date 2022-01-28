<template>
	<div class="recipe-summary--container">
		<span v-if="level">Dificultad: {{ level }}</span>
		<h1>{{ title }}</h1>
		<p v-if="summary">{{ summary }}</p>
	</div>
</template>

<script>
export default {
	name: 'RecipeSummary',
	props: {
		level: { default: '', type: String },
		summary: { default: '', type: String },
		title: { default: '', type: String }
	}
}
</script>

<style lang="scss" scoped>
.recipe-summary--container {
	@apply w-full;
	@apply flex flex-col items-center justify-center;
	@apply rounded-3xl;
	@apply bg-black-darkest;
	@apply px-4 py-8;

	span, h1, p {
		@apply text-gray-light font-light text-sm
	}

	h1 {
		@apply font-bold text-center;
		@apply mt-2 mb-6;
		@apply leading-tight;
		font-size: 30px;
	}

	p {
		@apply text-gray-darkest font-normal text-base text-center;
	}
}
</style>
