<template>
	<view>
		<top-bar pageTitle="我的地址"></top-bar>
		<div class="list" @tap="toEdit(item)" v-for="item in addressList" :key="item.id">
			<div class="content">
				<div class="address">
					{{item.address}} {{item.detailAddress}}
				</div>
				<div class="info">
					<div class="type" v-if="item.isDefault">
						默认地址
					</div>
					<div class="text">
						{{item.name}} {{item.tel}}
					</div>
				</div>
			</div>
			<i class="icon icon-edit"></i>
		</div>
		<div class="bottom-btn" @tap="toEdit(false)">
			新增地址
		</div>
	</view>
</template>

<script>
	import userApi from "@/api/userApi.js"
	export default {
		data() {
			return {
				addressList: []
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
			uni.showLoading()
			this.getList();
			uni.$on('addressChange',()=>{
				this.getList();
			})
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
