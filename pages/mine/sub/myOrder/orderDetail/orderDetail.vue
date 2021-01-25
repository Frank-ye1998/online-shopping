<template>
	<view>
		<top-bar pageTitle="订单详情"></top-bar>
		<!-- 个人信息第一栏 -->
		<view class="box1">
			<view class="name-phone">
				<i class="icon icon-address"></i>
				<view class="name">{{orderDetail.receiverName}}</view>
				<view class="phone">{{orderDetail.receiverMobile}}</view>
			</view>
			<view class="address">{{orderDetail.baseAddress}}</view>
		</view>
		<!-- 商品信息第二栏 -->
		<view class="box2">
			<view class="store">{{orderDetail.storeName}}</view>
			<view class="wrap" v-for="(item,index) in orderDetail.osProductDtoList" :key="index">
				<view class="img-name">
					<image src="../../../../../static/images/home/4.png" mode="" class="food-img"></image>
					<view class="sku-name">{{item.skuName}}</view>
				</view>
				<view class="price">￥{{item.skuPrice}}</view>
			</view>
			<view class="box3">
				<view class="address">商品总价</view>
				<view class="address">￥{{orderDetail.activityAmount-orderDetail.freightAmount}}</view>
			</view>
			<view class="box4">
				<view class="address">配送费</view>
				<view class="address">￥{{orderDetail.freightAmount}}</view>
			</view>
			<view class="box4">
				<view class="address">优惠</view>
				<view class="address">￥{{orderDetail.orderAmount-orderDetail.activityAmount}}</view>
			</view>
			<view class="box4">
				<view class="address">订单总价</view>
				<view class="address">￥{{orderDetail.orderAmount}}</view>
			</view>
		</view>
		<view class="query">
			<view class="button1">
				评价
			</view>
			<view class="button1">
				退款
			</view>
		</view>
	</view>
</template>

<script>
	import orderApi from "@/api/orderApi.js"
	export default {

		data() {
			return {
				orderDetail: {},
				foodName: '',
				price: 0,
				tel: '',
				name: '',
				address: '',
				storeName: '',
				pic: '',
				orderId: ''
			};
		},
		onLoad() {
			this.orderId = this.$store.orderId
			this.getOrderDetail()
		},
		methods: {
			getOrderDetail() {
				orderApi
					.findOrderDetail({
						id: this.orderId
					})
					.then((res) => {
						this.orderDetail = res.data
						console.log(this.orderDetail)
					})
			}
		},

	}
</script>

<style lang="scss">
	page {
		background-color: $color-page;
	}

	.name-phone {
		display: flex;
		height: 60rpx;
		line-height: 60rpx;
	}

	.name {
		font-size: 40rpx;
		width: 130rpx;
	}

	.address {
		font-size: 40rpx;
	}

	.box1 {
		background-color: #fff;
		margin: 24rpx 24rpx 0 24rpx;
	}

	.box2 {
		background-color: #fff;
		margin: 24rpx 24rpx 0 24rpx;
	}

	.box3,
	.box4 {
		margin-top: 20rpx;
		display: flex;
		justify-content: space-between;
		background-color: #fff;
		margin: 24rpx 24rpx 0 24rpx;
	}

	.query {
		margin-top: 20rpx;
		height: 100rpx;
		display: flex;

		margin: 24rpx 24rpx 0 420rpx;
	}

	.button1 {
		@include btn;
		width: 150rpx;
		height: 60rpx;
		background-color: $color-green;
		margin-left: 20rpx;
		border-radius: 40rpx;
	}

	.wrap {
		display: flex;
		justify-content: space-between;
	}

	.img-name {
		display: flex;
	}

	.food-img {
		width: 292rpx;
		height: 240rpx;
	}

	.sku-name,
	.price {
		height: 50rpx;
		line-height: 50rpx;
	}

	.store,
	.sku-name,
	.price {
		font-size: 40rpx;
	}

	.price {
		padding-right: 24rpx;
	}
</style>
