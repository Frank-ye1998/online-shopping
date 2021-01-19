<template>
	<view class="tab-main">
		<view class="tab-bar">
			<view :class="['contentTitle',index===active?'content-top-select':'']" v-for="(item,index) in tabTitle" :key="index" @tap="getItem(index)">{{item.name}}</view>
			<slot></slot>
		</view>
		<view class="top-bar-plc"></view>
	</view>
</template>

<script>
	export default {
		props: {
			tabTitle: Array,
		},

		data() {
			return {
				active: 0,
			};
		},
		methods: {
			getItem(index) {
				this.active = index
				this.$emit("fz",index)
			}
			
		}
	}
</script>

<style lang="scss">
	.tab-bar {
		display: flex;
		margin-left: 22rpx;
		margin-top: 24rpx;
		border-radius: 35rpx;
		background-color: #d08683;
		width: 95%;
	}
	.contentTitle {
		color: #fbfaff;
		font-size: 40rpx;
		flex: 1;  //根据标签个数平均分标签页
		height: 70rpx;
		text-align: center;
		line-height: 70rpx;
		border-radius: 35rpx;
	}
	.content-top-select {
		color: $color-red;
		background-color: #fbfaff;
	}
</style>
