<template>
	<view>
		<view class="wrap">
			<view class="top">
				<view class="">
					<top-bar class="box1" page-title="我的订单"></top-bar>
					<tab :tabTitle="itemsTitle" @fz="fz"></tab>
				</view>
				<!-- 全部 -->
				<view v-if="this.recNum==0 && allLength>0">
					<view v-for="(item, index) in allList" :key="index" @click="gotoDetail(item.id)">
						<view class="container">
							<view class="">{{item.storeName}}</view>
							<view class="order-content">
								<view class="">{{item.orderContent}}</view>
								<i class="icon icon-to"></i>
							</view>
						</view>
					</view>
				</view>
				<!-- 待支付 -->
				<view v-else-if="this.recNum==1 && payLength>0">
					<view v-for="(item, index) in needPay" :key="index" @click="gotoDetail(item.id)">
						<view class="container">
							<view class="">{{item.storeName}}</view>
							<view class="order-content">
								<view class="">{{item.orderContent}}</view>
								<i class="icon icon-to"></i>
							</view>
						</view>
					</view>
				</view>
				<!-- 已支付订单 -->
				<view v-else-if="this.recNum==2 && alreadyLength>0">
					<view v-for="(item, index) in alreadyPay" :key="index" @click="gotoDetail(item.id)">
						<view class="container">
							<view class="">{{item.storeName}}</view>
							<view class="order-content">
								<view class="">{{item.orderContent}}</view>
								<i class="icon icon-to"></i>
							</view>
						</view>
					</view>
				</view>
				<!-- 待收货订单 -->
				<view v-else-if="this.recNum==3 && lengthCount>0">
					<view v-for="(item, index) in needReceive" :key="index" @click="gotoDetail(item.id)">
						<view class="container">
							<view class="">{{item.storeName}}</view>
							<view class="order-content">
								<view class="">{{item.orderContent}}</view>
								<i class="icon icon-to"></i>
							</view>
						</view>
					</view>
				</view>

				<view v-else class="noDataPlaceHold">
					<image src="../../../../static/images/mine/noData.jpeg" class="pic" alt />
					<text class="desc">暂时没有订单数据哦~</text>
				</view>

			</view>
		</view>
	</view>
	</view>
</template>


<script>
	import orderApi from "@/api/orderApi.js"
	export default {
		data() {
			return {
				active: 0,
				recNum: 0,
				itemsTitle: [{
						"name": "全部"
					},
					{
						"name": "待支付"
					},
					{
						"name": "已支付"
					},
					{
						"name": "待收货"
					}
				],
				orderList: [],
				needPay: [],
				alreadyPay: [],
				needReceive: [],
				allList: [],
			}
		},
		onLoad() {
			this.getOrderInfo()
		},
		methods: {
			gotoDetail(id) {
				this.$Router.push({
					name: 'orderDetail',
					params: {
						id
					}
				})
			},
			getOrderInfo() {
				orderApi
					.findOrder({
						orderStatus: ""
					})
					.then((res) => {
						this.allList = res.data
						console.log(this.allList)
					})
			},
			fz(e) {
				// 通过点击自定义组件，获取index值，根据index值调用订单信息接口
				// 订单状态(订单状态:1-待支付 2-已支付 3-待收货 不传就是全部订单 )
				this.recNum = e
				if (this.recNum == 1) {
					orderApi.findOrder({
							orderStatus: this.recNum
						})
						.then((res) => {
							this.needPay = res.data
						})
				} else if (this.recNum == 2) {
					orderApi.findOrder({
							orderStatus: this.recNum
						})
						.then((res) => {
							this.alreadyPay = res.data
						})
				} else if (this.recNum == 3) {
					orderApi.findOrder({
							orderStatus: this.recNum
						})
						.then((res) => {
							this.needReceive = res.data
						})
				} else if (this.recNum == 0) {
					orderApi.findOrder({
							orderStatus: ""
						})
						.then((res) => {
							this.allList = res.data
						})
				}
				console.log(this.recNum)
			},
		},
		computed: {
			lengthCount() {
				return Object.keys(this.needReceive).length;
			},
			allLength() {
				return Object.keys(this.allList).length;
			},
			payLength() {
				return Object.keys(this.needPay).length;
			},
			alreadyLength() {
				return Object.keys(this.alreadyPay).length;
			}

		},
	}
</script>

<style lang="scss">
	page {
		background-color: $color-page;
	}

	.search-box {
		display: flex;
		border: solid 2rpx $color-red;
		width: 70%;
		height: 100rpx;
		border-radius: 50rpx;

	}

	.noDataPlaceHold {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.desc {
			color: grey;
			font-size: 40rpx;
		}
	}

	.pic {
		margin-top: 40rpx;
	}

	.container {
		height: 100rpx;
		margin: 24rpx 24rpx 0 24rpx;
		background-color: $color-green-transparent;
	}

	.order-content {
		display: flex;
		justify-content: space-between;
		font-size: 38rpx;
	}

	.box1 {}
</style>
