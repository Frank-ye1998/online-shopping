<template>
	<view>
		<top-bar pageTitle="账户与安全"></top-bar>
		<view class="list">
			<view class="content" @tap="showWindow">
				<view class="tit">
					修改密码
				</view>
				<i class="icon icon-to"></i>
				<view class="hr"></view>
			</view>
		</view>
		<view class="pop-up" v-show="isShow">
			<view class="popup-info">
				<view class="input">手机号：15000661359</view>
				<input v-model="password" placeholder-class="plc" placeholder="输入修改的密码" class="input" type="text" />
				<input v-model="confirmPassword" placeholder-class="plc" placeholder="再次确认修改的密码" class="input" type="text" />

				<view class="btn-confirm" @tap="confirm">
					确认修改
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShow: false,
				password: '',
				confirmPassword: ''
			};
		},
		methods: {
			showWindow() {
				this.isShow = !this.isShow
			},
			confirm() {

			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $color-page;
	}

	.list {
		position: relative;
		width: 94%;
		background-color: #fff;
		border-radius: 8px;
		margin: 0 auto 20rpx;
	}

	.content {
		@include flexVtCenter;
		justify-content: space-between;
		width: 100%;
		height: 94rpx;
		padding: 0 26rpx;
		margin-top: 20rpx;
	}

	.icon {
		font-size: 34rpx;
		color: $color-text2;
		margin-left: auto;
	}

	.pop-up {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 1000;
	}

	.popup-info {
		position: fixed;
		width: 86%;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: 30rpx;
		padding: 40rpx;
		border-radius: 20rpx;
		background-color: #fff;
		z-index: 1100;
	}

	.input {
		height: 110rpx;
		line-height: 110rpx;
	}

	.btn-confirm {
		@include btnRed;
		width: 96%;
		height: 92rpx;
		border-radius: 14rpx;
		font-size: 30rpx;
		color: $color-text1;
		margin: 14rpx auto;
		transition: all 0.1s;

		&:active {
			background-color: $color-page;
		}
	}
</style>
