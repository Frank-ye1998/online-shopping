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
					<view v-if="locationData.baseAddress">{{locationData.baseAddress}}</view>
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
			<!-- 			<view class="input-list">
				<view class="tit">
					默认地址
				</view>
				<switch class="switch" @change="defaultChange" :checked="isSelect" color="#08BF30" />
			</view> -->
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
		setAddressByDistance
	} from "@/utils/tool.js";
	import {
		appMixin
	} from "@/utils/mixin";
	export default {
		mixins: [appMixin],
		data() {
			return {
				pageTitle: '', //页面标题
				address: {}, //当前地址
				isEdit: false, //页面模式
				isSelect: false, //默认地址按钮
				locationData: {}, //地址选择结果
				isResetCurrentAddress: false //是否重设收货地址(修改当前收货地址时为true)
			};
		},
		methods: {
			//保存地址
			savaAddress: function() {
				let addressData = this.getRequestData();
				if (!addressData) return;
				uni.showLoading({
					mask: true
				})
				if (this.isEdit) {
					userApi.editAddress(addressData).then(res => {
						if (res.successCode === '00') {
							this.requestSuccess(res.data);
						}
					})
				} else {
					userApi.addAddress(addressData).then(res => {
						if (res.successCode === '00') {
							this.requestSuccess(res.data);
						}
					})
				}
			},
			//删除地址
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
								setAddressByDistance();
								setTimeout(() => {
									this.$Router.back(1)
								}, 1200)
							})
						}
					}
				})
			},
			//生成保存地址所需参数&&表单校验
			getRequestData: function() {
				var status = false; //表单验证状态
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
							title: '请输入门牌号',
							icon: 'none'
						})
						status = true;
						break;
					case Boolean(this.locationData.cityName):
						uni.showToast({
							title: '请选择地址',
							icon: 'none'
						})
						status = true;
						break;
				}
				if (status) return false;
				let addressData = Object.assign({
					id: this.address.id,
					consignName: this.address.name,
					consignTel: this.address.tel,
					detailAddress: this.address.detailAddress,
					postcode: '000000',
					isDefault: this.isSelect,
				}, this.locationData);
				return addressData;
			},
			//保存地址成功处理
			requestSuccess: function(res) {
				if (this.address.isSelect) { //判断是否处于选择地址状态
					this.setCurrentAddress(res).then(() => {
						uni.hideLoading();
						this.$Router.back(2);
					})
				} else {
					uni.hideLoading();
					uni.showToast({
						title: this.isEdit ? "修改成功" : "添加成功",
						mask: true,
						duration: 1200
					})
					//刷新当前收货地址
					if (this.isResetCurrentAddress) {
						this.setCurrentAddress(res);
					}
					setTimeout(() => {
						this.$Router.back(1)
					}, 1200)
				};
				setAddressByDistance(); //刷新地址列表
			},
			//默认地址change
			defaultChange: function(e) {
				this.isSelect = e.detail.value;
			},
			//跳转到地图页面
			toMap: function() {
				this.$Router.push({
					name: 'addressSelection'
				})
			}
		},
		onLoad() {
			//获取页面参数
			this.address = this.$Route.query;
			console.log(this.address);
			//设置当前页面模式
			if (this.address.name) {
				this.pageTitle = "编辑地址"
				this.isEdit = true;
				//提取locationData
				this.locationData = {
					baseAddress: this.address.address,
					provinceName: this.address.provinceName,
					cityName: this.address.cityName,
					countyName: this.address.countyName,
					provinceId: this.address.provinceId,
					cityId: this.address.cityId,
					countyId: this.address.countyId,
					lng: this.address.lng,
					lat: this.address.lat,
					storeId: this.address.storeId
				}
				//判断此地址是否为当前收货地址
				if (this.address.id === this.$currentAddress.id) {
					console.log("修改当前收货地址");
					this.isResetCurrentAddress = true;
				}
			} else {
				this.pageTitle = "新增地址"
			}
			//设置默认地址是否默认开启
			if (!this.$addressList.withDefault && !this.address.name) { //当前无默认地址&&新增模式
				this.isSelect = true;
			} else {
				this.isSelect = this.address.isDefault || false;
			}
			//监听地图位置选择结果
			uni.$on('locationSelected', (mapRes, nearbyStore) => {
				//提取locationData(地址选择结果)
				this.locationData = {
					baseAddress: mapRes.address + mapRes.title,
					provinceName: mapRes.ad_info.province,
					cityName: mapRes.ad_info.city,
					countyName: mapRes.ad_info.district,
					provinceId: String(mapRes.ad_info.adcode).substring(0, 2) + '0000',
					cityId: String(mapRes.ad_info.adcode).substring(0, 4) + '00',
					countyId: String(mapRes.ad_info.adcode),
					lng: mapRes.location.lng,
					lat: mapRes.location.lat,
					storeId: nearbyStore.code
				}
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
