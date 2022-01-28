<template>
	<NuxtLink :to="`/${menuItem.route}`" class="menu-item--container">
		<picture>
			<source
				media="(min-width: 600px)"
				:srcset="menuItem.url_image || menuImages[`${menuItem.name}Image`]"
			>
			<source
				media="(min-width: 768px)"
				:srcset="menuItem.url_image || `${menuImages[`${menuItem.name}Image`]} 1.5px`"
			>
			<source
				media="(min-width: 960px)"
				:srcset="menuItem.url_image || `${menuImages[`${menuItem.name}Image2`]} 2px`"
			>
			<source
				media="(min-width: 1024px)"
				:srcset="menuItem.url_image || `${menuImages[`${menuItem.name}Image3`]} 3px`"
			>
			<img
				:src="menuItem.url_image || menuImages[`${menuItem.name}Image`]"
				:alt="menuItem.name"
				class="menu-item--img"
			>
		</picture>

		<h2 class="menu-item--name">
			{{ menuItem.name }}
		</h2>
	</NuxtLink>
</template>

<script>
function menuImages () {
	const name = this.menuItem.name
	return {
		[`${name}Image`]: require(`~/assets/images/menu/${name}.webp`),
		[`${name}Image2`]: require(`~/assets/images/menu/${name}@2x.webp`),
		[`${name}Image3`]: require(`~/assets/images/menu/${name}@3x.webp`)
	}
}

export default {
	name: 'MenuItem',
	props: {
		menuItem: {
			default: () => {},
			type: Object
		}
	},
	computed: {
		menuImages
	}
}
</script>

<styles lang="scss" scoped>
.menu-item {
	&--container {
		.menu-item--img {
			object-fit: none;
		}

		&:nth-child(2),
		&:nth-child(3) {
			.menu-item--img {
				object-fit: initial;
			}
		}
	}
	&--img {
		@apply bg-gray-base;
		border-radius: 22px;
		min-height: 9rem;
		min-width: 9rem;
	}

	&--name {
		@apply text-gray-light;
	}
}
</styles>
