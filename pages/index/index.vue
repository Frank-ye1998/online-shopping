<template>
	<view class="index-main">
		<warp-bar class="warp-bar"></warp-bar>
		<view class="mation">
			<view class="mation-left">
				最快30分钟送达
			</view>
			<view class="mation-center">
				满30元免配送费
			</view>
			<view class="mation-right">
				安全食品
			</view>
		</view>
		<view class="food-img">
			<view class="font-query" v-for="(item,index) in mess" :key="index">
				<image :src="item.url" mode="widthFix" class="menu-img"></image>
				<view class="menu-font">{{item.msg}}</view>
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
				<view title="" class="lim">限时抢购</view>
				<text class="more">更多</text>
			</view>
			<view class="limit-content">
				<view class="limt-query">
					<image src="../../static/images/home/food.jpg" mode="widthFix" class="limit-food"></image>
					<text class="name-food">现磨豆浆</text>
					<view class="pri">
						<text class="pri-o">￥3</text>
						<view type="default" class="btn-car">+</view>
					</view>
				</view>
			</view>
		</view>
		<view class="recommed">
			<view class="recom-title">
				<view title="" class="reco">人气推荐</view>
			</view>
			<view class="recom-content">
				<view class="content-top">
					<view v-for="(item,index) in arr" :key="index" :class="['cli-font',index===arrStatus?'content-top-select':'']"
					 @tap="getItem(index)">{{item.name}}</view>
				</view>
				<view class="content-bottom">
					<view v-for="(item,index) in shopArr[arrStatus]" :key="index" class="content-query">
						<view class="shop-img">
							<image :src="item.url" mode="widthFix" class="con-img"></image>
						</view>
						<text class="name-title">{{item.names}}</text>
						<view class="pri">
							<text class="price-t">￥{{item.price}}</text>
							<view type="default" class="btn-car">+</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- <image src="../../static/images/home/back.png" mode=""></image> -->
	</view>
</template>

<script>
	import userApi from "@/api/userApi.js";
	import topBar from "@/components/top-bar/top-bar.vue";
	import warpBar from "@/components/warp-bar/warp-bar.vue";
	// import TS-TimeOut from "@/components/TS-TimeOut/TS-TimeOut.vue";

	export default {
		data() {
			return {
				shopArr: [
					[{
							names: "智利车厘子J级1盒450g",
							url: "../../static/images/home/shop-1.png",
							price: "16.2"
						},
						{
							names: "丹东红颜草莓1盒500g",
							url: "../../static/images/home/shop-2.png",
							price: "16.2"
						},
						{
							names: "智利车厘子J级1盒450g",
							url: "../../static/images/home/shop-1.png",
							price: "16.2"
						},
						{
							names: "丹东红颜草莓1盒500g",
							url: "../../static/images/home/shop-2.png",
							price: "16.2"
						}
					],
					[{
							names: "智利车厘子J级2盒450g",
							url: "../../static/images/home/shop-1.png",
							price: "26.2"
						},
						{
							names: "丹东红颜草莓2盒500g",
							url: "../../static/images/home/shop-2.png",
							price: "26.2"
						},
						{
							names: "智利车厘子J级2盒450g",
							url: "../../static/images/home/shop-1.png",
							price: "26.2"
						},
						{
							names: "丹东红颜草莓2盒500g",
							url: "../../static/images/home/shop-2.png",
							price: "26.2"
						}
					],
					[{
							names: "智利车厘子J级3盒450g",
							url: "../../static/images/home/shop-1.png",
							price: "36.2"
						},
						{
							names: "丹东红颜草莓3盒500g",
							url: "../../static/images/home/shop-2.png",
							price: "36.2"
						},
						{
							names: "智利车厘子J级3盒450g",
							url: "../../static/images/home/shop-1.png",
							price: "36.2"
						},
						{
							names: "丹东红颜草莓3盒500g",
							url: "../../static/images/home/shop-2.png",
							price: "36.2"
						}
					],
					[{
							names: "智利车厘子J级4盒450g",
							url: "../../static/images/home/shop-1.png",
							price: "46.2"
						},
						{
							names: "丹东红颜草莓4盒500g",
							url: "../../static/images/home/shop-2.png",
							price: "46.2"
						},
						{
							names: "智利车厘子J级4盒450g",
							url: "../../static/images/home/shop-1.png",
							price: "46.2"
						},
						{
							names: "丹东红颜草莓4盒500g",
							url: "../../static/images/home/shop-2.png",
							price: "46.2"
						}
					],

				],
				mess: [{
						msg: "新鲜蔬菜",
						url: "../../static/images/home/1.png"
					},
					{
						msg: "时令水果",
						url: "../../static/images/home/2.png"
					},
					{
						msg: "海鲜水产",
						url: "../../static/images/home/3.png"
					},
					{
						msg: "肉禽蛋类",
						url: "../../static/images/home/4.png"
					},
					{
						msg: "米面粮油",
						url: "../../static/images/home/5.png"
					},
					{
						msg: "方便速食",
						url: "../../static/images/home/6.png"
					},
					{
						msg: "加工调理",
						url: "../../static/images/home/7.png"
					},
					{
						msg: "蛋品豆面",
						url: "../../static/images/home/8.png"
					},
					{
						msg: "酒水饮料",
						url: "../../static/images/home/9.png"
					},
					{
						msg: "厨房用品",
						url: "../../static/images/home/10.png"
					},

				],
				arrStatus: 0,
				arr: [{
						name: "全部",
						id: 1
					},
					{
						name: "晚餐",
						id: 2
					},
					{
						name: "人气",
						id: 3
					},
					{
						name: "心选",
						id: 4
					},
				],
				con: [{

				}]
			};
		},
		methods: {
			getItem(index) {
				console.log(index);
				this.arrStatus = index
			}
		},
		onShow() {
			console.log(this.shopArr);
			/*
				页面管理规则：
				4个tab页面要一直保持打开状态，非特殊情况不要使用replace和replaceAll关闭Tab页面；
				page.json 中所有的页面都要命名name，所有路由跳转使用name跳转
				
				以下是路由常用方法：
			
				//跳转到某个页面(在当前页面栈上增加) name 是页面名称，query是需要传递的参数，不需要传参就不写query
				this.$Router.push({name:'xxx'},query:{xxx}); //下面的方法参数和这个相同
				
				//关闭当前页面然后跳转到某个页面
				this.$Router.replace();
				
				//关闭所有页面然后跳转到某个页面(也可跳转到tab页面)   (很少使用，这个方法会把tab页面也关掉，慎用)
				this.$Router.replaceAll();
				
				//跳转到tab页面，并关闭所有其他非tab页面  如果要跳转到tab页面，只能使用这个方法，不要使用其他方法(replaceAll除外)
				this.$Router.pushTab();
				
				//n是数值型，这个方法作用是在页面记录中后退多少步
				this.$Router.back(n);
				
				//获取当前页面的query参数
				this.$Route.query;
			*/
		},
		onLoad() {}
	};
</script>

<style lang="scss">
	page {
		background-color: $color-page;
	}

	.warp-bar {
		width: 90%;
		height: 330rpx;
		margin: auto;
		margin-top: 40rpx;
		border-radius: 30rpx;
	}

	.mation {
		width: 78%;
		height: 70rpx;
		margin: 0 auto;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		line-height: 90rpx;
		font-size: 22rpx;
		color: $color-text3;
	}

	.btn {
		width: 750rpx;
		height: 100rpx;
		border: 2px solid #000;
	}

	.img-vip {
		width: 100%;
		height: 100rpx;

		.gvip {
			width: 100%;
			height: 100rpx;
		}
	}

	.food-img {
		width: 688.1rpx;
		height: 410rpx;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		text-align: center;
		line-height: 200rpx;
		padding: 28rpx 0;
		background: $color-green-transparent;
		margin: 20rpx auto;
		border-radius: 30rpx;

		.font-query {
			width: 98rpx;
			height: 196rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-left: 34rpx;

			.menu-font {
				width: 98rpx;
				height: 24rpx;
				margin-top: -60rpx;
				font-size: 24rpx;
			}

			.menu-img {
				width: 98rpx;
				height: 98rpx;
				border-radius: 50%;
			}
		}
	}

	.vip-save {
		width: 690rpx;
		height: 120rpx;
		background-image: url('../../static/images/home/back.png');
		background-size: contain;
		margin: 48rpx auto;
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
				color: #ECC28D;
				margin-top: 21rpx;
			}

			.year-vip {
				width: 239rpx;
				height: 30rpx;
				font-size: 28rpx;
				color: #ECC28D;
				margin-top: 15rpx;
			}
		}

		.vip-right {
			width: 167.9rpx;
			height: 62rpx;
			background: #ECC38E;
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
		height: auto;
		margin-top: 60rpx;

		.lim-title {
			width: 100%;
			height: 60rpx;
			line-height: 60rpx;
			padding-left: 30rpx;
			border-left: solid 5px $color-green;
			font-size: 40rpx;
			display: flex;
			flex-direction: row;
			position: relative;

			.more {
				font-size: 15rpx;
				color: $color-green;
				position: absolute;
				right: 20rpx;
			}
		}

		.limit-content {
			width: 100%;
			padding-left: 22rpx;
			margin-top: 50rpx;

			.limt-query {
				margin-top: 30rpx;
				width: 340rpx;
				height: 380rpx;
				overflow: hidden;
				background: #FFFFFF;
				border-radius: 20rpx;
				display: flex;
				flex-direction: column;

				.limit-food {
					width: 300rpx;
					height: 280rpx;
					margin-left: 5%;
					margin-top: 20rpx;
				}

				.name-food {
					margin-left: 34rpx;
					margin-top: 20rpx;
				}

				.pri {
					width: 100%;
					height: 50rpx;
					display: flex;
					flex-direction: row;
					margin-top: 30rpx;
					position: relative;
					padding-left: 10rpx;

					.pri-o {
						color: $color-red;
						width: 77rpx;
						height: 72rpx;
						font-weight: bold;
					}

					.btn-car {
						width: 50rpx;
						height: 50rpx;
						background: $color-green;
						border-radius: 50%;
						position: absolute;
						right: 10rpx;
						@include flexCenter;

						.shopping-car {
							font-size: 38rpx;

						}
					}
				}
			}
		}
	}

	.recommed {
		width: 100%;
		height: auto;

		.recom-title {
			width: 90%;
			height: 60rpx;
			line-height: 60rpx;
			padding-left: 30rpx;
			border-left: solid 5px $color-green;
			font-size: 40rpx;
			margin-top: 30rpx;
		}

		//content-top
		.recom-content {
			width: 100%;
			height: auto;
			margin-top: 30rpx;

			.content-top {
				width: 100%;
				height: 70rpx;
				display: flex;
				flex-direction: row;
				text-align: center;
				justify-content: space-around;
				line-height: 70rpx;
				color: $color-text3;

				.cli-font {
					width: 25%;
				}
			}

			.content-top-select {
				color: $color-green;
				border-bottom: solid 2px $color-green;
			}

			.content-bottom {
				width: 100%;
				margin-top: 20rpx;
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				padding: 0 24rpx;
				justify-content: space-between;

				.content-query {
					margin-top: 30rpx;
					width: 340rpx;
					height: 480rpx;
					overflow: hidden;
					background: #FFFFFF;
					border-radius: 20rpx;
					display: flex;
					flex-direction: column;
					.shop-img{
						// width: 185rpx;
						// height: 106rpx;
						// background: #00C130;
					}
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
							width: 50rpx;
							height: 50rpx;
							background: $color-green;
							border-radius: 50%;
							position: absolute;
							right: 10rpx;
							@include flexCenter;
							color: $color-green-transparent;
							text-align: center;
							line-height: 70rpx;
							font-size: 45rpx;

							.shopping-car {
								font-size: 38rpx;

							}
						}
					}
				}
			}
		}
	}
</style>
