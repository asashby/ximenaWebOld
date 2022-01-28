<template>
	<!-- <div>
		<div class="g-signin2" data-onsuccess="onSuccess"></div>
	</div> -->
	<div>
		<button
			class="google-button"
			@click="loginWithGoogle"
		>
			<picture>
				<img src="~/assets/icons/google-icon.svg" alt="logo_google" class="google-icon-logo">
			</picture>
			<p class="google-text-button">Ingresa con Google</p>
		</button>
	</div>
</template>

<script>
async function loginWithGoogle () {
	await this.$auth.loginWith('google')
}

export default {
	name: 'GoogleButton',
	methods: {
		loginWithGoogle
	}
}
</script>

<style lang="scss">
.g-signin2 {
	@apply w-full;
	@apply flex justify-around items-center;
	@apply text-gray-base;
	@apply bg-gray-light;
	@apply rounded-lg;
	@apply py-4 px-4 mb-4;

	.abcRioButtonLightBlue {
		box-shadow: none !important;
		height: 100% !important;
		width: 100% !important;

		.abcRioButtonContentWrapper {
			.abcRioButtonContents {
				@apply text-gray-heavy font-bold;
				font-family: 'Poppins' !important;
				font-size: 16px !important;

				#not_signed_ins69jowmujyln {
					display: inline !important;
				}

				#connecteds69jowmujyln {
					display: none !important;
				}
			}
		}
	}
}

.google {
	&-button {
		@apply w-full;
		@apply flex justify-around items-center;
		@apply text-gray-base;
		@apply bg-gray-light;
		@apply rounded-lg;
		@apply py-4 px-4 mb-4;
	}

	&-icon-logo {
		@apply w-6 h-6;
	}

	&-text-button {
		@apply text-gray-heavy font-bold;
		font-family: 'Poppins' !important;
		font-size: 16px !important;
		margin-bottom: 0px !important;
	}
}
</style>
