<template>
	<div class="menu-movil--main-container">

		<div class="top-header">
			<picture>
				<img
					class="top-header--ximena-logo"
					src="~/assets/icons/ximena_logo.svg"
					alt="Logo_Ximena_Hoyos"></img>
			</picture>

			<div>
				<v-btn
					icon
				>
					<img src="~/assets/icons/bag.svg" ></img>
				</v-btn>

				<v-btn
					icon
					class="close-modal"
					@click="emitCloseModal"
				>
					<v-icon large>mdi-close</v-icon>
				</v-btn>
			</div>
		</div>

		<AppMenuMovilTopUserData />

		<div class="menu-items--wrapper">
			<ul>
				<li v-for="(m, mIndex) in menu" :key="mIndex">
					<NuxtLink
						:to="`/${m.route}`"
					>
						<p class="route-name">{{ m.name }}</p>
					</NuxtLink>
				</li>
			</ul>
		</div>

		<div class="logout">
			<v-btn
				class="logout_btn"
				tile
				@click="handleClickOnLogout"
			>
				<v-icon left>
					mdi-logout
				</v-icon>
				Cerrar sesion
			</v-btn>
		</div>

	</div>
</template>

<script>
import AppMenuMovilTopUserData from '~/components/AppMenu/AppMenuMovilTopUserData'

export default {
	name: 'AppMenuMovil',
	components: { AppMenuMovilTopUserData },
	methods: {
		emitCloseModal () {
			this.$emit('closeModal')
		},
		async handleClickOnLogout () {
			await this.$store.dispatch('logout', this.$auth)
		}
	},
	props: {
		menu: {
			default: () => [],
			type: Array
		}
	}
}
</script>

<styles lang="scss" scoped>
.menu-movil--main-container {
	@apply h-screen;
	@apply bg-black-darkest;
	@apply pl-2;
	@apply relative;

	.top-header {
		@apply flex items-center justify-between;
		@apply w-full;
		@apply p-4;

		.close-modal.v-btn--icon.theme--light {
			.v-icon {
				@apply text-gray-light;
			}
		}
	}

	.menu-items--wrapper {
		@apply pb-20;
		@apply overflow-auto;
		height: calc(100vh - 150px);

		ul {
			@apply pl-4;
			li {
				.route-name {
					@apply flex items-center justify-start;
					@apply w-full h-16;
				}
			}
		}
	}

	.logout {
		@apply bg-black-darkest;
		@apply flex items-center justify-end;
		@apply w-full;
		@apply absolute bottom-0 left-0;
		@apply p-4;

		&_btn.theme--light.v-btn.v-btn--has-bg {
			@apply text-green-base;
			@apply bg-black-darkest;
		}
	}
}
</styles>
