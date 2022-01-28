<template>
  <div class="tip-details--main-container">
    <div class="tip-details--banner-container">
      <picture>
        <source
          :srcset="page_image"
          media="(min-width:600px)"
        >
        <source
          :srcset="page_image"
          media="(min-width:600px)"
        >
        <source
          :srcset="`${page_image} 3x`"
          media="(min-width:600px)"
        >
        <source
          :srcset="`${mobile_image} 2x`"
        >
        <img
          :src="mobile_image"
          class="tip-details--banner-container__img"
        >
      </picture>
	</div>
    <div
      v-if="tipContent"
      class="tip-details--content-container"
      v-html="tipContent"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getPropertysValue } from 'functionallibrary'

async function fetch () {
	const { slugTips } = this.$route.params
	await this.$store.dispatch('tips/getDetails', slugTips)
}

export default {
	name: 'PaginaDetalleTip',
	computed: {
		...mapState('tips', {
			tipContent: state => getPropertysValue('details.content', state),
			title: state => getPropertysValue('details.title', state),
			resume: state => getPropertysValue('details.resume', state),
			page_image: state => getPropertysValue('details.page_image', state),
			mobile_image: state => getPropertysValue('details.mobile_image', state),
			subTitle: state => getPropertysValue('details.subTitle', state)
		})
	},
	fetch
}
</script>

<style lang="scss" scoped>
.tip-details {
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
		@apply text-gray-light text-opacity-50 font-light;
		@apply text-center;
		@apply pt-16 px-4 pb-10;

		table {
			tbody {
				tr {
					display: grid !important;
				}
			}
		}
		@media screen and (min-width: 600px) {
			@apply text-left;
			@apply mx-auto;
			max-width: 860px
		}
	}
}
</style>
