<template>
	<view>
		<top-bar pageTitle="关于我们"></top-bar>
		<view class="logo-img">
			<image src="../../../../../../static/images/home/1.png" mode="widthFix" class="imgs"></image>
		</view>
		<view class="version">叮咚买菜 V<text>{{version}}</text></view>
		<view class="concern">
			<div class="list active" @tap="cliservice()">
				<div class="tit">
					服务协议
				</div>
				<i class="icon icon-to"></i>
				<div class="hr"></div>
			</div>
			<div class="list active" @tap="cliprivacy()">
				<div class="tit">
					隐私政策
				</div>
				<i class="icon icon-to"></i>
				<div class="hr"></div>
			</div>
			<div class="list active" @tap="cliqualifications()">
				<div class="tit">
					资质证照
				</div>
				<i class="icon icon-to"></i>
				<div class="hr"></div>
			</div>
		</view>
	</view>
</template>

<script>
import config from "@/config.js";
	export default {
		data() {
			return {
				version:config.appVersion
			};
		},
		methods:{
			cliservice:function(){
				this.$Router.push({
				  name: 'service'
				})
				console.log(config.appVersion,'appVersion');
			},
			cliprivacy:function(){
				this.$Router.push({
				  name: 'privacy'
				})
			},
			cliqualifications:function(){
				this.$Router.push({
					name: 'qualifications'
				})
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: $color-page;
}
.logo-img{
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 200rpx;
	margin-top: 60rpx;
	.imgs{
		width: 140rpx;
		height: 120rpx;
	}
}
.version{
	width: 90%;
	height: 60rpx;
	text-align: center;
	font-size: 28rpx;
	margin: 0 auto;
	color: $color-text2;
}
.concern{
	width: 100%;
	border-radius: 14rpx;
	margin: 24rpx auto;
	.list {
		position: relative;
		@include flexVtCenter;
		width: 100%;
		height: 110rpx;
		justify-content: space-between;
		padding: 0 22rpx;
		transition: all 0.1s;
	
		.tit {
			font-size: 30rpx;
			color: $color-text1;
		}
	
		.switch {
			transform: scale(0.78) translateX(22%)
		}
	
		.icon-to {
			font-size: 32rpx;
			color: $color-text3;
		}
	
		
		.hr {
			@include absLvCenter;
			bottom: 0;
			width: 100%;
			height: 1px;
			background-color: #efefef;
		}
	}
	
	.active {
		&:active {
			background-color: #FFFFFF;
			.hr {
				opacity: 0;
			}
		}
	}
}
</style>
