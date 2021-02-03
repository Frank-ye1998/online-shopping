<template>
	<view>
		<top-bar :pageTitle="title"></top-bar>
		<view class="list" @tap="toEdit(item)" v-for="item in addressList" :key="item.id">
			<view class="content">
				<view class="address">
					{{item.address}} {{item.detailAddress}}
				</view>
				<view class="info">
					<view class="type" v-if="item.isDefault">
						默认地址
					</view>
					<view class="text">
						{{item.name}} {{item.tel}}
					</view>
				</view>
			</view>
			<i class="icon icon-edit"></i>
		</view>

		<div class="null-status">
			<image class="null-img" src="/static/images/null-img/address-null.png"></image>
			<div class="text">
				暂无地址
			</div>
		</div>

		<view class="bottom-btn" @tap="toEdit(false)">
			新增地址
		</view>
	</view>
</template>

<script>
	import userApi from "@/api/userApi.js"
	export default {
		data() {
			return {
				title: '',
				addressList: [],
				isSelect: false
			};
		},
		methods: {
			getList: function() {
				userApi.findAddress().then(res => {
					uni.hideLoading();
					this.addressList = res.data || [];
				})
			},
			toEdit: function(data) {
				this.$Router.push({
					name: 'makeAddress',
					params: data
				})
			}
		},
		onLoad() {
			// uni.showLoading()
			this.getList();
			uni.$on('addressChange', () => {
				this.getList();
			})

			this.isSelect = this.$Route.query.isSelect; //选择地址模式
			if (this.isSelect) {
				this.title = "选择地址"
			} else {
				this.title = "我的地址"
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $color-page;
	}

	.list {
		@include flexVtCenter;
		position: relative;
		width: 96%;
		height: 180rpx;
		background-color: #fff;
		border-radius: 14rpx;
		margin: 16rpx auto;
		padding: 0 22rpx;

		.content {
			.address {
				font-size: 28rpx;
				line-height: 28rpx;
				color: $color-text0;
				margin-bottom: 24rpx;
			}

			.info {
				@include flexVtCenter;

				.type {
					display: inline-block;
					font-size: 22rpx;
					line-height: 22rpx;
					color: #fff;
					padding: 8rpx 16rpx;
					background-color: $color-text3;
					border-radius: 4px;
					margin-right: 16rpx;
				}

				.text {
					font-size: 24rpx;
					color: $color-text2;
				}
			}
		}

		.icon-edit {
			margin-left: auto;
			font-size: 34rpx;
			color: $color-text2;
		}
	}
	
	.null-status {
		@include flexCenter;
		width: 86%;
		padding: 36rpx 0;
		flex-flow: column;
		margin: 180rpx auto;
		border-radius: 14rpx;
		.null-img {
			width: 320rpx;
			height: 320rpx;
		}
		.text {
			font-size: 32rpx;
			color: $color-text3;
			margin-top: 42rpx;
		}
	}

	.bottom-btn {
		@include btn;
		position: fixed;
		bottom: 26rpx;
		left: 50%;
		transform: translateX(-50%);
		width: 96%;
		height: 90rpx;
		border-radius: 999px;
		font-size: 32rpx;
		background-color: $color-green;
	}
</style>
