<template>
  <div class="challenges--main-container">
    <div class="challenges--banner-container">
      <BannerChallenges />

      <div class="challenges--banner-container__search">
        <MobileButtonSearcher @click="openMovileSearchOnChallenges = true" />
        <SearcherField
          class="challenges--banner-container__search_desktop"
          @enter="searchChallenge"
        />
      </div>
    </div>

    <div class="my-challenges--items-container">
      <h2>{{ title }}</h2>

      <div v-if="existMyChallenges" class="my-challenges--items-container__wrapper">
        <ChallengeComponent
          v-for="challenge in myChallenges"
          :key="challenge.id"
          :img="challenge.url_image"
          :title="challenge.title"
          :description="challenge.description"
          :route="challenge.slug"
        />
      </div>
    </div>

    <div v-if="existMyChallenges" class="see-more--btn-container">
      <button
        type="button"
        class="x-btn x-btn__green"
        @click="handleSeeMoreMyChallenges"
      >
        Ver mas +
      </button>
    </div>

    <div v-if="existChallenges" class="all-challenges--items-container">
      <h2>Todos</h2>

      <div class="all-challenges--items-container__wrapper">
        <ChallengeComponent
          v-for="challenge in challenges"
          :key="challenge.id"
          :img="challenge.url_image"
          :title="challenge.title"
          :description="challenge.description"
          :route="challenge.slug"
        />
      </div>
    </div>

    <div v-if="existChallenges && challenges.length > 4" class="see-more--btn-container">
      <button
        class="x-btn x-btn__green"
        @click="handleSeeMoreChallenges"
      >
        Ver mas +
      </button>
    </div>

    <v-navigation-drawer
      v-model="openMovileSearchOnChallenges"
      class="challenges--sidebar-movil"
      absolute
      temporary
      width="90%"
    >
      <div class="challenges--sidebar-movil__search-container">
        <SearcherField
          @enter="searchChallenge"
        />
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { getPropertysValue, isNotEmpty } from 'functionallibrary'
import { mapState } from 'vuex'
import MobileButtonSearcher from '~/components/Searcher/MobileButtonSearcher'
import SearcherField from '~/components/Searcher/SearcherField'
import { ChallengeComponent, BannerChallenges } from '~/components/Challenges'

function mounted () {
	this.$nextTick(() => {
		const body = document.getElementsByTagName('body')[0]
		body.style = 'height: 100vh; overflow: hidden'
		this.$nuxt.$loading.start()
		setTimeout(() => {
			this.$nuxt.$loading.finish()
			body.style = ''
		}, 1000)
	})
}

async function searchChallenge (searchValue) {
	const value = searchValue ? searchValue.trim() : null
	await this.$store.dispatch('challenges/setSearch', value)
}

async function handleSeeMoreChallenges () {
	this.$store.dispatch('challenges/changePage')
	await this.$store.dispatch('challenges/getChallenges')
}

async function handleSeeMoreMyChallenges () {
	this.$store.dispatch('challenges/changePageMyChallenges')
	await this.$store.dispatch('challenges/getMyChallenges')
}

async function fetch () {
	await Promise.all([
		this.$store.dispatch('challenges/getMyChallenges'),
		this.$store.dispatch('challenges/getChallenges', true)
	])
}

function data () {
	return {
		openMovileSearchOnChallenges: false
	}
}

export default {
	name: 'PaginaDeRetos',
	components: {
		BannerChallenges,
		ChallengeComponent,
		MobileButtonSearcher,
		SearcherField
	},
	data,
	fetch,
	computed: {
		...mapState('challenges', {
			challenges: state => state.challenges,
			challengesBanner: state => getPropertysValue('challengesDataPage.page_image', state),
			description: state => getPropertysValue('challengesDataPage.description', state),
			existChallenges: state => isNotEmpty(state.challenges),
			existMyChallenges: state => isNotEmpty(state.myChallenges),
			myChallenges: state => state.myChallenges,
			title: state => getPropertysValue('challengesDataPage.name', state)
		})
	},
	mounted,
	methods: {
		handleSeeMoreChallenges,
		handleSeeMoreMyChallenges,
		searchChallenge
	}
}
</script>

<styles lang="scss" scoped>
.challenges--main-container {

	.challenges {
		&--banner-container {
			@apply relative;
			height: 490px;
			max-height: calc(100vh / 2);

			&__search {
				top: 90%;
				@apply absolute;
				@apply flex items-center justify-center;
				@apply w-full;
				@apply px-3;

				&_desktop {
					@apply hidden;

					@media screen and (min-width: 600px) {
						@apply flex;
					}
				}
			}
		}

		&--sidebar-movil {}
		&--sidebar-movil__search-container {}
	}

	.my-challenges--items-container,
	.all-challenges--items-container {
		@apply grid;
		@apply pt-16 pb-6 px-2 mx-auto;
		max-width: $maxWidth;

		h2 {
			@apply text-gray-light font-bold text-lg;
			@apply mb-4;
		}
		&__wrapper {
			@apply flex;
			@apply w-full;
			@apply whitespace-nowrap overflow-auto;

			@media screen and (min-width:600px) {
				@apply grid gap-8;
				grid-template-columns: repeat(auto-fit, minmax($dimTarjetaRetos, 1fr));
			}
		}
	}
}
</styles>
