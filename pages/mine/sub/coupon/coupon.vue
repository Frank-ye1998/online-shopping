<template>
	<view>
		<top-bar pageTitle="优惠券"></top-bar>
		<view class="">
			<view class="box1">
				<input type="text" value="" placeholder="请输入优惠码" class="fillIn" />
				<view class="change">
					兑换
				</view>
			</view>
			<view class="tabber">
				<view v-for="(item,index) in arr" :key="index" 
				:class="['cli-font',index===arrStatus?'content-top-select':'']" @tap="getItem(index)">{{item.name}}</view>
			</view>
			<view class="box">
				<view class="box2">
					<view class="money">1.5元</view>
					<view class="tip">无使用门槛，最多使用一张</view>
				</view>
				<view class="box3">
					<view class="money">优惠券</view>
					<view class="date">2021.01.01-2021.12.31</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				arrStatus: 0,
				arr:[{
						name: "可用",
					},
					{
						name: "不可用",
					}
				],
			};
		},
		methods:{
			getItem(index){
				this.arrStatus = index
			}
		}
	}
</script>

<style lang="scss">
	.box1 {
		display: flex;
		flex-direction: row;
		height: 100rpx;
		
		line-height: 100rpx;
		justify-content: space-between;
		
	}
	.box{
		margin: 50rpx 24rpx 24rpx 24rpx;
		@include flexCenter;
		height:200rpx;
		border: solid 0.5rpx #909090;
		border-radius: 20rpx;
	}
	.tabber {
		display: flex;
		flex-direction: row;
		@include flexCenter width: 100%
	}
	
	.content-top-select {
		color: $color-red;
		border-bottom: solid 2px $color-red;
	}
	.cli-font {
		width: 30%;
		margin-left: 40rpx;
		margin-right: 40rpx;
		height: 80rpx;
		font-size: 38rpx;
		text-align: center;
		line-height: 80rpx;
	}

	.fillIn {
		width: 600rpx;
		height: 100rpx;
		margin-left: 24rpx;
	}

	.change {
		color: red;
		margin-right: 24rpx;
	}
	.text{
		margin-left: 24rpx;
	}
</style>
