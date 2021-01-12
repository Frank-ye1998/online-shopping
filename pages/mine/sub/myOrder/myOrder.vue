<template>
	<view>
		<view class="wrap">
			<view class="top">
				<view class="box1">
					<top-bar class="box1" page-title="我的订单"></top-bar>
					<tab :tabTitle="itemsTitle" @fz="fz"></tab>
				</view>
				<!-- 全部 -->
				<view v-if="this.recNum==0 && allLength>0">
					此处展示全部订单
					<!-- <view v-for="(item, index) in allList" :key="index" @click="gotoDetail(item.id)">
						<view class="reName">{{ item.receiverName }}</view>
						<view>{{ item.baseAddress }}</view>
						<view>{{ item.orderAmount }}</view>
					</view> -->
				</view>
				<!-- 待支付 -->
				<view v-else-if="this.recNum==1 && needPay>0">
					此处展示待支付订单
				</view>
				<!-- 待发货订单 -->
				<view v-else-if="this.recNum==2 && needReceive>0">
					此处展示待发货订单
				</view>
				<!-- 待收货订单 -->
				<view v-else-if="this.recNum==3">
					此处展示待收货订单
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
						"name": "待发货"
					},
					{
						"name": "待收货"
					}
				],
				orderList: [],
				needReceive: [],
				allList: [],
			}
		},

		methods: {
			gotoDetail(id) {

			},
			fz(e) {
				this.recNum = e
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
			needPay() {
				return Object.keys(this.orderList).length;
			}

		},
	}
</script>

<style lang="scss">
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

	.box1 {
		// background-color: #c2c2c2;
	}
</style>
