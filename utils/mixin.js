import {
	mapGetters,
	mapActions
} from 'vuex'
export const appMixin = {
	computed: {
		...mapGetters([
			'$deviceInfo',
			'$loginKey',
			'$locationXy',
			'$locationInfo',
			'$userInfo',
			'$menuList',
			'$shoppingCart',
			'$userAddress'
		])
	},
	data() {
		return {

		}
	},
	methods: {
		...mapActions([
			'setDeviceInfo',
			'setLoginKey',
			'setLocationXy',
			'setLocationInfo',
			'setUserInfo',
			'setMenuList',
			'setShoppingCart',
			'setUserAddress'
		])
	}
}
