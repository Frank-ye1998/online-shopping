<template>
	<view>
		<top-bar :pageTitle="pageTitle"></top-bar>
		<view class="wrap">
			<view class="box1">
				<view class="title">收货人</view>
				<input type="text" value="" placeholder="请输入收货人的姓名" v-model="name" class="rece-name" />
			</view>
			<view class="box1">
				<view class="cell">手机号</view>
				<input type="text" value="" placeholder="请填写收货人的手机号" v-model="tel" class="cell2" />
			</view>
			<view class="box1">
				<view class="rece">收货地址</view>
				<input type="text" value="" placeholder="点击选择收货地址" v-model="base" @tap="gotoMap()" class="receive" />
				<i class="icon icon-to"></i>
			</view>
			<view class="box1">
				<view class="detailAddress">详细地址</view>
				<input type="text" value="" placeholder="详细地址" v-model="detail" class="detail" />
			</view>
			<view class="box1">
				<view class="postCode">邮政编码</view>
				<input type="text" value="" placeholder="请输入邮政编码" v-model="post" class="detail" />
			</view>
			<view class="box1">
				<view class="def">
					设为默认地址
				</view>
				<label class="radio">
					<radio :checked="checked" @tap="onClick" class="radio" color="#C02D2E" />默认</label>
			</view>
			<view class="save" @tap="onSave()">保存并使用</view>
			<view class="delete" @tap="onDelete()" v-show="this.$Route.query.item">删除地址</view>
		</view>
	</view>
</template>

<script>
	import userApi from "@/api/userApi.js"
	export default {
		created() {
			uni.$on('locationSelected', (data) => {
				this.base = data.address;
				this.adInfo = data.ad_info
				this.provinceName = this.adInfo.province
				this.cityName = this.adInfo.city
				this.countyName = this.adInfo.district
				this.lat = data.location.lat
				this.lng = data.location.lng
				this.code = this.adInfo.adcode
				var n = this.code.substr(0,2)
				var m = this.code.substr(0,4)
				this.provinceId = n+"0000"
				this.cityId = m+"00"
				
			})
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			let receive = this.$Route.query.item; //打印出上个页面传递的参数。
			if (receive) {
				this.pageTitle = "编辑地址"
				this.addressId = receive.id
				this.name = receive.name
				this.tel = receive.tel
				this.base = receive.address
				this.detail = receive.detailAddress
				this.post = receive.postcode
				this.checkId = receive.creator
				this.checked = receive.isDefault
			}

		},
		data() {
			return {
				pageTitle: "添加地址",
				checked: false,
				checkId: 0,
				name: '',
				tel: '',
				base: '',
				detail: '',
				post: '',
				addressId: '',
				mapLocation: '',
				
				adInfo:[],
				provinceName:'',
				cityName: '',
				countyName: '',
				provinceId:'',
				cityId: '',
				countyId: '',
				storeId: '',
				lng: '',
				lat: '',
				code:''
			};
		},
		methods: {
			gotoMap() {
				// 前往地图
				this.$Router.push({
					name: 'addressSelection'
				})
			},
			onSave() {
				if (this.checkId !== 0) {
					// 上一层有传参数，代表是编辑页面，调用编辑地址接口
					userApi
						.editAddress({
							id: this.addressId,
							consignName: this.name,
							consignTel: this.tel,
							baseAddress: this.base,
							detailAddress: this.detail,
							postcode: this.post,
							isDefault: 1,
							provinceName: this.provinceName,
							cityName: this.cityName,
							countyName: this.countyName,
							provinceId: this.provinceId,
							cityId: this.cityId,
							countyId: this.code,
							storeId: 96000,
							lng: this.lng,
							lat: this.lat
						})
				} else {
					// 否则调添加地址接口
					userApi
						.addAddress({
							consignName: this.name,
							consignTel: this.tel,
							baseAddress: this.base,
							detailAddress: this.detail,
							postcode: this.post,
							isDefault: this.checked,
							provinceName: this.provinceName,
							cityName: this.cityName,
							countyName: this.countyName,
							provinceId: this.provinceId,
							cityId: this.cityId,
							countyId: this.code,
							storeId: 96000,
							lng: this.lng,
							lat: this.lat
						})

				}
				this.$router.push({
					name: 'address'
				})
			},
			// 删除地址接口
			onDelete() {
				uni.showLoading({
					title: "请稍等",
					mask: true,
				});
				//调用删除地址接口
				userApi
					.deleteAddress({
						id: this.$Route.query.item.id
					})
				uni.showToast({
					title: "删除成功",
					icon: "none",
				});
				this.$Router.push({
					name: 'address'
				})
			},
			onClick() {
				this.checked = !this.checked
				this.changeDefault()
			},
			changeDefault(value) {
				if ((this.checked = true)) {
					this.isDefault = 1; //1为默认地址
					// 此处调用修改默认地址接口
					userApi
						.changeDefaultAddress({
							id: this.$Route.query.item.id
						})
				} else {
					this.isDefault = 0;
				}
			},

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

	.title,
	.rece,
	.cell,
	.detailAddress,
	.postCode {
		font-size: 38rpx;
		text-align: left;
	}

	.detail,
	.receive,
	.rece-name,
	.cell2,
	.post {
		height: 100%;
		margin-left: 75rpx;
	}

	.def {
		font-size: 38rpx;
		margin-right: 200rpx;
	}

	.radio {
		margin-left: 75rpx;
	}

	.save {
		height: 90rpx;
		width: 620rpx;
		@include btnRed margin-left: 60rpx;
	}

	.delete {
		height: 90rpx;
		width: 620rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #fff;
		background-color: #808080;
		margin-left: 60rpx;
		margin-top: 30rpx
	}
</style>
