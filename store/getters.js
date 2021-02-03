const getters = {
	$deviceInfo: state => state.userData.deviceInfo,
	$loginKey: state => state.userData.loginKey,
	$locationXy: state => state.userData.locationXy,
	$locationInfo: state => state.userData.locationInfo,
	$userInfo: state => state.userData.userInfo,
	$addressList: state => state.userData.addressList,
	$menuList: state => state.order.menuList,
	$shoppingCart: state => state.order.shoppingCart,
	$storeList: state => state.order.storeList,
	$currentAddress: state => state.order.currentAddress,
	$currentStore: state => state.order.currentStore,
	$receivingMethod: state => state.order.receivingMethod
}

export default getters
