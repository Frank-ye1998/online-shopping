<template>
	<view>
		<top-bar pageTitle="个人信息"></top-bar>
		<div class="list-main">
			<div class="avatar-view list">
				<div class="tit" @tap="confirmmodify()">
					头像
				</div>
				<img-view class="img-view" src="/static/images/mine/avatar.jpg"></img-view>
				<i class="icon icon-to"></i>
				<div class="hr"></div>
			</div>
			<div class="list" @tap="modify()">
				<div class="tit">
					昵称
				</div>
				<div class="right">
					<div class="text1">{{filter}}</div>
					<i class="icon icon-to"></i>
				</div>
				<div class="hr"></div>
			</div>
			<div class="list" @tap="climask()">
				<div class="gender">
					性别
				</div>
				<div class="right">
					<div :class="[check===0?'text2':'text1']">{{sexArr[check]}}</div>
					<i class="icon icon-to"></i>
				</div>
				<div class="hr"></div>
			</div>
			<div class="list">
				<div class="tit">
					生日
				</div>
				<div class="right">
					<div class="text1">十九</div>
					<i class="icon icon-to"></i>
				</div>
				<picker class="picker" mode="date" :value="date">
					<view class="uni-input">{{date}}</view>
				</picker>
				<div class="hr"></div>
			</div>
			<div class="list" @tap="appearmask">
				<div class="tit">
					手机号
				</div>
				<div class="right">
					<div class="text1">十九</div>
					<i class="icon icon-to"></i>
				</div>
				<div class="hr"></div>
			</div>
			<div class="list">
				<div class="tit">
					微信
				</div>
				<div class="right">
					<!-- <div class="text1">十九</div> -->
					<div class="text2">已绑定</div>
					<i class="icon icon-to"></i>
				</div>
			</div>
		</div>
		<!-- 		<div class="mask" v-show="isShow" @tap="cancel()">
			<div class="content fadeInUp" @tap.stop="">
				<view class="ipt-mobile">
					<input type="text" v-model="phone" placeholder="请输入手机号" />
				</view>
				<view class="ipt-code">
					<input type="text" value="" placeholder="请输入手机验证码" />
					<view class="get-code" @tap="getSmsCode()" v-if="!countDown"> 获取验证码 </view>
				</view>
				<view class="font" @click="confirmapple">
					确认绑定
				</view>
			</div>
		</div> -->
		<!-- 性别弹框 -->
		<div class="maskgender" v-show="isLoad">
			<div class="content fadeInUp">
				<div class="list" @tap="showckeck(1)">
					<text>男</text>
					<i class="icon icon-check" v-show="check===1"></i>
				</div>
				<div class="list" @tap="showckeck(2)">
					<text>女</text>
					<i class="icon icon-check" v-show="check===2"></i>
				</div>
				<view class="genderconfir" @tap="confirmsex()">
					确认
				</view>
			</div>
		</div>
		<div class="maskmodify" v-show="isModify">
			<div class="modifybox">
				<view class="modifycon">
					<input type="text" value="" v-model="filter" placeholder="请输入修改的昵称" class="ipt" />
					<view class="affirm" @tap="confirmmodify()">
						确认
					</view>
				</view>
			</div>
		</div>
	</view>
</template>

<script>
	import userApi from "@/api/userApi.js";
	export default {
		data() {
			return {
				sexArr:[
					'未设置',
					'男',
					'女'
				],
				isModify: false,
				isShow: false,
				check: 0,
				checks: false,
				isLoad: false,
				date: '',
				filter: "888",
			};
		},
		methods: {
			//出现修改昵称弹框
			modify: function() {
				this.isModify = true;
			},
			//修改用户性别接口
			confirmsex: function() {
				this.isLoad = false
				console.log(this.check,'check');
				if (this.check === 0) {
					uni.showToast({
						title: "请选择性别",
						icon: "none"
					});
					return
				}
				this.editUserInfo()

			},
			//修改用户昵称接口
			confirmmodify: function() {
				this.isModify = false
				if (!this.filter) {
					uni.showToast({
						title: "昵称不能为空",
						icon: "none"
					});
					return
				}
				this.editUserInfo()
					
			},
			//用户接口
			editUserInfo: function() {
				userApi
					.changeUserInfo({
						nickName: this.filter,
						sex: this.check,
						headerUrl: 3,
					}).then((res) => {
					})
			},

			showckeck: function(type) {
				this.check = type;
			},
			//点击性别出现的弹框
			climask: function() {
				this.isLoad = true;
			},
			cancel: function() {
				this.isShow = false;
			},
			confirmapple: function() {

			},
			appearmask: function() {
				this.isShow = true;
			},
			getDate: function(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			}
		}
	}
</script>

<style lang="scss">
	@import "/libs/animate.css";

	page {
		background-color: $color-page;
	}

	.list-main {
		width: 96%;
		margin: 24rpx auto;
		background-color: #fff;
		border-radius: 14rpx;

		.list {
			@include flexVtCenter;
			position: relative;
			width: 100%;
			height: 110rpx;
			padding: 0 22rpx;
			transition: all 0.1s;

			.tit {
				font-size: 30rpx;
				color: $color-text1;
			}

			.right {
				@include flexVtCenter;
				display: flex;
				margin-left: auto;

				.text1 {
					font-size: 30rpx;
					color: $color-text1;
				}

				.text2 {
					font-size: 30rpx;
					color: $color-text3;
				}
			}

			.icon-to {
				font-size: 28rpx;
				line-height: 28rpx;
				color: $color-text3;
				margin-left: 24rpx;
			}

			.picker {
				position: absolute;
				width: 100%;
				height: 100%;
				top: 0;
				left: 0;
			}

			.hr {
				@include absLvCenter;
				bottom: 0;
				width: 96%;
				height: 1px;
				background-color: #efefef;
			}

			&:active {
				background-color: $color-page;

				.hr {
					opacity: 0;
				}
			}

		}

		.avatar-view {
			height: 160rpx;

			.img-view {
				width: 116rpx;
				height: 116rpx;
				margin-left: auto;
				border-radius: 50%;
			}
		}
	}

	.mask {
		@include mask;

		.content {
			width: 80%;
			height: 380rpx;
			background: #ffffff;
			border-radius: 10rpx;
			margin-top: 40rpx;
			position: absolute;
			top: 40%;
			transform: translate(14%, -36%);

			.ipt-mobile {
				width: 90%;
				height: 108rpx;
				margin: 10rpx auto;
				border-bottom: solid 1px #EEEEEE;
				line-height: 140rpx;

				input {
					width: 100%;
					height: 100%;
					font-size: 30rpx;
					letter-spacing: 2rpx;
					font-weight: lighter;
				}
			}

			.ipt-code {
				width: 90%;
				height: 102rpx;
				margin: 0 auto;
				line-height: 102rpx;
				position: relative;
				border-bottom: solid 1px #EEEEEE;

				input {
					width: 100%;
					height: 100%;
					font-size: 30rpx;
					letter-spacing: 2rpx;
					font-weight: lighter;

				}

				.get-code {
					width: 180rpx;
					height: 60rpx;
					border: solid 1rpx #50e1b8;
					text-align: center;
					line-height: 60rpx;
					font-size: 20rpx;
					color: $color-text2;
					letter-spacing: 2rpx;
					font-weight: lighter;
					border-radius: 40rpx;
					position: absolute;
					right: 10rpx;
					bottom: 22rpx;
				}
			}
		}

		.font {
			width: 60%;
			height: 72rpx;
			text-align: center;
			line-height: 72rpx;
			letter-spacing: 6rpx;
			font-size: 28rpx;
			color: #FFFFFF;
			background: #50e1b8;
			margin: 40rpx auto;
			border-radius: 10rpx;
		}
	}

	.maskgender {
		@include mask;

		.content {
			width: 80%;
			background: #ffffff;
			border-radius: 14rpx;
			position: absolute;
			top: 26%;
			left: 50%;
			transform: translateX(-50%);
			padding: 0 24rpx;

			.list {
				@include flexVtCenter;
				width: 100%;
				height: 120rpx;
				justify-content: space-between;
				border-bottom: solid 1rpx #EEEEEE;
				align-items: center;

				.icon {
					color: #50e1b8;
				}
			}

			.genderconfir {
				width: 90%;
				height: 80rpx;
				background: #50e1b8;
				margin: 60rpx auto;
				border-radius: 20rpx;
				text-align: center;
				line-height: 80rpx;
				color: #ffffff;
				letter-spacing: 4rpx;
			}
		}
	}

	.maskmodify {
		@include mask;

		.modifybox {
			width: 80%;
			background: #ffffff;
			height: 286rpx;
			border-radius: 14rpx;
			position: absolute;
			top: 20%;
			left: 50%;
			transform: translateX(-50%);
			padding: 0 24rpx;
			display: flex;
			align-items: center;

			.modifycon {
				width: 100%;
				height: 168rpx;

				.ipt {
					width: 90%;
					height: 65rpx;
					margin: 0 auto;
					border-bottom: solid 1rpx #EEEEEE;
					font-size: 28rpx;
					letter-spacing: 2rpx;
				}

				.affirm {
					width: 90%;
					height: 60rpx;
					background: #50e1b8;
					margin: 60rpx auto;
					border-radius: 20rpx;
					text-align: center;
					line-height: 60rpx;
					color: #ffffff;
					letter-spacing: 4rpx;
				}
			}
		}
	}
</style>
