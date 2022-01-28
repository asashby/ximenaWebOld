<template>
  <div class="principal--main-container">
    <section class="principal-background--container">
      <picture>
        <source
          media="(min-width: 960px)"
          :srcset="bannerImage"
        >
        <source :srcset="bannerMobileImage">
        <img :src="bannerMobileImage" class="principal-background--container-img">
      </picture>

      <div class="principal-background--container-rrss">
        <div class="name-container">
          <span>Sobre</span>
          <h1>Ximena</h1>
          <h1>Hoyos</h1>
        </div>

        <div class="principal-background--container-rrss_components">
          <a :href="facebookLink" target="_blank" class="rrss-component">
            <img src="~/assets/images/ximena/facebook.webp">
          </a>
          <a :href="instagramLink" target="_blank" class="rrss-component">
            <img src="~/assets/images/ximena/instagram.webp">
          </a>
          <a :href="tiktokLink" target="_blank" class="rrss-component">
            <img src="~/assets/images/ximena/tiktok.webp">
          </a>
        </div>
      </div>
    </section>

    <section class="principal-ximena--container">
      <div class="principal-ximena--container-rrss">
        <a :href="facebookLink" target="_blank" class="rrss-component">
          <img src="~/assets/images/ximena/facebook.webp">
        </a>
        <a :href="instagramLink" target="_blank" class="rrss-component">
          <img src="~/assets/images/ximena/instagram.webp">
        </a>
        <a :href="tiktokLink" target="_blank" class="rrss-component">
          <img src="~/assets/images/ximena/tiktok.webp">
        </a>
      </div>

      <div class="principal-ximena--container-name">
        <span>Sobre</span>
        <h1>Ximena</h1>
        <h1>Hoyos</h1>
      </div>

      <div class="principal-ximena--container-summary">
				<div class="principal-ximena--container-summary_content">
					<picture>
						<img :src="ximenaCircular" class="principal-ximena--container-summary_avatar">
					</picture>
				</div>
        <p
          class="principal-ximena--container-summary_personal-info"
          v-html="description"
        />
      </div>
    </section>

    <section class="principal-images--container">
      <img
        v-for="pride in prideImages"
        :key="pride"
        :src="pride"
      >
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getPropertysValue } from 'functionallibrary'

function mounted () {
	this.$nextTick(() => {
		this.$nuxt.$loading.start()
		setTimeout(() => this.$nuxt.$loading.finish(), 1000)
	})
}

function rrssImages () {
	return {
		facebook: '~/assets/images/ximena/facebook.webp',
		instagram: '~/assets/images/ximena/instagram.webp',
		tiktok: '~/assets/images/ximena/tiktok.webp'
	}
}

async function fetch () {
	await this.$store.dispatch('getXimenaData')
}

export default {
	name: 'PaginaSobreXimena',
	layout: 'principalLayout',
	fetch,
	computed: {
		...mapState({
			bannerImage: state => getPropertysValue('ximena.banner', state),
			bannerMobileImage: state => getPropertysValue('ximena.mobile_image', state),
			description: state => getPropertysValue('ximena.description', state),
			facebookLink: state => getPropertysValue('ximena.addittional_info.facebook', state),
			instagramLink: state => getPropertysValue('ximena.addittional_info.instagram', state),
			prideImages: state => getPropertysValue('ximena.galery', state),
			tiktokLink: state => getPropertysValue('ximena.addittional_info.tiktok', state),
			ximenaCircular: state => getPropertysValue('ximena.page_image', state) || require('~/assets/images/ximena/foto_circular.jpg')
		}),
		rrssImages
	},
	mounted
}
</script>

<style lang="scss" scoped>
.principal--main-container {
	@apply pb-4;

	@media screen and (min-width:1024px) {
		@apply mx-auto;
		max-width: $maxWidth;
	}

	.principal-background--container {
		@apply bg-gray-heavy;
		@apply w-full;
		@apply relative;
		@apply overflow-hidden;
		max-height: calc(100vh / 1.85);
		height: 360px;

		@media screen and (min-width:1024px) {
			@apply rounded-2xl;
			height: 210px;
		}

		&-img {
			@apply w-full h-full;
			@apply object-cover object-top;
		}

		&-rrss {
			@apply hidden;

			@media screen and (min-width: 600px) {
				@apply absolute right-0 z-10;
				@apply w-full;
				@apply flex justify-between items-center;
				@apply pr-8 pl-16;
				bottom: 30%;

				.name-container {
					@apply text-gray-light;

					h1 {
						@apply text-2xl font-bold;
					}

				}

				&_components {
					@apply flex;

					.rrss-component {
						@apply rounded w-full h-full;
						margin: 0px -5px;

						img {
							@apply w-full h-full;
						}
					}
				}
			}
		}

	}

	.principal-ximena--container {
		@apply relative;
		@apply pt-16 px-2;
		@apply text-gray-light;
		@apply flex flex-col items-center;

		@media screen and (min-width: 960px) {
			@apply mx-auto pt-2;
			max-width: 632px;
		}

		&-rrss {
			@apply absolute;
			@apply w-full;
			@apply flex items-center justify-center;
			@apply z-10;
			bottom: 96%;

			@media screen and (min-width: 600px) {
				@apply hidden;
			}

			.rrss-component {
				@apply w-16 h-16;
				@apply rounded;
				@apply mx-2;

				img {
					@apply w-full h-full;
				}
			}
		}

		&-name {
			@apply text-center;

			@media screen and (min-width: 960px) {
				@apply hidden;
			}

			h1 {
				@apply text-2xl font-bold;
			}
		}

		&-summary {
			@apply text-center;
			@apply border border-solid border-gray-light;
			@apply pt-8 px-4 pb-4 mt-6 mb-8;
			@apply rounded-2xl;

			&_avatar {
				@apply bg-gray-base;
				@apply w-24 h-24;
				@apply rounded-full;
				@apply object-cover;
				@apply mx-auto mb-6;

				@media screen and (min-width: 960px) {
					@apply w-56 h-56;
				}
			}

			&_personal-info {
				@apply text-gray-heavy;
			}
		}
	}

	.principal-images--container {
		@apply grid gap-2;
		@apply px-2;

		@media screen and (min-width: 600px) {
			@apply grid-cols-2;
		}

		@media screen and (min-width:1024px) {
			@apply mx-auto;
			max-width: 632px;
		}

		img {
			@apply bg-red-base;
			@apply rounded-xl;
			@apply w-full h-40;
		}
	}
}
</style>
