<template>
	<view>
		<top-bar class="toptxt">我的收货地址</top-bar>
		<view class="noData" v-show="this.shippingAddress.length<1">
			<image src="../../../../static/images/mine/noData.jpeg" mode="" class="no-image"></image>
			<text class="tip">还没有地址，快去添加吧~</text>
		</view>
		<view class="isData" v-model="chosenAddressIndex">
			<form>
				<!-- 遍历查询地址接口内的地址列表 -->
				<view class="wrap" v-for="(item,index) in this.shippingAddress" :key="index">				
					<view class="left">
						<view class="address">
							{{item.address}}
						</view>
						<!-- 为了让名字和电话在一行显示再包一个view -->
						<view class="aa">
							<view class="name">
								{{item.name}}
							</view>
							<text class="phone">
								{{item.tel}}
							</text>
						</view>
					</view>
					<view class="pic">
						<i class="icon icon-edit" @tap="onEdit(item)"></i>
					</view>
				</view>
				<button form-type="submit" @tap="onAdd()" class="add">新增收货地址</button>
			</form>
		</view>

	</view>
</template>

<script>
	import userApi from "@/api/userApi.js"
	export default {
		data() {
			return {
				chosenAddressIndex: 1,
				shippingAddress: [],
				addressId: '',
				addressIndex: ''
			};
		},
		onLoad() {
			this.getAddress()
		},
		methods: {
			getAddress() {
				userApi
					.findAddress()
					.then((res) => {
						this.shippingAddress = res.data
					})
			},
			onAdd() {
				this.$router.push({
					name: 'makeAddress'
				});
			},
			onEdit(item) {
				this.$Router.push({
					path: '/pages/mine/sub/makeAddress/makeAddress',
					query: {
						item
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.toptxt {
		color: $color-text1;
	}

	.no-image {
		display: flex;
		margin-left: 48rpx;
	}

	.tip {
		margin-left: 120rpx;
	}



	.address {
		font-size: 40rpx;
		color: $color-text1;
	}

	.name {
		font-size: 40rpx;
		color: $color-text2;
		margin-right: 20rpx;
	}

	.phone {
		font-size: 40rpx;
		color: $color-text2;
		display: inline-block;
	}

	.pic {
		height: 100rpx;
		width: 100rpx;
		@include flexCenter;
	}

	.aa {
		display: flex;
		flex-direction: row;
	}

	.wrap {
		margin-left: 40rpx;
		margin-top: 20rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between; //一个在最左边，一个在右边
	}

	.add {
		margin-top: 100rpx;
		width: 620rpx;
		@include btnRed
	}
</style>
