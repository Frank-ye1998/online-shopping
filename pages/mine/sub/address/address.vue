<template>
	<view>
		<top-bar class="toptxt">我的收货地址</top-bar>
		<view class="noData" v-show="shippingAddress.length<1">
			<image src="../../../../static/images/mine/noData.jpeg" mode="" class="noImage"></image>
			<text class="tip">还没有地址，快去添加吧~</text>
		</view>
		<view class="isData" v-model="chosenAddressIndex">
			<form @submit="onAdd()">
				<!-- 遍历查询地址接口内的地址列表 -->
				<view class="wrap">
					<view class="address">
						徐汇日月光
					</view>
					<!-- 为了让名字和电话在一行显示再包一个view -->
					<view class="aa"> 
						<view class="name">
							Frank
						</view>
						<text class="phone">
							15000661359
						</text>
						<view class="pic">
							<i class="icon icon-edit" @tap="onEdit()"></i>
						</view>
						
					</view>
				</view>
				<button form-type="submit" class="add">新增收货地址</button>
			</form>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				chosenAddressIndex: 1,
				shippingAddress: [],
				addressId: '',
				addressIndex: ''
			};
		},
		methods: {
			onAdd() {
				this.$router.push({ path: '/pages/mine/sub/makeAddress/makeAddress' });
			},
			onEdit(item){
			    uni.navigateTo({
			        url: '/pages/mine/sub/makeAddress/makeAddress?id=15000661359&name=uniapp&address=sssssss'
			    });
			}
		}
	}
</script>

<style lang="scss">
	.toptxt {
		color: $color-text1;
	}

	.noImage {
		display: flex;
		margin-left: 48rpx;
	}
	.tip{
		margin-left: 120rpx;
	}
	.wrap{
		margin-left: 40rpx;
		margin-top: 20rpx;
	}
	.address {
		color: $color-text1;
	}

	.name {
		color: $color-text2;
		margin-right: 20rpx;
	}

	.phone {
		color: $color-text2;
		display: inline-block;
	}
	.pic{
		margin-left: 330rpx;
	}
	.aa {
		display: flex;
		flex-direction: row;
	}

	.add {
		margin-top: 530rpx;
		@include btnRed
	}
</style>
