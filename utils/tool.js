import config from "@/config.js"; //配置文件
import Vue from "vue";

//时间戳转换
function timeCv(time) {
	let date = new Date(time)
	var obj = {
		"Y": date.getFullYear(),
		"M": date.getMonth() + 1,
		"D": date.getDate(),
		"h": date.getHours(),
		"m": date.getMinutes()
	};
	for (let i in obj) {
		if (obj[i] < 10) {
			obj[i] = '0' + obj[i]
		}
	}
	return `${obj.Y}-${obj.M}-${obj.D} ${obj.h}:${obj.m}`
}

//生成随机字符串
function getNonceStr() {
	const arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
		'k',
		'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
	]
	let ranDomStr = '';
	for (let i = 0; i < 20; i++) {
		ranDomStr += arr[Math.floor(Math.random() * 16)]
	}
	return ranDomStr;
}

//坐标逆解析
function getLocationByXy({
	lat,
	lng
}) {
	return Vue.prototype.$jsonp("https://apis.map.qq.com/ws/geocoder/v1/", {
			location: `${lat},${lng}`,
			key: config.tencentMapKey,
			get_poi: 1,
			output: "jsonp",
		})
		.then((res) => {
			return res
		})
};

//以webview打开页面
function openWebView(url, title) {
	let view = plus.webview.create(url, 'pay', {
		'titleNView': {
			'style': 'transparent',
			'backgroundColor': '#fff',
			'titleText': title,
			'titleColor': '#333',
			progress: {
				color: '#08BF30'
			},
			buttons: [{
				type: 'close',
				float: 'left',
				background: '#000',
				onclick: clickButton
			}]
		}
	});

	view.addEventListener('titleUpdate', function() {
		view.show();
	});

	function clickButton() {
		uni.$emit('web_close', true)
		plus.webview.close(view, 'fade-out', 250, 'auto');
	};
}
export {
	getNonceStr,
	openWebView,
	getLocationByXy,
	timeCv
};
