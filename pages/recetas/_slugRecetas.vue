<template>
	<div class="recipe-details--main-container">
		<BannerRecipeDetails
			:urlImage="urlBanner"
			:urlImageMobile="urlBannerMobile"
		/>

		<div v-if="noRecipe" class="flex items-center justify-center pt-16 px-4 h-64">
			<h1
				class="text-gray-heavy font-bold text-6xl"
			>Receta no encontrada :(</h1>
		</div>

		<div v-else class="recipe-details--content-container">

			<div class="recipe-details--content-container__summary">
				<RecipeSummary
					:level="level"
					:title="title"
					:summary="summary"
				/>

			</div>

			<picture>
				<source v-if="mealImage" :srcset="mealImage">
				<img v-if="mealImage" :src="mealImage" class="recipe-details--content-container__img">
			</picture>

			<NutritionalsFacts
				v-if="nutritionalFacts && nutritionalFacts.length > 0"
				:nutritional-facts="nutritionalFacts"
			/>

			<Ingredients
				v-if="ingredients && ingredients.length > 0"
				:ingredients="ingredients"
			/>

			<Preparation
				:steps="steps"
				:video="url_video"
			/>

		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import { isEmpty, getPropertysValue } from 'functionallibrary'
import Preparation from '~/components/Recipe/Preparation'
import RecipeSummary from '~/components/Recipe/RecipeSummary'
import Ingredients from '~/components/Recipe/Ingredients'
import BannerRecipeDetails from '~/components/Recipe/BannerRecipeDetails'
import NutritionalsFacts from '~/components/Recipe/NutritionalsFacts'

async function fetch () {
	const { slugRecetas } = this.$route.params
	await this.$store.dispatch('recipes/getDetails', slugRecetas)
}

export default {
	name: 'PaginaDetalleReceta',
	components: {
		BannerRecipeDetails,
		Ingredients,
		NutritionalsFacts,
		Preparation,
		RecipeSummary
	},
	computed: {
		...mapState('recipes', {
			ingredients: state => getPropertysValue('details.ingredients', state),
			level: state => getPropertysValue('details.dificult', state),
			noRecipe: state => isEmpty(state.details),
			nutritionalFacts: state => getPropertysValue('details.nutritional_facts', state),
			steps: state => getPropertysValue('details.steps', state),
			summary: state => getPropertysValue('details.description', state),
			title: state => getPropertysValue('details.title', state),
			urlBanner: state => getPropertysValue('details.page_image', state),
			mealImage: state => getPropertysValue('details.image_content', state),
			url_video: state => getPropertysValue('details.url_video', state),
			urlBannerMobile: state => getPropertysValue('details.mobile_image', state)
		})
	},
	fetch
}
</script>
<styles lang="scss" scoped>
.recipe-details--main-container {
	@apply pb-8;

	.recipe-details {
		&--content-container {
			@apply relative;
			@apply w-full;
			@apply mx-auto px-4;
			max-width: 600px;

			&__summary {
				@apply transform -translate-y-1/3;
				@apply flex items-center justify-center;
				@apply mx-auto;
				max-width: 691px;

				@media screen and (min-width:600px) {
					@apply transform -translate-y-8;
				}
			}

			&__img {
				@apply rounded-2xl;
				@apply w-full;
				@apply object-cover;
				max-height: 160px;

				@media screen and (min-width:600px) {
					max-height: 276px;
				}
			}
		}
	}
}
</styles>
