<template>
	<view class="commodity-view-main">
		<img-view class="main-img" src="/static/images/home/shop-1.png"></img-view>
		<div class="name">
			{{name}}
		</div>
		<div class="info">{{info}}</div>
		<slot name="discount"></slot>
		<div class="bottom">
			<div class="price-view">
				<div class="price">
					<div class="pay-price">
						¥{{payPrice}}
					</div>
					<div v-if="originalPrice" class="original-price">
						¥{{originalPrice}}
					</div>
				</div>
				<div v-if="vipPrice" class="vip-price">
					¥{{vipPrice}} 会员价
				</div>
			</div>
			<div class="add-btn">
				<i class="icon icon-shopping-cart"></i>
			</div>
		</div>
	</view>
</template>

<script>
	export default {
		props: {
			name: {
				type: String,
				required: true
			},
			info: {
				type: String
			},
			payPrice: {
				type: Number | String,
				required: true
			},
			originalPrice: {
				type: Number | String
			},
			vipPrice: {
				type: Number | String
			}
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.commodity-view-main {
		background-color: #fff;
		border-radius: 14rpx;
		padding: 18rpx 14rpx;
		break-inside: avoid;
	}

	.main-img {
		width: 100%;
		height: 280rpx;
	}

	.name {
		font-size: 28rpx;
		line-height: 32rpx;
		color: $color-text1;
		@include ellipsis2(2);
		margin-top: 20rpx;
	}

	.info {
		font-size: 22rpx;
		line-height: 22rpx;
		color: $color-text3;
		margin-top: 14rpx;
		@include ellipsis;
	}

	.bottom {
		@include flexVtCenter;
		width: 100%;
		margin-top: 20rpx;

		.price-view {
			.price {
				display: flex;
				justify-content: flex-start;
				align-items: flex-end;

				.pay-price {
					font-size: 28rpx;
					line-height: 28rpx;
					color: $color-red;
					font-weight: 700;
				}

				.original-price {
					font-size: 22rpx;
					line-height: 22rpx;
					color: $color-text3;
					text-decoration: line-through;
					margin-left: 6rpx;
					margin-bottom: 2rpx;
				}
			}

			.vip-price {
				font-size: 24rpx;
				color: $color-green;
				font-weight: 700;
				margin-top: 6rpx;
			}
		}

		.add-btn {
			width: 54rpx;
			height: 54rpx;
			border-radius: 50%;
			@include btnGreen-gradient-bottom;
			margin-left: auto;

			.icon {
				font-size: 36rpx;
				font-weight: 700;
				transform: translate(-6%, 6%);
			}
		}
	}
</style>
