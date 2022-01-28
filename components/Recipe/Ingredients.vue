<template>
	<div class="recipe-ingredients--main-container">
		<h2>Ingredientes</h2>

		<div class="recipe-ingredients--wrapper">
			<div
				v-for="(ingredient, index ) in ingredients"
				:key="index"
				class="recipe-ingredients--wrapper-element"
			>
				<span>{{ ingredient }}</span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Ingredients',
	props: {
		ingredients: {
			default: () => [],
			type: Array
		}
	}
}
</script>

<styles lang="scss" scoped>
.recipe-ingredients--main-container {
	@apply mt-8;
	@apply text-gray-light;

	h2 {
		@apply font-bold text-xl;
		@apply w-full;
		@apply text-left;
		@apply mb-4;
	}

	.recipe-ingredients--wrapper {
		@apply grid gap-4 grid-cols-1;

		@media screen and (min-width:600px) {
			@apply grid-cols-2;
		}

		&-element {
			@apply flex items-center justify-start;
			@apply bg-gray-darkest;
			@apply rounded-xl;
			@apply px-8 py-4;

			span {
				@apply text-gray-light;
			}
		}
	}
}
</styles>
