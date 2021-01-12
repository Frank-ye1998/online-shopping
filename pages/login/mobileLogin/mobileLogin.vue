<template>
	<view class="mobile-box">
		<top-bar pageTitle="账号登陆"></top-bar>
		<view class="mobile-img">
			<!-- <image src="../../../static/images/warpBar/doms.jpeg" mode=""></image> -->
		</view>
		<view class="mobile-ipt">
			<view class="ipt-mobile">
				<input type="text" value="" placeholder="请输入手机号"/>
			</view>
			<view class="ipt-code">
				<input type="text" value="" placeholder="请输入手机验证码"/>
				<view class="get-code">
					获取验证码
				</view>
			</view>
		</view>
		<view class="cli-sure">
			确定
		</view>
		<view class="font">
			点击确定，即表示已阅读并同意 <text class="text">《注册会员服务条款》</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
page {
  background-color: $color-page;
}

.mobile-title{
	text-align: center;
}
.mobile-ipt{
	width: 96%;
	height: 240rpx;
	background: $color-green-transparent;
	position: fixed;
	top: 300rpx;
	left: 2%;
	border-radius: 10rpx;
	position: relative;
	.ipt-mobile{
		width: 90%;
		height: 120rpx;
		margin-left: 5%;
		border-bottom: solid 2px $color-text4;
		line-height: 120rpx;
		input{
			width: 100%;
			height: 100%;
			font-size: 32rpx;
			letter-spacing: 2rpx;
			font-weight: lighter;
		}
	}
	.ipt-code{
		width: 90%;
		height: 120rpx;
		margin-left: 5%;
		line-height: 120rpx;
		input{
			width: 100%;
			height: 100%;
			font-size: 32rpx;
			letter-spacing: 2rpx;
			font-weight: lighter;
			position: relative;
		}
		.get-code{
			width: 180rpx;
			height:60rpx;
			border: solid 1rpx $color-text6;
			text-align: center;
			line-height: 60rpx;
			font-size: 20rpx;
			color:  $color-text6;
			letter-spacing: 2rpx;
			font-weight: lighter;
			border-radius: 40rpx;
			position: absolute;
			right: 14rpx;
			bottom: 30rpx;
		}
	}
}
.cli-sure{
	width: 96%;
	height: 90rpx;
	background: $color-text6;
	position: absolute;
	margin-left: 2%;
	top: 700rpx;
	border-radius: 40rpx;
	text-align: center;
	line-height: 90rpx;
	color: $color-green-transparent;
	letter-spacing: 8rpx;
	font-weight: lighter;
	
}
.font{
	width: 100%;
	text-align: center;
	line-height: 90rpx;
	letter-spacing: 3rpx;
	font-size: 26rpx;
	position: fixed;
	color: $color-text3;
	top: 830rpx;
	.text{
		color: #b6bce4;
	}
}
</style>
