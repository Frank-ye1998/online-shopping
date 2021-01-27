const order = {
	state: {
		menuList: {},
		shoppingCart: {}
	},
	mutations: {
		'SET_MENU_LIST': (state, data) => {
			state.menuList = data;
		},
		'SET_SHOPPING_CART': (state, data) => {
			state.shoppingCart = data;
		},
	}
}

export default order
