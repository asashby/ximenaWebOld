<template>
	<div class="address-component--main-container">
		<div class="address-component--data">
			<h1>{{ alias }}</h1>
			<p>{{ address }}</p>
		</div>

		<div class="address-component--actions">
			<v-btn
				icon
				:class="{ 'favorite-action': isFavorite }">
				<v-icon>mdi-star</v-icon>
			</v-btn>
			<v-btn icon class="edit-action">
				<v-icon>mdi-pencil</v-icon>
			</v-btn>
			<v-btn icon class="delete-action">
				<v-icon>mdi-close-circle-outline</v-icon>
			</v-btn>
		</div>
	</div>
</template>

<script>
export default {
	name: 'AddressComponent',
	props: {
		alias: {
			default: '',
			type: String
		},
		address: {
			default: '',
			type: String
		},
		isFavorite: {
			default: false,
			type: Boolean
		}
	}
}
</script>

<style lang="scss" scoped>
.address-component {
	&--main-container {
		@apply bg-gray-light;
		@apply rounded;
		@apply p-4;
		@apply grid gap-x-2;
		grid-template-columns: 1fr 0.25fr;
	}

	&--data {
		@apply flex flex-col justify-between;

		h1 {
			@apply uppercase font-bold;
			@apply mb-2;
		}

		p {
			@apply text-gray-heavy;
			@apply mb-0;
		}
	}

	&--actions {
		@apply flex flex-col justify-between;

		@media screen and (min-width: 600px) {
			@apply flex-row items-center;
		}

		.favorite-action.v-btn.v-btn--icon {
			.v-icon {
				@apply text-orange-base;
			}
		}

		.edit-action.v-btn.v-btn--icon {
			.v-icon {
				@apply text-green-base;
			}
		}

		.delete-action.v-btn.v-btn--icon {
			.v-icon {
				@apply text-red-base;
			}
		}
	}
}
</style>
