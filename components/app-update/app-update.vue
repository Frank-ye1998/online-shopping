<template>
	<view class="update-main" @touchmove.stop.prevent="moveDisable">
		<view class="update-view">
			<i @tap="close" class="icon icon-close update-close"></i>
			<view class="update-top">
				<image src="/static/images/home/update.png" class="update-img" mode="widthFix"></image>
				<view class="update-tit">
					达美乐有新版本啦
				</view>
				<view class="updata-text-1">
					{{version}}
				</view>
			</view>
			<scroll-view :scroll-y="true" class="update-said">
				<view class="text-2">1、优化性能与用户体验</view>
				<view class="text-2">2、修复bug</view>
				<view class="text-2">3、增加新功能</view>
				<view class="text-2">4、新增支付宝支付功能</view>
				<view class="text-2">5、优化购物流程体验</view>
			</scroll-view>
			<view class="update-progress-view">
				<view @tap="downApp" class="update-start determine_82">
					<text>{{downText}}</text>
					<div v-if="downText!=='开始更新'" :style="{'transform': 'translateX('+downNum+'%)'}" class="fff_mask"></div>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nowv: this.$version,
				version: '1.0.0',
				saidHtml: [],
				downUrl: '',
				downText: '开始更新',
				downNum: 0,
				isUpdate: 1
			};
		},
		methods: {
			moveDisable: function() {

			},
			downApp: function() {
				uni.getSystemInfo({
					success: (data) => {
						if (data.platform === 'ios') {
							//ios
							plus.runtime.openURL('itms-apps://itunes.apple.com/app/1486552015');
						} else {
							//安卓
							this.downText = '0%';
							let downloadTask = uni.downloadFile({
								url: this.downUrl,
								success: (res) => {
									console.log(res);
									if (res.statusCode === 200) {
										console.log('下载成功');
										this.downText = "下载完成";
										plus.runtime.install(res.tempFilePath);
									}
								}
							});
							downloadTask.onProgressUpdate((pr) => {
								console.log(pr);
								this.downNum = pr.progress;
								this.downText = pr.progress + '%';
								if (pr.progress >= 100) {
									this.downText = "下载完成";
								}
							})
						}
					}
				})
			},
			close: function() {
				// this.$parent.updateClose();
				console.log(this.$parent.$parent.updateClose());
			}
		},
		beforeMount() {
			// this.$request({
			// 	url: 'api/appUpdate',
			// 	method: 'get'
			// }).then(res => {
			// 	console.log(res)
			// 	this.isUpdate = res.data.is_update
			// 	this.downUrl = res.data.link;
			// 	this.version = res.data.version;
			// 	let arr = res.data.instructions.split(";");
			// 	arr.forEach((item) => {
			// 		this.saidHtml.push(item);
			// 	})
			// 	console.log(this.saidHtml);

			// }).catch(e => {
			// 	console.log(e)
			// })
		}
	}
</script>

<style lang="scss">
	.update-main {
		@include mask;

		.update-view {
			position: absolute;
			top: 258rpx;
			left: 50%;
			transform: translateX(-50%);
			width: 580rpx;
			height: 818rpx;
			background-color: #fff;
			border-radius: 8px;

			.update-top {
				width: 100%;
				height: 396rpx;
				padding-top: 90rpx;

				.update-img {
					display: block;
					width: 152rpx;
					height: 147rpx;
					margin: 0 auto 40rpx;
				}

				.update-tit {
					font-size: 32rpx;
					line-height: 32rpx;
					color: #282933;
					font-weight: 700;
					margin-bottom: 18rpx;
					text-align: center;
				}

				.updata-text-1 {
					font-size: 24rpx;
					color: #B2B2BC;
					text-align: center;
				}
			}

			.update-said {
				width: 88%;
				height: 250rpx;
				padding-top: 22rpx;
				margin: 0 auto;
				border-top: 1px solid #F0F0F3;
				font-size: 24rpx;
				color: #7A7B99;

				.text-2 {
					width: 443rpx;
					font-size: 24rpx;
					color: #7A7B99;
					line-height: 36rpx;
					margin: 0 auto;
				}
			}

			.update-progress-view {
				margin-top: 28rpx;

				.update-start {
					position: relative;
					overflow: hidden;

					text {
						position: relative;
						z-index: 100;
					}

					.fff_mask {
						position: absolute;
						z-index: 50;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
						background-color: #e2e2e5;
						transform: translateX(0%);
					}
				}
			}

			.update-close {
				position: absolute;
				top: 2%;
				right: 4%;
				font-size: 36rpx;
				color: #9B9BA4;
				font-weight: 700;
			}
		}
	}

	.determine_82 {
		@include btnGreen-gradient;
		width: 82.67%;
		height: 100rpx;

		font-size: 32rpx;
		color: #fff;
		border-radius: 999px;
		margin: 0 auto;
	}
</style>
