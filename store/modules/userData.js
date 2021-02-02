const userData = {
	state: {
		deviceInfo: {},
		loginKey: {},
		locationXy: {},
		locationInfo: {},
		userInfo: {},
		userAddress: []
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
		'SET_USER_ADDRESS': (state, info) => {
			state.userAddress = info;
		},
	}
}

export default userData
