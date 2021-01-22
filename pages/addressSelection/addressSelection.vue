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


		<!-- 地图组件 -->
		<!-- 地图中心点控件 -->
		<!-- 		<map class="uni-map" id="uniMap" :controls="mapControls" :scale="14" :latitude="locationXy.lat"
		 :longitude="locationXy.lng"></map> -->

		<div ref="map" class="map"></div>
		<div v-show="isLocate" ref="point" class="gps-point">
			<div class="content">
				<div class="top"></div>
				<div class="center"></div>
				<div class="bottom"></div>
			</div>
		</div>


		<!-- 地图组件 -->
		<!-- 附近地点列表 -->
		<scroll-view class="near-list" scroll-y="true">
			<div class="list" @tap="nearTap(item)" v-for="item in nearList" :key="item.request_id">
				<div class="name">
					{{item.title}}
				</div>
				<div class="info">
					{{item.address}}
				</div>
				<i v-if="nearSelected.id===item.id" class="icon icon-check"></i>
			</div>
		</scroll-view>

		<!-- 地址选择picker -->
		<address-picker class="address-picker" v-show="pickerShow" />
	</view>
</template>

<script>
	import config from "@/config.js"; //配置文件
	// #ifdef H5
	import TencentMap from "@/utils/TencentMap.js"; //地图组件
	// #endif
	import AddressPicker from "@/components/address-picker/address-picker"; //地区选择组件
	export default {
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
						left: 170,
						top: 94,
						width: 26,
						height: 52
					},
					iconPath: "/static/images/mine/now-location.png"
				}]
			};
		},
		methods: {
			//搜索地点
			searchLocation: function() {
				let value = this.searchValue;
				this.$jsonp("https://apis.map.qq.com/ws/place/v1/search", {
					keyword: value,
					boundary: `region(${this.nowCity.city},0)`,
					filter: `category<>公交站`,
					key: config.tencentMapKey,
					output: "jsonp",
				}).then((res) => {
					this.nearList = res.data;
				});
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
				this.$jsonp("https://apis.map.qq.com/ws/geocoder/v1/", {
						location: `${lat},${lng}`,
						key: config.tencentMapKey,
						get_poi: 1,
						output: "jsonp",
					})
					.then((res) => {
						this.nearList = res.result.pois;
						this.nowCity = res.result.ad_info;
					})
					.catch((err) => {
						uni.showToast({
							title: "坐标解析失败",
							icon: "none",
						});
					});
			},
		},
		created() {
			// this.locationXy = {
			// 	lat: this.$location.lat,
			// 	lng: this.$location.lng
			// }
			//加载地图
			setTimeout(() => {
				this.$nextTick(() => {
					TencentMap.load(this.$refs.map, {
						mapKey: config.tencentMapKey,
					}).then(({
						maps
					}) => {
						//获取当前定位
						const nowLatLng = new maps.LatLng(
							this.$location.lat,
							this.$location.lng
						);

						//当前定位逆解析
						this.getLocationByXy(this.$location);

						//地图初始化参数
						const myOptions = {
							zoom: 14,
							minZoom: 10,
							backgroundColor: "#a4ebc9",
							mapTypeControl: false,
							center: nowLatLng,
							zoomControl: true,
							mapTypeId: qq.maps.MapTypeId.ROADMAP,
						};
						//添加地图中心点
						let mapsDom = new maps.Map(TencentMap.elements, myOptions);
						mapsDom.controls[maps.ControlPosition.CENTER].push(this.$refs.point);
						setTimeout(() => {
							this.isLocate = true;
						}, 500);
						//监听地图拖动
						maps.event.addListener(mapsDom, "center_changed", () => {
							//逆解析地图中心点坐标
							this.getLocationByXy(mapsDom.getCenter());
						});
					});
				});
			}, 200);
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
