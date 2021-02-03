<template>
	<view>
		<top-bar pageTitle="设置"></top-bar>
		<div class="list-main">
			<div class="list">
				<div class="tit">
					消息推送
				</div>
				<switch color="#08BF30" class="switch" checked="true" />
				<div class="hr"></div>
			</div>
			<div class="list active" @tap="goto('safety')">
				<div class="tit">
					账号与安全
				</div>
				<i class="icon icon-to"></i>
				<div class="hr"></div>
			</div>
			<div class="list active" @tap="clifeedback()">
				<div class="tit">
					我要反馈
				</div>
				<i class="icon icon-to"></i>
				<div class="hr"></div>
			</div>
			<div class="list active" @tap="cliconcern()">
				<div class="tit">
					关于我们
				</div>
				<i class="icon icon-to"></i>
				<div class="hr"></div>
			</div>
			<div class="list active">
				<div class="tit">
					分享APP给好友
				</div>
				<i class="icon icon-to"></i>
				<div class="hr"></div>
			</div>
			<div class="list active" @tap="updateTap">
				<div class="tit">
					检查更新
				</div>
				<div class="version">
					当前版本 1.0.0
				</div>
			</div>
		</div>

		<div class="out-login" @tap="outLogin">
			退出登录
		</div>


		<app-update v-if="updateShow"></app-update>
	</view>
</template>

<script>
	import appUpdate from "@/components/app-update/app-update";
	import userApi from "@/api/userApi.js";
	import {
		checkUpdate
	} from "@/utils/tool.js";
	import {
		appMixin
	} from "@/utils/mixin";
	export default {
		mixins: [appMixin],
		components: {
			"app-update": appUpdate
		},
		data() {
			return {
				updateShow: false
			};
		},
		methods: {
			cliconcern:function(){
				this.$Router.push({
				  name: 'concern'
				})
			},
			clifeedback:function() {
				this.$Router.push({
				  name: 'feedback'
				})
			},
			updateTap: function() {
				checkUpdate(true).then(res => {
					this.updateShow = true;
				})
			},
			updateClose: function() {
				this.updateShow = false;
			},
			outLogin: function() {
				uni.showModal({
					title: "您确定要退出登录吗？",
					showCancel: true,
					success: data => {
						if (data.confirm) {
							uni.showLoading({
								mask: true
							})
							userApi.loginOut().then((res) => {
								this.setLoginKey({});
								uni.clearStorageSync();
								uni.hideLoading();
								setTimeout(() => {
									this.$Router.back(1);
								}, 300)
							})
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $color-page;
	}

	.list-main {
		width: 96%;
		background-color: #fff;
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

			.version {
				font-size: 26rpx;
				color: $color-text2;
			}

			.hr {
				@include absLvCenter;
				bottom: 0;
				width: 96%;
				height: 1px;
				background-color: #efefef;
			}
		}

		.active {
			&:active {
				background-color: $color-page;

				.hr {
					opacity: 0;
				}
			}
		}
	}

	.out-login {
		@include btn;
		width: 96%;
		height: 92rpx;
		border-radius: 14rpx;
		background-color: #fff;
		font-size: 30rpx;
		color: $color-text1;
		margin: 14rpx auto;
		transition: all 0.1s;

		&:active {
			background-color: $color-page;
		}
	}
</style>
