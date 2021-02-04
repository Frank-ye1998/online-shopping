<template>
	<view>
		<top-bar pageTitle="选择地址"> </top-bar>
		<!-- 搜索栏 -->
		<view class="search-view">
			<view class="city-name" @tap="pickerShow = true">
				<text class="text">{{nowCity.city||"定位中"}}</text>
				<i class="icon icon-to"></i>
				<view class="right-border"></view>
			</view>
			<view class="input-view">
				<input @input="searchLocation" v-model="searchValue" class="input" type="text" placeholder="输入地址">
			</view>
		</view>


		<!-- 地图中心点控件 -->
		<map v-if="xyLoad" class="uni-map" id="uniMap" :controls="controlData" :scale="14" :latitude="locationXy.lat"
		 :longitude="locationXy.lng" @regionchange="webMapChange">
			<!-- #ifdef APP-PLUS||MP-WEIXIN -->
			<!-- 兼容APP 原生map组件遮盖 -->
			<cover-view @tap="mapTap" v-show="pickerShow" class="map-mask"></cover-view>
			<!-- #endif  -->
		</map>
		<view v-else class="uni-map-plc"></view>

		<!-- 附近地点列表 -->
		<scroll-view class="near-list" scroll-y="true">
			<view class="list" @tap="nearTap(item)" v-for="item in nearList" :key="item.request_id">
				<view class="name">
					{{item.title}}
				</view>
				<view class="info">
					{{item.address}}
				</view>
				<i v-if="nearSelected.id===item.id" class="icon icon-check"></i>
			</view>
		</scroll-view>

		<!-- 地址选择picker -->
		<address-picker class="address-picker" v-show="pickerShow" />

	</view>
</template>

<script>
	import {
		appMixin
	} from "@/utils/mixin";
	import config from "@/config.js"; //配置文件
	import {
		jsonpHandle,
		calcDistance
	} from "../../utils/tool.js";
	import AddressPicker from "@/components/address-picker/address-picker"; //地区选择组件
	export default {
		mixins: [appMixin],
		components: {
			"address-picker": AddressPicker
		},
		data() {
			return {
				xyLoad: false, //坐标初始化完成状态
				pickerShow: false,
				nearList: [],
				nearSelected: {},
				searchValue: "",
				nowCity: {},
				locationXy: {},
				webChangeStatus: true
			};
		},
		computed: {
			//原生map组件 中心控件参数
			controlData() {
				let deviceWidth = this.$deviceInfo.windowWidth; //设备宽度
				let rpxPx = deviceWidth / 750; //每rpx对应的实际像素
				let controlTop = rpxPx * 600 * 0.5 - 52; //计算控件位置
				let controlLeft = deviceWidth * 0.5 - 13; //……
				return [{
					id: 'mapCenter',
					position: {
						left: controlLeft,
						top: controlTop,
						width: 26,
						height: 52
					},
					iconPath: "/static/images/mine/now-location.png"
				}];
			}
		},
		methods: {
			//H5地图拖动
			webMapChange: function(e) {
				// #ifndef H5
				return
				// #endif
				this.webChangeStatus = !this.webChangeStatus;
				if (this.webChangeStatus) { //web手指离开地图
					this.getLocationByXy({ //解析当前拖动结果坐标
						lat: e.detail.centerLocation.latitude,
						lng: e.detail.centerLocation.longitude
					})
				}
			},
			//搜索地点
			searchLocation: function() {
				let value = this.searchValue;
				if (!value) return;
				jsonpHandle("https://apis.map.qq.com/ws/place/v1/search", {
					poi_options: 'address_format=short',
					keyword: value,
					boundary: `region(${this.nowCity.city},0)`,
					filter: `category<>公交站`,
					key: config.tencentMapKey,
				}).then(res => {
					console.log(res);
					let resData = res.data || res;
					if (resData.length) {
						this.nearList = resData.filter(item => {
							return item.address
						});
						this.locationXy = {
							lat: resData[0].location.lat,
							lng: resData[0].location.lng
						}
					}
				})
			},
			//坐标逆解析
			getLocationByXy: function({
				lat,
				lng
			}) {
				jsonpHandle("https://apis.map.qq.com/ws/geocoder/v1/", {
					poi_options: 'address_format=short',
					location: `${lat},${lng}`,
					key: config.tencentMapKey,
					get_poi: 1
				}).then(res => {
					if (res.pois.length) {
						this.nearList = res.pois.filter(item => {
							return item.address
						})
						this.nowCity = res.ad_info;
					}
				})
			},
			//选择地点
			nearTap: function(data) {
				this.nearSelected = data;
				let nearbyStore = this.getNearStore({
					lat: data.location.lat,
					lng: data.location.lng
				})
				if (nearbyStore) {
					uni.$emit("locationSelected", data, nearbyStore); //传递选择结果
					setTimeout(() => {
						this.$Router.back(1);
					}, 500);
				}
			},
			//获取所选地点附近门店
			getNearStore: function({
				lat,
				lng
			}) {
				let nearbyStore;
				this.$storeList.forEach(item => {
					let distance = calcDistance({
						lat1: lat,
						lng1: lng,
						lat2: Number(item.lat),
						lng2: Number(item.lng)
					})
					if (distance < 3 && nearbyStore) { //判断3km内是否有门店
						if (distance < nearbyStore.distance) {
							item.distance = distance;
							nearbyStore = item;
						}
					} else if (distance < 3) {
						item.distance = distance;
						nearbyStore = item;
					}
				})
				if (!nearbyStore) {
					uni.showModal({
						content: "当前地点附近暂无门店，请选择其他地点",
						showCancel: false
					})
					return
				}
				return nearbyStore;
			},
			//兼容APP 原生map组件遮盖
			mapTap: function() {
				this.pickerShow = false;
			},
		},

		onReady() {
			//APP端地图拖动处理
			//#ifdef APP-PLUS
			setTimeout(() => { //等待地图初始化完成
				const mapContext = uni.createMapContext('uniMap', this).$getAppMap();
				mapContext.onstatuschanged = (event) => {
					console.log("拖动地图");
					this.getLocationByXy({ //解析当前拖动结果坐标
						lat: event.center.latitude,
						lng: event.center.longitude
					})
				}
			}, 1500)
			//#endif
		},

		onLoad() {
			//加载地图
			let xyLoad = setInterval(() => { //调试
				if (this.$locationXy.lat) {
					clearInterval(xyLoad)
					this.getLocationByXy(this.$locationXy);

					this.locationXy = {
						lat: this.$locationXy.lat,
						lng: this.$locationXy.lng
					}
					this.xyLoad = true;
				}
			}, 50);

			//监听address-picker关闭
			uni.$on("addressPickerClose", () => {
				this.pickerShow = false;
			});
			//接收城市选择结果
			uni.$on("citySelected", (data) => {
				this.nowCity = data;
			});

		}

	};
</script>

<style lang="scss">
	page {
		background: #fff;
	}

	.uni-map {
		position: relative;
		width: 100%;
		height: 600rpx;

		.map-mask {
			position: absolute;
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, 0.4);
		}
	}

	.uni-map-plc {
		width: 100%;
		height: 600rpx;
	}

	.gps-point {
		position: relative;

		.content {
			height: 104rpx;
			transform: translateY(-100%);

			.top {
				@include absLvCenter;
				top: 0;
				width: 48rpx;
				height: 48rpx;
				background-color: #f74344;
				border-radius: 50%;
			}

			.center {
				@include absLvCenter;
				top: 48rpx;
				width: 2px;
				height: 48rpx;
				background-color: #979697;
			}

			.bottom {
				@include absLvCenter;
				top: 88rpx;
				width: 20rpx;
				height: 8rpx;
				border-radius: 50%/50%;
				background-color: #5e5e5e;
			}
		}
	}

	.search-view {
		display: flex;
		width: 96%;
		height: 80rpx;
		background-color: $color-page;
		border-radius: 999px;
		margin: 16rpx auto;

		.city-name {
			position: relative;
			display: flex;
			align-items: center;
			padding: 0 24rpx;
			color: $color-text1;

			.text {
				font-size: 28rpx;
				line-height: 28rpx;
			}

			.icon-to {
				font-size: 26rpx;
				line-height: 26rpx;
				margin-left: 6rpx;
				transform: rotate(90deg);
			}

			.right-border {
				@include absVtCenter;
				right: 0;
				width: 1px;
				height: 80%;
				background-color: #b4b4b4;
			}
		}

		.input-view {
			height: 100% !important;
			flex: 1;

			.input {
				width: 100%;
				height: 100%;
				padding: 0 16rpx;
				font-size: 28rpx;
				color: $color-text1;
			}
		}
	}

	.near-list {
		width: 100%;
		height: calc(100vh - 796rpx - var(--window-bottom) - var(--status-bar-height));

		.list {
			position: relative;
			width: 100%;
			padding: 26rpx 16rpx;

			.name {
				font-size: 32rpx;
				color: #000;
				line-height: 32rpx;
				margin-bottom: 14rpx;
			}

			.info {
				font-size: 22rpx;
				color: $color-text2;
				line-height: 34rpx;
			}

			&:active {
				background-color: #cecece;
			}

			.icon-check {
				@include absVtCenter;
				right: 4%;
				color: $color-green;
				font-size: 28rpx;
			}
		}
	}
</style>
