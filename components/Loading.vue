/* eslint-disable indent */
<template>
  <div v-if="loading" class="loading-container">
    <div class="loading-circle" />
    <picture>
      <img
        class="loading-logo"
        src="~/assets/icons/ximena_logo.svg"
        alt="Logo_Ximena_Hoyos"
      >
    </picture>
  </div>
</template>

<script>
export default {
	name: 'Loading',
	data: () => ({
		loading: false
	}),
	methods: {
		start () {
			this.loading = true
		},
		finish () {
			this.loading = false
		}
	}
}
</script>

<style lang="scss">
  .loading-container {
      background-blend-mode: multiply;
      background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.5));
      height: 100vh;
      position: fixed;
      width: 100%;
      z-index: 20;
  }

  .loading-circle {
    animation: spin 2s linear infinite;
    border: 8px solid rgba(255, 255, 255, 0.19);
    border-radius: 50%;
    border-top: 8px solid #ffffff;
    bottom: 0px;
    height: 90px;
    left: 0px;
    margin: auto;
    position: absolute;
    right: 0px;
    top: 0px;
    width: 90px;
  }

  @keyframes spin {
      0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .loading-logo {
    bottom: 0px;
    height: 20px;
    left: 0px;
    margin: auto;
    position: absolute;
    right: 0px;
    top: 0px;
  }
</style>
