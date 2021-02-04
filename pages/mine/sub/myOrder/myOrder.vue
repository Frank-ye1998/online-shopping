<template>
	<view>
		<top-bar pageTitle="我的订单"></top-bar>

		<swiper-page :tabList="tabList">
			<template #tab0>
				<view class="car-img" v-if="isLoad && !listA.length">
					<image src="../../../../static/images/null-img/list-null.png" mode="" class="imgscar"></image>
				</view>
				<view class="list" @tap="orderdetailShops(item.id)" v-if="isLoad && listA.length" v-for="item in listA" :key="item.id">
					<view class="top">
						<view class="order-type">
							外卖
						</view>
						<view class="address">
							{{item.receiveAddress}}
						</view>
						<view class="order-status">
							已完成
						</view>
					</view>
					<scroll-view class="content" scroll-x="true">
						<img-view v-for="itm in item.osProductDtoList" class="img-view" :src="itm.skuImg" :key="itm.orderId"></img-view>
					</scroll-view>
					<view class="order-info">
						<view class="time">{{timeCv(item.createTime)}}</view>
						<view class="price">
							共{{item.osProductDtoList.length}}件商品 合计：¥ {{item.orderAmount}}
						</view>
					</view>
					
				</view>
				
			</template>
			
			<template #tab1>
				<view class="car-img" v-if="isLoad && !listB.length">
					<image src="../../../../static/images/null-img/list-null.png" mode="" class="imgscar"></image>
				</view>
				<view class="list" v-if="isLoad && listB.length" v-for="item in listB" :key="item.id">
					<view class="top">
						<view class="order-type">
							外卖
						</view>
						<view class="address">
							{{item.receiveAddress}}
						</view>
						<view class="order-status">
							已完成
						</view>
					</view>
					<scroll-view class="content" scroll-x="true">
						<img-view v-for="itm in item.osProductDtoList" class="img-view" :src="itm.skuImg" :key="itm.orderId"></img-view>
					</scroll-view>
					<view class="order-info">
						<view class="time">{{timeCv(item.createTime)}}</view>
						<view class="price">
							共{{item.osProductDtoList.length}}件商品 合计：¥ {{item.orderAmount}}
						</view>
					</view>
				</view>
			</template>
			<template #tab2>
				<view class="car-img" v-if="isLoad && !listC.length">
					<image src="../../../../static/images/null-img/list-null.png" mode="" class="imgscar"></image>
				</view>
				<view class="list" v-if="isLoad && listC.length" v-for="item in listC" :key="item.id">
					<view class="top">
						<view class="order-type">
							外卖
						</view>
						<view class="address">
							{{item.receiveAddress}}
						</view>
						<view class="order-status">
							已完成
						</view>
					</view>
					<scroll-view class="content" scroll-x="true">
						<img-view v-for="itm in item.osProductDtoList" class="img-view" :src="itm.skuImg"></img-view>
					</scroll-view>
					<view class="order-info">
						<view class="time">{{timeCv(item.createTime)}}</view>
						<view class="price">
							共{{item.osProductDtoList.length}}件商品 合计：¥ {{item.orderAmount}}
						</view>
					</view>
				</view>
			</template>
			<template #tab3>
				<view class="car-img" v-if="isLoad && !listD.length">
					<image src="../../../../static/images/null-img/list-null.png" mode="" class="imgscar"></image>
				</view>
				<view class="list" v-if="isLoad && listD.length" v-for="item in listD" :key="item.id">
					<view class="top">
						<view class="order-type">
							外卖
						</view>
						<view class="address">
							{{item.receiveAddress}}
						</view>
						<view class="order-status">
							已完成
						</view>
					</view>
					<scroll-view class="content" scroll-x="true">
						<img-view v-for="itm in item.osProductDtoList" class="img-view" :src="itm.skuImg"></img-view>
					</scroll-view>
					<view class="order-info">
						<view class="time">{{timeCv(item.createTime)}}</view>
						<view class="price">
							共{{item.osProductDtoList.length}}件商品 合计：¥ {{item.orderAmount}}
						</view>
					</view>
				</view>
			</template>
		</swiper-page>
	</view>
</template>

<script>
	import {
		timeCv
	} from "@/utils/tool.js";
	import swiperPage from "@/components/swiper-page/swiper-page";
	import orderApi from "@/api/orderApi.js";

	export default {
		components: {
			"swiper-page": swiperPage,
		},
		data() {
			return {
				isLoad: false,
				timeCv: timeCv,
				//swiper-page 组件tab参数
				tabList: [{
						name: "全部",
						id: "tab0",
						toBottom: this.getList,
					},
					{
						name: "待支付",
						id: "tab1",
						toBottom: this.getList,
					},
					{
						name: "待收货",
						toBottom: this.getList,
					},
					{
						name: "售后/退款",
						toBottom: this.getList,
					},
				],
				isOnload: false, //页面加载标识
				timeAbs: 0, //接口节制
				listA: [], //tab对应列表
				listB: [], //……
				listC: [], //……
				listD: [], //……
			};
		},
		methods: {
			orderdetailShops(id) {
				this.$Router.push({
					name: "particulars",
					params: {
						id: id,
					},
				});
			},
			//请求订单数据
			getList: function(type) {
				let now = new Date().getTime(); //当前时间
				if (this.isOnload && now - this.timeAbs < 1000) return; //接口节制
				this.timeAbs = new Date().getTime(); //更新节制时间
				switch (type) {
					case 'tab0':
						type = '';
						break;
					case 'tab1':
						type = 1;
						break;
					case 'tab2':
						type = 3;
						break;
					case 'tab3':
						type = 8;
						break;
				}
				orderApi
					.findOrder({
						orderStatus: type,
					})
					.then((res) => {
						switch (type) {
							case "":
								this.listA = res.data;
								this.isLoad = true;
								break;
							case 1:
								this.listB = res.data;
								this.isLoad = true;
								break;
							case 3:
								this.listC = res.data;
								this.isLoad = true;
								break;
							case 8:
								this.listD = res.data;
								this.isLoad = true;
								break;
						}
					});
			},
		},
		onLoad() {
			this.getList(""); //获取全部订单
			this.getList(1);
			this.getList(3);
			this.getList(8);
			this.isOnload = true;
		},
	};
</script>

<style lang="scss">
	page {
		background-color: $color-page;
	}
	.car-img {
		@include flexCenter;
		width: 100%;
		height: 100%;
		overflow: hidden;
		flex-flow: column;
	
		.imgscar {
			width: 320rpx;
			height: 320rpx;
			display: block;
		}
	
	}
	.list {
		width: 96%;
		height: 320rpx;
		background-color: #fff;
		border-radius: 14rpx;
		margin: 20rpx auto;
		padding: 0 16rpx;
		overflow: hidden;

		.top {
			@include flexVtCenter;
			width: 100%;
			height: 84rpx;
			border-bottom: 1px solid #f1f1f1;

			.order-type {
				@include flexCenter;
				width: 88rpx;
				height: 40rpx;
				background-color: $color-green;
				border-radius: 4px;
				font-size: 26rpx;
				line-height: 26rpx;
				color: #fff;
				margin-right: 16rpx;
			}

			.address {
				width: 68%;
				font-size: 28rpx;
				color: $color-text0;
				@include ellipsis;
			}

			.order-status {
				margin-left: auto;
				font-size: 28rpx;
				color: $color-text2;
			}
		}
		
		.content {
			//@include flexVtCenter;
			white-space: nowrap;
			position: relative;
			width: 100%;
			height: 150rpx;
			padding: 20rpx 0;

			.img-view {
				display: inline-block;
				width: 110rpx;
				height: 110rpx;
				border-radius: 4px;
				margin-right: 16rpx;
			}

			.name {
				font-size: 30rpx;
				color: $color-text0;
				font-weight: 700;
				margin-left: 18rpx;
			}

			.num {
				position: absolute;
				top: 8%;
				right: 0;
				font-size: 28rpx;
				color: $color-text2;
			}
		}

		.order-info {
			display: flex;
			width: 100%;
			justify-content: space-between;

			.time {
				font-size: 24rpx;
				color: $color-text2;
			}

			.price {
				font-size: 28rpx;
				color: $color-text0;
			}
		}
	}
</style>
