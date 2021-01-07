<template>
	<view>
		菜单
		<div @tap="toPage" class="btn"></div>

	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {
			toPage: function() {
				// uni.switchTab({
				// 	url:'/pages/index/index'
				// })
				this.$Router.pushTab({
					name: 'index',
					params: {
						name: '张三',
						arr: [1, 2, 3, {
							age: 18
						}]
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.btn {
		width: 750rpx;
		height: 100rpx;
		border: 2px solid #000;
	}
</style>
