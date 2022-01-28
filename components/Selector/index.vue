<template>
	<v-select
		solo
		hide-details
		:class="setClass"
		v-bind="$attrs"
		:items="items"
		:label="label"
		@change="sendValue"
	></v-select>
</template>

<script>
function sendValue (ev) {
	this.$emit('input', ev)
}

function setClass () {
	return this.wire ? 'x-selector-wire' : 'x-selector'
}

export default {
	name: 'Selector',
	inheritAttrs: false,
	computed: {
		setClass
	},
	methods: {
		sendValue
	},
	props: {
		label: {
			default: '',
			type: String
		},
		items: {
			default: () => [],
			type: Array
		},
		wire: {
			default: false,
			type: Boolean
		}
	}
}
</script>
