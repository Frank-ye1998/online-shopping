<template>
	<view>
		<top-bar :pageTitle="pageTitle"></top-bar>
		<view class="wrap">
			<view class="box1">
				<view class="title">收货人</view>
				<input type="text" value="" :placeholder="placeHolder" class="placeHolder" />
			</view>
			<view class="box1">
				<view class="cell">手机号</view>
				<input type="text" value="" :placeholder="phoneNum" class="cell2" />
			</view>
			<view class="box1">
				<view class="rece">收货地址</view>
				<input type="text" value="" :placeholder="baseAddress" @tap="gotoMap()" class="receive" />
				<i class="icon icon-to"></i>
			</view>
			<view class="box1">
				<view class="detailAddress">详细地址</view>
				<input type="text" value="" :placeholder="detailAddress" class="detail" />
			</view>
			<view class="box1">
				<view class="def">
					设为默认地址
				</view>
			    <label class="radio">
					<radio :checked="checked" @tap="onClick" class="radio" color= "#C02D2E"  />默认</label>
			</view>
			<view class="save" @tap="onSave()">保存并使用</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			// console.log(option.id); //打印出上个页面传递的参数。
			if (option.id) {
				this.pageTitle = "编辑地址"
				this.placeHolder = option.name
				this.phoneNum = option.id
				this.detailAddress = option.address
			}
		},
		data() {
			return {
				pageTitle: "添加地址",
				placeHolder: "请输入收货人的姓名",
				phoneNum: "请填写收货人的手机号",
				baseAddress: "点击选择收货地址",
				detailAddress: "详细地址",
				checked:false
			};
		},
		methods: {
			gotoMap() {
				// 前往地图
			},
			onSave() {
				//保存按钮调用添加或编辑地址接口 并返回地址列表
			},
			onClick(){
				this.checked = !this.checked
				// 调用修改默认地址接口
			}
		},
	}
</script>

<style lang="scss">
	.toptxt {
		color: $color-text1;
	}
	.box1 {
		height: 150rpx;
		@include flexCenter
	}
	.title,.rece,.cell,.detailAddress{
		font-size: 38rpx;
		text-align: left;
	}
	.detail,.receive,.placeHolder,.cell2 {
		height: 100%;
		margin-left: 75rpx;
	}
	.def{
		font-size: 38rpx;
		margin-right: 200rpx;
	}
	.radio{
		// height: 100%;
		margin-left: 75rpx;
		}
	.save {
		height: 90rpx;
		width: 620rpx;
		@include btnRed margin-left: 60rpx;
		margin-top: 120rpx;
	}
	
</style>
