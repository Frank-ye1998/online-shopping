<template>
	<view class="top-status-bar-main">
		<div class="top-status-bar"></div>
		<div class="top-status-plc"></div>
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
		z-index: 10;
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
