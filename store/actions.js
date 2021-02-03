const actions = {
	setDeviceInfo: ({
		commit
	}, info) => {
		return commit('SET_DEVICE_INFO', info)
	},
	setLoginKey: ({
		commit
	}, key) => {
		return commit('SET_LOGIN_KEY', key);
	},
	setLocationXy: ({
		commit
	}, xy) => {
		return commit('SET_LOCATION_XY', xy);
	},
	setLocationInfo: ({
		commit
	}, info) => {
		return commit('SET_LOCATION_INFO', info);
	},
	setMenuList: ({
		commit
	}, data) => {
		return commit('SET_MENU_LIST', data);
	},
	setShoppingCart: ({
		commit
	}, data) => {
		return commit('SET_SHOPPING_CART', data);
	},
	setUserInfo: ({
		commit
	}, data) => {
		return commit('SET_USER_INFO', data);
	},
	setAddressList: ({
		commit
	}, data) => {
		return commit('SET_ADDRESS_LIST', data);
	},
	setStoreList: ({
		commit
	}, data) => {
		return commit('SET_STORE_LIST', data);
	},
	setCurrentAddress: ({
		commit
	}, data) => {
		return commit('SET_CURRENT_ADDRESS', data);
	},
	setCurrentStore: ({
		commit
	}, data) => {
		return commit('SET_CURRENT_STORE', data);
	},
	setReceivingMethod: ({
		commit
	}, data) => {
		return commit('SET_RECEIVING_METHOD', data);
	},
}

export default actions
