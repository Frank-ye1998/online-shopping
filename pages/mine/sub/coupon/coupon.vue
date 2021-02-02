<template>
	<view>
		<view class="back-page">
			<top-bar pageTitle="我的优惠券"></top-bar>
		</view>
		<swiper-page :tabList="tabList">
			<template #tab0>
				<view class="coupon-box">
					<view class="coupon-top">
						<view class="lef">
							<view class="purpose">饮品抵用金</view>
							<view class="count-down">仅剩13:17:45</view>
						</view>
						<view class="rig">
							￥<text class="price">12</text>
						</view>
					</view>
					<view class="coupon-bott">
						<view class="rule">使用规则 <i class="icon icon-right" @tap="getRule()"></i></view>
						<view class="click">立即使用</view>
					</view>
					<view class="use-rule" v-show="status">
						使用期间:生生世世是生你的今年春节多久才能见到你超级电脑才能
					</view>
					<view class="radius-left"></view>
					<view class="rdius-right"></view>
				</view>
				
				<view class="coupon-box">
					<view class="coupon-top">
						<view class="lef">
							<view class="purpose">饮品抵用金</view>
							<view class="count-down">仅剩13:17:45</view>
						</view>
						<view class="rig">
							￥<text class="price">12</text>
						</view>
					</view>
					<view class="coupon-bott">
						<view class="rule">使用规则 <i class="icon icon-right" @tap="getRule()"></i></view>
						<view class="click">立即使用</view>
					</view>
					<view class="use-rule" v-show="status">
						使用期间:生生世世是生你的今年春节多久才能见到你超级电脑才能
					</view>
					<view class="radius-left"></view>
					<view class="rdius-right"></view>
				</view>
			</template>
			<template #tab1>
			<view class="coupon-box">
				<view class="coupon-top">
					<view class="lef">
						<view class="purpose">饮品抵用金</view>
						<view class="count-down">仅剩13:17:45</view>
					</view>
					<view class="rig">
						￥<text class="price">12</text>
					</view>
				</view>
				<view class="coupon-bott">
					<view class="rule">使用规则 <i class="icon icon-right" @tap="getRule()"></i></view>
					<view class="click">立即使用</view>
				</view>
				<view class="use-rule" v-show="status">
					使用期间:生生世世是生你的今年春节多久才能见到你超级电脑才能
				</view>
				<view class="radius-left"></view>
				<view class="rdius-right"></view>
			</view>
			
			</template>
			<template #tab2>
				<view class="coupon-box">
					<view class="coupon-top">
						<view class="lef">
							<view class="purpose">饮品抵用金</view>
							<view class="count-down">仅剩13:17:45</view>
						</view>
						<view class="rig">
							￥<text class="price">12</text>
						</view>
					</view>
					<view class="coupon-bott">
						<view class="rule">使用规则 <i class="icon icon-right" @tap="getRule()"></i></view>
						<view class="click">立即使用</view>
					</view>
					<view class="use-rule" v-show="status">
						使用期间:生生世世是生你的今年春节多久才能见到你超级电脑才能
					</view>
					<view class="radius-left"></view>
					<view class="rdius-right"></view>
				</view>
				
			</template>
		</swiper-page>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				status:false,
				arrStatus: 0,
				tabList: [{
						name: "未使用",
						id: "tab0",
						toBottom: this.getList,
					},
					{
						name: "已使用",
						id: "tab1",
						toBottom: this.getList,
					},
					{
						name: "已过期",
						toBottom: this.getList,
					},
					
				],
				listA: [], //tab对应列表
				listB: [], //……
				listC: [], //……
			};
		},
		methods:{
			getList:function(){
				
			},
			getItem(index){
				this.arrStatus = index
			},
			getRule:function(){
				// this.status = true;
				this.status = !this.status
			},
			revert() {
			  this.$Router.back(1);
			},
		}
	}
</script>

<style lang="scss">
page {
	background-color: $color-page;
}
.back-page{
	width: 94%;
	height: 110rpx;
	margin: 0 auto;
	line-height: 110rpx;
	color:$color-text2;
	letter-spacing: 2rpx;
	.my-coupon{
		padding-left:40rpx;
		font-size: 34rpx;
	}
}
	
	.box1 {
		display: flex;
		flex-direction: row;
		height: 100rpx;
		line-height: 100rpx;
		justify-content: space-between;
		
	}
	
	.tabber {
		display: flex;
		flex-direction: row;
		@include flexCenter width: 100%
	}
	
	.content-top-select {
		color: $color-red;
		border-bottom: solid 2px $color-red;
	}
	.cli-font {
		width: 30%;
		margin-left: 40rpx;
		margin-right: 40rpx;
		height: 80rpx;
		font-size: 38rpx;
		text-align: center;
		line-height: 80rpx;
	}

	.fillIn {
		width: 600rpx;
		height: 100rpx;
		margin-left: 24rpx;
	}

	.change {
		color: red;
		margin-right: 24rpx;
	}
	.text{
		margin-left: 24rpx;
	}
	.coupon-box{
		width: 94%;
		background: #FFFFFF;
		margin: 12rpx auto 0;
		border-radius: 10rpx;
		position: relative;
		.coupon-top{
			width: 90%;
			height: 158rpx;
			margin: 0 auto;
			border-bottom: dotted 1px $color-text3;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			.lef{
				width: 220rpx;
				height: 126rpx;
				line-height: 62rpx;
				.purpose{
					font-size: 36rpx;
					letter-spacing: 4rpx;
				}
				.count-down{
					font-size: 30rpx;
					color:#f3682f ;
					letter-spacing: 1rpx;
					
				}
			}
			.rig{
				width: 120rpx;
				height: 126rpx;
				color:$color-red;
				line-height: 190rpx;
				.price{
					font-size: 70rpx;
				}
			}
		}
		.coupon-bott{
			width: 90%;
			height: 100rpx;
			margin: 0 auto;
			line-height: 70rpx;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			.rule{
				width: 160rpx;
				height: 70rpx;
				color:$color-text2 ;
				display: flex;
				flex-direction: row;
				font-size: 28rpx;
				justify-content: space-between;
				.icon-right{
					transform:rotate(90deg);
					color: #d3d3d3;
					font-size: 24rpx;
				}
			}
			.click{
				width: 202rpx;
				height: 62rpx;
				background: $color-green;
				text-align: center;
				line-height: 62rpx;
				border-radius: 40rpx;
				font-size: 28rpx;
				letter-spacing: 4rpx;
				color: #FFFFFF;
			}
		}
		.use-rule{
			width: 94%;
			margin: 0 auto;
			border-radius: 10rpx;
			padding:  8rpx 0 28rpx;
			font-size: 28rpx;
			line-height: 42rpx;
			color: $color-text0;
			letter-spacing: 2rpx;
			font-weight: lighter;
		}
		.radius-left{
			width: 30rpx;
			height: 30rpx;
			background:$color-page;
			position: absolute;
			top: 190rpx;
			left:0;
			transform: translateX(-50%);
			border-radius:50%;
		}
		.rdius-right{
			width: 30rpx;
			height: 30rpx;
			background:$color-page;
			position: absolute;
			top: 190rpx;
			right:0;
			transform: translateX(50%);
			border-radius:50%;
		}
	}
	
</style>
