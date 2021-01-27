const getters = {
	$deviceInfo: state => state.userData.deviceInfo,
	$loginKey: state => state.userData.loginKey,
	$locationXy: state => state.userData.locationXy,
	$locationInfo: state => state.userData.locationInfo,
	$userInfo:state => state.userData.userInfo,
	$menuList: state => state.order.menuList,
	$shoppingCart: state => state.order.shoppingCart
}

export default getters
