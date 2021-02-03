<template>
	<view>
		<top-status-bar></top-status-bar>
		<view class="top">
			<top-carousel class="top-carousel"></top-carousel>
			<receiving-method class="receiving-method"></receiving-method>
		</view>

		<view class="main">
			<!-- 左边点击 -->
			<view class="main-cli">
				<view v-for="(item,index) in ifiArr" :key="index" :class="['single',index === ificaArr?'main-cli-select':'']" @tap="getItem(index)">
					{{item.name}}
					<div class="point"></div>
				</view>
			</view>
			<!-- 右侧 -->
			<view class="main-con">
				<view class="select-top">
					<!-- 右侧滑动 -->
					<scroll-view class="scroll-view_H" :scroll-x="true" scroll-left="120">
						<template v-if="ifiArr[leftIndex]">
							<view v-for="(item,index) in ifiArr[leftIndex].secondPtCategoryProductVos" :key="index" :class="['select-box',index === seleStatus?'select-box-select':'']"
							 @tap="selecItem(index)">
								{{item.name}}
							</view>
						</template>
					</scroll-view>
				</view>
				<view class="query-box">
					<div class="text">
						特惠专区
					</div>
					<div class="tips">
						<div class="tips-text">
							<div class="txt">
								每日最多优惠
							</div>
							<div class="hr"></div>
						</div>
					</div>
				</view>
				<view class="content">
					<!-- 右侧商品主内容 -->
					<view class="content-query" @tap="getdetailShops(item.id)" v-for="(item,index) in foodData" :key="index">
						<view class="con-img">
							<img-view :src="`http://10.1.44.93:9010/images/${item.mainImg}`" mode="widthFix" class="conimgs" />
						</view>
						<view class="con-information">
							<view class="title">{{item.name}}</view>
							<view class="ifa-font">{{item.description}}</view>
							<view class="pri">
								<view class="vip-price">
									￥{{item.vipPrice}}
								</view>
								<view class="original-price">
									￥{{item.price}}
								</view>
								<view class="addCar">
									<i class="icon icon-shopping-cart"></i>
									<!-- <view class="num">
										2
									</view> -->
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>
<script>
	import productApi from "@/api/productApi.js";
	import shopperApi from "@/api/shopperApi.js"
	import topCarousel from "@/components/top-carousel/top-carousel.vue";
	import receivingMethod from "@/components/receiving-method/receiving-method.vue";
	import {
		appMixin
	} from "@/utils/mixin";
	export default {
		mixins: [appMixin],
		components: {
			"receiving-method": receivingMethod,
			'top-carousel': topCarousel
		},
		computed: {
			
		},
		data() {
			return {
				index: 1,
				takeArr: [{
						mess: "自提",
					},
					{
						mess: "外送",
					},
				],
				takeStatus: 0,
				seleStatus: 0,
				ificaArr: 0,
				ifiArr: [], //左侧早餐
				leftIndex: 0,
				slidetitle: 0,
				foodData: [],
			};
		},
		methods: {
			isMulti(item) {
				if (item.isMultiSpec == false) {
					shopperApi
						.addCart({



						})
				} else {
					this.getdetailShops(item.id)
				}
			},
			getdetailShops(id) {
				this.$Router.push({
					name: "detail",
					params: {
						id: id,
					},
				});
			},
			changeType(index) {
				// this.$store.commit('setIndex', index)
				this.$Router.push({
					name: 'Confirm',
					params: {
						index
					}
				})
				// console.log(index);
				this.index = index;
			},
			getItem(index) {
				this.ificaArr = index;

			},
			selecItem(index) {
				this.seleStatus = index;
			},
			takeItem(index) {
				this.takeArr = index;
			},
			getList: function() {
				productApi
					.getCategoryData({
						sendWay: "1",
					})
					.then((res) => {
						uni.hideLoading();
						this.setList(res.data)
					})
			},
			setList: function(data) {
				this.ifiArr = data;
				this.foodData = this.ifiArr[
					this.leftIndex
				].secondPtCategoryProductVos[this.slidetitle].productVos;
			}
		},
		onLoad: function() {
			if (this.$menuList.isLoad) {
				this.setList(this.$menuList.data);
			} else {
				uni.showLoading()
				this.getList();
			}
		},
	};
</script>

<style lang="scss">
	page {
		background-color: $color-page;
		height: calv(100vh - var(--window-bottom));
		overflow: hidden;
	}

	.top {
		width: 100%;
		background-color: $color-page;
		overflow: hidden;

		.top-carousel {
			width: 96%;
			height: 240rpx;
			margin: 20rpx auto;
			overflow: hidden;
			border-radius: 16rpx;
		}

		.take-away {
			position: relative;
			z-index: 10;
			top: 18rpx;
			@include flexVtCenter;
			width: 96%;
			height: 140rpx;
			background: $color-page;
			border-radius: 12rpx;
			flex-direction: row;
			justify-content: space-between;
			background-color: #fff;
			margin: 0 auto 0;

			.away-left {
				width: 50%;
				height: 70%;
				text-align: center;
				line-height: 60rpx;
				font-size: 28rpx;
			}

			.away-right {
				width: 30%;
				height: 100%;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				border-radius: 40rpx;
				letter-spacing: 4rpx;
				font-weight: lighter;
				font-size: 27rpx;

				.btn_switch {
					width: 95px;
					height: 30px;
					border-radius: 20px;
					display: flex;
					text-align: center;
					line-height: 30px;
					border: 1px solid $color-green;
					color: $color-green;
					margin: auto;
					font-size: 30rpx;

					.btn-left {
						width: 44.5px;
						height: 28px;
						border-radius: 20px;
					}

					.btn-right {
						width: 48px;
						height: 28px;
						border-radius: 20px;
					}
				}

				.active {
					background: $color-green;
					color: #fff;
				}
			}

			.away-right-select {
				width: 45%;
				height: 100%;
				background: $color-red;
				border-radius: 40rpx;
			}
		}
	}

	.main {
		position: relative;
		width: 96%;
		height: calc(100vh - 430rpx - var(--window-bottom));
		overflow: hidden;
		display: flex;
		flex-direction: row;
		margin: 20rpx auto 0;
		background-color: $color-page;
		overflow: hidden;

		.main-cli {
			width: 23.6%;
			height: 100%;
			background: #fff;
			overflow: hidden;
			overflow-y: scroll;
			background-color: $color-page;

			.single {
				position: relative;
				@include flexCenter;
				width: 100%;
				height: 90rpx;
				letter-spacing: 4rpx;
				font-size: 30rpx;
				border-radius: 14rpx;
				overflow: hidden;

				.point {
					position: absolute;
					top: 8rpx;
					left: 0;
					transform: translateX(-50%);
					width: 42rpx;
					height: 42rpx;
					border-radius: 50%;
					background-color: $color-green;
					opacity: 0.36;
				}
			}
		}

		.main-cli-select {
			background: #fff;
			color: $color-text0;
		}

		.main-con {
			width: 75%;
			height: 100%;
			display: flex;
			flex-direction: column;
			margin-left: auto;
			background-color: #fff;
			border-radius: 14rpx;

			.select-top {
				width: 100%;
				height: 80rpx;
				overflow: hidden;
				padding-left: 22rpx;
				margin-top: 12rpx;

				.scroll-view_H {
					width: 100%;
					height: 100rpx;
					white-space: nowrap;

					.select-box {
						width: 200rpx;
						height: 60rpx;
						opacity: 0.8;
						margin-left: 2rpx;
						display: inline-block;
						text-align: center;
						line-height: 60rpx;
						margin: 0 10rpx;
						font-size: 28rpx;
						letter-spacing: 7rpx;
						background: $color-text4;
						border-radius: 8rpx;
					}
				}

				.select-box-select {
					background: $color-green-transparent !important;
					color: $color-green;
				}
			}

			.query-box {
				width: 100%;
				height: 90rpx;
				padding: 8rpx 0 0 32rpx;

				.text {
					color: $color-text0;
					font-size: 28rpx;
					line-height: 28rpx;
					font-weight: 700;
				}

				.tips {
					width: 100%;
					height: 22rpx;
					margin-top: 8rpx;
					padding-right: 18rpx;

					.tips-text {
						@include flexVtCenter;
						flex-flow: row nowrap;

						.txt {
							flex: 1;
							font-size: 18rpx;
							color: $color-text3;
							white-space: nowrap;
						}

						.hr {
							flex: 10;
							height: 1px;
							background-color: #eee;
							margin-left: 14rpx;
						}
					}

				}
			}

			.content {
				width: 100%;
				height: 100%;
				overflow: hidden;
				overflow-y: scroll;
				padding-left: 30rpx;

				.content-query {
					width: 100%;
					height: 230rpx;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;
					border-bottom: 1px solid $color-page;

					.con-img {
						width: 30%;
						height: 100%;
						display: flex;
						align-items: center;

						.conimgs {
							width: 100%;
							height: 55%;
						}
					}

					.con-information {
						width: 75%;
						height: 100%;
						padding-left: 30rpx;

						.title {
							font-size: 30rpx;
							margin-top: 20rpx;
							letter-spacing: 5rpx;
						}

						.ifa-font {
							font-size: 26rpx;
							color: $color-text3;
							line-height: 50rpx;
							letter-spacing: 2rpx;
							font-weight: lighter;
						}

						.pri {
							width: 100%;
							height: 55rpx;
							display: flex;
							flex-direction: row;
							position: relative;
							line-height: 70rpx;
							align-items: center;

							.vip-price {
								color: $color-red;
								width: 77rpx;
								height: 72rpx;
								font-weight: bold;
								font-size: 35rpx;
								line-height: 77rpx;
							}

							.original-price {
								font-size: 25rpx;
								color: $color-text3;
								text-decoration: line-through;
								margin-left: 20rpx;
								padding-top: 14rpx;
							}

							.addCar {
								width: 50rpx;
								height: 50rpx;
								background: $color-green;
								border-radius: 50%;
								position: absolute;
								right: 50rpx;
								@include flexCenter;

								.icon-shopping-cart {
									color: #fff;
									font-size: 32rpx;
								}

								.num {
									@include flexCenter;
									width: 34rpx;
									height: 34rpx;
									position: absolute;
									background: $color-red;
									border-radius: 50%;
									color: #FFFFFF;
									font-size: 20rpx;
									line-height: 20rpx;
									font-weight: lighter;
									right: -10rpx;
									top: -18rpx;
									opacity: 0.8;
								}
							}
						}
					}
				}
			}
		}
	}
</style>
