<template>
	<div class="profile-orders--main-container">

		<ProfilePageTitle title="Mis Pedidos" />

		<div v-if="existOrders" class="profile-orders--list">
			<OrderComponent
				v-for="(order, orderIndex) in orders"
				:key="orderIndex"
				:deliveryAddress="order.deliveryAddress"
				:createdAt="order.createdAt"
				:total="order.total"
				:orderNumber="order.orderNumber"
				:orderDetails="order.details"
				:status="order.status"
				:wayPayment="order.wayPayment"
			/>
		</div>

	</div>
</template>

<script>
import { mapState } from 'vuex'
import { isEmpty } from 'functionallibrary'
import OrderComponent from '~/components/Profile/OrderComponent'

function existOrders () {
	return !(isEmpty(this.orders))
}

export default {
	name: 'PaginaMisPedidos',
	components: { OrderComponent },
	computed: {
		...mapState('profile', {
			orders: state => state.orders.list
		}),
		existOrders
	},
	layout: 'profileLayout'
}
</script>

<style lang="scss" scoped>
.profile-orders {
	&--main-container {}

	&--list {
		@apply pt-12;
		@apply grid gap-3;
	}
}
</style>
