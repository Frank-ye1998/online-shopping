<script>
	import Vue from "vue";
	import {
		getLocationByXy
	} from "@/utils/tool.js";
	import {
		appMixin
	} from "@/utils/mixin";
	import {
		preloading
	} from "@/utils/preloading";
	export default {
		mixins: [appMixin],
		watch: {
			//监听定位坐标，逆解析地址
			$locationXy(nv, ov) {
				getLocationByXy(nv).then(res => {
					this.setLocationInfo(res.result);
				})
			}
		},
		onLaunch: function() {
			//获取用户设备信息
			uni.getSystemInfo({
				success: (info) => {
					this.setDeviceInfo(info);
				},
			});

			//获取登录缓存数据
			this.setLoginKey({
				sessionId: uni.getStorageSync("sessionId"),
				userId: uni.getStorageSync("userId"),
			}).then(()=>{
				preloading();//接口预加载
			})

			//获取定位
			uni.getLocation({
				type: "gcj02",
				success: (res) => {
					this.setLocationXy({
						lat: res.latitude,
						lng: res.longitude,
					}).then(() => {
						console.log("定位成功：", this.$locationXy);
					})
				},
				fail: (err) => {
					console.log(err);
				},
			});
		},
		onShow: function() {},
		onHide: function() {},
	};
</script>

<style>
	/*全局样式*/
	@import url("@/static/css/global.scss");
	/*字体图标*/
	@import url("@/static/fonts/iconfont.css");
</style>
