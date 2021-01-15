<template>
	<view class="stepper-main">
		<i @tap="reduce" class="icon icon-reduce"></i>
		<text class="num">{{num}}</text>
		<i @tap="add" class="icon icon-add"></i>
	</view>
</template>

<script>
	export default {
		props: {
			value: {
				type: Number,
				default: 0
			},
			info:{
				type: Object,
				default: null
			},
			change: {
				type: Function
			}
		},
		data() {
			return {
				num: 0
			};
		},
		created() {
			if (this.value) {
				this.num = this.value;
			}
		},
		watch: {
			num(newValue, oldValue) {
				this.change(newValue,this.info);
			}
		},
		methods: {
			reduce: function() {
				if (this.num === 0) return;
				this.num = this.num - 1;
			},
			add: function() {
				if (this.num === 99) return;
				this.num = this.num + 1;
			}
		}
	}
</script>

<style lang="scss">
	.stepper-main {
		@include flexVtCenter;
		justify-content: space-between;
		width: 160rpx;

		.icon {
			font-size: 46rpx;
			color: $color-green;
			padding: 4rpx;
		}

		.num {
			font-size: 32rpx;
			line-height: 32rpx;
			color: $color-text1;
			font-weight: 700;
		}
	}
</style>
