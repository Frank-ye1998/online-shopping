import config from "@/config.js"; //配置文件
import Vue from "vue";
import store from "@/store";
import userApi from "@/api/userApi.js";

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
	return jsonpHandle("https://apis.map.qq.com/ws/geocoder/v1/", {
		location: `${lat},${lng}`,
		key: config.tencentMapKey,
		get_poi: 1
	})
};

//版本更新
function checkUpdate(type) {
	if (type) {
		uni.showLoading({
			mask: true
		})
	}
	return userApi.getVersion().then(res => {
		uni.hideLoading();
		let upData = res.data;
		let thatV = config.appVersion;
		let nowV = upData[0].versionNo;
		if (thatV < nowV) {
			let now = upData[0]; //当前版本信息
			let updateType = -1; //更新方式=>1整包更新 2整包强制更新 3wgt更新 4wgt强制更新 5wgt&整包强制更新(特殊状态，无法更新)
			let mustPackage = false; //是否必须整包更新
			let isForce = false; //是否强制更新
			let diffIndex = upData.findIndex((item) => {
				return config.appVersion === item.versionNo
			})
			let diffVersion = upData.splice(0, diffIndex); //获取所有新版本
			diffVersion.forEach(item => {
				if (item.isForceUpdate) {
					isForce = true;
				}
				if (item.isSdkUpdate || !now.isWgtUpdate) {
					mustPackage = true;
				}
			});
			return diffVersion
		}
	})
}

//处理jsonp请求兼容问题(目前只适用于腾讯地图的WebService API,其他请求需修改return结果)
function jsonpHandle(url, data) {
	//#ifdef H5 || MP-WEIXIN
	if (url.indexOf('map.qq') > -1) {
		data.output = "jsonp"
	}
	return Vue.prototype.$jsonp(url, data).then(res => {
		return res.result || res
	}).catch(err => {
		console.log(err);
	});
	//#endif

	//#ifdef APP-PLUS
	return uni.request({
		url: url,
		method: 'get',
		data: data
	}).then(res => {
		return res[1].data.result || res[1].data.data
	}).catch(err => {
		console.log(err);
	})
	//#endif
}

//计算两个坐标之间的距离
function calcDistance({
	lat1,
	lng1,
	lat2,
	lng2
}) {
	var radLat1 = lat1 * Math.PI / 180.0;
	var radLat2 = lat2 * Math.PI / 180.0;
	var a = radLat1 - radLat2;
	var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
	var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(
		b / 2), 2)));
	s = s * 6378.137;
	s = Math.round(s * 10000) / 10000;
	return s
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
};

//获取地址列表&&根据当前定位距离设置默认收货地址
function setAddressByDistance() {
	userApi.findAddress().then(res => {
		if (!res.data || !res.data.length) return;
		res.data.forEach(item => {
			//获取地址与当前定位距离
			item.userDistance = calcDistance({
				lat1: Number(item.lat),
				lng1: Number(item.lng),
				lat2: store.getters.$locationXy.lat,
				lng2: store.getters.$locationXy.lng
			})
		})
		//根据距离排序
		res.data.sort((a, b) => {
			return a.userDistance - b.userDistance
		})
		if (!store.getters.$currentAddress.isUserSet) { //当前收货地址非用户设置
			store.dispatch('setCurrentAddress', res.data[0]);//设置收货地址为当前最近的收货地址
			console.log(res.data[0],'距离最近的收货地址');
			
		}
		store.dispatch('setAddressList', res.data);//更新地址列表
	})
}

export {
	timeCv, //时间戳转换
	getNonceStr, //生成随机20位字符串
	getLocationByXy, //坐标逆解析
	checkUpdate, //检查版本更新并获取更新数据
	jsonpHandle, //兼容处理jsonp请求
	calcDistance, //计算两个坐标之间的距离
	openWebView, //打开webview
	setAddressByDistance, //根据当前定位距离设置默认收货地址
};
