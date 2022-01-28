<template>
	<v-dialog
		:value="value"
		content-class="modal-container"
	>
		<div class="modal--comment-list">
			<div class="modal--comment-list__container">
				<div class="modal--comment-list__close">
					<button
						type="button"
						@click="closeModal"
					>
						<v-icon large>mdi-close</v-icon>
					</button>
				</div>
				<h2 class="modal--comment-list__title">Comentario</h2>
				<div class="modal__content-btn">
					<div>
						<v-rating
							empty-icon="mdi-star-outline"
							full-icon="mdi-star"
							half-icon="mdi-star-halfFull"
							length="5"
							color="orange"
							background-color="orange lighten-3"
							size="36"
							:value="0"
						></v-rating>
					</div>
					<button class="x-btn x-btn__green">Enviar Comentario</button>
				</div>
			</div>
			<div class="modal--comment-list__content-comments">
				<div
					v-for="c in comments"
					:key="c.id"
					class="modal--comment-list__content-comment"
				>
					<div>
						<v-rating
							empty-icon="mdi-star-outline"
							full-icon="mdi-star"
							half-icon="mdi-star-halfFull"
							length="5"
							color="orange"
							background-color="orange lighten-3"
							size="26"
							:value="3"
						></v-rating>
					</div>
					<h3>{{ c.title }}</h3>
					<p>{{ c.text }}</p>
				</div>
			</div>
		</div>
	</v-dialog>
</template>

<script>
export default {
	name: 'comment-list',
	data: () => ({
		comments: [
			{ id: 1, title: 'Ipsum loren', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
			{ id: 2, title: 'Ipsum loren', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
			{ id: 3, title: 'Ipsum loren', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
			{ id: 4, title: 'Ipsum loren', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' }
		]
	}),
	methods: {
		closeModal () {
			this.$emit('close-modal')
		}
	},
	props: {
		value: null
	}
}
</script>

<style lang="scss" scoped>
.modal--comment-list {
	@apply bg-gray-light;
	@apply rounded-3xl;
	@apply mx-auto;
	max-width: 600px;

	&__close {
		@apply flex items-center justify-end;
		@apply mb-4;

		.theme--light.v-icon {
			@apply text-green-base;
			@apply text-6xl;
		}
	}

	&__title {
		color: white;
		@apply font-bold text-3xl;
		@apply mb-3;
	}

	&__summary {
		@apply grid gap-4 grid-cols-2;

		@media screen and (min-width:600px) {
			@apply grid-cols-4
		}

		&-card {
			@apply bg-gray-heavy bg-opacity-50;
			@apply rounded-2xl;
			@apply p-4;
			@apply flex flex-col items-start justify-center;

			.title-data {
				@apply font-bold text-sm;
				@apply mb-4;

				&.orange-title {
					color: #fe5712;
				}

				&.fucsia-title {
					color: #fe375f;
				}

				&.green-title {
					color: #30d38b;
				}

				&.yellow-title {
					color: #da8c0d;
				}
			}

			.numbers-unit {
				@apply text-4xl font-bold;
				@apply flex items-end;

				span {
					@apply text-xs font-normal;
				}
			}
		}
	}

	&__rating {
		@apply flex flex-col items-center;
		@apply mt-8 mb-16;

		h2 {
			@apply font-bold text-xl;
		}
	}

	&__btns {
		@apply w-full;
		@apply grid gap-4;

		@media screen and (min-width:600px) {
			@apply grid-cols-2;
		}
	}

	&__container {
		background-color: #242424;
		border-radius: 1.5rem 1.5rem 0 0;
		@apply p-4;
	}

	&__content-btn {
		display: flex;
		justify-content: space-between;
	}

	&__content-comments {
		@apply p-4;
		h3 {
			font-size: 17px;
			font-weight: bold;
		}
		p {
			color: #949494;
			font-weight: 100;
		}
	}

	&__content-comment {
		border-bottom: 1px solid #cdcdcd;
		padding: 20px 0;
	}
}

.modal-container {
	box-shadow: none !important;
}
</style>
