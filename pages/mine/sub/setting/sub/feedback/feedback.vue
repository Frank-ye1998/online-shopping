<template>
	<view>
		<top-bar pageTitle="意见与反馈"></top-bar>
		<textarea value="" v-model="submits" style="font-size: 28rpx;letter-spacing: 4rpx; font-color: #EEEEEE;padding: 20rpx;" placeholder="我们想听听你的心声,如果愿意,你也可以留下联系方式,我们期待与你的真诚沟通." class="ipt" maxlength="1000"/>
		<view class="submit" @tap="sub">
			提交
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				submits:""
			};
		},
		methods:{
			sub:function(){
				if(this.submits === ""){
					uni.showToast({
					  title: "请输入内容",
					  icon: "none"
					},2000)
				}else{
					uni.showToast({
					  title: "提交成功",
					},2000)
					setTimeout(() => {
						console.log(777);
					  this.$Router.back(1)
					}, 1200)
				}
				
			}
		}
	}
</script>

<style lang="scss">
.ipt{
	width: 96%;
	height: 400rpx;
	background: #FFFFFF;
	margin: 10rpx auto;
}
.submit{
	position: fixed;
	width: 120rpx;
	height: 60rpx;
	background:$color-green ;
	right: 20rpx;
	top: 12rpx;
	z-index: 1100;
	text-align: center;
	line-height: 60rpx;
	color: #FFFFFF;
	font-size: 28rpx;
	letter-spacing: 2rpx;
}
</style>
