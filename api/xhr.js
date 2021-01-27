import config from '../config.js';
import store from "@/store"
import md5 from "md5";
import {
	router
} from '@/router/router.js'

//clientId
let clientId = uni.getStorageSync("clientId");
if (!clientId) {
	clientId = md5(Date.now() + '&:' + (((1 + Math.random()) * 0x10000) | 0));
	uni.setStorage({
		key: 'clientId',
		data: clientId
	});
}

//普通请求
const request = (Xhrdata) => {
	if (!Xhrdata.data) Xhrdata.data = {};
	//Xhrdata.data.Frank = randomCode(20);
	let parames = {
		url: config.domain + Xhrdata.url,
		method: Xhrdata.method || 'post',
		data: Xhrdata.data || '',
		dataType: 'json',
		header: {
			//渠道名称（WAP;WEB;ANDROID;IOS;WECHAT）
			source: 1,
			sourceName: 'WAP',
			"content-type": Xhrdata.isFrom ? "application/x-www-form-urlencoded;charset=utf-8" : "application/json;charset=UTF-8",
			sessionId: store.getters.$loginKey.sessionId,
			clientId: clientId
		}
	};
	return uni.request(parames).then(res => {
		let data = res[1].data;
		if (data.successCode == -2) {
			uni.showModal({
				title: '提示',
				content: '登录状态过期请重新登录',
				confirmText: "前往登录",
				cancelText: '暂不登录',
				success: (res) => {
					if (res.confirm) {
						router.push({
							name: 'mobileLogin'
						});
					}
				}
			})
		}


		return data;
	}).catch(e => {
		return e;
	})
}

/*生成指定长度的随机数*/
function randomCode(length) {
	let chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
	let result = "";
	for (let i = 0; i < length; i++) {
		let index = Math.ceil(Math.random() * 9);
		result += chars[index];
	}
	return result;
}

export default {
	request
}