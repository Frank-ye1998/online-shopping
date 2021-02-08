<template>
	<view class="detail-main">
		<div @tap="pageScroll" :style="{opacity:topColor}" class="top-bar-ts">

		</div>
		<!-- 		<view class="back" @tap="goBack()">
			<i class="icon icon-back"></i>
		</view> -->
		<view class="">
			<view class="deta-mess">
				<view class="detail-img">
					<img-view :src="`http://10.1.44.93:9010/images/${detailData.mainImg}`" mode="widthFix" class="details-imgs" />
				</view>
			</view>
			<view class="detail-con">
				<view class="con-name">{{ detailData.name }}</view>
				<view class="con-brief">{{ detailData.description }}</view>
			</view>
		</view>
		<!-- 规格 -->
		<view class="choice-commodity" v-if="detailData.ptSpuAttrs&&detailData.ptSpuAttrs.length">
			<view class="commod" v-for="(item, index) in detailData.ptSpuAttrs" :key="index">
				<view class="font-left">
					{{ item.name }}
				</view>
				<view v-for="(sub, idx) in item.ptSpuAttrValues" :key="idx" :class="['font-right',item.selectedCode === sub.skuSpliceCode ? 'font-right-select' : '']"
				 @tap="selectItem(item, sub.skuSpliceCode)">
					{{ sub.value }}
				</view>
			</view>
		</view>
		<view class="richtext-detail">
			<div class="title">
				{{detailData.subtitle}}
			</div>
			<div class="rich-text" v-html="detailData.productDes"></div>

		</view>
		<view class="calculation">
			<view class="calcula-price"> ￥{{ detailData.price }} </view>
			<view class="add-class">
				<stepper :value="quantity" :change="change"></stepper>
				<view class="add-cart" @tap="clickAddCart"> 加入购物车 </view>
			</view>
		</view>
		<view class="calculation-plc"></view>

		<div class="test"></div>
	</view>
</template>

<script>
	import productApi from "@/api/productApi.js";
	import shopperApi from "@/api/shopperApi.js";
	import stepper from '../../../../components/stepper/stepper.vue';
	import {
		createCartRequestData
	} from "@/utils/shoppingCart.js"
	import {
		appMixin
	} from "@/utils/mixin";
	export default {
		mixins: [appMixin],
		components: {
			stepper
		},
		data() {
			return {
				detailData: {},
				skuCode: "",
				skuStr: "",
				quantity: 1,
				topColor: 0
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
			//加入购物车接口
			clickAddCart: function() {
				uni.showLoading({
					mask: true
				})
				let requestData = {};

				if (this.detailData.isMultiSpec) {
					//多规格
					//拼接skuCode
					let skuCode = this.detailData.skuId;
					this.detailData.ptSpuAttrs.forEach((item) => {
						skuCode += item.selectedCode;
					});
					//获取当前所选规格sku信息
					let skuInfo = this.detailData.ptSkus.find(item => {
						return item.code === skuCode
					});
					//生成请求数据
					requestData = createCartRequestData(skuInfo, this.quantity)
				} else {
					//单规格
					requestData = createCartRequestData(this.detailData.ptSkus[0], this.quantity)
				}
				//加入购物车
				shopperApi.addCart(requestData).then(res => {
					this.setShoppingCart(res.data);
					uni.hideLoading()
					uni.showToast({
						title: "添加成功",
					});
				})
			},
			//获取详情数据
			getDetailData: function(id) {
				productApi.findAttrProduct({
					id: id
				}).then((res) => {
					if (res.data.isMultiSpec) {
						let defultCode = res.data.skuCode.replace(res.data.skuId, "");
						res.defultCode = defultCode;
						res.data.ptSpuAttrs.forEach((item) => {
							item.ptSpuAttrValues.forEach((sub) => {
								if (defultCode.indexOf(sub.skuSpliceCode) > -1) {
									item.selectedCode = sub.skuSpliceCode;
								}
							});
						});
					}
					this.detailData = res.data;
				});
			},
			pageScroll:function(num){
				uni.pageScrollTo({
				    scrollTop: 600,
				    duration: 300
				});
			}
		},
		onLoad: function() {
			this.getDetailData(this.$Route.query.id);
		},
		onPageScroll: function(e) {
			let num = e.scrollTop / 200;
			this.topColor = num <= 1 ? num : 1;
			console.log(this.topColor);
		}
	};
</script>

<style lang="scss">
	.test {
		width: 100%;
		height: 3000rpx;
	}

	.top-bar-ts {
		position: fixed;
		z-index: 100;
		top: 0;
		left: 0;
		width: 100%;
		height: 120rpx;
		background: #fff;
	}

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
		top: 60rpx;
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
			width: 96%;
			height: 150rpx;
			background: #fff;
			line-height: 65rpx;
			padding-left: 18rpx;
			margin: 20rpx auto 0;
			border-radius: 14rpx;

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
			width: 96%;
			background: #fff;
			margin: 20rpx auto 0;
			border-radius: 14rpx;
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
					border: solid 1px #ddd;
					text-align: center;
					line-height: 60rpx;
					border-radius: 999px;
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
				border: 1px solid $color-green !important;
				background-color: $color-green-transparent;
			}
		}

		.richtext-detail {
			width: 96%;
			border-radius: 18rpx;
			margin: 20rpx auto 16rpx;
			background-color: #fff;

			.title {
				@include flexVtCenter;
				width: 100%;
				height: 96rpx;
				font-size: 28rpx;
				color: $color-text1;
				padding: 0 14rpx;
			}

			.rich-text {
				width: 100%;
				overflow: hidden;

				img {
					max-width: 100%;
				}
			}
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
