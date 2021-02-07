<template>
	<view>
		<view class="col"></view>
		<view class="top-car">
			<view class="top-status-plc"></view>
			<view class="top-car-content">
				<view class="page-title">
					购物车
				</view>
				<view v-if="$receivingMethod&&$currentAddress.address" class="local">配送至:{{$currentAddress.address}}</view>
				<view v-else-if="$receivingMethod&&!$currentAddress.address" class="local">配送至:{{$locationInfo.formatted_addresses?$locationInfo.formatted_addresses.recommend:'定位中…'}}</view>
				<view v-else="$receivingMethod" class="local">自取门店:{{$currentStore.name}}</view>
				<view class="edits" v-if="carShop.length" @tap="isEdit = !isEdit">{{ isEdit?'完成':'编辑' }}</view>
			</view>
		</view>
		<view class="shopping-cart" v-if="isLoad && carShop.length">
			<view class="list" @tap="thatIndex = index" v-for="(item,index) in carShop" :key="index">
				<radio class="radio" style="transform: scale(0.94)" color="#00C130" v-if="isEdit" :checked="item.check" @tap="singCheck(item)" />
				<img-view :src="item.badgeImg" mode="widthFix" class="img-view"></img-view>
				<view class="goods-info">
					<view class="goods-name">
						{{ item.skuName }}
					</view>
					<view class="goods-result">{{item.specsValues}}</view>
					<view class="goods-price">
						<view class="last-price"><text class="rmb">¥{{ item.price }}</text></view>
						<view class="original-price" v-if="item.price !== item.originPrice">¥{{ item.originPrice }}</view>
					</view>
					<view class="stepper-view">
						<i @tap="numModify(item.quantity-1,item)" class="icon icon-reduce"></i>
						<text class="num">{{item.quantity}}</text>
						<i @tap="numModify(item.quantity+1,item)" class="icon icon-add"></i>
					</view>
				</view>
				<view class="hr"></view>
			</view>
		</view>

		<view class="car-img" v-if="isLoad && !carShop.length">
			<image src="/static/images/null-img/data-null.png" class="imgscar"></image>
			<view class="text">购物车空空如也</view>
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
				<commodity-view mainImg="/static/images/shopping-car/caomei.jpg" name="大草莓大草莓大草莓大草莓大草莓大草莓" payPrice="66.88"
				 originalPrice="88.23"></commodity-view>
				<commodity-view mainImg="/static/images/shopping-car/caomei.jpg" name="大草莓大草莓大草莓大草莓大草莓大草莓" payPrice="66.88"
				 originalPrice="88.23"></commodity-view>
				<commodity-view mainImg="/static/images/shopping-car/caomei.jpg" name="大草莓大草莓大草莓大草莓大草莓大草莓" payPrice="66.88"
				 originalPrice="88.23"></commodity-view>
			</view>

		</template>

		<view class="compiler" v-if="isEdit">
			<view class="select-all">
				<radio style="transform: scale(0.94)" :checked="editAll" color="#00C130" @tap="checkAll()" />全选
			</view>
			<view class="delete" @tap="deleteShop()">
				删除
			</view>
		</view>
		<view class="to-pay" v-if="carShop.length" @tap="toSubmit">
			<view class="select-all">
				<!-- <radio style="transform: scale(0.94)" color="#00C130"/>全选 -->
			</view>
			<view class="price-data">
				<text space="nbsp" class="text-1">不含运费 合计:<text class="pay-num">¥{{totalPrice}}</text></text>
				<text space="nbsp" class="text-2">已减: ¥{{discountPrice}} 优惠明细</text>
			</view>
			<view class="to-btn">去结算({{allQuantity}})</view>
		</view>

		<view class="to-pay-plc"></view>
	</view>
</template>

<script>
	import shopperApi from "@/api/shopperApi.js";
	import commodityView from "@/components/commodity-view/commodity-view.vue";
	import {
		appMixin
	} from "@/utils/mixin";
	export default {
		mixins: [appMixin],
		components: {
			'commodity-view': commodityView
		},
		data() {
			return {
				isLoad: false,
				carShop: [],
				isEdit: false,
				editAll: false,
				thatIndex: -1,
				allQuantity: 0,
				totalPrice: 0,
				discountPrice: 0,
				topLocation: ''
			};
		},
		watch: {
			$shoppingCart(nv, ov) {
				this.syncCartData();
			}
		},
		methods: {
			//前往提交订单页面
			toSubmit: function() {
				if (this.$receivingMethod && !this.$currentAddress.name) {
					this.$Router.push({
						name: 'address',
						params: {
							isSelect: true
						}
					})
					return
				} else if (!this.$receivingMethod && !this.$currentStore.code) {
					this.$Router.push({
						name: "storeList"
					})
					return
				}
				this.$Router.push({
					name: 'submitOrder'
				})
			},
			deleteShop: function() {
				//全选时清空
				if (this.editAll) {
					uni.showModal({
						title: "确定要删除全部商品吗",
						showCancel: true,
						success: (res) => {
							uni.showLoading()
							if (res.confirm) {
								//清除全部商品接口
								shopperApi.clearCartInfo().then((res) => {
									uni.hideLoading();
									this.setShoppingCart(res.data);
									this.editAll = false;
									this.isEdit = false;
								})
							}
						}
					})
				} else {
					//多选删除
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
							uni.showLoading()
							if (res.confirm) {
								shopperApi.deleteCartInfo({
									skuCodes: str,
								}).then((res) => {
									uni.hideLoading()
									this.setShoppingCart(res.data);
									uni.showToast({
										title: "删除成功",
									});
									this.carShop = arr;
									this.isEdit = false;
								})
							}
						}
					})

				}
			},
			//单选
			singCheck: function(item) {
				this.$set(item, 'check', !item.check)
				let status = true;
				this.carShop.forEach((item) => {
					if (!item.check) {
						status = false;
					}
				})
				this.editAll = status
			},
			//全选
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
			//数量编辑
			numModify: function(num, info) {
				//删除
				if (num < 1) {
					uni.showModal({
						title: '确定要删除吗',
						showCancel: true,
						success: (res) => {
							if (res.confirm) {
								shopperApi.deleteCartInfo({
									skuCodes: info.skuCode,
								}).then((res) => {
									this.setShoppingCart(res.data);
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
					shopperApi.changeCartInfo({
						skuCode: info.skuCode,
						quantity: num,
					}).then((res) => {
						this.setShoppingCart(res.data);
					})
				}
			},
			//获取购物车数量
			getAllQuantity: function() {
				let cartInfo = this.$shoppingCart;
				cartInfo = cartInfo.items ? cartInfo.items : {
					items: []
				};
				let quantity = 0;
				cartInfo.items.forEach(item => {
					quantity += item.quantity;
				})
				this.allQuantity = quantity;
			},
			//获取购物车价格
			getPriceData: function() {
				let cartInfo = this.$shoppingCart;
				if (!cartInfo) return;
				this.totalPrice = cartInfo.totalPrice - cartInfo.deliveryFee;
				this.discountPrice = cartInfo.totalOriginPrice - cartInfo.totalPrice;
			},
			//与vuex中购物车数据同步
			syncCartData: function() {
				this.carShop = this.$shoppingCart&&this.$shoppingCart.items ? this.$shoppingCart.items : [];
				this.isLoad = true;
				this.getAllQuantity();
				this.getPriceData();
			}
		},
		onShow() {
			this.syncCartData();
		}
	};
</script>

<style lang="scss">
	page {
		background-color: $color-page;
	}

	.col {
		width: 100%;
		height: calc(100rpx + var(--status-bar-height));
	}

	.top-car {
		width: 100%;
		height: calc(100rpx + var(--status-bar-height));
		font-size: 36rpx;
		color: $color-text1;
		line-height: 80rpx;
		justify-content: space-between;
		position: fixed;
		z-index: 20;
		top: 0;
		left: 0;
		background-color: #fff;

		.top-status-plc {
			width: 100%;
			height: var(--status-bar-height);
		}

		.top-car-content {
			display: flex;
			position: relative;
			flex-flow: column;
			width: 100%;
			height: 100rpx;
			justify-content: center;
			align-items: center;


			.page-title {
				font-size: 36rpx;
				line-height: 36rpx;
				margin-bottom: 12rpx;
			}

			.local {
				width: 76%;
				height: 28rpx;
				font-size: 20rpx;
				line-height: 28rpx;
				text-align: center;
				@include ellipsis;
			}


			.edits {
				@include absVtCenter;
				right: 16rpx;
				padding: 10rpx;
				font-size: 30rpx;
				color: $color-text1;
			}
		}
	}

	.car-img {
		@include flexCenter;
		width: 100%;
		height: 486rpx;
		background: #ffffff;
		overflow: hidden;
		flex-flow: column;

		.imgscar {
			width: 320rpx;
			height: 320rpx;
			display: block;
		}

		.text {
			font-size: 30rpx;
			color: $color-text2;
			margin-top: 28rpx;
		}
	}

	.shopping-cart {
		width: 94.8%;
		margin: 20rpx auto;
		margin-bottom: 0;
		border-radius: 8px;
		background-color: #fff;
		position: relative;
		background: #ffffff;

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

				.stepper-view {
					position: absolute;
					right: 18rpx;
					bottom: 18rpx;
					@include flexVtCenter;
					justify-content: space-between;
					width: 160rpx;

					.icon {
						font-size: 46rpx;
						color: $color-green;
						padding: 4rpx;
					}

					.num {
						font-size: 32rpx;
						line-height: 32rpx;
						color: $color-text1;
						font-weight: 700;
					}
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
		width: 96%;
		margin: 0 auto;
		column-count: 2;
		column-gap: 16rpx;

		.commodity-view-main {
			margin-bottom: 16rpx;
		}
	}

	//删除功能
	.compiler {
		@include flexVtCenter;
		position: fixed;
		z-index: 30;
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
		z-index: 20;
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
