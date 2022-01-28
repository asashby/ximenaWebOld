<template>
	<div class="profile-header--title">
		<NuxtLink to="/perfil">
			<v-btn icon>
				<v-icon large>mdi-chevron-left</v-icon>
			</v-btn>
		</NuxtLink>
		<picture>
			<source></source>
			<img :src="userPhoto" class="user-avatar"></img>
		</picture>
		<h1>{{ title }}</h1>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	name: 'ProfilePageTitle',
	computed: {
		...mapGetters('profile', [
			'userPhoto'
		])
	},
	props: {
		title: {
			default: '',
			type: String
		}
	}
}
</script>

<style lang="scss" scoped>
.profile-header--title {
	@apply text-gray-light;
	@apply w-full;
	@apply flex items-center;

	.user-avatar {
		@apply hidden;

		@media screen and (min-width: 600px) {
			@apply block;
			@apply mr-4;
			@apply border-2 border-solid border-gray-light;
			@apply w-28 h-28;
			@apply rounded-full;
		}
	}

	h1 {
		@apply text-3xl font-bold;
	}

	button.v-btn--icon {
		.v-icon {
			@apply text-gray-light;
		}
	}
}
</style>
