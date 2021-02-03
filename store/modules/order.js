const order = {
	state: {
		menuList: {},
		storeList: [],
		shoppingCart: {},
		currentAddress: {},
		currentStore: {},
		receivingMethod:true
	},
	mutations: {
		'SET_MENU_LIST': (state, data) => {
			state.menuList = data;
		},
		'SET_SHOPPING_CART': (state, data) => {
			state.shoppingCart = data;
		},
		'SET_STORE_LIST': (state, data) => {
			state.storeList = data;
		},
		'SET_CURRENT_ADDRESS': (state, data) => {
			state.currentAddress = data;
		},
		'SET_CURRENT_STORE': (state, data) => {
			state.currentStore = data;
		},
		'SET_RECEIVING_METHOD': (state, data) => {
			state.receivingMethod = data;
		},
	}
}

export default order
