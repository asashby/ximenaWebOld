<template>
	<v-dialog
		content-class="modal-container"
		:value="value"
	>
		<v-card class="modal--meal-video">
			<v-btn
				class="close-video-modal"
				icon
				@click="this.handleCloseVideoModal"
			>
				<v-icon large>mdi-close</v-icon>
			</v-btn>

			<div class="videoWrapper2">
				<iframe
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					frameborder="0"
					allowfullscreen="allowfullscreen"
					:height="iframeHeight"
					:width="iframeWidth"
					:src="urlVideo"
				></iframe>
			</div>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	name: 'video-modal',
	beforeDestroy () {
		window.removeEventListener('resize', this.iframeDim)
	},
	data: () => ({
		iframeHeight: 0,
		iframeWidth: 0
	}),
	methods: {
		handleCloseVideoModal () {
			this.$emit('close-video-modal')
		},
		iframeDim () {
			const { innerWidth } = window

			if (innerWidth >= 590) {
				this.iframeWidth = `${500}px`
				this.iframeHeight = `${500}px`
			} else if (innerWidth >= 460) {
				this.iframeWidth = `${380}px`
				this.iframeHeight = `${380}px`
			} else {
				this.iframeWidth = `${300}px`
				this.iframeHeight = `${300}px`
			}
		}
	},
	mounted () {
		window.addEventListener('resize', this.iframeDim)
		this.iframeDim()
	},
	props: {
		urlVideo: { default: '', type: String },
		value: null
	}
}
</script>

<style lang="scss" scoped>
.modal-container {
	box-shadow: none !important;

	&.v-dialog {
		@apply pt-8;
	}

	.modal--meal-video {
		@apply mx-auto pt-8;
		@apply relative;
		@apply bg-transparent;
		@apply border-none;
		@apply w-max;

		.close-video-modal {
			@apply absolute;
			@apply w-8 h-8;
			@apply rounded-full;
			@apply bg-gray-light;
			right: -14px;
			top: 12px;

			.theme--light.v-icon {
				@apply text-green-base;
				@apply font-bold;
				font-size: 24px !important;
			}

			@media screen and (min-width:460px) {
				right: -14px;
				top: 12px;
			}

			@media screen and (min-width:768px) {
				@apply w-12 h-12;
				right: -25px;
				top: 0px;

				.theme--light.v-icon {
					font-size: 36px !important;
				}
			}
		}

		.videoWrapper {
			--video--width: 1296;
			--video--height: 540;

			position: relative;
			padding-bottom: calc(var(--video--height) / var(--video--width) * 100%); /* 41.66666667% */
			overflow: hidden;
			max-width: 100%;
			background: black;
			iframe {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
			}
		}
	}
}
</style>
