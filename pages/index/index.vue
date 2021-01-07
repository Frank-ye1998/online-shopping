<template>
	<view class="index-main">
		<warp-bar></warp-bar>
		
		<view class="food-img">
			<view class="font-query" v-for="(item,index) in mess" :key="index">
				<image src="../../static/images/home/food.jpg" mode="widthFix" class="menu-img"></image>
				<view class="menu-font">{{item.msg}}</view>
			</view>
		</view>
		<view class="vip-save">
			<i class="icon vipplus"></i>
		</view>
		<view class="limited">
			<view class="lim-title">
				<view title="" class="lim">限时抢购</view>
				<text class="more">更多</text>
			</view>
			<view class="limit-content">
				<view class="limt-query">
					<image src="../../static/images/home/food.jpg" mode="widthFix" class="limit-food"></image>
					<text>现磨豆浆</text>
					<view class="pri">
						<text>￥3</text>
						<view type="default" class="btn-car"><i class="icon shopping-car"></i></view>
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
					<view v-for="(item,index) in arr" :key="index" :class="['cli-font',index===arrStatus?'content-top-select':'']" @tap="getItem(index)">{{item.name}}</view>
				</view>
				<view class="content-bottom">
					<view class="content-query">
						<image src="../../static/images/home/food.jpg" mode="widthFix" class="con-img"></image>
						<text>现磨豆浆</text>
						<view class="pri">
							<text>￥3</text>
							<button type="default" class="btn-car"><i class="icon shopping-car"></i></button>
						</view>
					</view>
					<view class="content-query">
						<image src="../../static/images/home/food.jpg" mode="widthFix" class="con-img"></image>
						<text>现磨豆浆</text>
						<view class="pri">
							<text>￥3</text>
							<button type="default" class="btn-car"><i class="icon shopping-car"></i></button>
						</view>
					</view>
				</view>
			</view>
		</view>
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
				mess:[
					{
						msg:"营养早餐",
					},
					{
						msg:"营养早餐",
					},
					{
						msg:"营养早餐",
					},
					{
						msg:"营养早餐",
					},
					{
						msg:"营养早餐",
					},
					{
						msg:"营养早餐",
					}
				],
				arrStatus: 0,
				arr: [{
						name: "全部",
					},
					{
						name: "晚餐",
					},
					{
						name: "人气",
					},
					{
						name: "心选",
					},
				],
				con:[{
					
				}]
			};
		},
		methods:{
			getItem(index){
				console.log(index);
				this.arrStatus = index
			}
		},
		onShow() {
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
		width: 100%;
		height: 400rpx;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		text-align: center;
		line-height: 200rpx;
		padding: 28rpx 0;
		
		.font-query{
			width: 20%;
			height: 160rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			.menu-font{
				width: 100%;
				height: 50rpx;
				margin-top: -50rpx;
			}
			.menu-img{
				width: 68%;
			}
		}
	}
	.vip-save {
		width: 100%;
		height: 70rpx;
		background: $color-red;
		.save-img {
			width: 100%;
			height: 70rpx;
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
			border-left: solid 5px #3CB963;
			font-size: 40rpx;
			display: flex;
			flex-direction: row;
			position: relative;
			.more {
				font-size: 15rpx;
				color: #3CB963;
				position: absolute;
				right: 20rpx;
			}
		}

		.limit-content {
			width: 100%;
			margin-left: 50rpx;
			margin-top: 50rpx;

    .limt-query {
      width: 40%;
      height: auto;

      .limit-food {
        width: 100%;
        height: 200rpx;
        margin-top: 10rpx;
      }

				.pri {
					width: 100%;
					height: 50rpx;
					display: flex;
					flex-direction: row;
					margin-top: 30rpx;
					position: relative;
					.btn-car {
						width: 50rpx;
						height: 50rpx;
						background: #3CB963;
						border-radius: 50%;
						position: absolute;
						right: 10rpx;
						@include flexCenter;
						.shopping-car{
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
				.cli-font{
					width: 25%;
				}
			}
			.content-top-select {
				color: $color-green;
				border-bottom: solid 2px $color-green;
			}
			.content-bottom{
				width: 100%;
				margin-top: 30rpx;
				display: flex;
				flex-direction: row;
				padding: 0 24rpx;
				justify-content: space-between;
				.content-query{
					width: 330rpx;
					.con-img{
						width: 100%;
						height: 200rpx;
					}
					.pri{
						display: flex;
						width: 100%;
						height: 70rpx;
						flex-direction: row;
						position: relative;
						.btn-car {
							width: 50rpx;
							height: 50rpx;
							background: #3CB963;
							border-radius: 50%;
							position: absolute;
							right: 10rpx;
							@include flexCenter;
							.shopping-car{
								font-size: 38rpx;
								
							}
						}
					}
				}
			}
		}
	}
</style>
