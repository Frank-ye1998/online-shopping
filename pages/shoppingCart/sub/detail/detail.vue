<template>
	<view class="detail-main">
		<view class="back" @tap="goBack()"></view>
		<view class="">
			<view class="deta-mess">
				<view class="detail-img">
					<img-view :src="`http://10.1.44.108:9010/images/${detailData.mainImg}`" mode="widthFix" class="details-imgs" />

				</view>
			</view>
			<view class="detail-con">
				<view class="con-name">{{detailData.name}}</view>
				<view class="con-brief">{{detailData.description}}</view>
			</view>
		</view>
		<!-- 规格 -->
		<view class="choice-commodity">
			<view class="commod" v-for="(item,index) in detailData.ptSpuAttrs" :key="index">
				<view class="font-left">
					{{item.name}}
				</view>
				<view v-for="(item,index) in item.ptSpuAttrValues" :key="index" :class="['font-right',index===spuAtt?'font-right-select':'']"
				 @tap="selectItem(index)">
					{{item.value}}
				</view>
			</view>
		</view>
		<view class="default">
			超值加购推荐，满足加倍~
		</view>
		<view class="calculation">
			<view class="price">
				<view class="calcula-price">
					￥{{detailData.price}}
				</view>
				<view class="add-class">
					<view class="calcula-cli">
						<view class="sub">-</view>
						<text>1</text>
						<view class="add">+</view>
					</view>
					<view class="add-cart" @tap="clickAddCart">
						加入购物车
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import productApi from "@/api/productApi.js";
	export default {
		data() {
			return {
				spuAtt: 0,
				detailData: {},
				commodity: this.$route.query,
				sizeArr: [],
				comArr: []
			};
		},
		methods: {
			selectItem(index) {
				this.spuAtt = index;
			},
			goBack() {
				this.$Router.back(1);
				console.log(this.commodity, 'commodity');
			},
			getCommodity: function() {
				productApi
					.goToGoodsDetail({
						id: this.commodity.id
					})
					.then((res) => {
						// console.log(res.data, 'detailres');
						this.detailData = res.data;
						// console.log(this.detailData, 'detailData');

					})
			},
			//加入购物车接口
			clickAddCart: function() {
				shopperApi
					.addCart({

					})

			}
		},
		onLoad: function() {
			this.getCommodity();
		}
	}
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
		top: 0;
		left: 10rpx;
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
			background: $color-green-transparent;
			margin-left: 2.5%;
			line-height: 65rpx;
			padding-left: 30rpx;
			margin-top: 20rpx;

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
			border-radius: 40rpx;
			padding: 12rpx;

			.commod {
				width: 100%;
				height: 110rpx;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;

				.font-left {
					width: 160rpx;
					height: 90rpx;
					text-align: center;
					line-height: 90rpx;

				}

				.font-right {
					width: 130rpx;
					height: 60rpx;
					border: solid 2rpx $color-text6;
					text-align: center;
					line-height: 60rpx;
					border-radius: 40rpx;

					.size {
						width: 30%;
						height: 35%;
					}
				}
			}

			.font-right-select {
				background: $color-text6;
			}
		}

		.default {
			width: 95%;
			height: 100rpx;
			background-color: $color-green-transparent;
			margin-top: 10rpx;
			margin-left: 2%;
			line-height: 100rpx;
			padding-left: 20rpx;
			color: $color-text2;
		}

		.calculation {
			width: 100%;
			height: 160rpx;
			display: flex;
			flex-direction: row;
			background: $color-green-transparent;
			margin-top: 20rpx;
			align-items: center;

			.price {
				width: 100%;
				height: 100%;
				display: flex;
				flex-direction: row;
				line-height: 100rpx;
				justify-content: space-around;

				.calcula-price {
					color: $color-red;
					font-size: 50rpx;
					padding-left: 30rpx;
				}

				.add-class {
					width: 60%;
					display: flex;
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


		}
	}
</style>
