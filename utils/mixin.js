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
			'$storeList',
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
			'setStoreList',
			'setMenuList',
			'setShoppingCart',
			'setUserAddress'
		])
	}
}
