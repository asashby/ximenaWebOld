<template>
  <div>
    <ProfilePageTitle title="Politicas de privacidad" />

    <div
      class="pp-main-container"
      v-html="politicsAndPrivacyData"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ProfilePageTitle from '~/components/Profile/ProfilePageTitle'

async function fetch () {
	// await this.$store.dispatch('companyData')
}

export default {
	name: 'PaginaPoliticaPrivacidad',
	components: { ProfilePageTitle },
	layout: 'profileLayout',
	fetch,
	computed: {
		...mapGetters([
			'politicsAndPrivacyData'
		])
	}
}
</script>

<style>
.pp-main-container {
	@apply mt-10 pb-4;
	@apply text-gray-heavy;
	@apply text-justify;

	p {
		@apply text-justify;
	}
}
</style>
