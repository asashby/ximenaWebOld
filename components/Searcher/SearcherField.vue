<template>
	<v-text-field
		class="x-searcher--field__desktop"
		filled
		rounded
		clearable
		hide-details
		prepend-icon="mdi-magnify"
		placeholder="buscar"
		@keydown="handleEnterPress"
		@input="handleClearEvent"
	></v-text-field>
</template>

<script>
export default {
	name: 'SearcherField',
	methods: {
		handleClearEvent (ev) {
			if (ev === null) {
				this.$emit('enter', null)
			}
		},
		handleEnterPress (ev) {
			if (ev.code === 'Enter') {
				this.$emit('enter', ev.target.value)
			}
		}
	}
}
</script>

<style lang="scss" scoped>
</style>
