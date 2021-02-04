<template>
	<view>
		<top-bar pageTitle="账号登陆"></top-bar>
		<view class="mobile-img">
			<image src="../../../static/icon/favicon.png" mode="" class="imgs"></image>
		</view>
		<view class="mobile-ipt" v-if="isShowSMSLogin">
			<view class="ipt-mobile">
				<input type="text" v-model="phone" placeholder="请输入手机号" />
			</view>
			<view class="ipt-code">
				<input type="text" value="" placeholder="请输入手机验证码" />
				<view class="get-code" @tap="getSmsCode()" v-if="!countDown"> 获取验证码 </view>
				<view class="get-code" v-else> {{countDown}}s </view>
			</view>
		</view>
		<view class="mobile-ipt" v-else>
			<view class="ipt-mobile">
				<input type="text" v-model="phone" placeholder="请输入账号" />
			</view>
			<view class="ipt-code">
				<input type="text" value="" placeholder="请输入密码" />
			</view>
		</view>
		<view class="cli-sure" @tap="mobileLogin()"> 登录 </view>
		<view class="font">
			点击确定，即表示已阅读并同意
			<text class="text">《注册会员服务条款》</text>
		</view>
	</view>
</template>

<script>
	import userApi from "@/api/userApi.js";
	import Vue from "vue";
	import {
		appMixin
	} from "@/utils/mixin";
	export default {
		mixins: [appMixin],
		data() {
			return {
				phone: '',
				// phone: 17696769527,
				token: '',
				smsCode: '',
				isShowSMSLogin:true,
				countDown:0
			};
		},
		onShow() {
			setTimeout(() => {
				uni.hideLoading()
			}, 1000)
		},
		onLoad() {

		},
		methods: {
			//页面code（LOGIN_PAGE;REGISTER_PAGE）1
			mobileLogin: function() {
				if (!this.phone) {
					uni.showToast({
						title: "请输入手机号",
						icon: "none",
					});
					return;
				} else if (this.smsCode < 6) {
					uni.showToast({
						title: "请输入正确的验证码",
						icon: "none",
					});
					return;
				}
				uni.showLoading({
					title: "请稍等",
					mask: true,
				});
				userApi
					.smsLogin({
						cellPhone: this.phone,
						smsCode: this.smsCode
					})
					.then((res) => {
						console.log(res.successCode)
						if (res.successCode === "00") {
							this.saveUserKey(res.data);
							uni.showToast({
								title: "登录成功",
								icon: "none",
							})
							this.$Router.push({
								name: "index"
							});
						} else {
							uni.hideLoading();
							uni.showToast({
								title: res.message,
								icon: "none",
							});
						}
					})
					.catch((err) => {
						uni.hideLoading();
						console.log(err);
					});
			},
			getSmsCode: function(code) {
				this.countDown = 60;
				this.timeIntervalID = setInterval(() => {
				        this.countDown--;
				        if (this.countDown == 0) {
				          clearInterval(this.timeIntervalID);
				        }
				      }, 1000)

				return userApi
					.sendCode({
						cellPhone: this.phone,
						pageCode: code,
					})
					.then((res) => {
						this.smsCode = res.data.code
						console.log(res.data.code)
						uni.showToast({
							title: "验证码:" + this.smsCode,
							icon: "none",
						});
						return res.data.code;
					});

			},

			saveUserKey: function(data) {
				this.setLoginKey({
					sessionId: data.sessionId,
					userId: data.userId
				});
				uni.setStorageSync("sessionId", data.sessionId);
				uni.setStorageSync("userId", data.userId);
				uni.hideLoading();
			},
			
			changeWay(){
				this.isShowSMSLogin = !this.isShowSMSLogin;
			}
		},

	};
</script>

<style lang="scss">
	page {
		background-color: $color-page;
	}

	.mobile-img {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 200rpx;
		margin-top: 60rpx;

		.imgs {
			width: 250rpx;
			height: 220rpx;
		}
	}

	.mobile-ipt {
		width: 96%;
		height: 240rpx;
		background: #ffffff;
		margin: 0 auto;
		border-radius: 10rpx;
		margin-top: 40rpx;

		.ipt-mobile {
			width: 90%;
			height: 120rpx;
			margin: 0 auto;
			border-bottom: solid 1px $color-text3;
			line-height: 140rpx;

			input {
				width: 100%;
				height: 100%;
				font-size: 30rpx;
				letter-spacing: 2rpx;
				font-weight: lighter;
			}
		}

		.ipt-code {
			width: 90%;
			height: 120rpx;
			margin: 0 auto;
			line-height: 120rpx;
			position: relative;

			input {
				width: 100%;
				height: 100%;
				font-size: 30rpx;
				letter-spacing: 2rpx;
				font-weight: lighter;

			}

			.get-code {
				width: 180rpx;
				height: 60rpx;
				border: solid 1rpx #50e1b8;
				text-align: center;
				line-height: 60rpx;
				font-size: 20rpx;
				color: $color-text2;
				letter-spacing: 2rpx;
				font-weight: lighter;
				border-radius: 40rpx;
				position: absolute;
				right: 10rpx;
				bottom: 30rpx;
			}
		}

	}
	.changeSite{
		height: 60rpx;
		line-height: 60rpx;
		padding-left: 550rpx;
	}
	.cli-sure {
		width: 96%;
		height: 90rpx;
		background: linear-gradient(to right, #50e1b8 0%, #58dc75 100%);
		border-radius: 40rpx;
		text-align: center;
		line-height: 90rpx;
		color: $color-green-transparent;
		letter-spacing: 8rpx;
		font-weight: lighter;
		margin: 0 auto;
		margin-top: 30rpx;
	}

	.font {
		width: 100%;
		text-align: center;
		line-height: 90rpx;
		letter-spacing: 3rpx;
		font-size: 24rpx;
		color: $color-text2;

		.text {
			color: #a9b1e4;
		}
	}
</style>
