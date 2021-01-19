const userData = {
	state: {
		deviceInfo: {},
		loginKey: {}
	},
	mutations: {
		'SET_DEVICE_INFO': (state, info) => {
			state.deviceInfo = info;
		},
		'SET_LOGIN_KEY':(state, key) => {
			state.loginKey = key;
		},
	}
}

export default userData