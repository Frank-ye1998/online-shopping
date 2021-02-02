const order = {
	state: {
		menuList: {},
		storeList: [],
		shoppingCart: {}
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
	}
}

export default order
