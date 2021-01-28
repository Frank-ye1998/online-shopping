<template>
	<view>
		<top-bar pageTitle="个人信息"></top-bar>
		<div class="list-main">
			<div class="avatar-view list">
				<div class="tit">
					头像
				</div>
				<img-view class="img-view" src="/static/images/mine/avatar.jpg"></img-view>
				<i class="icon icon-to"></i>
				<div class="hr"></div>
			</div>
			<div class="list">
				<div class="tit">
					昵称
				</div>
				<div class="right">
					<div class="text1">十九</div>
					<i class="icon icon-to"></i>
				</div>
				<div class="hr"></div>
			</div>
			<div class="list" @tap="">
				<div class="tit">
					生日
				</div>
				<div class="right">
					<div class="text1">十九</div>
					<i class="icon icon-to"></i>
				</div>
				<picker class="picker" mode="date" :value="date">
					<view class="uni-input">{{date}}</view>
				</picker>
				<div class="hr"></div>
			</div>
			<div class="list">
				<div class="tit">
					手机号
				</div>
				<div class="right">
					<div class="text1">十九</div>
					<i class="icon icon-to"></i>
				</div>
				<div class="hr"></div>
			</div>
			<div class="list">
				<div class="tit">
					微信
				</div>
				<div class="right">
					<!-- <div class="text1">十九</div> -->
					<div class="text2">已绑定</div>
					<i class="icon icon-to"></i>
				</div>
			</div>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				date: ''
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

		.list {
			@include flexVtCenter;
			position: relative;
			width: 100%;
			height: 110rpx;
			padding: 0 22rpx;
			transition: all 0.1s;

			.tit {
				font-size: 30rpx;
				color: $color-text1;
			}

			.right {
				@include flexVtCenter;
				display: flex;
				margin-left: auto;

				.text1 {
					font-size: 30rpx;
					color: $color-text1;
				}

				.text2 {
					font-size: 30rpx;
					color: $color-text3;
				}
			}

			.icon-to {
				font-size: 28rpx;
				line-height: 28rpx;
				color: $color-text3;
				margin-left: 24rpx;
			}
			
			.picker {
				position: absolute;
				width: 100%;
				height: 100%;
				top: 0;
				left: 0;
			}

			.hr {
				@include absLvCenter;
				bottom: 0;
				width: 96%;
				height: 1px;
				background-color: #efefef;
			}


			&:active {
				background-color: $color-page;

				.hr {
					opacity: 0;
				}
			}

		}

		.avatar-view {
			height: 160rpx;

			.img-view {
				width: 132rpx;
				height: 132rpx;
				margin-left: auto;
				border-radius: 50%;
			}
		}
	}
</style>
