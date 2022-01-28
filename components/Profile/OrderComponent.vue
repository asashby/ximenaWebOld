<template>
	<div>
		<v-expansion-panels>
				<v-expansion-panel>
					<v-expansion-panel-header>
						<div class="order-header--main-container">
							<div class="order-header--date-container">
								<h2>{{ dayAndMonthComputed.day }}</h2>
								<h4>{{ dayAndMonthComputed.month }}</h4>
							</div>
							<div class="order-header--data-container">
								<div class="order-header--data__total">
									<h6>{{ dayAndMonthComputed.year }}</h6>
									<h5>
										<span>Total</span>
										<span>S/. {{ total }}</span>
									</h5>
								</div>
								<h3 class="order-header--data__number">Pedido: {{ orderNumber }}</h3>
								<h2
									:class="statusClassName"
								>{{ status }}</h2>
							</div>
						</div>
					</v-expansion-panel-header>

					<v-expansion-panel-content>
						<div class="order-content--main-container">
							<div class="order-content--address-container">
								<label>Direccion de entrega</label>
								<h3>{{ deliveryAddress }}</h3>
							</div>

							<div class="order-content--waypayment-container">
								<label>Medio de pago</label>
								<h3>{{ wayPayment }}</h3>
							</div>

							<div v-if="orderExist" class="order-content--products-container">
								<h2 class="order-content--products_title">Productos</h2>
								<div class="order-content--products_wrapper">
									<div
										v-for="(product, index) in orderDetails"
										:key="index"
										class="order-content--products_wrapper-product">
										<span>{{ product.name }}</span>
										<span>S/. {{ product.total }}</span>
									</div>
								</div>
							</div>

							<div class="order-content--download-container">
								<button
									type="button"
									class="x-btn x-btn__green"
								>Descargar comprobante</button>
							</div>
						</div>

					</v-expansion-panel-content>
			</v-expansion-panel>
		</v-expansion-panels>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import { isEmpty } from 'functionallibrary'

export default {
	name: 'OrderComponent',
	computed: {
		...mapState({
			months: state => state.months
		}),
		dayAndMonthComputed () {
			if (isEmpty(this.createdAt)) {
				return { day: null, month: null }
			} else {
				const parsedDate = new Date(this.createdAt)
				const day = parsedDate.getDate()
				const monthIndex = parsedDate.getMonth()
				const year = parsedDate.getFullYear()
				return { day, month: this.months[monthIndex], year }
			}
		},
		orderExist () {
			return isEmpty(this.orderDetails)
		},
		statusClassName () {
			const baseClass = 'order-header--data__status'

			if (this.status === 'Entregado') {
				return `${baseClass}_delivered`
			} else if (this.status === 'En camino') {
				return `${baseClass}_onTheWay`
			} else {
				return `${baseClass}_canceled`
			}
		}
	},
	props: {
		createdAt: {
			default: '',
			type: String
		},
		deliveryAddress: {
			default: '',
			type: String
		},
		orderDetails: {
			default: () => [],
			type: Array
		},
		orderNumber: {
			default: '',
			type: String
		},
		status: {
			default: '',
			type: String
		},
		total: {
			defaul: 0,
			type: Number
		},
		wayPayment: {
			default: '',
			type: String
		}
	}
}
</script>

<style lang="scss" scoped>
.order {
	&-header {
		&--main-container {
			@apply bg-gray-light;
			@apply p-2;
			@apply grid gap-x-2;
			grid-template-columns: 75px 1fr;

			@media screen and (min-width: 600px) {
				@apply gap-x-6;
			}
		}

		&--date-container {
			@apply p-2;
			@apply flex flex-col items-center justify-center;
			@apply bg-gray-heavy bg-opacity-50;
			@apply rounded;

			h2 {
				@apply text-4xl font-black text-gray-darkest text-opacity-70;
			}

			h4 {
				@apply text-sm;
				@apply text-gray-darkest text-opacity-70;
			}
		}

		&--data-container {
			@apply flex flex-col items-start justify-center;

			.order-header--data {

				&__total {
					@apply w-full;
					@apply flex items-center;

					@media screen and (min-width: 600px) {
						@apply justify-between;
					}

					h6 {
						@apply text-xs;
						@apply text-gray-heavy;
					}

					h5 {
						@apply text-xs;
						@apply ml-4;

						@media screen and (min-width: 600px) {
							@apply flex flex-col;
							@apply text-right;
						}

						span:last-child {
							@apply ml-2;
							@apply font-black;
							@apply text-base;
						}
					}
				}

				&__number {
					@apply my-1;
				}

				&__status {
					&_delivered {
						@apply text-green-base font-bold text-base;
					}
					&_onTheWay {
						@apply text-orange-base font-bold text-base;
					}
					&_canceled {
						@apply text-red-base font-bold text-base;
					}

				}
			}
		}
	}

	&-content {
		&--main-container {
			@apply border-t border-solid border-gray-base;
			@apply pt-3;
			@apply grid;

			@media screen and (min-width: 600px) {
				@apply gap-4;
				grid-template-columns: 1fr 0.65fr;
			}
		}

		&--address-container,
		&--waypayment-container {
			label {
				@apply text-sm text-gray-heavy font-bold;
			}

			h3 {
				@apply font-bold;
			}
		}

		&--address-container {
			@media screen and (min-width: 600px) {
				grid-column: 1 / 2;
			}
		}

		&--waypayment-container {
			@apply my-3;

			@media screen and (min-width: 600px) {
				grid-column: 2 / 3;
			}
		}

		&--products {
			&-container {
				@apply overflow-auto;
				@apply max-h-48;

				@media screen and (min-width: 600px) {
					@apply col-span-full;
				}
			}

			&_title {
				@apply text-sm text-gray-heavy font-bold;
			}

			&_wrapper {
				&-product {
					@apply flex items-center justify-between;
					@apply font-light;
					@apply mb-2;

					span:first-child {
						max-width: 240px;
					}
				}
			}
		}

		&--download-container {
			@apply mt-4;
			@apply flex justify-center items-center;

			@media screen and (min-width: 600px) {
				@apply col-span-full;
			}
		}
	}

}
</style>
