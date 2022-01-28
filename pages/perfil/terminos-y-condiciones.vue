<template>
  <div>
    <ProfilePageTitle title="Terminos y condiciones" />

    <div
      class="tc-main-container"
      v-html="termsAndConditionsData"
    />
  </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ProfilePageTitle from '~/components/Profile/ProfilePageTitle'

async function fetch () {
	await this.$store.dispatch('companyData')
}

export default {
	name: 'PaginaTerminosYCondiciones',
	auth: false,
	components: { ProfilePageTitle },
	layout: 'profileLayout',
	fetch,
	computed: {
		...mapGetters([
			'termsAndConditionsData'
		])
	}
}
</script>

<style>
.tc-main-container {
	@apply mt-10 pb-4;
	@apply text-gray-heavy;
	@apply text-justify;

	p {
		@apply text-justify;
	}
}
</style>
