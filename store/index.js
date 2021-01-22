import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import actions from './actions'

import order from './modules/order.js' //订单相关数据
import userData from './modules/userData.js' //用户数据
Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		order,
		userData
	},
	getters,
	actions
})
