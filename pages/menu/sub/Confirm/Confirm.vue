<template>
	<view>
		<top-bar pageTitle="自提外送"></top-bar>
		<tab :tabTitle="itemsTitle" @fz="fz"></tab>
		<view class="box1" v-if="num==0" v-for="(item,index) in storeList" :key="index">
			<view class="">{{item.address}}</view>
			<view class="">{{item.name}}</view>
			<view class="">{{item.telePhone}}</view>
			<view class="">{{item.openingBeginTime}}-{{item.openingEndTime}}</view>
		</view>
		<view class="box2" v-if="num==1">
			<view class="noData" v-show="this.addressList.length<1">
				<image src="../../../../static/images/mine/noData.jpeg" mode="" class="no-image"></image>
				<text class="tip">还没有地址，快去添加吧~</text>
			</view>
			<view class="isData" v-model="chosenAddressIndex">
				<form>
					<!-- 遍历查询地址接口内的地址列表 -->
					<view class="wrap" v-for="(item,index) in this.addressList" :key="index">
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
	</view>
</template>

<script>
	import orderApi from "@/api/orderApi.js"
	import userApi from "@/api/userApi.js"
	export default {
		onLoad() {
			this.num = this.$route.params.index - 1
			if (this.num == 0) {
				orderApi
					.getStoreList()
					.then((res) => {
						this.storeList = res.data
						console.log(this.storeList)
					})
			}
		},
		data() {
			return {
				num: 0,
				itemsTitle: [{
						"name": "门店自提"
					},
					{
						"name": "送货上门"
					},
				],
				storeList: [],
				addressList: []
			};
		},
		methods: {
			fz(e) {

				// 通过点击自定义组件，获取index值，根据index值调用订单信息接口
				this.num = e
				console.log(this.num)
				if (this.num == 0) {
					orderApi
						.getStoreList()
						.then((res) => {
							this.storeList = res.data
						})
				} else if (this.num == 1) {
					userApi
						.findAddress()
						.then((res) => {
							this.addressList = res.data
							console.log(this.addressList)
						})
				}

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
	.box1 {
		margin: 24rpx 24rpx 24rpx 24rpx;
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
