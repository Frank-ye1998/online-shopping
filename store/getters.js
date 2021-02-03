const getters = {
	$deviceInfo: state => state.userData.deviceInfo,
	$loginKey: state => state.userData.loginKey,
	$locationXy: state => state.userData.locationXy,
	$locationInfo: state => state.userData.locationInfo,
	$userInfo:state => state.userData.userInfo,
	$userAddress: state => state.userData.userAddress,
	$menuList: state => state.order.menuList,
	$shoppingCart: state => state.order.shoppingCart,
	$storeList: state => state.order.storeList,
}

export default getters
