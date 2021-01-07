<template>
	<view>
		<view class="uni-padding-wrap" :style="{background: 'url('+imageURL+')'}">
			<view class="page-section swiper">
				<view class="page-section-spacing">
						<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay">
							<swiper-item>
								<view class="swiper-item uni-bg-red">
									<image src="../../static/images/warpBar/dominobanner.jpg" mode="" class="img"></image>
								</view>
							</swiper-item>
							<swiper-item>
								<view class="swiper-item uni-bg-green">
									<image src="../../static/images/warpBar/doms.jpeg" mode="" class="img"></image>
								</view>
							</swiper-item>
							<swiper-item>
								<view class="swiper-item uni-bg-blue">
									<image src="../../static/images/warpBar/covers-dml.jpg" mode="" class="img"></image>
								</view>
							</swiper-item>
						</swiper>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				background: ['color1', 'color2', 'color3'],
				indicatorDots: true,
				autoplay: true,
				imageURL: '/static/images/banner.png'
			}
		},
		methods:{
			
		}
	}
</script>

<style lang="scss">
	.uni-padding-wrap{
		width: 100%;
		height: 430rpx;
		background-image: "";
		.img{
			width: 100%;
			height:430rpx;
		}
	}
</style>
