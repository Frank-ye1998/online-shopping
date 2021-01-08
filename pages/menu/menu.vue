<template>
	<view>
		<div class="top"></div>
		<div class="main">
			<div class="test">测试</div>
		</div>
		<div class="bottom-plc"></div>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {}
	}
</script>

<style lang="scss">
	.top {
		width: 100%;
		height: 200rpx;
		background-color: pink;
	}

	.main {
		position: relative;
		width: 100%;
		height: calc(100vh - 200rpx - var(--window-bottom));
		background-color: skyblue;

		.test {
			position: absolute;
			bottom: 0;
			left: 50%;
			transform: translateX(-50%);
		}
	}

	// .bottom-plc {
	// 	width: 100%;
	// 	height: var(--window-bottom);
	// }
</style>
