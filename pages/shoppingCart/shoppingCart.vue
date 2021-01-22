<template>
	<view>
		<view class="top-car">
			<view class="top-status-plc"></view>
			<view class="top-car-content">
				<view class="left">

				</view>
				<view class="cars">
					<view class="car-font">
						购物车
					</view>
					<view class="local">配送至:徐汇区日月光中心</view>
				</view>
				<view class="edits" @tap="isEdit = !isEdit">{{ isEdit?'完成':'编辑' }}</view>
			</view>
		</view>
		<view class="shopping-cart" v-if="isLoad && carShop.length">
			<view class="list" @tap="thatIndex = index" v-for="(item,index) in carShop" :key="index">
				<radio class="radio" style="transform: scale(0.94)" color="#00C130" v-if="isEdit" :checked="item.check" @tap="singCheck(item)" />
				<img-view src="/static/images/home/shop-2.png" mode="widthFix" class="img-view"></img-view>
				<!-- <img-view :src="`http://10.1.44.108:9003/images/${item.smallImage}`" mode="widthFix" class="conimgs"/> -->
				<view class="goods-info">
					<view class="goods-name">
						{{ item.skuName }}
					</view>
					<view class="goods-result">{{item.specsValues}}</view>
					<view class="goods-price">
						<view class="last-price"><text class="rmb">¥{{ item.price }}</text></view>
						<view class="original-price" v-if="item.price !== item.originPrice">¥{{ item.originPrice }}</view>
					</view>
					<stepper class="stepper" :info="item" :change="change" :value="item.quantity"></stepper>
				</view>
				<view class="hr"></view>
			</view>
		</view>
		<view class="car-img" v-if="isLoad && !carShop.length">
			<image src="../../static/images/car/car.png" mode="" class="imgscar"></image>
		</view>

		<template v-if="!isEdit">
			<view class="viewiding-line">
				<view class="hr"></view>
				<view class="point"></view>
				<view class="text">猜你喜欢</view>
				<view class="point"></view>
				<view class="hr"></view>
			</view>
			<view class="recommend">
				<view class="list">
					<img-view class="img-view" mode="widthFix" src="/static/images/shopping-car/caomei.jpg" />
					<view class="name">大草莓大草莓大草莓大草莓大草莓大草莓</view>
					<view class="price">
						<view class="last-price"><text class="rmb">¥</text>99</view>
						<view class="original-price">¥28</view>
					</view>
					<view class="add-btn">
						<i class="icon icon-shopping-cart"></i>
					</view>
				</view>
				<view class="list">
					<img-view class="img-view" mode="widthFix" src="/static/images/shopping-car/caomei.jpg" />
					<view class="name">大草莓大草莓大草莓大草莓大草莓大草莓</view>
					<view class="price">
						<view class="last-price"><text class="rmb">¥</text>99</view>
						<view class="original-price">¥28</view>
					</view>
					<view class="add-btn">
						<i class="icon icon-shopping-cart"></i>
					</view>
				</view>
				<view class="list">
					<img-view class="img-view" mode="widthFix" src="/static/images/shopping-car/caomei.jpg" />
					<view class="name">大草莓大草莓大草莓大草莓大草莓大草莓</view>
					<view class="price">
						<view class="last-price"><text class="rmb">¥</text>99</view>
						<view class="original-price">¥28</view>
					</view>
					<view class="add-btn">
						<i class="icon icon-shopping-cart"></i>
					</view>
				</view>
				<view class="list">
					<img-view class="img-view" mode="widthFix" src="/static/images/shopping-car/caomei.jpg" />
					<view class="name">大草莓大草莓大草莓大草莓大草莓大草莓</view>
					<view class="price">
						<view class="last-price"><text class="rmb">¥</text>99</view>
						<view class="original-price">¥28</view>
					</view>
					<view class="add-btn">
						<i class="icon icon-shopping-cart"></i>
					</view>
				</view>
				<view class="list">
					<img-view class="img-view" mode="widthFix" src="/static/images/shopping-car/caomei.jpg" />
					<view class="name">大草莓大草莓大草莓大草莓大草莓大草莓</view>
					<view class="price">
						<view class="last-price"><text class="rmb">¥</text>99</view>
						<view class="original-price">¥28</view>
					</view>
					<view class="add-btn">
						<i class="icon icon-shopping-cart"></i>
					</view>
				</view>
				<view class="list">
					<img-view class="img-view" mode="widthFix" src="/static/images/shopping-car/caomei.jpg" />
					<view class="name">大草莓大草莓大草莓大草莓大草莓大草莓</view>
					<view class="price">
						<view class="last-price"><text class="rmb">¥</text>99</view>
						<view class="original-price">¥28</view>
					</view>
					<view class="add-btn">
						<i class="icon icon-shopping-cart"></i>
					</view>
				</view>
				<view class="list">
					<img-view class="img-view" mode="widthFix" src="/static/images/shopping-car/caomei.jpg" />
					<view class="name">大草莓大草莓大草莓大草莓大草莓大草莓大草莓大草莓大草莓大草莓大草莓大草莓</view>
					<view class="price">
						<view class="last-price"><text class="rmb">¥</text>99</view>
						<view class="original-price">¥28</view>
					</view>
					<view class="add-btn">
						<i class="icon icon-shopping-cart"></i>
					</view>
				</view>
				<view class="list">
					<img-view class="img-view" mode="widthFix" src="/static/images/shopping-car/caomei.jpg" />
					<view class="name">大草莓大草莓大草莓</view>
					<view class="price">
						<view class="last-price"><text class="rmb">¥</text>99</view>
						<view class="original-price">¥28</view>
					</view>
					<view class="add-btn">
						<i class="icon icon-shopping-cart"></i>
					</view>
				</view>
				<view class="list">
					<img-view class="img-view" mode="widthFix" src="/static/images/shopping-car/caomei.jpg" />
					<view class="name">大草莓大草莓大草莓大草莓大草莓大草莓</view>
					<view class="price">
						<view class="last-price"><text class="rmb">¥</text>99</view>
						<view class="original-price">¥28</view>
					</view>
					<view class="add-btn">
						<i class="icon icon-shopping-cart"></i>
					</view>
				</view>
			</view>

		</template>

		<view class=" compiler" v-if="isEdit">
			<view class="select-all">
				<radio style="transform: scale(0.94)" :checked="editAll" color="#00C130" @tap="checkAll()" />全选
			</view>
			<view class="delete" @tap="deleteShop()">
				删除
			</view>
		</view>
		<view class="to-pay" @tap="toSubmit" v-else>
			<view class="select-all">
				<!-- <radio style="transform: scale(0.94)" color="#00C130"/>全选 -->
			</view>
			<view class="price-data">
				<text space="nbsp" class="text-1">不含运费 合计:<text class="pay-num">¥66</text></text>
				<text space="nbsp" class="text-2">已减: ¥23 优惠明细</text>
			</view>
			<view class="to-btn">去结算(9)</view>
		</view>

		<view class="to-pay-plc"></view>
	</view>
</template>

<script>
	import shopperApi from "@/api/shopperApi.js";
	import imgView from "../../components/img-view/img-view.vue";
	export default {
		components: {
			imgView,
		},
		data() {
			return {
				isLoad: false,
				carShop: [],
				isEdit: false,
				editAll: false,
				thatIndex: -1
			};
		},
		methods: {
			toSubmit: function() {
				this.$Router.push({
					name: 'submitOrder'
				})
			},
			deleteShop: function() {
				// 全选按钮为true时执行清空接口
				if (this.editAll) {
					uni.showModal({
						title: "确定要删除吗",
						showCancel: true,
						success: (res) => {
							if (res.confirm) {
								//清楚全部商品接口
								shopperApi
									.clearCartInfo({

									}).then((res) => {
										this.carShop = []
										this.editAll = false
										// console.log(res, ccccccc);
									})
							}
						}
					})

				} else { //否则执行删除接口
					let str = "";
					let arr = [];
					this.carShop.forEach((item) => {
						if (item.check) {
							str += item.skuCode + ","
						} else {
							arr.push(item)
						}
					})
					str = str.substring(0, str.length - 1);
					uni.showModal({
						title: "确定要删除吗",
						showCancel: true,
						success: (res) => {
							if (res.confirm) {
								shopperApi
									.deleteCartInfo({
										skuCodes: str,
									}).then((res) => {
										uni.showToast({
											title: "删除成功",
										});
										this.carShop = arr;
									})
							}
						}
					})

				}
			},
			//全选按钮
			checkAll: function() {
				//切换全选选中状态
				this.editAll = !this.editAll
				//为true时
				if (this.editAll) {
					//遍历商品下每一个item 并修改它们的属性值check为true
					this.carShop.forEach((item) => {
						this.$set(item, 'check', true)
					})
				} else {
					this.carShop.forEach((item) => {
						this.$set(item, 'check', false)
					})
				}
			},
			//点击每一个商品的radio
			singCheck: function(item) {
				//切换每一个商品的radio状态
				this.$set(item, 'check', !item.check)
				let status = true;
				this.carShop.forEach((item) => {
					if (!item.check) {
						status = false;
					}
				})
				this.editAll = status
				console.log(status);
			},
			change: function(num, info) {
				//删除接口
				if (num < 1) {
					uni.showModal({
						title: '确定要删除吗',
						showCancel: true,
						success: (res) => {
							if (res.confirm) {
								shopperApi
									.deleteCartInfo({
										skuCodes: info.skuCode,
									}).then((res) => {
										uni.showToast({
											title: "删除成功",
										});
										this.carShop.splice(this.thatIndex, 1)
									})
							}
						}
					});
				} else {
					//修改购物车
					shopperApi
						.changeCartInfo({
							skuCode: info.skuCode,
							quantity: num,
						}).then((res) => {

						})
				}


				// console.log(res);
			},
			//查询购物车接口
			getCartInfo: function() {
				var md5 = require("md5");
				let xx = md5("message");
				uni.setStorageSync("clientId", xx);
				let yy = uni.getStorage("clientId");
				shopperApi
					.getCartInfo({}).then((res) => {
						this.carShop = res.data.items; //获取购物车中的商品
						this.isLoad = true;
						// console.log(this.carShop, "carShopppp");
					});
				// console.log(this.carShop, "res.data.items");
			},


		},
		onLoad() {

		},
		onShow() {
			this.getCartInfo();

		}
	};
</script>

<style lang="scss">
	page {
		background-color: $color-page;
	}

	.top-car {
		// @include flexVtCenter;
		width: 100%;
		height: calc(100rpx + var(--status-bar-height));
		// padding: 0 18rpx;
		font-size: 36rpx;
		color: $color-text1;
		line-height: 80rpx;
		justify-content: space-between;

		.top-status-plc {
			width: 100%;
			height: var(--status-bar-height);
		}

		.top-car-content {
			width: 100%;
			height: 100rpx;
			display: flex;
			flex-direction: row;

			.left {
				width: 30%;
				height: 100%;
			}

			.cars {
				width: 40%;
				height: 100%;
				text-align: center;

				.car-font {
					width: 100%;
					height: 60rpx;
					font-size: 35rpx;
					line-height: 60rpx;
				}

				.local {
					width: 100%;
					height: 50rpx;
					font-size: 20rpx;
					line-height: 20rpx;
				}
			}

			.edits {
				width: 30%;
				height: 100%;
				text-align: center;
				font-size: 30rpx;
			}
		}
	}

	.car-img {
		width: 100%;
		height: 400rpx;
		background: #ffffff;

		.imgscar {
			width: 320rpx;
			height: 342rpx;
			display: block;
			margin: 0 auto;
		}
	}

	.shopping-cart {
		width: 94.8%;
		margin: 20rpx auto;
		margin-bottom: 0;
		border-radius: 8px;
		background-color: #fff;
		position: relative;

		.all-clear {
			position: absolute;
			z-index: 999;
			right: 5rpx;
			top: 5rpx;
			background: $color-green;
		}

		.list {
			position: relative;
			@include flexVtCenter;
			width: 100%;
			height: 234rpx;
			padding: 0 18rpx 34rpx;

			.img-view {
				width: 130rpx;
				height: 130rpx;
				margin-left: 14rpx;
				border-radius: 6px;
			}

			.goods-info {
				@include flexLvCenter;
				width: 70%;
				height: 76%;
				flex-flow: column;
				justify-content: space-between;
				margin-left: 20rpx;
				overflow: hidden;

				.goods-name {
					@include ellipsis;
					font-size: 30rpx;
					color: $color-text1;
					font-weight: 700;
				}

				.goods-result {
					@include ellipsis;
					font-size: 28rpx;
					line-height: 28rpx;
					color: $color-text3;
					padding-bottom: 8rpx;
				}

				.goods-price {
					display: flex;
					flex-flow: row nowrap;
					align-items: center;
					font-size: 32rpx;

					color: $color-red;

					.last-price {
						font-size: 36rpx;
						line-height: 36rpx;
						color: $color-red;
						font-weight: 700;
						margin-right: 18rpx;

						.rmb {
							font-size: 26rpx;
							font-weight: 700;
							line-height: 26rpx;
							margin-right: 2rpx;
						}
					}

					.original-price {
						font-size: 26rpx;
						line-height: 26rpx;
						color: $color-text3;
						text-decoration: line-through;
					}
				}

				.stepper {
					position: absolute;
					right: 18rpx;
					bottom: 18rpx;
				}
			}

			.hr {
				position: absolute;
				bottom: 0;
				left: 50%;
				transform: translateX(-50%);
				width: 90%;
				height: 1px;
				background-color: $color-page;
			}

			&:last-child {
				.hr {
					display: none;
				}
			}
		}
	}

	.viewiding-line {
		@include flexVtCenter;
		justify-content: space-between;
		width: 100%;
		height: 60rpx;
		padding: 0 50rpx;
		margin: 14rpx 0;

		.hr {
			width: 32%;
			height: 1px;
			background-color: $color-text2;
			opacity: 0.3;
		}

		.point {
			width: 5px;
			height: 5px;
			background-color: $color-text2;
			transform: rotate(45deg);
		}

		.text {
			font-size: 28rpx;
			font-weight: 700;
			line-height: 24rpx;
			color: $color-text2;
			letter-spacing: 2rpx;
		}
	}

	.recommend {
		display: flex;
		width: 100%;
		flex-flow: row wrap;
		padding: 0 26rpx;
		justify-content: space-between;

		.list {
			position: relative;
			width: 48%;
			height: 500rpx;
			border-radius: 8px;
			background-color: #fff;
			padding: 0 18rpx;
			margin-bottom: 22rpx;

			.img-view {
				width: 100%;
				height: 280rpx;
				margin: 0 auto;
			}

			.name {
				@include ellipsis2(2);
				font-size: 30rpx;
				line-height: 42rpx;
				color: $color-text1;
				margin-top: 6rpx;
			}

			.price {
				@include flexVtCenter;
				flex-flow: row;
				position: absolute;
				bottom: 24rpx;
				left: 18rpx;

				.last-price {
					font-size: 38rpx;
					line-height: 38rpx;
					color: $color-red;
					font-weight: 700;
					margin-right: 14rpx;

					.rmb {
						font-size: 26rpx;
						line-height: 26rpx;
						margin-right: 2rpx;
					}
				}

				.original-price {
					font-size: 26rpx;
					color: $color-text2;
					text-decoration: line-through;
				}
			}

			.add-btn {
				@include btnGreen-gradient;
				position: absolute;
				bottom: 24rpx;
				right: 18rpx;
				width: 58rpx;
				height: 58rpx;
				border-radius: 50%;

				.icon {
					font-size: 40rpx;
					//transform: rotate(-4deg);
				}
			}
		}
	}

	//删除
	.compiler {
		@include flexVtCenter;
		position: fixed;
		bottom: var(--window-bottom);
		left: 0;
		width: 100%;
		height: 104rpx;
		background-color: #fff;
		padding: 0 28rpx;
		border-top: 1px solid $color-page;
		display: flex;
		justify-content: space-between;

		.select-all {
			@include flexVtCenter;
			font-size: 26rpx;
			color: $color-text1;
		}

		.delete {
			width: 120rpx;
			height: 60rpx;
			border: solid 1rpx #969896;
			text-align: center;
			line-height: 60rpx;
			border-radius: 40rpx;
			font-size: 28rpx;
			margin-right: 30rpx;
		}
	}

	.to-pay-plc {
		width: 100%;
		height: 120rpx;
	}

	.to-pay {
		@include flexVtCenter;
		position: fixed;
		bottom: var(--window-bottom);
		left: 0;
		width: 100%;
		height: 120rpx;
		background-color: #fff;
		padding: 0 28rpx;
		border-top: 1px solid $color-page;

		.select-all {
			@include flexVtCenter;
			font-size: 26rpx;
			color: $color-text1;
		}

		.price-data {
			@include flexVtCenter;
			flex-flow: column;
			height: 84rpx;
			margin-left: auto;
			justify-content: space-between;

			.text-1 {
				font-size: 20rpx;
				color: $color-text3;

				.pay-num {
					font-size: 32rpx;
					color: $color-red;
					margin-left: 6rpx;
				}
			}

			.text-2 {
				font-size: 20rpx;
				color: $color-red;
			}
		}

		.to-btn {
			@include btnRed;
			width: 220rpx;
			height: 78rpx;
			border-radius: 999px;
			margin-left: 24rpx;
			background: $color-green;
		}
	}

	.to-pay-plc {
		width: 100%;
		height: 120rpx;
	}
</style>
