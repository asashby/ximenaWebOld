<template>
  <v-rating
		empty-icon="mdi-star-outline"
		full-icon="mdi-star"
		half-icon="mdi-star-halfFull"
		length="5"
		background-color="orange lighten-3"
		color="orange"
		size="44"
		:value="rating"
		:readonly="readonly"
	></v-rating>
</template>
<script>
export default {
	name: 'Rating',
	props: {
		rating: Number,
		readonly: {
			type: Boolean,
			default: false
		}
	}
}
</script>
