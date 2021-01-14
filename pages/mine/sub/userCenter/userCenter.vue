<template>
	<view>
		<top-bar pageTitle="个人中心"></top-bar>
		<view class="footage">
			<view class="msg">头像</view>
			<view class="pic">11111</view>
			<i class="icon icon-to"></i>
		</view>
		<view class="nickName">
			<view class="msg">昵称</view>
			<input type="text"  placeholder="输入昵称" v-model="name" class="pic" />
			<i class="icon icon-to"></i>
		</view>
		<view class="sex">
			<view class="msg">性别</view>
			<view class="pic">男</view>
			<i class="icon icon-to"></i>
		</view>
		<view class="birth">
			<view class="msg">生日</view>
			<view class="pic">19980929</view>
			<i class="icon icon-to"></i>
		</view>
		<view class="phone">
			<view class="msg">手机号</view>
			<view class="pic">{{this.tel}}</view>
			<i class="icon icon-to"></i>
		</view>
		<view class="save" @tap="logOut()">退出登录</view>
	</view>
</template>

<script>
	import userApi from "@/api/userApi.js"
	export default {
		onLoad() {
			console.log(this.$Route.query.obj)
			this.infoList = this.$Route.query.obj
			this.name = this.infoList.nickName
			this.tel = this.infoList.cellPhone
			
		},
		data() {
			return {
				infoList:[],
				tel:'',
				name:'',
			};
		},
		methods: {
			logOut() {
				// 退出登录
				userApi
					.logOutNow()
			}
		}
	}
</script>

<style lang="scss">
	.pic{
		display: flex;
		flex-direction: row;
		font-size: 38rpx;
		height: 100rpx;
		text-align: left;
		line-height: 100rpx;
	}
	.footage,
	.nickName,
	.sex,
	.birth,
	.phone {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		font-size: 38rpx;
		height: 100rpx;
		text-align: left;
		line-height: 100rpx;
		.msg {
			width: 80%;
			margin-left: 25rpx;
		}

		.icon-to {
			margin-right: 25rpx;
		}
	}

	.save {
		height: 90rpx;
		width: 620rpx;
		@include btnRed margin-left: 60rpx;
		margin-top: 120rpx;
	}
</style>
