<template>
	<div class="recipe-component--main-container">

		<NuxtLink :to="`/recetas/${this.slug}`" class="recipe--desktop">
			<div class="recipe--desktop-img">
				<img
					:src="img"
				>
			</div>
			<div class="recipe--desktop-content">
				<h3 class="recipe-category">{{ resume }}</h3>
				<h2 class="recipe-title">{{ titleCutted }}</h2>
			</div>
		</NuxtLink>

		<NuxtLink :to="`/recetas/${this.slug}`" class="recipe--movil">
			<div class="recipe--movil-image">
				<img
					:src="img"
				></img>
			</div>
			<div class="recipe--movil-content">
				<h3 class="recipe-category">{{ resume }}</h3>
				<h2 class="recipe-title">{{ title }}</h2>
			</div>
		</NuxtLink>
	</div>
</template>
<script>
export default {
	name: 'RecipeComponent',
	computed: {
		titleCutted () {
			const long = 55
			const textLen = this.title.length

			if (textLen > long) {
				const cutted = this.title.substr(0, long)
				return `${cutted}...`
			}
			return this.title
		}
	},
	props: {
		id: [String, Number],
		img: { default: '', type: String },
		title: { default: '', type: String },
		resume: { default: '', type: String },
		slug: { default: '', type: String }
	}
}
</script>
<styles lang="scss" scoped>
.recipe-component--main-container {
	.recipe {
		&--desktop {
			@apply hidden;

			@media screen and (min-width:600px) {
				@apply grid gap-4;
				@apply bg-gray-light;
				@apply rounded-2xl;
				@apply w-full;
				@apply overflow-hidden;
				grid-template-rows: 70% 30%;
				height: 18.5rem;

				&-img {
					@apply h-full;
					@apply bg-gray-heavy;

					img {
						@apply w-full h-full;
						@apply overflow-hidden;
						@apply object-cover;
					}
				}

				&-content {
					@apply px-4 pb-4;
					max-height: 69px;

					h3.recipe-category {
						@apply text-sm text-gray-heavy;
					}

					h2.recipe-title {
						@apply text-base text-black-darkest font-bold;
						@apply overflow-hidden;
						@apply h-full;
					}
				}
			}
		}

		&--movil {
			@apply bg-gray-light;
			@apply rounded-2xl;
			@apply h-28;
			@apply grid gap-2;
			@apply overflow-hidden;
			grid-template-columns: 7rem 1fr;

			@media screen and (min-width:600px) {
				@apply hidden;
			}

			&-image {
				@apply bg-gray-heavy;

				img {
					@apply w-full h-full;
					@apply overflow-hidden;
					@apply object-cover;
				}
			}
			&-content {
				@apply flex flex-col items-start justify-center;

				h3 {
					@apply text-sm text-gray-heavy;
				}

				h2 {
					@apply text-base text-black-darkest;
				}
			}
		}
	}
}

</styles>
