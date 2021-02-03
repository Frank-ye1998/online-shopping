<template>
	<view>
		<top-bar pageTitle="门店列表 "></top-bar>
		<div class="top-search">
			<input @input="searchStore" v-model="searchText" class="search-input" placeholder="输入门店名称搜索门店" type="text" maxlength="20">
			<image @tap="clearSearch" v-show="searchText.length" class="clear-btn" src="/static/icon/icon-clear.png"></image>
		</div>
		<div class="list" @tap="storeTap(item)" v-for="item in storeList" :key="item.id">
			<div class="top-name">
				<div class="tag">达美乐</div>
				<div class="name">{{item.name}}</div>
				<div class="distance">
					{{item.distanceText}}
				</div>
			</div>
			<div class="time">
				<i class="icon icon-time"></i>
				{{item.openingBeginTime.substring(0,5)}}-{{item.openingEndTime.substring(0,5)}}
			</div>
			<div class="location">
				<i class="icon icon-location"></i>
				<div class="text">{{item.address}}</div>
				<!-- <div class="to-map">前往导航 ></div> -->
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
				storeList: [],
				searchText: '',
				selectStore: {}
			};
		},
		methods: {
			storeTap: function(store) {
				this.selectStore = store;
				this.setCurrentStore(store);
				this.$Router.back(1);
			},
			clearSearch: function() {
				this.searchText = '';
				this.searchStore();
			},
			searchStore: function() {
				if (!this.searchText) {
					this.getStoreList();
				} else {
					this.storeList = this.storeList.filter(item => {
						return item.name.indexOf(this.searchText) > -1
					})
				}
			},
			getStoreList: function() {
				let arr = this.$storeList.map(item => {
					let distance = calcDistance({
						lat1: this.$locationXy.lat,
						lng1: this.$locationXy.lng,
						lat2: Number(item.lat),
						lng2: Number(item.lng)
					})
					item.distance = distance;
					item.distanceText = distance > 1 ? `${distance.toFixed(2)}km` : `${parseInt(distance*1000)}m`;
					return item
				});
				arr.sort((a, b) => {
					return a.distance - b.distance
				})
				this.storeList = arr;
				console.log(arr,'门店列表');
			}
		},
		onLoad() {
			this.getStoreList();
		},
		onUnload() {
			if (!this.$currentStore.name) {
				this.setReceivingMethod(true);
			}
		},
	}
</script>

<style lang="scss">
	page {
		background-color: $color-page;
	}

	.top-search {
		position: relative;
		width: 96%;
		height: 80rpx;
		background-color: #fff;
		border-radius: 14rpx;
		margin: 18rpx auto;

		.search-input {
			width: 80%;
			height: 100%;
			font-size: 26rpx;
			color: $color-text1;
			padding-left: 26rpx;
		}

		.clear-btn {
			@include absVtCenter;
			right: 3%;
			width: 42rpx;
			height: 42rpx;
		}
	}

	.list {
		width: 96%;
		border-radius: 14rpx;
		background-color: #fff;
		margin: 18rpx auto;
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
			@include flexVtCenter;
			width: 100%;
			margin-right: 6rpx;
			margin-top: 14rpx;

			.icon {
				font-size: 28rpx;
				color: $color-text3;
				margin-right: 8rpx;
			}

			.text {
				width: 72%;
				font-size: 26rpx;
				line-height: 34rpx;
				color: $color-text3;
			}

			.to-map {
				font-size: 26rpx;
				color: #6d87c4;
				line-height: 26rpx;
				margin-left: auto;
				padding: 0 6rpx;
			}

		}
	}
</style>
