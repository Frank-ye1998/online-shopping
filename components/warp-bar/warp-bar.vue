<template>
	<view>
		<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="false">
			<swiper-item class="swiper-item">
				<image src="../../static/images/warpBar/banner_1.png" mode="heightFix" class="img"></image>
			</swiper-item>
			<swiper-item class="swiper-item">
				<image src="../../static/images/warpBar/dominobanner.jpg" mode="heightFix" class="img"></image>
			</swiper-item>
			<swiper-item class="swiper-item">
				<image src="../../static/images/warpBar/doms.jpeg" mode="heightFix" class="img"></image>
			</swiper-item>
		</swiper>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: ['color1', 'color2', 'color3'],
				indicatorDots: true,
				autoplay: true,
				imageURL: '/static/images/banner.png'
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.swiper-item {
		position: relative;
		border-radius: 40rpx;
		.img {
			@include absCenter;
			height: 100%;
			border-radius: 40rpx;
		}
		
	}

	.swiper {
		height: 100%;
	}
</style>
