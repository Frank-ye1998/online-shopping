/*接口预加载&&部分初始化*/
import store from "@/store";
import userApi from "@/api/userApi.js";
import productApi from "@/api/productApi.js";
import shopperApi from "@/api/shopperApi.js";
import orderApi from "@/api/orderApi.js";
import {
	setAddressByDistance
} from "@/utils/tool.js";
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
	//门店
	orderApi.getStoreList().then(res => {
		store.dispatch('setStoreList', res.data)
	})
	if (store.getters.$loginKey.sessionId) {
		//购物车
		shopperApi.getCartInfo().then(res => {
			res.isLoad = true;
			store.dispatch('setShoppingCart', res.data)
		})
		//个人信息
		userApi.getUserInfo().then((res) => {
			res.isLoad = true;
			store.dispatch('setUserInfo', res)
		});
		//收货地址
		setAddressByDistance();
	}
}

export {
	preloading
}
