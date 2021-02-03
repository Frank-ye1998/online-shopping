const userData = {
	state: {
		deviceInfo: {},
		loginKey: {},
		locationXy: {},
		locationInfo: {},
		userInfo: {},
		addressList: []
	},
	mutations: {
		'SET_DEVICE_INFO': (state, info) => {
			state.deviceInfo = info;
		},
		'SET_LOGIN_KEY': (state, key) => {
			state.loginKey = key;
		},
		'SET_LOCATION_XY': (state, xy) => {
			state.locationXy = xy;
		},
		'SET_LOCATION_INFO': (state, info) => {
			state.locationInfo = info;
		},
		'SET_USER_INFO': (state, info) => {
			state.userInfo = info;
		},
		'SET_ADDRESS_LIST': (state, info) => {
			state.addressList = info;
		},
	}
}

export default userData
