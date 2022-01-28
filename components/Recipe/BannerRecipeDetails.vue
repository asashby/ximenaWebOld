<template>
	<div class="recipe-banner--container">
		<picture>
			<source
				:srcset="bannerDetailsDesktop"
				media="(min-width:600px)">
			<source
				:srcset="bannerDetailsMobile"
				media="(max-width:600px)">
			<img
				src="~/assets/images/recetas/detalle/banner_movil.jpg"
				class="recipe-banner--container-img"></img>
		</picture>
	</div>
</template>

<script>
export default {
	name: 'BannerRecipeDetails',
	computed: {
		bannerDetailsDesktop () {
			if (this.urlImage) {
				return this.urlImage
			}
			return '~/assets/images/recetas/detalle/banner_desktop.jpg'
		},
		bannerDetailsMobile () {
			if (this.urlImageMobile) {
				return this.urlImageMobile
			}
			return '~/assets/images/recetas/detalle/banner_desktop.jpg'
		}
	},
	props: {
		urlImage: { default: '', type: String },
		urlImageMobile: { default: '', type: String }
	}
}
</script>

<styles lang="scss" scoped>
.recipe-banner--container {
	@apply w-full;
	height: 403px;
	max-height: calc(100vh / 2);

	@media screen and (min-width:768px) {
		height: 223px;
	}

	@media screen and (min-width:1024px) {
		height: 300px;
	}

	@media screen and (min-width:1260px) {
		height: 300px;
	}

	@media screen and (min-width:1440px) {
		height: 420px;
	}

	@media screen and (min-width:1900px) {
		height: 520px;
	}

	@media screen and (min-width:2500px) {
		height: 720px;
	}

	&-img {
		@apply w-full h-full;
		@apply object-cover;
	}
}
</styles>
