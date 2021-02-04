<template>
	<view>
		<view class="restart">
			<view class="skip">
				跳过
				<view class="times"><text>{{time}}</text>s</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				time:0,
			}
		},
	
		methods: {
			countDown(){
				let THIS=this;
				THIS.time--;
				
			}
		},
		mounted(){
			let THIS=this;
			THIS.time=3;
			if(THIS.time >= 1){
				setInterval(THIS.countDown,1000);
			}
		},
		watch:{
			'time':function(newVal,oldVal){
				if(newVal==0){
					this.$router.push('pages/index/index');
				}
			}
		}
	}		
</script>

<style lang="scss">
page {
		background-color: $color-page;
	}
	.skip{
		position: fixed;
		width: 100rpx;
		height: 100rpx;
		background: $color-text1;
		opacity: 0.56;
		border-radius: 50%;
		top: 30rpx;
		right: 5rpx;
		text-align: center;
		color: #FFFFFF;
		font-size: 26rpx;
		letter-spacing: 4rpx;
		padding-top: 14rpx;
		.times{
			font-size: 26rpx;
			color: #FFFFFF;
			letter-spacing: 1rpx;
			
		}
	}
</style>
