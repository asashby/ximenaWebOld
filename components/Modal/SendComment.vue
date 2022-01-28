<template>
	<v-dialog
		:value="value"
		content-class="modal-container"
	>
		<div class="modal--send-comment">
			<div class="modal--send-comment__title">
				<h2>Enviar Comentario</h2>
				<button
					type="button"
					@click="closeModal"
				>
					<v-icon large color="white">mdi-close</v-icon>
				</button>
			</div>
			<div>
				<v-rating
					empty-icon="mdi-star-outline"
					full-icon="mdi-star"
					half-icon="mdi-star-halfFull"
					length="5"
					color="orange"
					background-color="orange lighten-3"
					size="36"
					:value="rating"
				></v-rating>
			</div>
			<div class="modal--send-comment__text">
				<v-text-field
					outlined
					hide-details
					class="x-text-field text-white"
					label="Comentario"
					v-model="commentContent"
				></v-text-field>
			</div>
			<div class="modal--send-comment__content-btns">
				<button
					class="x-btn x-btn__aqua"
				>Cancelar</button>
				<button
					class="x-btn x-btn__green"
				@click="sendComment">Enviar</button>
			</div>
		</div>
	</v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	name: 'send-comment',
	data: () => ({
		commentContent: '',
		comments: [
			{ id: 1, title: 'Ipsum loren', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
			{ id: 2, title: 'Ipsum loren', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
			{ id: 3, title: 'Ipsum loren', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
			{ id: 4, title: 'Ipsum loren', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' }
		]
	}),
	computed: {
		...mapGetters('profile', [
			'userName'
		])
	},
	methods: {
		closeModal () {
			this.$emit('close-modal')
		},
		sendComment () {
			const body = {
				rating: this.rating,
				title: this.userName,
				content: this.commentContent
			}
			const { slugRetos } = this.$route.params
			console.log(this.userName)
			const { data: response } = this.$http.post(`rating/course/${slugRetos}`, body)
			if (response) {
				console.log('enviar comment')
			}
		}
	},
	props: {
		rating: { default: 0, type: Number },
		value: null
	}
}
</script>

<style lang="scss" scoped>
.modal--send-comment {
	@apply rounded-3xl;
	@apply mx-auto;
	@apply p-4;
	background-color: #242424;
	max-width: 500px;

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
		display: flex;
		justify-content: space-between;
		@apply font-bold text-3xl;
		@apply mb-3;
	}

	&__text {
		input {
			color: #fff !important;
		}
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

	&__content-btns {
		display: flex;
		justify-content: space-between;
		margin-top: 50px;
	}
}

.modal-container {
	box-shadow: none !important;
}
</style>
