<template>
  <div class="profile-address--main-container">
    <ProfilePageTitle title="Mis Direcciones" />

    <div class="profile-address--main-container__new-address-button">
      <button
        type="button"
        class="x-btn x-btn__green"
        @click="openNewAddressForm = true"
      >
        + Agregar direccion
      </button>
    </div>

    <v-navigation-drawer
      v-model="openNewAddressForm"
      class="nav--main-container__side-bar profile-address--main-container__new-address--movil-form"
      absolute
      width="99%"
    >
      <div class="new-address-form--movil-modal">
        <h1 class="new-address-form--movil-modal__title">
          Agregar Direccion
        </h1>
        <v-btn
          icon
          @click="openNewAddressForm = false"
        >
          <v-icon large>
            mdi-close
          </v-icon>
        </v-btn>
      </div>

      <NewAddressForm @close-modal="openNewAddressForm = false" />
    </v-navigation-drawer>

    <div class="profile-address--main-container__new-address__form-container">
      <NewAddressForm />
    </div>

    <div
      v-if="fullyAddressList"
      class="profile-address--main-container__new-address__list-container"
    >
      <AddressComponent
        v-for="(address, addressIndex) in addressList"
        :key="addressIndex"
        :isFavorite="address.flagFavorite"
        :alias="address.name"
        :address="address.address"
      />
    </div>
  </div>
</template>
<script>
import { isEmpty } from 'functionallibrary'
import { mapState } from 'vuex'
import AddressComponent from '~/components/Profile/AddressComponent'
import NewAddressForm from '~/components/Profile/NewAddressForm'
import ProfilePageTitle from '~/components/Profile/ProfilePageTitle'

function fullyAddressList () {
	return !(isEmpty(this.addressList))
}

function data () {
	return {
		openNewAddressForm: false
	}
}

export default {
	name: 'PaginaPerfilMisDirecciones',
	components: {
		AddressComponent,
		NewAddressForm,
		ProfilePageTitle
	},
	computed: {
		...mapState('profile', {
			addressList: state => state.address.list
		}),
		fullyAddressList
	},
	layout: 'profileLayout',
	data
}
</script>

<style lang="scss" scoped>
.profile-address--main-container {
	@apply px-6;

	&__new-address-button {
		@apply flex justify-center items-center;
		@apply mt-8;

		@media screen and (min-width: 600px) {
			@apply hidden;
		}
	}

	&__new-address__form-container {
		@apply hidden;

		@media screen and (min-width: 600px) {
			@apply block;
		}
	}

	&__new-address--movil-form {
		@apply pt-12 px-4;

		@media screen and (min-width: 600px) {
			@apply hidden;
		}

		.v-navigation-drawer__content {
			.new-address-form--movil-modal {
				@apply flex;

				&__title {
					@apply text-3xl font-bold;
					max-width: 240px;
				}

				.v-btn--icon.theme--light {
					.v-icon {
						@apply text-gray-light;
					}
				}
			}
		}
	}

	&__new-address__list-container {
		@apply pt-6;
		@apply grid gap-y-4;
	}
}
</style>
