<template>
  <div class="recipe-preparation--main-container">
    <h2>Preparación</h2>

    <div class="recipe-preparation--container-content">
      <button
        v-if="video"
        class="video-container"
        @click="handleClickOnVideoBtn"
      >
        <div class="video-container--icon">
          <img
            :src="playButton"
          ></img>
        </div>
        <div class="video-container--content">
          <label>¿Como hacerlo?</label>
          <h3>Aqui te lo mostramos</h3>
        </div>
      </button>

      <div class="steps-container">
        <div
          v-for="(step, stepIndex) in steps"
          :key="stepIndex"
          class="steps-container--element"
        >
          <label>Paso {{ step.step }}</label>
          <p>{{ step.description }}</p>
        </div>
      </div>
    </div>

    <VideoModal
      v-if="video"
      :value="openVideo"
      :url-video="video"
      @close-video-modal="closeVideoModal"
    />
  </div>
</template>

<script>
import VideoModal from '~/components/Modal/VideoModal'

export default {
	components: { VideoModal },
	props: {
		steps: {
			default: () => [],
			type: Array
		},
		video: {
			default: '',
			type: String
		}
	},
	data: () => ({
		openVideo: false
	}),
	computed: {
		playButton () {
			return require('~/assets/images/recetas/detalle/play_btn.svg')
		}
	},
	methods: {
		handleClickOnVideoBtn () {
			this.openVideo = true
		},
		closeVideoModal () {
			this.openVideo = false
		}
	}
}
</script>

<styles lang="scss" scoped>
.recipe-preparation--main-container {
	@apply mt-8;
	@apply text-gray-light;

	h2 {
		@apply font-bold text-xl;
		@apply w-full;
		@apply text-left;
		@apply mb-4;
	}

	.recipe-preparation--container-content {
		.video-container {
			@apply w-full;
			@apply bg-gray-light;
			@apply rounded-lg;
			@apply pl-6 pr-3 py-5 mb-4;
			@apply grid gap-4 items-center;
			grid-template-columns: 3rem 1fr;

			&--content {
				@apply text-left;

				label {
					@apply text-sm text-gray-heavy font-bold;
				}

				h3 {
					@apply text-black-heavy;
				}
			}
		}

		.steps-container {
			@apply grid gap-4;

			&--element {
				@apply bg-gray-darkest;
				@apply px-8 pt-8 pb-4;
				@apply rounded-lg;

				@media screen and (min-width:600px) {
					@apply px-16;
				}

				label {
					@apply text-sm text-gray-heavy font-normal;
				}
			}
		}
	}
}
</styles>
