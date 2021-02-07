<template>
	<view>
		<top-bar pageTitle="确认订单"></top-bar>
		<view class="top" v-if="$receivingMethod">
			{{timePickerStatus?'':'明天'}}{{deliveryTimeText}}送达
		</view>
		<view class="top" v-else>
			{{timePickerStatus?'':'明天'}}{{takeTimeText}}可取
		</view>

		<receiving-method :deliveryTimeText="deliveryTimeText" :showDate="true" class="receiving-method"></receiving-method>

		<view class="commodity-list view">
			<view class="tips">系统已为您选择最优折扣方案</view>
			<view class="list" v-for="item in $shoppingCart.items" :key="item.skuCode">
				<img-view class="list-img" :src="item.badgeImg"></img-view>
				<view class="info">
					<view class="text-1">
						{{item.skuName}}
					</view>
					<view class="text-2">
						{{item.specsValues}}
					</view>
				</view>
				<view class="quantity">
					x {{item.quantity}}
				</view>
				<view class="price-view">
					<view class="new-price">
						¥ {{item.countPrice}}
					</view>
					<view v-if="item.originPrice*item.quantity!==item.countPrice" class="old-price">
						¥ {{item.originPrice*item.quantity}}
					</view>
				</view>
				<view class="discount-tips">
					会员优惠
				</view>
			</view>
			<div class="shipping">运费 ¥{{$shoppingCart.deliveryFee}}</div>

			<view class="all-price">
				<view class="text-1">
					小计
				</view>
				<view class="new-price">
					¥{{$shoppingCart.totalPrice}}
				</view>
				<view class="old-price" v-if="$shoppingCart.totalPrice!==$shoppingCart.totalOriginPrice">
					¥{{$shoppingCart.totalOriginPrice}}
				</view>
			</view>
		</view>

		<view class="pay-type view">
			<view class="pay-list">
				<view class="tit">
					选择优惠
				</view>
				<view class="right">
					<view class="text is-true">
						1个可用
					</view>
					<i class="icon icon-to"></i>
				</view>
				<view class="hr"></view>
			</view>
			<view class="pay-list">
				<view class="tit">
					支付方式
				</view>
				<view class="right">
					<image class="wx-pay-img" src="/static/images/shopping-car/wx-pay.png"></image>
					<view class="text pay-text">
						微信支付
					</view>
					<i class="icon icon-to"></i>
				</view>
			</view>
		</view>
		<view class="remarks view">
			<view class="list">
				<view class="tit">
					备注特殊要求
				</view>
				<view class="right">
					<i class="icon icon-to"></i>
				</view>
			</view>
		</view>

		<view class="to-pay-btn">
			<view class="text-1">
				总价¥{{$shoppingCart.totalOriginPrice}} <text class="discount-text" v-if="$shoppingCart.totalOriginPrice-$shoppingCart.totalPrice>0">优惠¥{{$shoppingCart.totalOriginPrice-$shoppingCart.totalPrice}}</text>
			</view>
			<view class="text-2">
				实付¥{{$shoppingCart.totalPrice}}
			</view>
			<view class="pay-btn" @tap="submitOrder">
				去支付
			</view>
		</view>
		<view class="to-pay-btn-plc"></view>

		<div v-if="timePickerShow" @tap="timePickerShow = false" class="time-picker">
			<div class="picker-view" @tap.stop="">
				<div class="tit">
					选择{{$receivingMethod?'送达':'自取'}}时间
					<i @tap="timePickerShow = false" class="icon icon-close"></i>
				</div>
				<div class="picker-main">
					<div class="days">
						<div :class="['list',timePickerStatus?'day-ck':'']" @tap="timePickerStatus = true">
							今天02月04日
						</div>
						<div :class="['list',!timePickerStatus?'day-ck':'']" @tap="timePickerStatus = false">
							明天02月05日
						</div>
					</div>
					<scroll-view v-show="timePickerStatus" class="scroll-view" scroll-y="true">
						<div v-for="item in todayArr" @tap="pickerTap(item)" :key="item.time" :class="['time-list',timeSelect.time===item.time?'ck':'']">
							{{item.timeText}}
							<i v-if="timeSelect.time===item.time" class="icon icon-check"></i>
							<div class="hr"></div>
						</div>
					</scroll-view>
					<scroll-view v-show="!timePickerStatus" class="scroll-view" scroll-y="true">
						<div v-for="item in tomorrowArr" @tap="pickerTap(item)" :key="item.time" :class="['time-list',timeSelect.time===item.time?'ck':'']">
							{{item.timeText}}
							<i v-if="timeSelect.time===item.time" class="icon icon-check"></i>
							<div class="hr"></div>
						</div>
					</scroll-view>
				</div>
				<div class="time-btn" @tap="changeTime">
					确定
				</div>
			</div>
		</div>

	</view>
</template>

<script>
	// #ifdef H5
	import wx from "weixin-js-sdk"; //微信支付js-sdk
	// #endif
	import {
		timeCv,
		openWebView,
		getNonceStr
	} from "@/utils/tool.js";
	import sha1 from "sha1"; //sha1加密
	import shopperApi from "@/api/shopperApi.js";
	import orderApi from "@/api/orderApi.js";
	import weChatApi from "@/api/weChatApi.js";
	import userApi from "@/api/userApi.js"
	import receivingMethod from "@/components/receiving-method/receiving-method.vue"; //切换地址组件
	import {
		appMixin
	} from "@/utils/mixin";
	export default {
		mixins: [appMixin],
		components: {
			"receiving-method": receivingMethod,
		},
		data() {
			return {
				address: {},
				deliveryTime: 0,
				deliveryTimeText: '',
				takeTime: 0,
				takeTimeText: '',

				timePickerShow: false,
				timePickerStatus: true,
				todayArr: [],
				tomorrowArr: [],
				timeSelect: {}
			};
		},
		methods: {
			pickerTap: function(time) {
				this.timeSelect = time;
			},

			getHmTime: function(time) {
				let timeText = timeCv(time);
				return timeText.substring(timeText.length - 5, timeText.length)
			},
			
			
			
			submitOrder: function() {
				uni.showLoading({
					mask: true,
					title: "正在提交订单"
				})
				const orderInfo = this.$shoppingCart;
				// orderApi
				// 	.postOrder({
				// 		orderType: this.$receivingMethod?'1':'2',
				// 		orderAmount: orderInfo.totalPrice,
				// 		freightAmount: orderInfo.deliveryFee,
				// 		activityAmount: orderInfo.totalPrice,
				// 		consignId: this.$receivingMethod?this.$currentAddress.id,
				// 		isNeedInvoice: false,
				// 		isStartOrdering: true,
				// 		storeCode: 96531,
				// 		storeName: "宝城路店",
				// 		storeTel: "",
				// 		storeAddress: "宝城路456号（靠近莘朱路）",
				// 		couponCode: "",
				// 		invoiceTitle: "",
				// 		deskNo: "",
				// 		tablewareAmount: "",
				// 		plannedDeliverTime: new Date().getTime() + 3600000,
				// 		paySource: 2,
				// 	})
				// 	.then((res) => {
				// 		uni.hideLoading();
				// 	})
				// 	.catch((err) => {
				// 		console.log(err);
				// 	});
			},
			changeTime: function() {
				this.deliveryTime = this.timeSelect.time;
				this.deliveryTimeText = this.timeSelect.timeText;
				this.takeTime = this.timeSelect.time;
				this.takeTimeText = this.timeSelect.takeTimeText;
				this.timePickerShow = false;
			},

			createPickerData: function() {
				let that = this;
				let store;
				if (this.$receivingMethod) {
					store = this.$storeList.find(item => { //当前收货地址所属门店信息
						return item.code == this.$currentAddress.storeId
					})
				} else {
					store = this.$currentStore;
				}

				const now = new Date();
				const nowDate = parseInt((new Date().getTime() / 1000).toString());
				let storeStart = Number(store.openingBeginTime.substring(0, 2)); //门店营业开始小时
				let storeEnd = Number(store.openingEndTime.substring(0, 2)); //……结束……
				let today = nowDate - (nowDate % 86400) - 3600 * 8; //今天0点时间戳
				let tomorrow = today + 86400; //明天0点时间戳
				let todayStart = nowDate + (600 - nowDate % 600) + 30 * 60; //today + storeStart * 3600; //今天门店营业开始时间戳
				let todayEnd = today + storeEnd * 3600; //……结束……
				let tomorrowStart = tomorrow + storeStart * 3600; //today + storeStart * 3600; //今天门店营业开始时间戳
				let tomorrowEnd = tomorrow + storeEnd * 3600; //……结束……

				this.todayArr = createArr(todayStart, todayEnd, true);
				this.tomorrowArr = createArr(tomorrowStart, tomorrowEnd, false);

				//生成数组
				function createArr(start, end, isToday) {
					let arr = [];
					for (let i = 0; i <= end - start; i += 600) {
						arr.push({
							time: (start + i) * 1000,
							timeText: timeCv((start + i) * 1000, 'hm')
						})
					}
					if (isToday) {
						let timeObj = {
							time: nowDate * 1000 + (30 * 60000),
							timeText: '尽快送达 ' + timeCv(nowDate * 1000 + (30 * 60000), 'hm'),
						}
						arr.unshift(timeObj)
						that.timeSelect = timeObj;

						that.deliveryTime = timeObj.time;
						that.deliveryTimeText = timeObj.timeText;
						that.takeTime = timeObj.time;
						that.takeTimeText = timeObj.takeTimeText;
					}
					return arr
				}
			}
		},
		onLoad() {
			//订单时间初始化
			this.createPickerData();

			uni.$on('timepicker', () => {
				this.timePickerShow = true;
			});

			setInterval(() => {
				this.refreshTime();
			}, 60000);
		},
	};
</script>

<style lang="scss">
	page {
		background-color: $color-page;
	}

	.view {
		position: relative;
		width: 96%;
		margin: 0 auto;
		border-radius: 16rpx;
		padding: 0 18rpx;
		background-color: #fff;
	}

	.top {
		@include flexCenter;
		width: 100%;
		height: 140rpx;
		font-size: 36rpx;
		font-weight: 700;
		color: #000;
		letter-spacing: 1rpx;
	}

	.modify-date {
		@include flexVtCenter;
		width: 96%;
		height: 68rpx;
		margin: 0 auto;
		background-color: #fff;

		.tit {
			font-size: 28rpx;
			line-height: 28rpx;
			color: $color-text0;
		}

		.right {
			@include flexVtCenter;
			margin-left: auto;

			.text {
				font-size: 28rpx;
				line-height: 28rpx;
				color: $color-green;
				font-weight: 700;
			}

			.icon-to {
				font-size: 24rpx;
				line-height: 24rpx;
				color: $color-text3;
			}
		}
	}

	.commodity-list {
		padding-top: 48rpx;
		margin-top: 18rpx;

		.tips {
			position: absolute;
			top: 0;
			right: 0;
			padding: 8rpx 8rpx 8rpx 34rpx;
			font-size: 20rpx;
			border-radius: 0 0 0 999rpx;
			background-color: #fff8f6;
			color: $color-red;
		}

		.list {
			position: relative;
			display: flex;
			width: 100%;
			height: 140rpx;
			padding: 6rpx 0;

			.list-img {
				width: 118rpx;
				height: 118rpx;
			}

			.info {
				color: $color-text0;
				margin: 14rpx 0 0 14rpx;

				.text-1 {
					font-size: 30rpx;
					line-height: 30rpx;
					margin-bottom: 20rpx;
				}

				.text-2 {
					font-size: 22rpx;
					color: $color-text1;
					line-height: 22rpx;
					font-weight: lighter;
				}
			}

			.quantity {
				position: absolute;
				top: 13rpx;
				left: 58%;
				font-size: 26rpx;
				color: $color-text4;
			}

			.price-view {
				@include flexVtCenter;
				height: 32rpx;
				margin: 12rpx 0 0 auto;

				.new-price {
					font-size: 28rpx;
					line-height: 28rpx;
					color: $color-red;
					font-weight: 700;
					margin-right: 8rpx;
				}

				.old-price {
					font-size: 20rpx;
					line-height: 20rpx;
					color: $color-text4;
					text-decoration: line-through;
				}
			}

			.discount-tips {
				position: absolute;
				right: 0rpx;
				bottom: 36rpx;
				padding: 6rpx;
				font-size: 20rpx;
				line-height: 20rpx;
				color: $color-red;
				border-radius: 3px;
				border: 1px solid $color-red-transparent;
			}
		}

		.shipping {
			@include flexVtCenter;
			width: 100%;
			height: 42rpx;
			font-size: 20rpx;
			color: $color-text0;
			justify-content: flex-end;
			border-top: 1px solid #e3e3e3;
			padding-right: 6rpx;
		}

		.all-price {
			@include flexVtCenter;
			justify-content: flex-end;
			width: 100%;
			height: 78rpx;

			.text-1 {
				font-size: 26rpx;
				line-height: 26rpx;
				color: $color-text0;
				margin-right: 8rpx;
			}

			.new-price {
				font-size: 34rpx;
				line-height: 34rpx;
				color: $color-text0;
				font-weight: 700;
				margin-right: 6rpx;
			}

			.old-price {
				font-size: 22rpx;
				line-height: 22rpx;
				color: $color-text4;
				padding-top: 6rpx;
				text-decoration: line-through;
			}
		}
	}

	.pay-type,
	.remarks {
		margin-top: 18rpx;

		.pay-list,
		.list {
			@include flexVtCenter;
			position: relative;
			width: 100%;
			height: 100rpx;

			.tit {
				font-size: 26rpx;
				line-height: 26rpx;
				color: $color-text1;
			}

			.right {
				@include flexVtCenter;
				margin-left: auto;
				font-size: 20rpx;
				line-height: 20rpx;

				.is-true {
					color: $color-red;
				}

				.icon {
					margin-left: 8rpx;
					font-size: 24rpx;
					line-height: 24rpx;
					padding-top: 2rpx;
					color: $color-text3;
				}

				.wx-pay-img {
					width: 48rpx;
					height: 48rpx;
					margin-right: 14rpx;
				}

				.pay-text {
					font-size: 28rpx;
				}
			}

			.hr {
				position: absolute;
				bottom: 0px;
				left: 0;
				width: 100%;
				height: 1rpx;
				background-color: #e3e3e3;
			}
		}
	}

	.remarks {
		margin-top: 18rpx;
	}

	.to-pay-btn {
		@include flexVtCenter;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 110rpx;
		background-color: #fff;
		padding: 0 32rpx;

		.text-1 {
			font-size: 24rpx;
			color: $color-text3;

			.discount-text {
				margin-left: 4rpx;
			}
		}

		.text-2 {
			font-size: 32rpx;
			font-weight: 700;
			color: $color-text0;
			margin-left: 12rpx;
		}

		.pay-btn {
			@include btn;
			width: 160rpx;
			height: 70rpx;
			background-color: $color-red;
			border-radius: 381rpx;
			margin-left: auto;
		}
	}

	.time-picker {
		@include mask;

		.picker-view {
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 680rpx;
			background-color: #fff;
			border-radius: 14rpx 14rpx 0 0;

			.tit {
				position: relative;
				@include flexCenter;
				width: 100%;
				height: 80rpx;
				font-size: 26rpx;
				color: $color-text1;

				.icon-close {
					@include absVtCenter;
					right: 4%;
					font-size: 32rpx;
					color: $color-text3;
					line-height: 32rpx;
				}
			}

			.picker-main {
				display: flex;
				width: 100%;
				height: 480rpx;
				justify-content: space-between;

				.days {
					width: 240rpx;
					height: 100%;
					background-color: $color-page;

					.list {
						@include flexCenter;
						width: 100%;
						height: 90rpx;
						font-size: 28rpx;
						color: $color-text2;
					}

					.day-ck {
						background-color: #fff;
						color: $color-text0;
					}
				}

				.scroll-view {
					flex: 1;
					height: 100%;

					.time-list {
						position: relative;
						@include flexVtCenter;
						width: 100%;
						height: 90rpx;
						font-size: 28rpx;
						color: $color-text0;
						padding: 0 24rpx;

						.icon-check {
							margin-left: auto;
							font-size: 28rpx;
							color: $color-green;
						}

						.hr {
							@include absLvCenter;
							bottom: 0;
							width: 92%;
							height: 1px;
							background-color: $color-page;
						}
					}

					.ck {
						color: $color-green;
						font-weight: 700;
					}
				}
			}

			.time-btn {
				@include flexCenter;
				width: 86%;
				height: 90rpx;
				font-size: 32rpx;
				color: #fff;
				border-radius: 999px;
				@include btnGreen-gradient;
				margin: 14rpx auto;
			}
		}
	}
</style>
