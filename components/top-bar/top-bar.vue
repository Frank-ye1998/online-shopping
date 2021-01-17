<template>
	<view class="top-bar-main">
		<view class="top-bar">
			<i @tap="PageBack" class="icon icon-back"></i>
			<text class="page-title">{{ pageTitle }}</text>
			<slot></slot>
		</view>
		<view class="top-bar-plc"></view>
	</view>
</template>

<script>
	export default {
		props: {
			pageTitle: String,
		},
		methods: {
			PageBack() {
				uni.navigateBack({
					delta: 1,
				});
			},
		},
	};
</script>

<style lang="scss">
	.top-bar {
		display: flex;
		position: fixed;
		z-index: 1000;
		top: var(--status-bar-height);
		left: 0;
		width: 100%;
		height: 82rpx;
		justify-content: center;
		align-items: center;
		background-color: #fff;
		overflow: hidden;

		.icon-back {
			position: absolute;
			top: 50%;
			left: 0;
			transform: translateY(-50%);
			padding: 25rpx 32rpx;
			font-size: 32rpx;
			color: #282933;
			font-weight: 700;
			box-sizing: content-box;
			will-change: transform;
		}

		.page-title {
			font-size: 32rpx;
			line-height: 32rpx;
			color: #282933;
			font-weight: 700;
		}
	}

	.top-bar-plc {
		width: 100%;
		height: calc(82rpx + var(--status-bar-height));
		background-color: #fff;
	}
</style>
