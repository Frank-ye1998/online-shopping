<template>
	<view>
		<top-bar pageTitle="门店列表 "></top-bar>
		<div class="top-search">
			<input class="search-input" placeholder="输入门店名称搜索门店" type="text" maxlength="20">
		</div>
		<div class="list">
			<div class="top-name">
				<div class="tag">达美乐</div>
				<div class="name">日月光店</div>
				<div class="distance">
					118m
				</div>
			</div>
			<div class="time">
				<i class="icon icon-time"></i>
				12:00-6:00
			</div>
			<div class="location">
				<i class="icon icon-location"></i>
				<div class="text">在哪呢</div>
				<div class="to-map">前往导航 ></div>
			</div>
		</div>
	</view>
</template>

<script>
	import {
		calcDistance
	} from "@/utils/tool.js";
	import {
		appMixin
	} from "@/utils/mixin";
	export default {
		mixins: [appMixin],
		data() {
			return {
				storeList: []
			};
		},
		methods: {

		},
		onLoad() {
			let arr = this.$storeList.map(item => {
				let distance = calcDistance({
					lat1: this.$$locationXy.lat,
					lng1: this.$$locationXy.lng,
					lat2: Number(item.lat),
					lng2: Number(item.lng)
				})
				item.distance = distance;
			});
			console.log(arr);
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $color-page;
	}

	.top-search {
		width: 96%;
		height: 80rpx;
		background-color: #fff;
		border-radius: 14rpx;
		margin: 18rpx auto;

		.search-input {
			width: 100%;
			height: 100%;
			font-size: 26rpx;
			color: $color-text1;
			padding-left: 26rpx;
		}
	}

	.list {
		width: 96%;
		border-radius: 14rpx;
		background-color: #fff;
		margin: 0 auto;
		padding: 18rpx;

		.top-name {
			@include flexVtCenter;
			width: 100%;
			height: 42rpx;
			align-items: flex-end;
			.tag {
				font-size: 22rpx;
				line-height: 22rpx;
				color: #fff;
				border-radius: 6rpx;
				padding: 6rpx 10rpx;
				background-color: $color-green;
			}

			.name {
				@include ellipsis;
				width: 68%;
				font-size: 30rpx;
				color: $color-text1;
				line-height: 30rpx;
				margin-left: 16rpx;
			}

			.distance {
				font-size: 26rpx;
				line-height: 26rpx;
				color: $color-text4;
				margin-left: auto;
			}
		}

		.time {
			display: flex;
			width: 100%;
			font-size: 26rpx;
			line-height: 26rpx;
			margin-top: 16rpx;
			color: $color-text3;
			align-items: flex-end;

			.icon {
				font-size: 30rpx;
				color: $color-text3;
				margin-right: 6rpx;
			}
		}

		.location {
			display: flex;
			width: 100%;
			margin-right: 6rpx;
			margin-top: 12rpx;

			.icon {
				font-size: 28rpx;
				color: $color-text3;
				margin-right: 8rpx;
			}

			.text {
				width: 72%;
				font-size: 26rpx;
				color: $color-text3;
				line-height: 26rpx;
			}

			.to-map {
				font-size: 26rpx;
				color: #6d87c4;
				line-height: 26rpx;
				margin-left: auto;
				padding:0 6rpx;
			}

		}
	}
</style>
