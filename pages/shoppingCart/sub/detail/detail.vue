<template>
	<view class="detail-main">
		<view class="back" @tap="goBack()">
			<i class="icon icon-back"></i>
		</view>
		<view class="">
			<view class="deta-mess">
				<view class="detail-img">
					<img-view :src="`http://10.1.44.113:9010/images/${detailData.mainImg}`" mode="widthFix" class="details-imgs" />
				</view>
			</view>
			<view class="detail-con">
				<view class="con-name">{{ detailData.name }}</view>
				<view class="con-brief">{{ detailData.description }}</view>
			</view>
		</view>
		<!-- 规格 -->
		<view class="choice-commodity">
			<view class="commod" v-for="(item, index) in detailData.ptSpuAttrs" :key="index">
				<view class="font-left">
					{{ item.name }}
				</view>
				<view v-for="(sub, idx) in item.ptSpuAttrValues" :key="idx" :class="[
            'font-right',
            item.selectedCode === sub.skuSpliceCode ? 'font-right-select' : '',
          ]"
				 @tap="selectItem(item, sub.skuSpliceCode)">
					{{ sub.value }}
				</view>
			</view>
		</view>
		<view class="default"> 超值加购推荐，满足加倍~ </view>
		<view class="calculation">
			<view class="calcula-price"> ￥{{ detailData.price }} </view>
			<view class="add-class">
				<stepper :value=1 :change="change"></stepper>
				<view class="add-cart" @tap="clickAddCart"> 加入购物车 </view>
			</view>
		</view>
		<div class="calculation-plc"></div>
	</view>
</template>

<script>
	import productApi from "@/api/productApi.js";
	import shopperApi from "@/api/shopperApi.js";
	import stepper from '../../../../components/stepper/stepper.vue';
	export default {
		components: {
			stepper
		},
		data() {
			return {
				spuAtt: 0,
				detailData: {},
				commodity: this.$Route.query || 11352,
				sizeArr: [],
				comArr: [],
				skuCode: "",
				skuStr: "",
				quantity: 0,
			};
		},
		methods: {
			change: function(res) {
				this.quantity = res
			},
			selectItem(item, code) {
				this.$set(item, "selectedCode", code);
			},
			goBack() {
				this.$Router.back(1);
			},
			getCommodity: function() {
				productApi
					.goToGoodsDetail({
						id: this.commodity.id,
					})
					.then((res) => {
						uni.hideLoading();
						let defultCode = res.data.skuCode.replace(res.data.skuId, "");

						res.defultCode = defultCode;

						res.data.ptSpuAttrs.forEach((item) => {
							item.ptSpuAttrValues.forEach((sub) => {
								if (defultCode.indexOf(sub.skuSpliceCode) > -1) {
									item.selectedCode = sub.skuSpliceCode;
								}
							});
						});
						this.detailData = res.data;

					});
			},

			//加入购物车接口
			clickAddCart: function() {
				if (this.detailData.isMultiSpec) {
					let code = this.detailData.skuId;
					this.detailData.ptSpuAttrs.forEach((item) => {
						code += item.selectedCode;
					});

					let lastItem = {};
					this.detailData.ptSkus.forEach((item) => {
						if (item.code === code) {
							lastItem = item;
						}
					});

					let obj = {
						cellPhone: "17696769527",
						userId: 663983581015375872,
						cityCode: "shangHai",
						cityName: "上海市",
						deliveryFee: 8,
						loyaltyLevel: "",
						storeCode: "96000",
						storeName: "槽宝路店",
						totalOriginPrice: lastItem.originPrice,
						totalPePrice: 0,
						totalPrice: lastItem.price,
						item: {
							specsValues: lastItem.specsValues,
							badgeImg: lastItem.badgeImg,
							buyLimit: lastItem.buyLimit,
							canBookingMsg: lastItem.canBookingMsg,
							countPrice: lastItem.price,
							height: lastItem.height,
							isBooking: lastItem.isBooking,
							isGift: lastItem.isGift,
							isInvoice: lastItem.isInvoice,
							isPresale: lastItem.isPresale,
							isPromotion: lastItem.isPromotion,
							length: lastItem.length,
							markDiscount: lastItem.markDiscount,
							markNew: lastItem.markNew,
							minimumOrderQuantity: lastItem.minimumOrderQuantity,
							originPrice: lastItem.originPrice,
							presaleDeliveryDateDisplay: lastItem.presaleDeliveryDateDisplay,
							price: lastItem.price,
							promotionId: "", //``
							promotionPrice: "", //``
							quantity: this.quantity,
							roughWeight: lastItem.roughWeight,
							salePointMsg: lastItem.salePointMsg,
							saleUnit: lastItem.saleUnit,
							shopIngredientVos: [],
							skuCode: lastItem.code,
							skuId: 11352,
							skuName: lastItem.name,
							smallImage: lastItem.smallImage,
							spuType: "",
							vipPrice: lastItem.vipPrice,
							width: lastItem.width,
						},
					};
					shopperApi
						.addCart(obj)
						.then((res) => {
							console.log(res);
							uni.showToast({
								title: "添加成功",
							});
							setTimeout(() => {
								this.$Router.back(1);
							}, 500);
						})
						.catch((err) => {
							console.log(err);
						});
				} else {
					let testItem = {};
					this.detailData.ptSkus.forEach((item) => {
						testItem = item
						console.log(testItem, "testItem")
					})

					let obj = {
						cellPhone: "17696769527",
						userId: 663983581015375872,
						cityCode: "shangHai",
						cityName: "上海市",
						deliveryFee: 8,
						loyaltyLevel: "",
						storeCode: "96000",
						storeName: "槽宝路店",
						totalOriginPrice: testItem.originPrice,
						totalPePrice: 0,
						totalPrice: testItem.price,
						item: {
							specsValues: testItem.specsValues,
							badgeImg: testItem.badgeImg,
							buyLimit: testItem.buyLimit,
							canBookingMsg: testItem.canBookingMsg,
							countPrice: testItem.price,
							height: testItem.height,
							isBooking: testItem.isBooking,
							isGift: testItem.isGift,
							isInvoice: testItem.isInvoice,
							isPresale: testItem.isPresale,
							isPromotion: testItem.isPromotion,
							length: testItem.length,
							markDiscount: testItem.markDiscount,
							markNew: testItem.markNew,
							minimumOrderQuantity: testItem.minimumOrderQuantity,
							originPrice: testItem.originPrice,
							presaleDeliveryDateDisplay: testItem.presaleDeliveryDateDisplay,
							price: testItem.price,
							promotionId: "", //``
							promotionPrice: "", //``
							quantity: this.quantity,
							roughWeight: testItem.roughWeight,
							salePointMsg: testItem.salePointMsg,
							saleUnit: testItem.saleUnit,
							shopIngredientVos: [],
							skuCode: testItem.code,
							skuId: 11352,
							skuName: testItem.name,
							smallImage: testItem.smallImage,
							spuType: "",
							vipPrice: testItem.vipPrice,
							width: testItem.width,
						},
					};
					console.log(obj)
					shopperApi
						.addCart(obj)
						.then((res) => {
							console.log(res);
							uni.showToast({
								title: "添加成功",
							});
							setTimeout(() => {
								this.$Router.back(1);
							}, 500);
						})
						.catch((err) => {
							console.log(err);
						});
				}

			},
		},
		onLoad: function() {
			uni.showLoading({
				mask:true
			})
			this.getCommodity();
		},
	};
</script>

<style lang="scss">
	page {
		background-color: $color-page;
	}

	.back {
		width: 70rpx;
		height: 70rpx;
		background: $color-text1;
		opacity: 0.6;
		border-radius: 50%;
		position: fixed;
		z-index: 100;
		top: 10rpx;
		left: 10rpx;
		text-align: center;
		line-height: 70rpx;
		color: #FFFFFF;
		font-size: 30rpx;
	}

	.detail-main {
		display: flex;
		flex-direction: column;

		.deta-mess {
			width: 100%;
			height: 550rpx;

			.detail-img {
				width: 100%;
				height: 100%;

				.details-imgs {
					width: 100%;
					height: 100%;
				}
			}
		}

		.detail-con {
			width: 95%;
			height: 150rpx;
			background: #fff;
			margin-left: 2.5%;
			line-height: 65rpx;
			padding-left: 30rpx;
			margin-top: 20rpx;
			border-radius: 18rpx;

			.con-name {
				font-size: 39rpx;
				padding-top: 15rpx;
			}

			.con-brief {
				font-size: 29rpx;
				color: $color-text3;
			}
		}

		.choice-commodity {
			width: 95%;
			background: #fff;
			margin: 20rpx auto 0;
			border-radius: 18rpx;
			padding: 12rpx;

			.commod {
				width: 100%;
				height: 110rpx;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				justify-content: flex-start;

				.font-left {
					width: 160rpx;
					height: 90rpx;
					text-align: center;
					line-height: 90rpx;
					font-size: 32rpx;
					color: $color-text1;
				}

				.font-right {
					width: 130rpx;
					height: 60rpx;
					border: solid 1px $color-text3;
					text-align: center;
					line-height: 60rpx;
					border-radius:999px;
					margin-left: 30rpx;
					font-size: 28rpx;
					color: $color-text2;

					.size {
						width: 30%;
						height: 35%;
					}
				}
			}

			.font-right-select {
				border: solid 1px $color-green !important;
				background-color: $color-green-transparent;
			}
		}

		.default {
			width: 95%;
			height: 100rpx;
			background-color: #fff;
			margin-top: 10rpx;
			margin-left: 2%;
			line-height: 100rpx;
			padding-left: 40rpx;
			color: $color-text2;
			border-radius: 18rpx;
			margin-bottom: 16rpx;
			font-size: 28rpx;
		}

		.calculation {
			@include flexVtCenter;
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 160rpx;
			background: #fff;
			justify-content: space-between;
			padding: 0 28rpx;

			.calcula-price {
				color: $color-red;
				font-size: 50rpx;
			}

			.add-class {
				display: flex;
				justify-content: flex-start;
				flex-direction: row;
				align-items: center;

				.calcula-cli {
					display: flex;
					flex-direction: row;
					justify-content: space-around;
					width: 200rpx;
					height: 100%;
					align-items: center;

					.sub {
						width: 50rpx;
						height: 50rpx;
						background: $color-green;
						text-align: center;
						line-height: 50rpx;
						border-radius: 50%;
						color: $color-green-transparent;
					}

					.add {
						width: 50rpx;
						height: 50rpx;
						background: $color-green;
						line-height: 50rpx;
						border-radius: 50%;
						color: $color-green-transparent;
					}
				}

				.add-cart {
					width: 200rpx;
					height: 80rpx;
					background: $color-green;
					border-radius: 40rpx;
					text-align: center;
					line-height: 80rpx;
					font-size: 28rpx;
					color: $color-green-transparent;
					letter-spacing: 2rpx;
					font-weight: lighter;
					margin-left: 20rpx;
				}
			}

		}

		.calculation-plc {
			width: 100%;
			height: 160rpx;
		}
	}
</style>
