<template>
	<view>
		<top-bar pageTitle=""></top-bar>
		<view class="complete">
			订单完成
		</view>
		<view class="subscribe">
			<view class="subtime">
				<view class="timel">
					预约时间
				</view>
				<view class="timer">
					尽快送达(预计20:45前)
				</view>
			</view>
			<view class="subaddress">
				<view class="subl">
					收货地址
				</view>
				<view class="subr">
					<view class="add">
						{{orderArr.baseAddress}}{{orderArr.detailAddress}}
					</view>
					<view class="adds">
						<view class="names">
							王梦超
						</view>
						<view class="phone">
							{{orderArr.userMobile}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="shopbox">
			<view class="ordershop"  v-for="(item,index) in orderArr.osProductDtoList" :key="index">
				<view class="information">
					<view class="imgs">
						
					</view>
					<view class="mess">
						<view class="definition">{{item.skuName}}</view>
						<view class=" univalent">单价:￥{{item.skuPrice}}/份</view>
						<view class="number">数量:{{item.quantity}}份</view>
					</view>
				</view>
				<view class="price">
					￥{{item.skuPrice}}
				</view>
			</view>
			
			<view class=" explicit">
				<view class="explio">
					<view class="olef">
						商品金额
					</view>
					<view class="oprice">
						￥{{price}}
					</view>
				</view>
				<view class="explit">
					<view class="olef">
						配送费
					</view>
					<view class="oprice">
						￥{{orderArr.freightAmount}}
					</view>
				</view>
				<view class="explih">
					<view class="olef">
						实付金额
					</view>
					<view class="oprice">
						￥{{paidPrice}}
					</view>
				</view>
			</view>
		</view>
		<view class="invoice">
			<view class="invoilef">
				发票
			</view>
			<view class="repairinvoice">
				补开发票
			</view>
		</view>
		<view class="identifier">
			<view class="explio">
				<view class="olef">
					订单编号
				</view>
				<view class="oprice">
					<view class="plio">
						{{orderArr.orderNo}}
					</view>
				</view>
			</view>
			<view class="explit">
				<view class="olef">
					下单时间
				</view>
				<view class="oprice">
					{{timeCv(orderArr.createTime)}}
				</view>
			</view>
			<view class="explih">
				<view class="olef">
					支付方式
				</view>
				<view class="oprice">
					微信小程序
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import orderApi from "@/api/orderApi.js";
	import {
	  timeCv
	 } from "@/utils/tool.js";
	export default {
		data() {
			return {
				paidPrice:0,
				commodity: this.$Route.query,
				orderArr:[],
				timeCv:timeCv,
				actually:[],
				price:0,
			};
		},
		methods:{
			orderDetails:function(){
				orderApi
					.findOrderDetail({
						id:this.commodity.id
					}).then((res) => {
						this.orderArr = res.data;
						let price = 0;
						this.orderArr.osProductDtoList.forEach((item) =>{
							price+=item.skuPrice
						})
						this.price = price,
						this.paidPrice = this.price+this.orderArr.freightAmount,
						console.log(this.orderArr,'dddddd');
					})
			}
		},
		onLoad() {
			this.orderDetails()
		},
	}
</script>

<style lang="scss">
page {
		background-color: $color-page;
	}
	.complete{
		width:96%;
		height: 120rpx;
		font-size: 42rpx;
		color: $color-text0;
		line-height: 120rpx;
		margin: 0 auto;
	}
	.subscribe{
		width:96%;
		background: #FFFFFF;
		margin: 10rpx auto;
		border-radius: 10rpx;
		.subtime{
			width: 100%;
			height: 80rpx;
			border-bottom: solid 1rpx $color-text3;
			display: flex;
			flex-direction: row;
			margin: 0 auto;
			justify-content: space-between;
			align-items: center;
			padding:0 10px;
			.timel{
				font-size: 28rpx;
				color: $color-text3;
			}
			.timer{
				font-size: 28rpx;
				color: $color-text2;
			}
		}
		.subaddress{
			width: 100%;
			height: 124rpx;
			display: flex;
			flex-direction: row;
			margin: 0 auto;
			justify-content: space-between;
			align-items: center;
			padding:0 10px;
			.subl{
				font-size: 28rpx;
				color: $color-text3;
			}
			.subr{
				font-size: 28rpx;
				color: $color-text2;
				display: flex;
				flex-direction: column;
				.adds{
					display: flex;
					flex-direction: row;
				}
			}
		}
	}
	.shopbox{
		width:96%;
		background: #FFFFFF;
		margin:20rpx auto;
		border-radius: 10rpx;
			.ordershop{
				width: 100%;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				border-bottom: solid 1rpx $color-text3;
				align-items: center;
				.information{
					width: 80%;
					height: 220rpx;
					display: flex;
					flex-direction: row;
					align-items: center;
					.imgs{
						width: 150rpx;
						height: 150rpx;
						background: #CCCCCC;
						margin-left: 10rpx;
					}
					.mess{
						display: flex;
						flex-direction: column;
						padding: 20rpx;
						.definition{
							font-size: 29rpx;
							color: $color-text1;
						}
						.univalent{
							font-size: 27rpx;
							color: $color-text2;
							font-weight: lighter;
						}
						.number{
							font-size: 27rpx;
							color: $color-text2;
							font-weight: lighter;
						}
					}
				}
				.price{
					width: 118rpx;
					height: 120rpx;
					line-height:120rpx;
					font-size: 30rpx;
					color: $color-text1;
					text-align: center;
				}
			}
			.explicit{
				width: 100%;
				.explio{
					width: 95%;
					height: 60rpx;
					margin: 0 auto;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;
					.olef{
						font-size: 28rpx;
						color: $color-text2;
					}
					.oprice{
						font-size: 28rpx;
						color: $color-text1;
						
					}
				}
				.explit{
					width: 95%;
					height: 60rpx;
					margin: 0 auto;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;
					.olef{
						font-size: 28rpx;
						color: $color-text2;
					}
					.oprice{
						font-size: 28rpx;
						color: $color-text1;
					}
				}
				.explih{
					width: 95%;
					height: 60rpx;
					margin: 0 auto;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;
					.olef{
						font-size: 28rpx;
						color: $color-text2;
					}
					.oprice{
						font-size: 28rpx;
						color: $color-red-transparent;
					}
				}
			}
	}
	.invoice{
		width:96%;
		height: 90rpx;
		background: #FFFFFF;
		margin:20rpx auto;
		border-radius: 10rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 16rpx;
		.invoilef{
			font-size: 28rpx;
			color: $color-text2;
			
		}
		.repairinvoice{
			font-size: 28rpx;
			color: $color-text1;
		}
	}
	.identifier{
		width:96%;
		background: #FFFFFF;
		margin:20rpx auto;
		border-radius: 10rpx;
		.explio{
			width: 95%;
			height: 60rpx;
			margin: 0 auto;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			.olef{
				font-size: 28rpx;
				color: $color-text2;
			}
			.oprice{
				display: flex;
				flex-direction: row;
				.copy{
					color: $color-green;
					font-size: 28rpx;
				}
				.plio{
					padding-left: 10rpx;
					font-size: 28rpx;
					color: $color-text2;
				}
			}
		}
		.explit{
			width: 95%;
			height: 60rpx;
			margin: 0 auto;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			.olef{
				font-size: 28rpx;
				color: $color-text2;
			}
			.oprice{
				font-size: 28rpx;
				color: $color-text1;
			}
		}
		.explih{
			width: 95%;
			height: 60rpx;
			margin: 0 auto;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			.olef{
				font-size: 28rpx;
				color: $color-text2;
			}
			.oprice{
				font-size: 28rpx;
				color: $color-text2;
			}
		}
	}
</style>
