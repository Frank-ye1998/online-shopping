<template>
	<view class="receiving-method-main">
		<div class="modify-date" @tap="timePicker" v-if="showDate">
			<div class="tit">
				送达时间
			</div>
			<div class="right">
				<div class="text">{{deliveryTimeText}}</div>
				<i class="icon icon-to"></i>
			</div>
			<div class="hr"></div>
		</div>
		<div class="location-view">
			<div @tap="locationTap" class="tap-view"></div>
			<i class="icon icon-location"></i>
			<view class="location">
				<template v-if="$receivingMethod">
					<view class="text-1">
						{{$currentAddress.name?$currentAddress.address + $currentAddress.detailAddress:$locationInfo.address}}
					</view>
					<view v-if="$currentAddress.name" class="text-2">
						{{$currentAddress.tel}} {{$currentAddress.name}}
					</view>
				</template>
				<template v-else>
					<view class="text-1">
						{{$currentStore.name}}
					</view>
					<view class="text-2">
						{{$currentStore.address}}
					</view>
				</template>
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
		</div>
	</view>
</template>

<script>
	import {
		appMixin
	} from "@/utils/mixin";
	export default {
		mixins: [appMixin],
		props: {
			showDate: {
				type: Boolean,
				default:false
			},
			deliveryTimeText:{
				type: String
			}
		},
		methods: {
			timePicker:function(){
				uni.$emit('timepicker',true);
			},
			methodChange: function() {
				this.setReceivingMethod(!this.$receivingMethod);
				if (!this.$receivingMethod) {
					this.$Router.push({
						name: "storeList"
					})
				} else {
					this.setCurrentStore({});
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
					this.$Router.push({
						name: 'storeList'
					})
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
		width: 96%;
		background-color: #fff;
		margin: 0 auto;
		padding: 0 18rpx;
		border-radius: 14rpx;

		.modify-date {
			position: relative;
			@include flexVtCenter;
			width: 100%;
			height: 76rpx;
			margin: 0 auto;
			background-color: #fff;

			.tit {
				font-size: 28rpx;
				line-height: 28rpx;
				color: $color-text0;
			}

			.right {
				@include flexVtCenter;
				margin-left: auto;

				.text {
					font-size: 28rpx;
					line-height: 28rpx;
					color: $color-green;
					font-weight: 700;
				}

				.icon-to {
					font-size: 24rpx;
					line-height: 24rpx;
					color: $color-text3;
					margin-left: 8rpx;
				}
			}

			.hr {
				@include absLvCenter;
				bottom: 0;
				width: 100%;
				height: 1px;
				background-color: #e3e3e3;
			}
		}

		.location-view {
			@include flexVtCenter;
			position: relative;
			width: 100%;
			height: 132rpx;

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
					margin-bottom: 6rpx;
				}

				.text-2 {
					font-size: 22rpx;
					line-height: 32rpx;
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
	}
</style>
