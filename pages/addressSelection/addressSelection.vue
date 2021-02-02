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
				<input @input="searchLocation" v-model="searchValue" class="input" type="text" placeholder="输入地址" focus>
			</view>
		</view>


		<!-- 地图中心点控件 -->
		<map class="uni-map" id="uniMap" :controls="controlData" :scale="14" :latitude="locationXy.lat" :longitude="locationXy.lng"
		 @regionchange="webMapChange"></map>

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
		jsonpHandle
	} from "../../utils/tool.js"
	import AddressPicker from "@/components/address-picker/address-picker"; //地区选择组件
	export default {
		mixins: [appMixin],
		components: {
			"address-picker": AddressPicker,
		},
		data() {
			return {
				isLocate: false, //地图初始化完成状态
				pickerShow: false,
				nearList: [],
				nearSelected: {},
				searchValue: "",
				nowCity: {},
				locationXy: {},
				//原生map组件 中心控件参数
				mapControls: [{
					id: 'mapCenter',
					position: {
						height: 52,
						left: 20,
						top: 20,
						width: 26,
					},
					iconPath: "/static/images/mine/now-location.png"
				}],
				webChangeStatus: true,
			};
		},
		computed: {
			controlData() {
				let deviceWidth = this.$deviceInfo.windowWidth;
				let rpxPx = deviceWidth / 750;
				let controlTop = rpxPx * 600 * 0.5 - 26;
				let controlLeft = deviceWidth * 0.5 - 13;
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
					keyword: value,
					boundary: `region(${this.nowCity.city},0)`,
					filter: `category<>公交站`,
					key: config.tencentMapKey,
				}).then(res => {
					if (res) {
						this.nearList = res;
						this.locationXy = {
							lat: res[0].location.lat,
							lng: res[0].location.lng
						}
					}
				})
			},
			//选择地点
			nearTap: function(data) {
				this.nearSelected = data;
				uni.$emit("locationSelected", data); //传递选择结果
				setTimeout(() => {
					this.$Router.back(1);
				}, 500);
				console.log(data);
			},
			//坐标逆解析
			getLocationByXy: function({
				lat,
				lng
			}) {
				jsonpHandle("https://apis.map.qq.com/ws/geocoder/v1/", {
					location: `${lat},${lng}`,
					key: config.tencentMapKey,
					get_poi: 1
				}).then(res => {
					this.nearList = res.pois;
					this.nowCity = res.ad_info;
				})
			}
		},
		onLoad() {
			//加载地图
			let xyLoad = setInterval(() => {
				if (this.$locationXy.lat) {
					clearInterval(xyLoad)
					this.getLocationByXy(this.$locationXy);
				}
			}, 50);

		},
		onHide() {

		},
		mounted() {
			//关闭address-picker
			uni.$on("addressPickerClose", () => {
				this.pickerShow = false;
			});
			//接收城市选择结果
			uni.$on("citySelected", (data) => {
				this.nowCity = data;
			});
		},
	};
</script>

<style lang="scss">
	page {
		background: #fff;
	}

	.uni-map {
		width: 100%;
		height: 600rpx;
	}

	.map {
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
