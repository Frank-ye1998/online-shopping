<template>
	<view>
		<view class="top">
			<warp-bar class="warp-bar"></warp-bar>
			<view class="take-away">
				<view class="away-left">
					
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
					<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" scroll-left="120">
						<view id="demo1" v-for="(item,index) in selectArr" :key="index" :class="['select-box',index === seleStatus?'select-box-select':'']" @tap="selecItem(index)">{{item.msg}}</view>
					</scroll-view>
				</view>
				<view class="query-box">
					特惠专区
				</view>
				<view class="content">
					<view class="content-query" @tap="getDetail(id)">
						<view class="con-img">
							<image src="../../static/images/home/food.jpg" mode="widthFix" class="conimgs"></image>
						</view>
						<view class="con-information">		
							<view class="title">叮咚大满贯菌蔬拼盘400g</view>
							<view class="ifa-font">2菜2菇|免切净菜|家庭火锅</view>
							<view class="pri">
								<view class="vip-price">
									￥9.90
								</view>
								<view class="original-price">
									￥12.90
								</view>
								<view class="addCar">
									<i class="icon shopping-car"></i>
								</view>
							</view>
						</view>
					</view>
					<view class="content-query">
						<view class="con-img">
							<image src="../../static/images/home/food.jpg" mode="widthFix" class="conimgs"></image>
						</view>
						<view class="con-information">		
							<view class="title">快来买菜</view>
							<view class="ifa-font">2菜2菇|免切净菜|家庭火锅</view>
							<view class="pri">
								<view class="vip-price">
									￥9.90
								</view>
								<view class="original-price">
									￥12.90
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
	export default {
		data() {
			return {
				index: this.$store.getters.ChangeType,
				takeArr:[
					{
						mess:"自提"
					},
					{
						mess:"外送"
					},
				],
				takeStatus:0, 
				seleStatus:0, 
				ificaArr:0,
				ifiArr: [
					{
						name:"新鲜蔬菜"
					},
					{
						name:"营养果食"
					},
					{
						name:"水产海鲜"
					},
					{
						name:"冷冻食品"
					},
					{
						name:"粮油调味"
					},
					{
						name:"方便速食"
					},
					{
						name:"肉类"
					},
					{
						name:"营养早餐"
					},
				],
				selectArr:[
					{
						msg:"全部"
					},
					{
						msg:"特惠专区"
					},
					{
						msg:"特色必点"
					},
					{
						msg:"全部22"
					},
					{
						msg:"特惠专区2"
					},
					{
						msg:"特色菜"
					},
					{
						msg:"特惠专区2"
					},
					{
						msg:"特色菜"
					},
				]
			};
		},
		methods: {
			changeType (index) {
			      console.log(index)
			      this.index = index
			    },
			getItem(index){
				this.ificaArr = index
			},
			selecItem(index){
				this.seleStatus = index
			},
			getDetail(id){
				this.$Router.push({name:'detail',query:{typeId: id}});
			},
			takeItem(index){
				this.takeArr = index
			}
		}
	}
</script>

<style lang="scss">
	.top {
		width: 100%;
		height: 480rpx;
		background: $color-red;
		.warp-bar{
			width: 90%;
			height: 330rpx;
			margin-left: 5%;
			padding-top: 20rpx;
			border-radius: 10rpx;
		}
		.take-away{
			width: 90%;
			height: 100rpx;
			background: #FFFFFF;
			margin-left: 5%;
			margin-top: 30rpx;
			border-radius: 10rpx;
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			align-items: center;
			.away-left{
				width: 50%;
				height: 70%;
				background: #007AFF;
			}
			.away-right{
				width: 30%;
				height: 70%;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				border-radius: 40rpx;
				.btn_switch{
				    width: 85px;
				    height: 25px;
				    border-radius: 20px;
				    display: flex;
				    text-align: center;
				    line-height: 25px;
				    border: 1px solid #7AA7D4;
				    color: #7AA7D4;
				      .btn-left{
				      width: 42.5px;
				      height: 25px;
				      border-radius: 20px;
				      }
				      .btn-right{
				        width: 42.5px;
				        height: 25px;
				        border-radius: 20px;
				      }
				    }
					.active{
					  background: #7AA7D4;
					  color:#fff;
					}
			}
			.away-right-select{
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
			.single{
				width: 100%;
				height: 130rpx;
				text-align: center;
				line-height: 130rpx;
				letter-spacing: 4rpx;
				font-size: 32rpx;
			}
		}
		.main-cli-select{
			background: $color-green-transparent;
			border-left: solid 2px $color-green;
			color: $color-green;
		}
		.main-con {
			width: 75%;
			height: 100%;
			display: flex;
			flex-direction: column;
			.select-top{
				width: 100%;
				height: 80rpx;
				overflow:hidden;
				padding-left: 22rpx;
				margin-top: 33rpx;
				.scroll-view_H{
					width: 100%;
					height: 100rpx;
					white-space: nowrap;
					.select-box{
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
						background:$color-text4;
					}
				}
				.select-box-select{
				background: $color-text5;
				color: $color-green;
			}
			
		}
			.query-box{
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
			.content{
				width: 100%;
				height: 100%;
				overflow: hidden;
				overflow-y: scroll;
				padding-left: 30rpx;
				.content-query{
					width: 100%;
					height: 230rpx;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;
					margin-top: 20rpx;
					.con-img{
						width: 30%;
						height: 70%;
						display: flex;
						align-items: center;
						.conimgs{
							width: 100%;
							height: 100%;
						}
					}
					.con-information{
						width: 75%;
						height: 100%;
						padding-left: 30rpx;
						
						.title{
							font-size: 30rpx;
							margin-top: 20rpx;
							letter-spacing: 5rpx;
						}
						.ifa-font{
							font-size: 26rpx;
							color: $color-text3;
							line-height: 50rpx;
							letter-spacing: 2rpx;
							font-weight: lighter;
						}
						.pri{
							width: 100%;
							height: 55rpx;
							display: flex;
							flex-direction: row;
							position: relative;
							line-height: 70rpx;
							align-items: center;
							.vip-price{
								color: $color-red;
								font-size: 35rpx;
							}
							.original-price{
								font-size: 25rpx;
								color: $color-text3;
								text-decoration: line-through;
								padding-left: 10rpx;
								padding-top: 9rpx;
							}
							.addCar{
								width: 50rpx;
								height: 50rpx;
								background: #3CB963;
								border-radius: 50%;
								position: absolute;
								right: 50rpx;
								@include flexCenter;
								.shopping-car{
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
