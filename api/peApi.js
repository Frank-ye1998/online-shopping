//请求器
import xhr from "@/api/xhr.js";

// #ifdef H5
const port = "";
// #endif
// #ifdef APP-PLUS
const port = ':9011';
// #endif
const peApi = {

	//查询优惠券列表
	getCouponList(data) {
		const params = {
			url: port + '/pe',
			method: 'get',
			data:data,
			isFrom:true
		}
		return xhr.request(params)
	},
	//用户领取卡券
	userReceiveCoupon(data){
		const params = {
			url: port + '/pe',
			method: 'post',
			data:data,
		}
		return xhr.request(params)
	},
	//获取登录优惠券
	getLoginCoupon(){
		const params = {
			url: port + '/pe/getLoginCoupon',
			method: 'get',
		}
		return xhr.request(params)
	}
}

export default peApi
