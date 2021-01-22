<template>
  <view>
    <top-bar pageTitle="确认订单"></top-bar>
    <div class="top">
      立即自取(约15:50可取)
    </div>
    <receiving-method class="receiving-method"></receiving-method>
    <div class="commodity-list view">
      <div class="tips">系统已为您选择最优折扣方案</div>
      <div class="list">
        <img-view class="list-img" src="../../../../static/images/home/shop-2.png"></img-view>
        <div class="info">
          <div class="text-1">
            大草莓
          </div>
          <div class="text-2">
            大/好大一个
          </div>
        </div>
        <div class="quantity">
          x 1
        </div>
        <div class="price-view">
          <div class="new-price">
            ¥ 66.88
          </div>
          <div class="old-price">
            ¥ 99.99
          </div>
        </div>
        <div class="discount-tips">
          会员优惠
        </div>
      </div>
      <div class="list">
        <img-view class="list-img" src="../../../../static/images/home/shop-2.png"></img-view>
        <div class="info">
          <div class="text-1">
            大草莓
          </div>
          <div class="text-2">
            大/好大一个
          </div>
        </div>
        <div class="quantity">
          x 1
        </div>
        <div class="price-view">
          <div class="new-price">
            ¥ 66.88
          </div>
          <div class="old-price">
            ¥ 99.99
          </div>
        </div>
        <div class="discount-tips">
          会员优惠
        </div>
      </div>
      <div class="all-price">
        <div class="text-1">
          小计
        </div>
        <div class="new-price">
          ¥122.88
        </div>
        <div class="old-price">
          ¥188.99
        </div>
      </div>
    </div>

    <div class="pay-type view">
      <div class="pay-list">
        <div class="tit">
          选择优惠
        </div>
        <div class="right">
          <div class="text is-true">
            1个可用
          </div>
          <i class="icon icon-to"></i>
        </div>
        <div class="hr"></div>
      </div>
      <div class="pay-list">
        <div class="tit">
          支付方式
        </div>
        <div class="right">
          <image class="wx-pay-img" src="/static/images/shopping-car/wx-pay.png"></image>
          <div class="text pay-text">
            微信支付
          </div>
          <i class="icon icon-to"></i>
        </div>
      </div>
    </div>
    <div class="remarks view">
      <div class="list">
        <div class="tit">
          备注特殊要求
        </div>
        <div class="right">
          <i class="icon icon-to"></i>
        </div>
      </div>
    </div>

    <div class="to-pay-btn">
      <div class="text-1">
        总价¥998 优惠¥666
      </div>
      <div class="text-2">
        实付¥332
      </div>
      <div class="pay-btn" @tap="submitOrder">
        去支付
      </div>
    </div>
    <div class="to-pay-btn-plc"></div>

  </view>
</template>

<script>
import wx from "weixin-js-sdk";//微信支付js-sdk
import sha1 from "sha1";
import shopperApi from "@/api/shopperApi.js";
import orderApi from "@/api/orderApi.js";
import weChatApi from "@/api/weChatApi.js";
import { getNonceStr } from "@/utils/tool.js";
import receivingMethod from "@/components/receiving-method/receiving-method.vue";
export default {
  components: {
    "receiving-method": receivingMethod,
  },
  data() {
    return {
      shoppingList: [],
    };
  },
  methods: {
    submitOrder: function () {
      const orderInfo = this.shoppingList;
      console.log(orderInfo);
      orderApi
        .postOrder({
          remark: "",
          orderType: "1",
          activityId: "",
          orderAmount: orderInfo.totalPrice,
          freightAmount: orderInfo.deliveryFee,
          activityAmount: orderInfo.totalPrice,
          consignId: "668752322609647616",
          isNeedInvoice: false,
          isStartOrdering: true,
          storeCode: 96531,
          storeName: "宝城路店",
          storeTel: "",
          storeAddress: "宝城路456号（靠近莘朱路）",
          couponCode: "",
          invoiceTitle: "",
          deskNo: "",
          tablewareAmount: "",
          plannedDeliverTime: new Date().getTime() + 3600000,
          paySource: 2,
        })
        .then((res) => {
          console.log(res);
          //let noncestr = getNonceStr();
          wx.chooseWXPay({
            timestamp:res.data.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
            nonceStr: res.data.noncestr, // 支付签名随机串，不长于 32 位
            package: `prepay_id=res.data.partnerid`, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
            signType: "SHA1", // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
            paySign: res.data.sign, // 支付签名
            success: (res) => {
              alert(JSON.stringify(res));
              // 支付成功后的回调函数
            },
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    toPay: function ({ orderNo, payAmount }) {
      orderApi
        .payOrder({
          orderNo: orderNo,
          payAmount: payAmount,
          payMethod: 2,
        })
        .then((res) => {
          console.log(res);
        });
    },
    getShoppingList: function () {
      shopperApi.getCartInfo().then((res) => {
        console.log('购物车列表',res);
        this.shoppingList = res.data;
      });
    },
    getStoreList: function () {
      orderApi.getStoreList().then((res) => {
        //console.log(res);
      });
    },
  },
  onLoad() {
    this.getShoppingList();
    this.getStoreList();

    //获取ticket
    weChatApi.getJsApiTicket().then((res) => {
      //微信JS-SDK初始化
      let time = parseInt(new Date().getTime() / 1000);
      let noncestr = getNonceStr();
      let str = `jsapi_ticket=${
        res.data
      }&noncestr=${noncestr}&timestamp=${time}&url=${
        location.href.split("#")[0]
      }`;
      let signature = sha1(str);

      wx.config({
        debug: false,
        appId: "wxc1bdb5fea6bc9e6d",
        timestamp: time,
        nonceStr: noncestr,
        signature: signature,
        jsApiList: [],
        openTagList: ["wx-open-launch-weapp","chooseWXPay"]//小程序跳转按钮、微信支付
      });

      wx.ready(() => {
        console.log('微信JS-SDK初始化成功');
      });
      wx.error((res) => {
        console.log('微信JS-SDK初始化失败',res);
      });
    });
  },
};
</script>

<style lang="scss">
page {
  background-color: $color-page;
}

.view {
  position: relative;
  width: 96%;
  margin: 0 auto;
  border-radius: 16rpx;
  padding: 0 18rpx;
  background-color: #fff;
}

.top {
  @include flexCenter;
  width: 100%;
  height: 140rpx;
  font-size: 36rpx;
  font-weight: 700;
  color: #000;
  letter-spacing: 1rpx;
}

.commodity-list {
  padding-top: 48rpx;
  margin-top: 18rpx;

  .tips {
    position: absolute;
    top: 0;
    right: 0;
    padding: 8rpx 8rpx 8rpx 34rpx;
    font-size: 20rpx;
    border-radius: 0 0 0 999rpx;
    background-color: #fff8f6;
    color: $color-red;
  }
  .list {
    position: relative;
    display: flex;
    width: 100%;
    height: 140rpx;
    padding: 6rpx 0;
    .list-img {
      width: 118rpx;
      height: 118rpx;
    }
    .info {
      color: $color-text0;
      margin: 14rpx 0 0 14rpx;
      .text-1 {
        font-size: 30rpx;
        line-height: 30rpx;
        margin-bottom: 20rpx;
      }
      .text-2 {
        font-size: 22rpx;
        color: $color-text1;
        line-height: 22rpx;
        font-weight: lighter;
      }
    }
    .quantity {
      position: absolute;
      top: 13rpx;
      left: 58%;
      font-size: 26rpx;
      color: $color-text4;
    }
    .price-view {
      @include flexVtCenter;
      height: 32rpx;
      margin: 12rpx 0 0 auto;
      .new-price {
        font-size: 28rpx;
        line-height: 28rpx;
        color: $color-red;
        font-weight: 700;
        margin-right: 8rpx;
      }
      .old-price {
        font-size: 20rpx;
        line-height: 20rpx;
        color: $color-text4;
        text-decoration: line-through;
      }
    }
    .discount-tips {
      position: absolute;
      right: 0rpx;
      bottom: 36rpx;
      padding: 6rpx;
      font-size: 20rpx;
      line-height: 20rpx;
      color: $color-red;
      border-radius: 3px;
      border: 1px solid $color-red-transparent;
    }
  }
  .all-price {
    @include flexVtCenter;
    justify-content: flex-end;
    width: 100%;
    height: 88rpx;
    border-top: 1px solid #e3e3e3;
    .text-1 {
      font-size: 26rpx;
      line-height: 26rpx;
      color: $color-text0;
      margin-right: 8rpx;
    }
    .new-price {
      font-size: 34rpx;
      line-height: 34rpx;
      color: $color-text0;
      font-weight: 700;
      margin-right: 6rpx;
    }
    .old-price {
      font-size: 22rpx;
      line-height: 22rpx;
      color: $color-text4;
      padding-top: 6rpx;
      text-decoration: line-through;
    }
  }
}
.pay-type,
.remarks {
  margin-top: 18rpx;
  .pay-list,
  .list {
    @include flexVtCenter;
    position: relative;
    width: 100%;
    height: 100rpx;
    .tit {
      font-size: 26rpx;
      line-height: 26rpx;
      color: $color-text1;
    }
    .right {
      @include flexVtCenter;
      margin-left: auto;
      font-size: 20rpx;
      line-height: 20rpx;

      .is-true {
        color: $color-red;
      }

      .icon {
        margin-left: 8rpx;
        font-size: 24rpx;
        line-height: 24rpx;
        padding-top: 2rpx;
        color: $color-text3;
      }
      .wx-pay-img {
        width: 48rpx;
        height: 48rpx;
        margin-right: 14rpx;
      }
      .pay-text {
        font-size: 28rpx;
      }
    }
    .hr {
      position: absolute;
      bottom: 0px;
      left: 0;
      width: 100%;
      height: 1rpx;
      background-color: #e3e3e3;
    }
  }
}

.remarks {
  margin-top: 18rpx;
}

.to-pay-btn {
  @include flexVtCenter;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 110rpx;
  background-color: #fff;
  padding: 0 32rpx;
  .text-1 {
    font-size: 24rpx;
    color: $color-text3;
  }
  .text-2 {
    font-size: 32rpx;
    font-weight: 700;
    color: $color-text0;
    margin-left: 12rpx;
  }
  .pay-btn {
    @include btn;
    width: 160rpx;
    height: 70rpx;
    background-color: $color-red;
    border-radius: 381rpx;
    margin-left: auto;
  }
}
</style>
