<template>
	<view>
		<top-bar pageTitle="订单详情"></top-bar>
		<view class="name">{{orderDetail.receiverName}}</view>
		<view class="name">{{orderDetail.receiverMobile}}</view>
		<view class="">{{orderDetail.baseAddress}}</view>
		<view class="">{{orderDetail.storeName}}</view> 
		<view  class="wrap" v-for="(item,index) in orderDetail.osProductDtoList" :key="index">
			<view class="name">{{item.skuName}}</view>
			<!-- <img-view :src="`http://10.1.44.108:9010/images/${this.pic}`" mode="widthFix" class="conimgs" /> -->
			<view class="">{{item.skuPrice}}元</view>
		</view>
	</view>
</template>

<script>
	import orderApi from "@/api/orderApi.js"
	export default {
		data() {
			return {
				orderDetail:{},
				foodName:'',
				price:0,
				tel:'',
				name:'',
				address:'',
				storeName:'',
				pic:''
			};
		},
		onLoad() {
			console.log(this.$Route.query)
			this.getOrderDetail()
		},
		methods:{
			getOrderDetail(){
				orderApi
					.findOrderDetail(this.$Route.query)
					.then((res)=>{
						this.orderDetail = res.data
						// this.foodName = this.orderDetail.osProductDtoList[0].skuName
						// this.price = this.orderDetail.osProductDtoList[0].skuPrice
						// this.tel = this.orderDetail.receiverMobile
						// this.name = this.orderDetail.receiverName
						// this.address = this.orderDetail.receiveAddress
						// this.storeName = this.orderDetail.storeName
						// this.pic = this.orderDetail.osProductDtoList[0].skuImg
						console.log(this.orderDetail)
					})
			}
		}
	}
</script>

<style lang="scss">

</style>
