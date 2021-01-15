<template>
  <view>
    <view class="user-top">
      <div class="top-content">
        <view class="avatar">
          <image src="/static/images/mine/avatar.jpg" mode="widthFix"></image>
        </view>
        <view class="phone" v-if="this.token==null" @tap="goto('mobileLogin')">点击登录</view>
        <view class="phone" v-else @tap="goDetail()">手机号：{{this.userInfo.cellPhone}}</view>
        <view class="right">
          <i class="icon icon-to"></i>
        </view>
      </div>
      <div class="top-background"></div>

    </view>

    <view class="list-order list">
      <view class="content" @tap="goto('myOrder')">
        <i class="icon icon-order"></i>
        <view class="tit">我的订单</view>
        <i class="icon icon-to"></i>
      </view>
      <view class="btn-view">
        <view class="btn">
          <image src="/static/images/mine/mine-icon-1.png" class="icon-img"></image>
          <view class="txt">待支付</view>
        </view>
        <view class="btn">
          <image src="/static/images/mine/mine-icon-2.png" class="icon-img"></image>
          <view class="txt">待收货</view>
        </view>
        <view class="btn">
          <image src="/static/images/mine/mine-icon-3.png" class="icon-img"></image>
          <view class="txt">售后/退款</view>
        </view>
      </view>
    </view>
    <view class="list">
      <view class="content" @tap="goto('coupon')">
        <i class="icon icon-coupon"></i>
        <view class="tit">优惠券</view>
        <i class="icon icon-to"></i>
      </view>
    </view>
    <view class="list">
      <view class="content" @tap="goto('address')">
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
import userApi from "@/api/userApi.js";
export default {
  data() {
    return {
      scrollTop: 0,
      userInfo: [],
      token: "",
    };
  },

  methods: {
    toLogin: function () {
      this.$Router.push({ name: "mobileLogin" });
    },
    goto(name) {
      this.$router.push({ name });
    },
    goDetail() {
      let obj = this.userInfo;
      this.$Router.push({ name: "userCenter", params: { obj } });
    },
    getSessionId() {},
  },
  onLoad() {
    userApi.getUserInfo().then((res) => {
      this.userInfo = res.data;
      console.log(this.userInfo);
    });
  },
};
</script>

<style lang="scss">
page {
  background-color: $color-page;
}

.user-top {
   position: relative;
  .top-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(left, #01d79a 0%, #0dcf37 100%);
    opacity: 0.68;
  }
  .top-content {
    position: relative;
    z-index: 10;
    @include flexVtCenter;
    width: 100%;
    height: 260rpx;
    padding: 0 24rpx;
    color: #fff;
    padding-bottom: 40rpx;
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
      color: $color-green;
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
  margin-top: -48rpx;
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
