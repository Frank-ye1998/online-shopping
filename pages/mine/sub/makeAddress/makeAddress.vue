<template>
	<view>
		<top-bar :pageTitle="pageTitle"></top-bar>
		<view class="main">
			<view class="input-list">
				<view class="tit">
					联系人
				</view>
				<input v-model="address.name" placeholder-class="plc" placeholder="请输入联系人姓名" class="input" maxlength="8" type="text" />
			</view>
			<view class="input-list">
				<view class="tit">
					手机号
				</view>
				<input v-model="address.tel" placeholder-class="plc" placeholder="请输入手机号" class="input" type="number" maxlength="11" />
			</view>
			<view class="input-list">
				<view class="tit">
					地址
				</view>
				<view class="location-view" @tap="toMap()">
					<view v-if="address.address">{{address.address}}</view>
					<view v-else-if="address.map">{{address.map.address}}</view>
					<view v-else class="plc">点击选择地址</view>
				</view>
				<view class="icon icon-to"></view>
			</view>
			<view class="input-list">
				<view class="tit">
					门牌号
				</view>
				<input v-model="address.detailAddress" placeholder-class="plc" placeholder="请输入门牌号" class="input" type="text" />
			</view>
			<view class="input-list">
				<view class="tit">
					默认地址
				</view>
				<switch class="switch" @change="defaultChange" :checked="isSelect" color="#08BF30" />
			</view>
		</view>

		<view class="bottom-btns">
			<view class="btn delete" @tap="deleteAddress()">
				删除
			</view>
			<view class="btn save" @tap="savaAddress()">
				保存
			</view>
		</view>
		<view class="bottom-btns-plc"></view>
	</view>
</template>

<script>
	import userApi from "@/api/userApi.js";
	import {
		appMixin
	} from "@/utils/mixin";
	export default {
		mixins: [appMixin],
		data() {
			return {
				pageTitle: '',
				address: {},
				isEdit: false,
				isSelect: false
			};
		},
		methods: {
			defaultChange: function(e) {
				this.isSelect = e.detail.value;
			},
			savaAddress: function() {
				let obj = this.getRequestData();
				obj.storeId = 96531;
				uni.showLoading({
					mask: true
				})
				if (this.isEdit) {
					userApi.editAddress(obj).then(res => {
						if (res.successCode === '00') {
							this.requestSuccess();
						}
					})
				} else {
					userApi.addAddress(obj).then(res => {
						if (res.successCode === '00') {
							this.requestSuccess();
						}
					})
				}
			},

			requestSuccess: function() {
				uni.hideLoading();
				uni.showToast({
					title: this.isEdit ? "修改成功" : "添加成功",
					mask: true,
					duration: 1200
				})
				uni.$emit('addressChange')
				setTimeout(() => {
					this.$Router.back(1)
				}, 1200)
			},

			deleteAddress: function() {
				uni.showModal({
					title: "确定要删除此地址吗",
					showCancel: true,
					success: res => {
						if (res.confirm) {
							uni.showLoading({
								mask: true
							});
							userApi.deleteAddress({
								id: this.address.id
							}).then(res => {
								uni.hideLoading();
								uni.showToast({
									title: "删除成功",
									mask: true,
									duration: 1200
								})
								uni.$emit('addressChange')
								setTimeout(() => {
									this.$Router.back(1)
								}, 1200)
							})
						}
					}
				})
			},
			toMap: function() {
				this.$Router.push({
					name: 'addressSelection'
				})
			},
			getRequestData: function() {
				var status = false;
				switch (false) {
					case Boolean(this.address.name):
						uni.showToast({
							title: '请输入姓名',
							icon: 'none'
						})
						status = true;
						break;
					case Boolean(this.address.tel):
						uni.showToast({
							title: '请输入手机号',
							icon: 'none'
						})
						status = true;
						break;
					case Boolean(this.address.detailAddress):
						uni.showToast({
							title: '请输入详细地址',
							icon: 'none'
						})
						status = true;
						break;
				}
				if (status) return;
				let obj;
				if (this.isEdit) {
					obj = {
						id: this.address.id,
						consignName: this.address.name,
						consignTel: this.address.tel,
						detailAddress: this.address.detailAddress,
						postcode: '000000',
						isDefault: this.isSelect,
						baseAddress: this.address.map ?
							`${this.address.map.ad_info.province} ${this.address.map.ad_info.city} ${this.address.map.ad_info.district}` :
							`${this.address.provinceName} ${this.address.cityName} ${this.address.countyName}`,
						provinceName: this.address.map ? this.address.map.ad_info.province : this.address.provinceName,
						cityName: this.address.map ? this.address.map.ad_info.city : this.address.cityName,
						countyName: this.address.map ? this.address.map.ad_info.district : this.address.countyName,
						provinceId: this.address.map ? (this.address.map.ad_info.adcode.subString(0, 2) + '0000') : this.address.provinceId,
						cityId: this.address.map ? (this.address.map.ad_info.adcode.subString(0, 4) + '00') : this.address.cityId,
						countyId: this.address.map ? this.address.map.ad_info.adcode : this.address.countyId,
						lng: this.address.map ? this.address.map.location.lng : this.address.lng,
						lat: this.address.map ? this.address.map.location.lat : this.address.lat,
						storeId: this.address.storeId,
					}
				} else {
					if (!this.address.map) {
						uni.showToast({
							title: '请选择地区',
							icon: 'none'
						})
						return
					}
					obj = {
						consignName: this.address.name,
						consignTel: this.address.tel,
						detailAddress: this.address.detailAddress,
						postcode: '000000',
						isDefault: this.isSelect,
						baseAddress: `${this.address.map.ad_info.province} ${this.address.map.ad_info.city} ${this.address.map.ad_info.district}`,
						provinceName: this.address.map.ad_info.province,
						cityName: this.address.map.ad_info.city,
						countyName: this.address.map.ad_info.district,
						provinceId: this.address.map.ad_info.adcode.substring(0, 2) + '0000',
						cityId: this.address.map.ad_info.adcode.substring(0, 4) + '00',
						countyId: this.address.map.ad_info.adcode,
						lng: this.address.map.location.lng,
						lat: this.address.map.location.lat,
						storeId: this.address.storeId
					}
				}
				return obj;
			}
		},
		onLoad() {
			this.address = this.$Route.query;
			if (!this.$userAddress.withDefault && !this.address.name) {
				this.isSelect = true;
			} else {
				this.isSelect = this.address.isDefault;
			}
			if (this.address.name) {
				this.pageTitle = "编辑地址"
				this.isEdit = true;
			} else {
				this.pageTitle = "新增地址"
			}
			uni.$on('locationSelected', res => {
				this.$set(this.address, 'map', res);
			})
		},
	}
</script>

<style lang="scss">
	page {
		background-color: $color-page;
	}

	.main {
		width: 96%;
		margin: 0 auto;
		background-color: #fff;
		padding: 0 18rpx;
		border-radius: 14rpx;
		margin: 16rpx auto;

		.input-list {
			@include flexVtCenter;
			width: 100%;
			height: 106rpx;
			border-bottom: 1px solid #f0f0f0;

			&:last-child {
				border: none;
			}

			.tit {
				width: 140rpx;
				font-size: 30rpx;
				color: $color-text2;
			}

			.input {
				width: 68%;
				height: 100%;
				font-size: 30rpx;
				color: $color-text0;
			}

			.plc {
				color: $color-text3;
			}

			.location-view {
				@include flexVtCenter;
				width: 68%;
				height: 100%;
				font-size: 28rpx;
				line-height: 28rpx;
				color: $color-text0;
				overflow-x: scroll;
				white-space: nowrap;
			}

			.icon {
				margin-left: auto;
				font-size: 28rpx;
				color: $color-text2;
			}

			.switch {
				margin-left: auto;
				transform: scale(0.86);
			}
		}
	}

	.bottom-btns {
		@include flexVtCenter;
		position: fixed;
		bottom: 24rpx;
		left: 0;
		width: 100%;
		height: 110rpx;
		justify-content: space-around;
		padding: 0 24rpx;

		.btn {
			@include btn;
			width: 47%;
			height: 90rpx;
			border-radius: 999px;
			color: $color-text2;
		}

		.delete {
			background-color: #fff;
		}

		.save {
			background-color: $color-green;
			color: #fff;
		}
	}

	.bottom-btns-plc {
		width: 100%;
		height: 130rpx;
	}
</style>
