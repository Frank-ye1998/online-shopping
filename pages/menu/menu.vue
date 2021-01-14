<template>
	<view>
		<view class="top">
			<warp-bar class="warp-bar"></warp-bar>
			<view class="take-away">
				<view class="away-left">
					徐汇日月光中心
				</view>
				<view class="away-right">
					<view class="btn_switch">
						<view class="btn-left" :class="index === 1 ? 'active' : ''" @click="changeType(1)">自提</view>
						<view class="btn-right" :class="index === 2 ? 'active' : ''" @click="changeType(2)">外卖</view>
					</view>
				</view>
			</view>
		</view>

		<view class="main">
			<!-- 左边点击 -->
			<view class="main-cli">
				<view v-for="(item,index) in ifiArr" :key="index" :class="['single',index === ificaArr?'main-cli-select':'']" @tap="getItem(index)">
					{{item.name}}
				</view>
			</view>
			<!-- 右侧 -->
			<view class="main-con">
				<view class="select-top">
					<!-- 右侧滑动 -->
					<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" scroll-left="120">
						<template v-if="ifiArr[leftIndex]">
							<view id="demo1" v-for="(item,index) in ifiArr[leftIndex].secondPtCategoryProductVos" :key="index" :class="['select-box',index === seleStatus?'select-box-select':'']"
							 @tap="selecItem(index)">{{item.name}}</view>
						</template>
					</scroll-view>
				</view>
				<view class="query-box">
					特惠专区
				</view>
				<view class="content">
					<!-- 右侧商品主内容 -->
					<view class="content-query" @tap="getdetailShops(item.id)" v-for="(item,index) in foodData" :key="index">
						<view class="con-img">
							<img-view :src="`http://10.1.44.108:9010/images/${item.mainImg}`" mode="widthFix" class="conimgs"/>
						</view>
						<view class="con-information">
							<view class="title">{{item.name}}</view>
							<view class="ifa-font">{{item.description}}</view>
							<view class="pri">
								<view class="vip-price">
									￥{{item.vipPrice}}
								</view>
								<view class="original-price">
									￥{{item.price}}
								</view>
								<view class="addCar">
									<i class="icon shopping-car"></i>
								</view>
							</view>
						</view>
					</view>
					
				</view>

			</view>
		</view>

	</view>
</template>

<script>
	import productApi from "@/api/productApi.js";
	import listMock from "@/static/mock/list.json";
	export default {
		data() {
			return {
				index: this.$store.getters.ChangeType,
				takeArr: [{
						mess: "自提"
					},
					{
						mess: "外送"
					},
				],
				takeStatus: 0,
				seleStatus: 0,
				ificaArr: 0,
				ifiArr: [], //左侧早餐
				leftIndex:0,
				slidetitle:0,
				foodData:[],
			};
		},
		methods: {
			getdetailShops(id){
				this.$router.push({
					name: "detail",
					query: {
					  id: id,
					},
			  });
			},
			changeType(index) {
				// this.$store.commit('setIndex', index)
				console.log(index)
				this.index = index
			},
			getItem(index) {
				this.ificaArr = index
			},
			selecItem(index) {
				this.seleStatus = index
			},
			takeItem(index) {
				this.takeArr = index
			},
			getList: function() {
				productApi
					.getCategoryData({
						sendWay: "1",
					})
					.then((res) => {
						// console.log(res.data[0].secondPtCategoryProductVos[this.leftIndex].productVos,'eee');
						this.ifiArr = listMock||res.data;
						this.foodData = this.ifiArr[this.leftIndex].secondPtCategoryProductVos[this.slidetitle].productVos;
						console.log(this.foodData,'aaa');
					})
			}
			
		},
		onLoad: function() {
			this.getList();
			//console.log(JSON.parse(listMock));
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $color-page;
	}
	
	.top {
		width: 100%;
		height: 480rpx;
		.warp-bar {
			width: 90%;
			height: 330rpx;
			margin-left: 5%;
			padding-top: 20rpx;
			border-radius: 10rpx;
		}

		.take-away {
			width: 90%;
			height:80rpx;
			background: #FFFFFF;
			margin: 30rpx auto;
			border-radius: 40rpx;
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			align-items: center;
			
			.away-left {
				width: 50%;
				height: 70%;
				text-align: center;
				line-height: 60rpx;
				font-size: 28rpx;
			}

			.away-right {
				width: 30%;
				height: 100%;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				border-radius: 40rpx;
				letter-spacing:4rpx;
				font-weight: lighter;
				font-size: 27rpx;
				.btn_switch {
					width: 95px;
					height: 30px;
					border-radius: 20px;
					display: flex;
					text-align: center;
					line-height: 30px;
					border: 1px solid $color-green;
					color:$color-green;
					margin: auto;
					font-size: 30rpx;
					.btn-left {
						width: 44.5px;
						height: 28px;
						border-radius: 20px;
					}
					.btn-right {
						width: 48px;
						height: 28px;
						border-radius: 20px;
					}
				}

				.active {
					background: $color-green;
					color: #fff;
				}
			}

			.away-right-select {
				width: 45%;
				height: 100%;
				background: $color-red;
				border-radius: 40rpx;

			}
		}
	}

	.main {
		position: relative;
		width: 100%;
		height: calc(100vh - 370rpx - var(--window-bottom));
		overflow: hidden;
		display: flex;
		flex-direction: row;

		.main-cli {
			width: 25%;
			height: 100%;
			background: $color-text4;
			overflow: hidden;
			overflow-y: scroll;

			.single {
				width: 100%;
				height: 130rpx;
				text-align: center;
				line-height: 130rpx;
				letter-spacing: 4rpx;
				font-size: 32rpx;
			}
		}

		.main-cli-select {
			background: $color-green-transparent;
			border-left: solid 2px $color-green;
			color: $color-green;
		}

		.main-con {
			width: 75%;
			height: 100%;
			display: flex;
			flex-direction: column;

			.select-top {
				width: 100%;
				height: 80rpx;
				overflow: hidden;
				padding-left: 22rpx;
				margin-top: 33rpx;

				.scroll-view_H {
					width: 100%;
					height: 100rpx;
					white-space: nowrap;

					.select-box {
						width: 200rpx;
						height: 60rpx;
						opacity: 0.8;
						margin-left: 2rpx;
						display: inline-block;
						text-align: center;
						line-height: 60rpx;
						margin: 0 10rpx;
						font-size: 28rpx;
						letter-spacing: 7rpx;
						background: $color-text4;
					}
				}

				.select-box-select {
					background: $color-text5;
					color: $color-green;
				}

			}

			.query-box {
				width: 100%;
				height: 80rpx;
				border-top: solid 1rpx $color-text4;
				border-bottom: solid 1rpx $color-text4;
				padding-left: 32rpx;
				line-height: 80rpx;
				margin-top: 28rpx;
				color: $color-text3;
				font-size: 29rpx;
			}

			.content {
				width: 100%;
				height: 100%;
				overflow: hidden;
				overflow-y: scroll;
				padding-left: 30rpx;

				.content-query {
					width: 100%;
					height: 230rpx;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;
					margin-top: 20rpx;
					.con-img {
						width: 30%;
						height: 100%;
						display: flex;
						align-items: center;
						.conimgs {
							width: 100%;
							height: 55%;
						}
					}

					.con-information {
						width: 75%;
						height: 100%;
						padding-left: 30rpx;

						.title {
							font-size: 30rpx;
							margin-top: 20rpx;
							letter-spacing: 5rpx;
						}

						.ifa-font {
							font-size: 26rpx;
							color: $color-text3;
							line-height: 50rpx;
							letter-spacing: 2rpx;
							font-weight: lighter;
						}

						.pri {
							width: 100%;
							height: 55rpx;
							display: flex;
							flex-direction: row;
							position: relative;
							line-height: 70rpx;
							align-items: center;

							.vip-price {
								color: $color-red;
								width: 77rpx;
								height: 72rpx;
								font-weight: bold;
								font-size: 35rpx;
								line-height: 77rpx;
							}

							.original-price {
								font-size: 25rpx;
								color: $color-text3;
								text-decoration: line-through;
								margin-left: 20rpx;
								padding-top: 14rpx;
								
							}

							.addCar {
								width: 50rpx;
								height: 50rpx;
								background: $color-green;
								border-radius: 50%;
								position: absolute;
								right: 50rpx;
								@include flexCenter;

								.shopping-car {
									font-size: 38rpx;

								}
							}
						}
					}
				}
			}
		}
	}
</style>
