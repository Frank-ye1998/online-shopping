<template>
	<view class="index-main">
		<top-status-bar></top-status-bar>
		<view class="top-location">
			<div class="left">
				<i class="icon icon-location"></i>
				<div class="text-view">
					{{$locationInfo.formatted_addresses?$locationInfo.formatted_addresses.recommend:'定位中…'}}
				</div>
			</div>
			<!-- <div class="right">
				<image class="news" src="/static/images/home/icon-news.png"></image>
			</div> -->
		</view>
		<div class="top-location-plc"></div>
		<top-carousel class="top-carousel"></top-carousel>
		<view class="top-tips">
			<view class="tips">
				最快30分钟送达
			</view>
			<view class="tips">
				满30元免配送费
			</view>
			<view class="tips">
				安全食品
			</view>
		</view>
		<view class="category-view">
			<view class="list" v-for="(item,index) in mess" :key="index">
				<image :src="item.url" class="category-img"></image>
				<view class="category-text">{{item.msg}}</view>
			</view>
		</view>
		<view class="vip-save">
			<view class="vip-left">
				<view class="opening-vip">开通会员</view>
				<view class="year-vip">年费会员限时99元</view>
			</view>
			<view class="vip-right">
				立即开通
			</view>
		</view>
		<view class="limited">
			<view class="lim-title">
				<view class="lim">限时抢购</view>
				<view class="time-out">
					<i class="icon icon-time"></i>
					<view class="text">12:15:26</view>
				</view>
				<text class="more">更多></text>
			</view>
			<view class="limit-content">
				<commodity-view name="智利车厘子J级1盒450g 【包装随机发货】" mainImg="/static/images/home/shop-1.png" :payPrice="9.88" :originalPrice="12.88"></commodity-view>
				<commodity-view name="智利车厘子J级1盒450g 【包装随机发货】" mainImg="/static/images/home/shop-1.png" :payPrice="9.88" :originalPrice="12.88"></commodity-view>
			</view>
		</view>
		<view class="recommed">
			<view class="recom-title">
				<view title="" class="reco">人气推荐</view>
			</view>
			<view class="recom-content">
				<view class="content-top">
					<view v-for="(item,index) in arr" :key="index" :class="['cli-font']" @tap="getItem(index)">
						{{item.name}}
						<view v-show="index===arrStatus" class="select-hr"></view>
					</view>
				</view>
				<view class="content-bottom">
					<commodity-view v-for="(item,index) in shopArr[arrStatus]" :mainImg="item.url" :name="item.names" :payPrice="item.price"></commodity-view>
				</view>
			</view>
		</view>

		<div class="bottom-login" v-if="bottomLogin">
			<div class="text">
				您还没有登录，快去登录开启健康购物生活~
			</div>
			<div class="login-btn" @tap="toLogin">
				立即登录
			</div>
		</div>
		<div class="bottom-login-plc" v-if="bottomLogin"></div>
	</view>
</template>

<script>
	import config from "@/config.js";
	import userApi from "@/api/userApi.js";
	import topCarousel from "@/components/top-carousel/top-carousel.vue";
	import {
		appMixin
	} from "@/utils/mixin";
	import commodityView from "@/components/commodity-view/commodity-view.vue"
	export default {
		mixins: [appMixin],
		components: {
			'top-carousel': topCarousel,
			'commodity-view': commodityView
		},
		data() {
			return {
				bottomLogin: false, //底部登录提示
				shopArr: [
					[{
							names: "智利车厘子J级1盒450g",
							url: "/static/images/home/shop-1.png",
							price: "16.2",
						},
						{
							names: "丹东红颜草莓1盒500g",
							url: "/static/images/home/shop-1.png",
							price: "16.2",
						},
						{
							names: "智利车厘子J级1盒450g",
							url: "/static/images/home/shop-1.png",
							price: "16.2",
						},
						{
							names: "丹东红颜草莓1盒500g",
							url: "/static/images/home/shop-1.png",
							price: "16.2",
						},
					],
					[{
							names: "智利车厘子J级2盒450g",
							url: "/static/images/home/shop-1.png",
							price: "26.2",
						},
						{
							names: "丹东红颜草莓2盒500g",
							url: "/static/images/home/shop-1.png",
							price: "26.2",
						},
						{
							names: "智利车厘子J级2盒450g",
							url: "/static/images/home/shop-1.png",
							price: "26.2",
						},
						{
							names: "丹东红颜草莓2盒500g",
							url: "/static/images/home/shop-1.png",
							price: "26.2",
						},
					],
					[{
							names: "智利车厘子J级3盒450g",
							url: "/static/images/home/shop-1.png",
							price: "36.2",
						},
						{
							names: "丹东红颜草莓3盒500g",
							url: "/static/images/home/shop-1.png",
							price: "36.2",
						},
						{
							names: "智利车厘子J级3盒450g",
							url: "/static/images/home/shop-1.png",
							price: "36.2",
						},
						{
							names: "丹东红颜草莓3盒500g",
							url: "/static/images/home/shop-1.png",
							price: "36.2",
						},
					],
					[{
							names: "智利车厘子J级4盒450g",
							url: "/static/images/home/shop-1.png",
							price: "46.2",
						},
						{
							names: "丹东红颜草莓4盒500g",
							url: "/static/images/home/shop-1.png",
							price: "46.2",
						},
						{
							names: "智利车厘子J级4盒450g",
							url: "/static/images/home/shop-1.png",
							price: "46.2",
						},
						{
							names: "丹东红颜草莓4盒500g",
							url: "/static/images/home/shop-1.png",
							price: "46.2",
						},
					],
				],
				mess: [{
						msg: "新鲜蔬菜",
						url: "../../static/images/home/1.png",
					},
					{
						msg: "时令水果",
						url: "../../static/images/home/2.png",
					},
					{
						msg: "海鲜水产",
						url: "../../static/images/home/3.png",
					},
					{
						msg: "肉禽蛋类",
						url: "../../static/images/home/4.png",
					},
					{
						msg: "米面粮油",
						url: "../../static/images/home/5.png",
					},
					{
						msg: "方便速食",
						url: "../../static/images/home/6.png",
					},
					{
						msg: "加工调理",
						url: "../../static/images/home/7.png",
					},
					{
						msg: "蛋品豆面",
						url: "../../static/images/home/8.png",
					},
					{
						msg: "酒水饮料",
						url: "../../static/images/home/9.png",
					},
					{
						msg: "厨房用品",
						url: "../../static/images/home/10.png",
					},
				],
				arrStatus: 0,
				arr: [{
						name: "全部",
						id: 1,
					},
					{
						name: "晚餐",
						id: 2,
					},
					{
						name: "人气",
						id: 3,
					},
					{
						name: "心选",
						id: 4,
					},
				],
				con: [{}],
			};
		},
		methods: {
			getItem(index) {
				this.arrStatus = index;
			},
			toLogin: function() {
				this.$Router.push({
					name: "mobileLogin"
				})
			}
		},
		onShow() {
			if (!this.$loginKey.sessionId) {
				this.bottomLogin = true;
			} else {
				this.bottomLogin = false;
			}
		},
		onLoad() {

		},
	};
</script>

<style lang="scss">
	page {
		background-color: $color-page;
	}

	.top-location {
		@include flexVtCenter;
		position: fixed;
		z-index: 20;
		top: var(--status-bar-height);
		left: 50%;
		transform: translateX(-50%);
		width: 96%;
		height: 90rpx;
		background-color: $color-page;

		.left {
			@include flexVtCenter;
			@include ellipsis;
			width: 78%;

			.icon-location {
				font-size: 32rpx;
				color: $color-text2;
			}

			.text-view {
				font-size: 30rpx;
				line-height: 30rpx;
				margin-left: 8rpx;
				color: $color-text2;
			}
		}

		.right {
			margin-left: auto;

			.news {
				width: 40rpx;
				height: 40rpx;
			}
		}
	}

	.top-location-plc {
		width: 100%;
		height: 90rpx;
	}

	.top-carousel {
		width: 96%;
		height: 300rpx;
		margin: 0 auto;
	}

	.top-tips {
		@include flexVtCenter;
		width: 96%;
		height: 72rpx;
		justify-content: space-between;
		font-size: 22rpx;
		color: $color-text3;
		margin: 0 auto;
		padding: 0 36rpx;
	}

	.img-vip {
		width: 100%;
		height: 100rpx;

		.gvip {
			width: 100%;
			height: 100rpx;
		}
	}

	.category-view {
		display: flex;
		width: 96%;
		height: 380rpx;
		flex-flow: row wrap;
		justify-content: space-between;
		padding: 32rpx 0 0;
		background: #fff;
		margin: 0 auto;
		border-radius: 30rpx;

		.list {
			display: flex;
			flex-flow: column;
			align-items: center;
			width: 20%;
			height: 158rpx;
			.category-img {
				width: 98rpx;
				height: 98rpx;
			}
			.category-text {
				font-size: 24rpx;
				line-height: 24rpx;
				color: $color-text1;
				margin-top: 20rpx;
			}
		}
	}

	.vip-save {
		width: 96%;
		height: 120rpx;
		background: url("../../static/images/home/back.png") top center no-repeat;
		background-size: 100% 100%;
		margin: 32rpx auto;
		display: flex;
		flex-direction: row;
		position: relative;

		.vip-left {
			width: 250rpx;
			height: 120rpx;
			margin-left: 44rpx;

			.opening-vip {
				width: 130rpx;
				height: 32rpx;
				font-size: 32rpx;
				color: #ecc28d;
				margin-top: 21rpx;
			}

			.year-vip {
				width: 239rpx;
				height: 30rpx;
				font-size: 28rpx;
				color: #ecc28d;
				margin-top: 15rpx;
			}
		}

		.vip-right {
			width: 167.9rpx;
			height: 62rpx;
			background: #ecc38e;
			border-radius: 30.99rpx;
			position: absolute;
			right: 44rpx;
			top: 30rpx;
			font-size: 30rpx;
			text-align: center;
			line-height: 62rpx;
		}
	}

	.limited {
		width: 100%;

		.lim-title {
			@include flexVtCenter;
			flex-direction: row;
			position: relative;
			width: 96%;
			height: 44rpx;
			margin: 0 auto;

			.lim {
				font-size: 40rpx;
				line-height: 40rpx;
				color: $color-text1;
				font-weight: 700;
			}

			.time-out {
				@include flexCenter;
				width: 146rpx;
				height: 36rpx;
				background-color: $color-red;
				color: #fff;
				border-radius: 999px;
				margin-left: 16rpx;

				.icon {
					font-size: 28rpx;
					margin-right: 4rpx;
				}

				.text {
					font-size: 22rpx;
				}
			}

			.more {
				position: absolute;
				font-size: 24rpx;
				color: #999;
				right: 3.87%;
			}
		}

		.limit-content {
			width: 96%;
			column-count: 2;
			column-gap: 0rpx;
			margin: 30rpx auto 0;
			background-color: #fff;
			border-radius: 14rpx;
		}
	}

	.recommed {
		width: 100%;
		margin-top: 44rpx;

		.recom-title {
			@include flexVtCenter;
			flex-direction: row;
			position: relative;
			width: 96%;
			height: 44rpx;
			margin: 0 auto;

			.reco {
				font-size: 40rpx;
				line-height: 40rpx;
				color: $color-text1;
				font-weight: 700;
			}
		}

		.recom-content {
			width: 96%;
			margin: 30rpx auto;

			.content-top {
				display: flex;
				width: 100%;
				height: 74rpx;
				flex-flow: row nowrap;
				justify-content: space-between;
				background-color: #fff;
				border-radius: 16rpx 16rpx 0 0;

				.cli-font {
					position: relative;
					@include flexCenter;
					flex: 1;
					font-size: 28rpx;
					color: $color-text1;

					.select-hr {
						@include absLvCenter;
						bottom: 0;
						width: 60rpx;
						height: 4px;
						border-radius: 999px;
						background-color: $color-green;
					}
				}
			}

			.content-bottom {
				width: 100%;
				column-count: 2;
				column-gap: 0rpx;
				background-color: #fff;

				.content-query {
					margin-top: 30rpx;
					width: 340rpx;
					height: 480rpx;
					overflow: hidden;
					background: #ffffff;
					border-radius: 20rpx;
					display: flex;
					flex-direction: column;

					.con-img {
						width: 300rpx;
						margin-left: 5%;
						margin-top: 20rpx;
					}

					.name-title {
						width: 273rpx;
						font-size: 28rpx;
						height: 59rpx;
						padding-left: 30rpx;
						margin-top: 20rpx;
					}

					.pri {
						position: relative;
						display: flex;
						width: 100%;
						height: 80rpx;
						flex-direction: row;
						position: relative;
						line-height: 70rpx;
						align-items: center;
						padding-left: 10rpx;
						margin-top: 18rpx;

						.price-t {
							color: $color-red;
							width: 77rpx;
							height: 72rpx;
							font-weight: bold;
						}

						.btn-car {
							@include flexCenter;
							position: absolute;
							bottom: 12rpx;
							right: 18rpx;
							width: 50rpx;
							height: 50rpx;
							border-radius: 50%;
							color: #fff;
							@include btnGreen-gradient-bottom;
						}
					}
				}
			}
		}
	}
	.bottom-login-plc {
		width: 100%;
		height: 70rpx;
	}
	.bottom-login {
		@include flexVtCenter;
		position: fixed;
		z-index: 20;
		bottom: var(--window-bottom);
		left: 0;
		width: 100%;
		height: 70rpx;
		background-color: rgba(0, 0, 0, 0.5);
		padding: 0 24rpx;

		.text {
			font-size: 24rpx;
			color: #fff;
		}

		.login-btn {
			@include flexCenter;
			width: 160rpx;
			height: 48rpx;
			margin-left: auto;
			font-size: 24rpx;
			color: #fff;
			border-radius: 8rpx;
			background-color: $color-green;
		}
	}
</style>
