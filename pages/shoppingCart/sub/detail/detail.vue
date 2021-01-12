<template>
	<view class="detail-main">
		{{this.$route.query.typeId}}
		<view class="deta-mess">
			<view class="detail-img">
				<image src="../../../../static/images/home/food.jpg" mode="widthFix"></image>
			</view>
			<view class="detail-con">
				<view class="con-name">叮咚大满贯</view>
				<view class="con-brief">2菜2菇|免切净菜|家庭火锅</view>
			</view>
		</view>
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
		<view class="calculation">
			<view class="price">
				<view class="calcula-price">
					￥6
				</view>
				<view class="calcula-cli">
					<view class="sub">-</view>
					<text>1</text>
					<view class="add">+</view>
				</view>
			</view>
			<view class="add-cart">
				加入购物车
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
			
		}
	}
</script>

<style lang="scss">
.detail-main{
	.deta-mess{
		width: 100%;
		height: 600rpx;
		.detail-img{
			width: 100%;
		}
		.detail-con{
			width: 95%;
			height: 150rpx;
			background: $color-text4;
			margin-left: 2.5%;
			line-height: 60rpx;
			padding-left: 30rpx;
		}
	}
	.choice-commodity{
		width: 95%;
		height: 200rpx;
		background: $color-text4;
		display: flex;
		flex-direction: column;
		margin-top: 50rpx;
		margin-left: 2.5%;
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
				line-height: 60rpx;
				text-align: left;
				.font-left{
					width: 100%;
					height: 33%;
				}
			}
			.font-right{
				width: 50%;
				height: 100%;
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				.size{
					width: 30%;
					height: 30%;
					text-align: center;
					line-height: 60rpx;
				}
			}
		}
	}
	.calculation{
		width: 100%;
		height: 200rpx;
		display: flex;
		flex-direction: column;
		background: $color-text4;
		margin-top: 20rpx;
		align-items: center;
		position: relative;
		.price{
			width: 100%;
			height: 100rpx;
			display: flex;
			flex-direction: row;
			position: relative;
			line-height: 100rpx;
			.calcula-price{
				color: $color-red;
				font-size: 40rpx;
				padding-left: 30rpx;
			}
			.calcula-cli{
				width: 200rpx;
				position: absolute;
				justify-content: space-around;
				right: 10rpx;
				display: flex;
				flex-direction: row;
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
		}
		.add-cart{
			width: 200rpx;
			height: 80rpx;
			background: $color-red;
			right: 5rpx;
			border-radius: 40rpx;
			text-align: center;
			line-height: 80rpx;
			position: absolute;
			right: 5rpx;
			top: 100rpx;
			font-size: 28rpx;
			color: $color-green-transparent;
			letter-spacing: 2rpx;
			font-weight: lighter;
		}
	}
}

</style>
