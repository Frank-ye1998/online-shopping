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
			'$addressList',
			'$currentAddress',
			'$currentStore',
			'$receivingMethod'
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
			'setAddressList',
			'setCurrentAddress',
			'setCurrentStore',
			'setReceivingMethod'
		])
	}
}
