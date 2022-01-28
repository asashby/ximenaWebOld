<template>
	<div class="article-details--main-container">

		<div class="article-details--banner-container">
			<picture>
				<source srcset="" >
				<img :src="page_image"  class="article-details--banner-container__img">
			</picture>
			<div class="article-details--banner-container__summary">
				<div class="article-details--banner-container__summary-content">
					<h1 v-if="title">{{title}}</h1>
					<h2 v-if="subTitle">{{subTitle}}</h2>
					<p v-if="resume">{{resume}}</p>
				</div>
			</div>
		</div>

		<div
			class="article-details--content-container"
			v-html="articleContent"
		></div>
	</div>
</template>

<script>

async function fetch () {
	const { id } = this.$route.params
	const response = await this.$http.get(`article/${Number(id)}`)

	this.articleContent = response.data.content
	this.title = response.data.title
	this.resume = response.data.resume
	this.page_image = response.data.page_image
	this.subTitle = response.data.subtitle
}

function data () {
	return {
		articleContent: '',
		page_image: '',
		resume: '',
		subTitle: '',
		title: ''
	}
}

export default {
	name: 'PaginaDetalleArticulo',
	data,
	fetch
}
</script>

<style lang="scss" scoped>
.article-details {
	&--main-container {}

	&--banner-container {
		@apply relative;
		max-height: calc(100vh / 2);
		height: 404px;

		&__img {
			@apply w-full h-full;
			@apply object-cover;
		}

		&__summary {
			@apply flex items-center justify-center;
			@apply absolute;
			@apply w-full;
			top: 70%;

			&-content {
				@apply text-gray-light;
				@apply w-11/12;
				@apply bg-black-darkest;
				@apply rounded-3xl;
				@apply py-8 px-6;
				@apply flex flex-col items-center justify-start;
				max-width: 690px;

				h1 {
					@apply font-black text-3xl;
					@apply text-center;
					@apply mb-6 mt-2;
				}

				p {
					@apply text-gray-light text-opacity-50;
					@apply text-center;
				}
			}
		}
	}

	&--content-container {
		@apply text-gray-light text-opacity-50;
		@apply text-center;
		@apply pt-48 px-4 pb-10;
		@apply grid gap-8;

		@media screen and (min-width: 600px) {
			@apply grid-cols-2;

			p:nth-child(3n) {
				@apply text-left;
			}
		}
	}
}
</style>
