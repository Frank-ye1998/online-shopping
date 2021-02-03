<template>
	<view>
		<top-bar :pageTitle="title"></top-bar>
		<template v-if="$addressList.length">
			<view class="list" @tap="listTap(item)" v-for="item in $addressList" :key="item.id">
				<view class="content">
					<view class="address">
						{{item.address}} {{item.detailAddress}}
					</view>
					<view class="info">
						<view class="text">
							{{item.name}} {{item.tel}}
						</view>
					</view>
				</view>
				<div class="edit-btn" @tap.stop="toEdit(item)">
					<i class="icon icon-edit"></i>
				</div>
			</view>
		</template>
		<div v-else class="null-status">
			<image class="null-img" src="/static/images/null-img/address-null.png"></image>
			<div class="text">
				暂无地址
			</div>
		</div>

		<view class="bottom-btn" @tap="toEdit({})">
			新增地址
		</view>
	</view>
</template>

<script>
	import userApi from "@/api/userApi.js"
	import {
		appMixin
	} from "@/utils/mixin";
	export default {
		mixins: [appMixin],
		data() {
			return {
				title: '',
				isSelect: false //页面模式 选择地址||default
			};
		},
		methods: {
			listTap: function(item) {
				if (this.isSelect) {
					item.isUserSet = true;
					this.setCurrentAddress(item);
					this.$Router.back(1);
				}
			},
			toEdit: function(data) {
				if (this.isSelect) {
					data.isSelect = true;
				}
				this.$Router.push({
					name: 'makeAddress',
					params: data
				})
			}
		},
		onLoad() {
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

		.edit-btn {
			margin-left: auto;
			padding: 14rpx;

			.icon-edit {
				font-size: 34rpx;
				color: $color-text2;
			}
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
