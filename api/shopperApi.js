//请求器
import xhr from "@/api/xhr.js";

// #ifdef H5
const port = "";
// #endif
// #ifdef APP-PLUS
const port = ':9003';
// #endif

const shopperApi = {
	//查询购物车
	getCartInfo() {
		const params = {
			url: port + '/shopper',
			method: 'get',
		}
		return xhr.request(params)
	},
	//添加放购物车
	addCart(data) {
		const params = {
			url: port + '/shopper',
			method: 'post',
			data: data
		}
		return xhr.request(params)
	},
	//清空购物车
	clearCartInfo() {
		const params = {
			url: port + '/shopper/clear',
			method: 'post',
		}
		return xhr.request(params)
	},
	//修改购物车
	changeCartInfo(data) {
		const params = {
			url: port + '/shopper/change/num',
			method: 'post',
			data: data,
		}
		return xhr.request(params)
	},
	//删除购物车
	deleteCartInfo(data) {
		const params = {
			url: port + '/shopper/delete?skuCode=${skuCode}',
			method: 'post',
			data: data,
			isFrom: true
		}
		return xhr.request(params)
	},

}

export default shopperApi
