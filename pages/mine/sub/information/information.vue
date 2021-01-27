<template>
	<view>
		<top-bar pageTitle="个人信息"></top-bar>
		<div class="list-main">
			<div class="avatar-view">
				<img-view src="/static/images/mine/avatar.jpg"></img-view>
			</div>
			<div class="list">
				<div class="tit">
					昵称
				</div>
				<div class="text1">十九</div>
				<div class="hr"></div>
			</div>
			<div class="list">
				<div class="tit">
					手机号
				</div>
				<div class="text1">17696769527</div>
				<div class="hr"></div>
			</div>
			<div class="list">
				<div class="tit">
					微信
				</div>
				<div class="text1">已绑定</div>
			</div>
		</div>
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

	.list-main {
		width: 96%;
		margin: 24rpx auto;
		background-color: #fff;
		border-radius: 14rpx;
	}
</style>
