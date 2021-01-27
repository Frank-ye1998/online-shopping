/*接口预加载*/
import store from "@/store";
import userApi from "@/api/userApi.js";
import productApi from "@/api/productApi.js";
import shopperApi from "@/api/shopperApi.js"
const preloading = function() {
	//菜单
	productApi
		.getCategoryData({
			sendWay: "1",
		})
		.then((res) => {
			res.isLoad = true;
			store.dispatch('setMenuList', res);
		})
	if (store.getters.$loginKey.sessionId) {
		//购物车
		shopperApi.getCartInfo().then(res => {
			res.isLoad = true;
			store.dispatch('setShoppingCart', res)
		})
		//个人信息
		userApi.getUserInfo().then((res) => {
			res.isLoad = true;
			store.dispatch('setUserInfo', res)
		});
	}
}

export {
	preloading
}
