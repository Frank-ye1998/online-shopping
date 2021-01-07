<template>
	<view>
		<view class="uni-padding-wrap">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay">
						<swiper-item class="swiper-item">
							<image src="../../static/images/warpBar/dominobanner.jpg" mode="heightFix" class="img"></image>
						</swiper-item class="swiper-item">
						<swiper-item>
							<image src="../../static/images/warpBar/doms.jpeg" mode="heightFix" class="img"></image>
						</swiper-item>
						<swiper-item class="swiper-item">
							<image src="../../static/images/warpBar/covers-dml.jpg" mode="heightFix" class="img"></image>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
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
		.img {
			@include absCenter;
			height: 100%;
		}
	}
	.swiper {
		height: 420rpx;
	}
</style>
