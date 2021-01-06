import md5 from 'js-md5';
import config from '../config.js';
import Vue from 'vue';

//普通请求
const request = (Xhrdata) => {
	console.log(Xhrdata);
	Xhrdata.data.Frank = randomCode(20);
	let parames = {
		url: config.domain + Xhrdata.url,
		method: Xhrdata.method || 'post',
		data: Xhrdata.data || '',
		dataType: 'json',
		header: {
			source: 2,
			sourceName: 'WEB',
			"content-type": Xhrdata.isFrom ? "application/x-www-form-urlencoded;charset=utf-8" : "application/json;charset=UTF-8",
		}
	};
	return uni.request(parames).then(res => {
		return res[1].data;
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