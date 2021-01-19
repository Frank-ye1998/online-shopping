<template>
	<view class="member-wrap">
		<view class="menber-head">
			<view class="getback">
				<i class="icon icon-back"  @tap="goBack()"></i>
				<view class="vip-fonts">
					开通会员
				</view>
			</view>
		</view>
		<view class="Openmember">
			<image src="../../static/images/member/vip.png" mode="" class="member-img"></image>
		</view>
		<view class="member-save">
			会员预计可省<text class="price">806</text>元/年
		</view>
		<view class="interests">
			<view class="inter-top">
				会员专享6项权益
			</view>
			<view class="inter-bottom">
				<view class="vip-con" v-for="(item,index) in memArr" :key="index">
					<view class="vip-font">
						{{item.font}}
					</view>
					<view class="vip-text">
						{{item.text}}
					</view>
				</view>
			</view>
		</view>
		<view class="vip">
			
		</view>
		<view class="pay-vip">
			<view class="pay-left">
				连续包年￥59.9
			</view>
			<view class="pay-right">
				立即开通
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				memArr:[
					{
						font:"会员专享价",
						text:"领取76元红包"
					},
					{
						font:"会员专享价",
						text:"2000+款享低价"
					},
					{
						font:"每周三会员日",
						text:"专享5折爆品"
					},
					{
						font:"积分双倍返",
						text:"积分当钱花"
					},
					{
						font:"不满意包退",
						text:"无条件包退"
					},
					{
						font:"配送享特权",
						text:"优先配送"
					}
				]
			};
		},
		methods:{
			goBack() {
			  this.$Router.back(1);
			},
		}
	}
</script>

<style lang="scss">
page {
  background-color: $color-page;
}
.member-wrap{
	position: relative;
}
.menber-head{
	width: 100%;
	height: 380rpx;
	background: #131311;
	border-bottom-left-radius:80rpx;
	border-bottom-right-radius:80rpx;
	color: #FFFFFF;
	position: relative;
	.getback{
		width: 430rpx;
		height: 50rpx;
		position: absolute;
		top: 40rpx;
		left: 20rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		.icon-back{
			z-index: 10;
			
		}
	}
	
}
.Openmember{
	width: 96%;
	height: 220rpx;
	margin: 0 auto;
	border-radius: 30rpx;
	position: absolute;
	left: 2%;
	top: 220rpx;
	.member-img{
		z-index: 10;
		width: 100%;
		height: 100%;
	}
}
.member-save{
	width: 640rpx;
	height: 200rpx;
	color: #ecc28d;
	text-align: center;
	line-height: 200rpx;
	font-size: 49rpx;
	letter-spacing: 6rpx;
	position: absolute;
	left: 40rpx;
	top: 230rpx;
	z-index: 10;
	.price{
		font-weight: bold;
		font-size: 57rpx;
	}
}
.interests{
	width: 96%;
	height: 500rpx;
	background: #FFFFFF;
	border-radius: 30rpx;
	margin: 90rpx auto;
	.inter-top{
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		border-bottom: solid 1rpx $color-page;
		padding-left: 30rpx;
	}
	.inter-bottom{
		width: 100%;
		height: 300rpx;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		padding: 0 26rpx;
		justify-content: space-between;
		.vip-con{
			width: 31%;
			height: 140rpx;
			background: $color-page;
			padding: 10rpx 0 0 18rpx;
			line-height: 54rpx;
			border-radius: 20rpx;
			margin-top: 25rpx;
			.vip-font{
				
			}
			.vip-text{
				color: $color-text3;
				font-size: 27rpx;
			}
		}
	}
}
.vip{
	width: 100%;
	height: 700rpx;
	background: #0077AA;
}
.pay-vip{
	position: fixed;
	width: 96%;
	height: 120rpx;
	bottom: 30rpx;
	left: 2%;
	display: flex;
	flex-direction: row;
	background: #3CB963;
	border-radius: 60rpx;
	overflow: hidden;
	.pay-left{
		width: 460rpx;
		height: 120rpx;
		line-height: 120rpx;
		padding-left: 120rpx;
	}
	.pay-right{
		width:260rpx;
		height: 0;
		border-bottom: 60px solid #ecc28d;
		border-left:18px solid transparent;
		text-align: center;
		line-height: 120rpx;
	}
}
</style>
