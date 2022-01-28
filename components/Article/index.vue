<template>
  <div>
    <NuxtLink :to="`/tips/${slug}`">
      <div class="articulo--container-el">
        <picture>
          <img
            class="articulo--container-el__img"
            :src="imgMobile"
          />
        </picture>
        <h2
          class="articulo--container-el__title"
        >
          {{ title }}
        </h2>
      </div>
    </NuxtLink>
  </div>
</template>

<script>
export default {
	name: 'Articulo',
	props: {
		id: {
			default: 0,
			type: Number
		},
		img: {
			default: '',
			type: String
		},
		imgMobile: {
			default: '',
			type: String
		},
		title: {
			default: '',
			type: String
		},
		slug: {
			default: '',
			type: String
		}
	}
}
</script>

<style lang="scss" scoped>
.articulo--container-el {
	@media screen and (min-width: 600px) {
		@apply relative;
		@apply w-full;
		height: 18rem;
	}

	&__img {
		@apply bg-gray-heavy;
		@apply w-full h-60;
		@apply rounded-xl;
		@apply object-cover;

		@media screen and (min-width: 420px) {
			@apply w-full h-80;
		}
		@media screen and (min-width: 600px) {
			@apply w-full h-full;
			@apply object-cover;
		}
	}

	&__title {
		@apply text-gray-light;
		@apply font-bold;
		@apply mt-3 mb-2;

		@media screen and (min-width: 600px) {
			@apply absolute bottom-4 left-2;
		}
	}
}
</style>
