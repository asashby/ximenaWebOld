<template>
  <div class="header-user">
    <div class="header-user--avatar">
      <picture>
        <img :src="userPhoto"></img>
      </picture>
      <div>
        <h1>{{ userName }}</h1>
        <NuxtLink to="/perfil">
          Perfil
        </NuxtLink>
      </div>
    </div>

    <a
      href="https://tienda.ximehoyos.com/tienda/ximenahoyos"
      class="header-user--shopstore"
      target="_blank"
    >
      Tienda
    </a>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	name: 'AppMenuMovilTopUserData',
	computed: {
		...mapGetters('profile', [
			'userPhoto',
			'userName'
		])
	}
}
</script>

<styles lang="scss" scoped>
.header-user {
	@apply flex items-center justify-between;
	@apply p-4;
	@apply bg-black-base;

	&--avatar {
		@apply flex items-center;
		@apply font-light;

		img {
			@apply w-10 h-10;
			@apply rounded-full;
			@apply mr-4;
		}

		h1 {
			@apply text-gray-light;
		}

		a {
			@apply text-green-base;
		}
	}

	&--shopstore {
		@apply text-green-base;
		@apply border border-solid border-green-base;
		@apply px-2 py-1;
	}
}
</styles>
