<template>
	<view class="detail-main">
		{{this.$route.query.typeId}}
		<view class="deta-mess">
			<view class="detail-img">
				<image src="../../../../static/images/home/food.jpg" mode="widthFix" class="details-imgs"></image>
				<view class="back" @click="goBack()">
					
				</view>
			</view>
		</view>
		<view class="detail-con">
			<view class="con-name">叮咚大满贯</view>
			<view class="con-brief">2菜2菇|免切净菜|家庭火锅</view>
		</view>
		<!-- 规格 -->
		<view class="choice-commodity">
			<view class="commod">
				<view class="com-left">
					<view class="font-left" v-for="(item,index) in comArr" :key="index">
						{{item.name}}
					</view>
				</view>
				<view class="font-right">
					<view class="size" v-for="(item,index) in sizeArr" :key="index">
						{{item.names}}
					</view>
				</view>
			</view>
		
		</view>
		<view class="default">
			超值加购推荐，满足加倍~
		</view>
		<view class="calculation">
			<view class="price">
				<view class="calcula-price">
					￥6
				</view>
				<view class="add-class">
					<view class="calcula-cli">
						<view class="sub">-</view>
						<text>1</text>
						<view class="add">+</view>
					</view>
					<view class="add-cart">
						加入购物车
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sizeArr:[
					{names:'小杯'},
					{names:'中杯'},
					{names:'大杯'},
					{names:'热'},
					{names:'常温'},
					{names:'冷'},
					{names:'有糖'},
					{names:'无糖'},
				],
				comArr:[
					{
						name:'大小'
					},
					{
						name:'温度'
					},
					{
						name:'糖'
					},
					
				]
			};
		},
		methods:{
			goBack(){
				this.$Router.back(-1);
			}
		}
	}
</script>

<style lang="scss">
page {
  background-color: $color-page;
}
.detail-main{
	display: flex;
	flex-direction: column;
	.deta-mess{
		width: 100%;
		height: 550rpx;
		.detail-img{
			width: 100%;
			position: relative;
			.details-imgs{
				width: 100%;
			}
			.back{
				width: 70rpx;
				height: 70rpx;
				background: $color-text1;
				opacity: 0.6;
				border-radius: 50%;
				position: absolute;
				top: 0;
				left: 10rpx;
			}
		}
	}
	.detail-con{
		width: 95%;
		height: 150rpx;
		background: $color-green-transparent;
		margin-left: 2.5%;
		line-height: 65rpx;
		padding-left: 30rpx;
		margin-top: 20rpx;
		.con-name{
			font-size: 39rpx;
			padding-top: 15rpx;
		}
		.con-brief{
			font-size: 29rpx;
			color: $color-text3;
		}
	}
	.choice-commodity{
		width: 95%;
		height: 300rpx;
		background: $color-green-transparent;
		display: flex;
		flex-direction: column;
		margin-left: 2.5%;
		margin-top: 20rpx;
		.commod{
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: row;
			align-items: center;
			padding-left: 10rpx;
			justify-content: space-around;
			.com-left{
				width: 20%;
				height: 100%;
				display: flex;
				flex-direction: column;
				line-height: 100rpx;
				text-align: left;
				color: $color-text2;
				.font-left{
					width: 100%;
					height: 35%;
					
				}
			}
			.font-right{
				width: 70%;
				height: 100%;
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				text-align: center;
				line-height: 100rpx;
				.size{
					width: 30%;
					height: 35%;
					
					
				}
			}
		}
	}
	.default{
		width: 95%;
		height: 100rpx;
		background-color: $color-green-transparent;
		margin-top: 10rpx;
		margin-left: 2%;
		line-height: 100rpx;
		padding-left: 20rpx;
		color: $color-text2;
	}
	.calculation{
		width: 100%;
		height: 160rpx;
		display: flex;
		flex-direction: row;
		background: $color-green-transparent;
		margin-top: 20rpx;
		align-items: center;
		.price{
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: row;
			line-height: 100rpx;
			justify-content: space-around;
			.calcula-price{
				color: $color-red;
				font-size: 50rpx;
				padding-left: 30rpx;
			}
			.add-class{
				width: 60%;
				display: flex;
				flex-direction: row;
				align-items: center;
				.calcula-cli{
						display: flex;
						flex-direction: row;
						justify-content: space-around;
						width: 200rpx;
						height: 100%;
						align-items: center;
						.sub{
							width: 50rpx;
							height: 50rpx;
							background: $color-red;
							text-align: center;
							line-height: 50rpx;
							border-radius: 50%;
							color: $color-green-transparent;
						}
						.add{
							width: 50rpx;
							height: 50rpx;
							background:$color-red;
							text-align: center;
							line-height: 50rpx;
							border-radius: 50%;
							color: $color-green-transparent;
						}
					}
					.add-cart{
						width: 200rpx;
						height: 80rpx;
						background: $color-red;
						border-radius: 40rpx;
						text-align: center;
						line-height: 80rpx;
						font-size: 28rpx;
						color: $color-green-transparent;
						letter-spacing: 2rpx;
						font-weight: lighter;
						margin-left: 20rpx;
					}
				}
			}
			
		
	}
}

</style>
