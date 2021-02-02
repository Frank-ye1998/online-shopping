<template>
	<view class="top-status-bar-main">
		<view class="top-status-bar"></view>
		<view class="top-status-plc"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.top-status-bar {
		position: fixed;
		z-index: 20;
		top: 0;
		left: 0;
		width: 100%;
		height: var(--status-bar-height);
		background-color: $color-page;
	}

	.top-status-plc {
		width: 100%;
		height: var(--status-bar-height);
	}
</style>
