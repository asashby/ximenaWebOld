<template>
  <div>
    <button
      class="facebook-button"
      @click="loginWithFacebook"
    >
      <picture>
        <img src="~/assets/icons/icon-facebook.svg" alt="logo_facebook" class="facebook-icon-logo">
      </picture>
      <p class="facebook-text-button">
        Ingresa con Facebook
      </p>
    </button>
  </div>
</template>

<script>
async function loginWithFacebook () {
	await this.$auth.loginWith('facebook')
}

export default {
	name: 'FacebookButton',
	methods: {
		loginWithFacebook
	}
}
</script>

<style lang="scss">
.facebook {
	&-button {
		@apply w-full;
		@apply flex justify-around items-center;
		@apply bg-blue-base;
		@apply rounded-lg;
		@apply py-4 px-4 mb-4;
	}

	&-icon-logo {
		@apply w-6 h-6;
	}

	&-text-button {
		@apply text-gray-light text-lg font-bold;
		margin-bottom: 0 !important
	}
}
</style>
