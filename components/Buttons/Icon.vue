<template>
  <v-icon :large="large">{{ icon }}</v-icon>
</template>
<script>
export default {
	name: 'Icon',
	props: {
		icon: String,
		large: {
			types: Boolean,
			default: false
		}
	}
}
</script>
