<template>
	<view>
		<top-bar pageTitle="确认订单"></top-bar>
		<view class="top">
			立即自取(约15:50可取)
		</view>
		<receiving-method class="receiving-method"></receiving-method>
		<view class="commodity-list view">
			<view class="tips">系统已为您选择最优折扣方案</view>
			<view class="list">
				<img-view class="list-img" src="../../../../static/images/home/shop-2.png"></img-view>
				<view class="info">
					<view class="text-1">
						大草莓
					</view>
					<view class="text-2">
						大/好大一个
					</view>
				</view>
				<view class="quantity">
					x 1
				</view>
				<view class="price-view">
					<view class="new-price">
						¥ 66.88
					</view>
					<view class="old-price">
						¥ 99.99
					</view>
				</view>
				<view class="discount-tips">
					会员优惠
				</view>
			</view>
			<view class="list">
				<img-view class="list-img" src="../../../../static/images/home/shop-2.png"></img-view>
				<view class="info">
					<view class="text-1">
						大草莓
					</view>
					<view class="text-2">
						大/好大一个
					</view>
				</view>
				<view class="quantity">
					x 1
				</view>
				<view class="price-view">
					<view class="new-price">
						¥ 66.88
					</view>
					<view class="old-price">
						¥ 99.99
					</view>
				</view>
				<view class="discount-tips">
					会员优惠
				</view>
			</view>
			<view class="all-price">
				<view class="text-1">
					小计
				</view>
				<view class="new-price">
					¥122.88
				</view>
				<view class="old-price">
					¥188.99
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
				总价¥998 优惠¥666
			</view>
			<view class="text-2">
				实付¥332
			</view>
			<view class="pay-btn" @tap="submitOrder">
				去支付
			</view>
		</view>
		<view class="to-pay-btn-plc"></view>

	</view>
</template>

<script>
	// #ifdef H5
	import wx from "weixin-js-sdk"; //微信支付js-sdk
	// #endif
	import {
		openWebView
	} from "@/utils/tool.js";
	import sha1 from "sha1";
	import shopperApi from "@/api/shopperApi.js";
	import orderApi from "@/api/orderApi.js";
	import weChatApi from "@/api/weChatApi.js";
	import {
		getNonceStr
	} from "@/utils/tool.js";
	import receivingMethod from "@/components/receiving-method/receiving-method.vue";
	export default {
		components: {
			"receiving-method": receivingMethod,
		},
		data() {
			return {
				shoppingList: [],
			};
		},
		methods: {
			submitOrder: function() {
				const orderInfo = this.shoppingList;
				console.log(orderInfo);
				orderApi
					.postOrder({
						remark: "",
						orderType: "1",
						activityId: "",
						orderAmount: orderInfo.totalPrice,
						freightAmount: orderInfo.deliveryFee,
						activityAmount: orderInfo.totalPrice,
						consignId: "668752322609647616",
						isNeedInvoice: false,
						isStartOrdering: true,
						storeCode: 96531,
						storeName: "宝城路店",
						storeTel: "",
						storeAddress: "宝城路456号（靠近莘朱路）",
						couponCode: "",
						invoiceTitle: "",
						deskNo: "",
						tablewareAmount: "",
						plannedDeliverTime: new Date().getTime() + 3600000,
						paySource: 2,
					})
					.then((res) => {
						console.log(res);
						openWebView(res.data.data+'&redirect_url=http://10.1.50.57:8080/', "支付")
						// uni.requestPayment({
						// 	provider: 'wxpay',
						// 	orderInfo: JSON.stringify(res.data.data),
						// 	success: (res) => {
						// 		console.log(res);
						// 	},
						// 	fail: (err) => {
						// 		console.log(err);
						// 		uni.showToast({
						// 			title: '支付失败',
						// 			position: 'center',
						// 			duration: 1500
						// 		});
						// 	}
						// });

						// wx.chooseWXPay({
						// 	timestamp: res.data.timestamp,
						// 	nonceStr: res.data.noncestr,
						// 	package: `prepay_id=res.data.partnerid`,
						// 	signType: "SHA1",
						// 	paySign: res.data.sign,
						// 	success: (res) => {
						// 		alert(JSON.stringify(res));
						// 	},
						// });
					})
					.catch((err) => {
						console.log(err);
					});
			},
			toPay: function({
				orderNo,
				payAmount
			}) {
				orderApi
					.payOrder({
						orderNo: orderNo,
						payAmount: payAmount,
						payMethod: 2,
					})
					.then((res) => {
						console.log(res);
					});
			},
			getShoppingList: function() {
				shopperApi.getCartInfo().then((res) => {
					console.log('购物车列表', res);
					this.shoppingList = res.data;
				});
			},
			getStoreList: function() {
				orderApi.getStoreList().then((res) => {
					//console.log(res);
				});
			},
		},
		onLoad() {
			this.getShoppingList();
			this.getStoreList();
			uni.getProvider({
				service: 'payment',
				success: res => {
					//console.log(res);
				}
			})

			return
			//获取ticket
			weChatApi.getJsApiTicket().then((res) => {
				//微信JS-SDK初始化
				let time = parseInt(new Date().getTime() / 1000);
				let noncestr = getNonceStr();
				let str =
					`jsapi_ticket=${res.data
        }&noncestr=${noncestr}&timestamp=${time}&url=${location.href.split("#")[0]
        }`;
				let signature = sha1(str);

				wx.config({
					debug: false,
					appId: "wxc1bdb5fea6bc9e6d",
					timestamp: time,
					nonceStr: noncestr,
					signature: signature,
					jsApiList: [],
					openTagList: ["wx-open-launch-weapp", "chooseWXPay"] //小程序跳转按钮、微信支付
				});

				wx.ready(() => {
					console.log('微信JS-SDK初始化成功');
				});
				wx.error((res) => {
					console.log('微信JS-SDK初始化失败', res);
				});
			});
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

		.all-price {
			@include flexVtCenter;
			justify-content: flex-end;
			width: 100%;
			height: 88rpx;
			border-top: 1px solid #e3e3e3;

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
</style>
