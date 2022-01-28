<template>
  <div class="articulos">
    <div class="articulos--banner-container">
      <div class="articulos--banner-container__title">
        <h1>{{ title }}</h1>
        <div v-html="description" />
      </div>

      <div class="articulos--banner-container__image">
        <picture>
          <source>
          <img
            class="articulos--banner-container__image-img"
            src=""
            alt="imagen banner de articulos"
          >
        </picture>
      </div>

      <div class="articulos--banner-container__search">
        <MobileButtonSearcher @click="openMobileSearch = true" />
        <SearcherField class="articulos--banner-container__search_desktop" />
      </div>
    </div>

    <div class="articulos--content-container">
      <ArticleComponent
        v-for="(article, artclIndex) in articles"
        :id="article.id"
        :key="artclIndex"
        class="articulos--content-container__articulo"
        :img="article.page_image"
        :img-mobile="article.mobile_image"
        :title="article.title"
      />
    </div>

    <div class="articulos--content-btn__see-more">
      <button class="x-btn x-btn__green">
        Ver mas +
      </button>
    </div>

    <v-navigation-drawer
      v-model="openMobileSearch"
      class="articulos--sidebar-mobile"
      absolute
      temporary
      width="90%"
    >
      <div class="articulos--sidebar-mobile__search-container">
        <SearcherField />
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script>
import MobileButtonSearcher from '~/components/Searcher/MobileButtonSearcher'
import SearcherField from '~/components/Searcher/SearcherField'
import ArticleComponent from '~/components/Article'

async function fetch () {
	const response = await Promise.all([
		this.$http.get('section/articulos'),
		this.$http.get('sections/articulos/articles')
	])

	this.title = response[0].data.name
	this.description = response[0].data.description
	this.articles = response[1].data.data
}

function data () {
	return {
		articles: [
			{ img: 'https://concepto.de/wp-content/uploads/2015/03/paisaje-e1549600034372.jpg', title: 'Titulo 1' },
			{ img: 'https://concepto.de/wp-content/uploads/2015/03/paisaje-e1549600034372.jpg', title: 'Titulo 2' },
			{ img: 'https://concepto.de/wp-content/uploads/2015/03/paisaje-e1549600034372.jpg', title: 'Titulo 3' },
			{ img: 'https://concepto.de/wp-content/uploads/2015/03/paisaje-e1549600034372.jpg', title: 'Titulo 4' },
			{ img: 'https://concepto.de/wp-content/uploads/2015/03/paisaje-e1549600034372.jpg', title: 'Titulo 5' }
		],
		description: '',
		openMobileSearch: false,
		title: ''
	}
}

export default {
	name: 'PaginaArticulos',
	components: {
		ArticleComponent,
		MobileButtonSearcher,
		SearcherField
	},
	data,
	fetch
}
</script>

<style lang="scss" scoped>
.articulos {

	&--banner-container {
		@apply relative;
		height: 490px;
		max-height: calc(100vh / 2);

		&__title {
			@apply flex items-center justify-center flex-col;
			@apply w-full h-full;

			@media screen and (min-width: 600px) {
				@apply items-start;
				@apply pl-16;
			}

			h1 {
				@apply text-gray-light;
				@apply z-10;
				@apply font-black text-5xl;
			}

			div {
				@apply mt-2;
				@apply text-gray-base;
				@apply text-opacity-60;
			}
		}

		&__image {
			@apply absolute inset-0;
			@apply z-0;

			&-img {
				@apply w-full h-full;
			}
		}
		&__search {
			top: 90%;
			@apply absolute;
			@apply flex items-center justify-center;
			@apply w-full;
			@apply z-10;
			@apply px-3;

			&_desktop {
				@apply hidden;

				@media screen and (min-width: 600px) {
					@apply flex;
				}
			}
		}
	}

	&--content-container {
		@apply pt-32 pb-20 px-4;

		&__articulo {
				@apply mb-8;

				&:last-child {
					@apply mb-0;
				}
		}

		@media screen and (min-width: 600px) {
			@apply grid gap-4;
			@apply items-start;
			grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr));

			&__articulo {
					@apply mr-0 mb-0;
			}
		}
	}

	&--content-btn__see-more {
		@apply w-full;
		@apply flex items-center justify-center;
		@apply pb-10;
	}

	&--sidebar-mobile {
		@apply bg-black-heavy;

		@media screen and (min-width: 600px) {
			@apply hidden;
		}

		&__search-container {
			@apply pt-10 px-2;
		}
	}
}
</style>
