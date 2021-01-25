//请求器
import xhr from "@/api/xhr.js";

// #ifdef H5
const port = "";
// #endif
// #ifdef APP-PLUS
const port = ':9004';
// #endif
const orderApi = {

	//查询门店列表
	getStoreList() {
		const params = {
			url: port + '/order/store/list',
			method: 'get',
		}
		return xhr.request(params)
	},
	//提交订单
	postOrder(data) {
		const params = {
			url: port + '/order',
			method: 'post',
			data: data
		}
		return xhr.request(params)
	},
	//订单支付
	payOrder(data) {
		const params = {
			url: port + '/pay/osInfo',
			method: 'post',
			data: data
		}
		return xhr.request(params)
	},
	//查询订单
	findOrder(data) {
		const params = {
			url: port + '/order',
			method: 'get',
			data: data
		}
		return xhr.request(params)
	},
	//查询订单详情
	findOrderDetail(data) {
		const params = {
			url: port + '/order/detail?id=${id}',
			method: 'get',
			data: data
		}
		return xhr.request(params)
	}
}

export default orderApi
