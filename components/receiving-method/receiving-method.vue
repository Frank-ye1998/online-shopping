<template>
	<view class="receiving-method-main">
		<i class="icon icon-location"></i>
		<view class="location">
			<view class="text-1">
				漕宝路日月光中心
			</view>
			<view class="text-2">
				距您88m
			</view>
		</view>
		<view @tap="isAsk=!isAsk" :class="['mode-switch',isAsk?'mode-ask':'']">
			<view class="text-1">
				外送
			</view>
			<view class="text-2">
				自提
			</view>
			<view class="selected-bg"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isAsk:false
			};
		},
		watch:{
			//监听配送方式变化
			isAsk(nv,ov){
				
			}
		}
	}
</script>

<style lang="scss">
	.receiving-method-main {
		@include flexVtCenter;
		width: 96%;
		height: 148rpx;
		background-color: #fff;
		margin: 0 auto;
		padding: 0 18rpx;
		border-radius: 16rpx;

		.icon {
			font-size: 34rpx;
			color: $color-text1;
		}

		.location {
			width: 60%;
			margin-left: 20rpx;

			.text-1 {
				@include ellipsis;
				width: 100%;
				font-size: 28rpx;
				line-height: 28rpx;
				color: $color-text1;
				margin-bottom: 18rpx;
			}

			.text-2 {
				font-size: 22rpx;
				line-height: 22rpx;
				color: $color-text3;
			}
		}

		.mode-switch {
			position: relative;
			display: flex;
			width: 168rpx;
			height: 58rpx;
			background-color: $color-green;
			border-radius: 999px;
			margin-left: auto;
			.text-1,
			.text-2 {
				@include flexCenter;
				position: relative;
				z-index: 10;
				flex: 1;
				font-size: 26rpx;
				letter-spacing: 1rpx;
				transition: color 0.3s;
			}

			.text-1 {
				color: $color-green;
			}

			.text-2 {
				color: #fff;
			}

			.selected-bg {
				@include absVtCenter;
				z-index: 5;
				left: 0rpx;
				width: 48%;
				height: 86%;
				transform: translateX(6%) translateY(-50%);
				border-radius: 50rpx;
				background-color: #fff;
				transition: transform 0.14s;
			}
		}

		.mode-ask {
			.text-1 {
				color: #fff !important;
			}

			.text-2 {
				color: $color-green !important;
			}
			.selected-bg{
				transform: translateX(102%) translateY(-50%) !important;
			}
		}
	}
</style>
