//请求器
import xhr from "@/api/xhr.js";

// #ifdef H5
const port = "";
// #endif
// #ifdef APP-PLUS
const port = ':9004';
// #endif

const weChatApi = {
	getJsApiTicket() {
		const params = {
			url: port + '/wechat/getJsApiTicket',
			method: 'get',
		}
		return xhr.request(params)
	},
	getAccessToken() {
		const params = {
			url: port + '/wechat/getAccessToken',
			method: 'get',
		}
		return xhr.request(params)
	}
}
export default weChatApi;
