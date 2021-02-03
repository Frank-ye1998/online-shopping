<template>
	<view class="receiving-method-main">
		<div @tap="locationTap" class="tap-view"></div>
		<i class="icon icon-location"></i>
		<view class="location">
			<view class="text-1">
				{{$currentAddress.name?$currentAddress.address + $currentAddress.detailAddress:$locationInfo.address}}

			</view>
			<view v-if="$currentAddress.name" class="text-2">
				{{$currentAddress.tel}} {{$currentAddress.name}}
			</view>
		</view>
		<view @tap="methodChange" :class="['mode-switch',$receivingMethod?'':'mode-ask']">
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
	import {
		appMixin
	} from "@/utils/mixin";
	export default {
		mixins: [appMixin],
		methods: {
			methodChange: function() {
				this.setReceivingMethod(!this.$receivingMethod);
				if (!this.$receivingMethod) {
					this.$Router.push({
						name: "storeList"
					})
				}
			},
			locationTap: function() {
				if (this.$receivingMethod) {
					this.$Router.push({
						name: 'address',
						params: {
							isSelect: true
						}
					})
				} else {
					console.log('选择门店');
				}
			}
		},
		created() {
			console.log(this.$currentAddress, '收货地址');
			console.log(this.$locationInfo, '定位信息');
		}
	}
</script>

<style lang="scss">
	.receiving-method-main {
		position: relative;
		@include flexVtCenter;
		width: 96%;
		height: 118rpx;
		background-color: #fff;
		margin: 0 auto;
		padding: 0 18rpx;
		border-radius: 16rpx;

		.tap-view {
			@include absVtCenter;
			left: 2%;
			width: 68%;
			height: 80%;
		}

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
			height: 68rpx;
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

			.selected-bg {
				transform: translateX(102%) translateY(-50%) !important;
			}
		}
	}
</style>
