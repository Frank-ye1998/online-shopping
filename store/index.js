import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import actions from './actions'

import order from './modules/order.js'//当前订单
import shoppingCart from './modules/shoppingCart.js' //购物车
import store from './modules/store.js' //门店
import address from './modules/address.js' //收货地址

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		shoppingCart,
		store,
		address,
		order
	},
	getters,
	actions
})
