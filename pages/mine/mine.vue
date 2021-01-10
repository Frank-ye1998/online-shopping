<template>
  <view>
    <view class="user-top">
      <view class="avatar">
        <image src="/static/images/mine/avatar.jpg" mode="widthFix"></image>
      </view>
      <view class="phone">手机号：17696769527</view>
      <view class="right">
        <i class="icon icon-to"></i>
      </view>
    </view>
    <view class="top-bg"></view>

    <view class="list-order list">
      <view class="content">
        <i class="icon icon-order"></i>
        <view class="tit">我的订单</view>
        <i class="icon icon-to"></i>
      </view>
      <view class="btn-view">
        <view class="btn">
          <image
            src="/static/images/mine/mine-icon-1.png"
            class="icon-img"
          ></image>
          <view class="txt">待支付</view>
        </view>
		        <view class="btn">
          <image
            src="/static/images/mine/mine-icon-2.png"
            class="icon-img"
          ></image>
          <view class="txt">待收货</view>
        </view>
		        <view class="btn">
          <image
            src="/static/images/mine/mine-icon-3.png"
            class="icon-img"
          ></image>
          <view class="txt">售后/退款</view>
        </view>
      </view>
    </view>
    <view class="list">
      <view class="content">
        <i class="icon icon-coupon"></i>
        <view class="tit">优惠券</view>
        <i class="icon icon-to"></i>
      </view>
    </view>
    <view class="list">
      <view class="content">
        <i class="icon icon-address"></i>
        <view class="tit">收货地址</view>
        <i class="icon icon-to"></i>
      </view>
    </view>
    <view class="list">
      <view class="content">
        <i class="icon icon-vip-card"></i>
        <view class="tit">会员卡</view>
        <i class="icon icon-to"></i>
      </view>
    </view>
    <view class="list">
      <view class="content">
        <i style="font-size: 34rpx" class="icon icon-phone"></i>
        <view class="tit">联系客服</view>
        <text class="text">客服时间07:00-22:00</text>
        <i class="icon icon-to"></i>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      scrollTop: 0,
    };
  },
  onPageScroll(e) {
    this.scrollTop = e.scrollTop;
  },
};
</script>

<style lang="scss">
page {
  background-color: $color-page;
}

.user-top {
  @include flexVtCenter;
  width: 100%;
  height: 220rpx;
  background-color: $color-red;
  padding: 0 24rpx;
  color: #fff;

  .avatar {
    position: relative;
    width: 140rpx;
    height: 140rpx;
    overflow: hidden;
    border-radius: 50%;
    margin-right: 34rpx;

    image {
      @include absCenter;
      width: 100%;
      height: 100%;
    }
  }

  .right {
    margin-left: auto;
    font-size: 28rpx;
  }
}

.top-bg {
  width: 100%;
  height: 40rpx;
  background-color: $color-red;
}
.list {
  position: relative;
  width: 94%;
  background-color: #fff;
  border-radius: 8px;
  margin: 0 auto 20rpx;
  .content {
    @include flexVtCenter;
    width: 100%;
    height: 94rpx;
    padding: 0 26rpx;
    .tit {
      font-size: 32rpx;
      color: $color-text1;
      margin-left: 16rpx;
    }
    .icon:first-of-type {
      color: $color-red;
      font-size: 44rpx;
    }
    .icon:last-of-type {
      font-size: 34rpx;
      color: $color-text2;
      margin-left: auto;
    }

    .text {
      @include absVtCenter;
      font-size: 28rpx;
      color: $color-text3;
      margin-left: auto;
      right: 80rpx;
    }
  }
}

.list-order {
  height: 260rpx;
  margin-top: -40rpx;
}

.btn-view {
  @include flexVtCenter;
  width: 100%;
  justify-content: space-between;
  padding: 0 42rpx;
  .btn {
    display: flex;
    width: 160rpx;
	height: 160rpx;
	flex-flow: column;
	align-items: center;
	padding: 18rpx;
    .icon-img {
      width: 60rpx;
	  height: 60rpx;
	  margin-bottom: 12rpx;
    }
    .txt {
      width: 100%;
      font-size: 28rpx;
	  color: $color-text1;
	  text-align: center;
    }
  }
}
</style>
