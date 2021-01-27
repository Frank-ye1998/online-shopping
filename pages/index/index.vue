<template>
  <view class="index-main">
    <warp-bar class="warp-bar"></warp-bar>
    <view class="mation">
      <view class="mation-left">
        最快30分钟送达
      </view>
      <view class="mation-center">
        满30元免配送费
      </view>
      <view class="mation-right">
        安全食品
      </view>
    </view>
    <view class="food-img">
      <view class="font-query" v-for="(item,index) in mess" :key="index">
        <image :src="item.url" mode="widthFix" class="menu-img"></image>
        <view class="menu-font">{{item.msg}}</view>
      </view>
    </view>
    <view class="vip-save">
      <view class="vip-left">
        <view class="opening-vip">开通会员</view>
        <view class="year-vip">年费会员限时99元</view>
      </view>
      <view class="vip-right">
        立即开通
      </view>
    </view>
    <view class="limited">
      <view class="lim-title">
        <view class="lim">限时抢购</view>
        <view class="time-out">
          <i class="icon icon-time"></i>
          <view class="text">12:15:26</view>
        </view>
        <text class="more">更多></text>
      </view>
      <view class="limit-content">
        <view class="limt-query">
          <img-view class="limit-img" src="/static/images/home/shop-1.png"></img-view>
          <view class="name-food">JJJ级车厘子</view>
          <view class="pri">
            ￥16.2
            <view class="btn-car">
              <i class="icon icon-shopping-cart"></i>
            </view>
          </view>
        </view>
        <view class="limt-query">
          <img-view class="limit-img" src="/static/images/home/shop-1.png"></img-view>
          <view class="name-food">JJJ级车厘子</view>
          <view class="pri">
            ￥16.2
            <view class="btn-car">
              <i class="icon icon-shopping-cart"></i>
            </view>
          </view>
        </view>

      </view>
    </view>
    <view class="recommed">
      <view class="recom-title">
        <view title="" class="reco">人气推荐</view>
      </view>
      <view class="recom-content">
        <view class="content-top">
          <view v-for="(item,index) in arr" :key="index" :class="['cli-font']" @tap="getItem(index)">
            {{item.name}}
            <div v-show="index===arrStatus" class="select-hr"></div>
          </view>
        </view>
        <view class="content-bottom">
          <view v-for="(item,index) in shopArr[arrStatus]" :key="index" class="content-query">
            <view class="shop-img">
              <image :src="item.url" mode="widthFix" class="con-img"></image>
            </view>
            <text class="name-title">{{item.names}}</text>
            <view class="pri">
              <text class="price-t">￥{{item.price}}</text>
              <view class="btn-car">
					<i class="icon icon-shopping-cart"></i>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- <image src="../../static/images/home/back.png" mode=""></image> -->
  </view>
</template>

<script>
import userApi from "@/api/userApi.js";
import topBar from "@/components/top-bar/top-bar.vue";
import warpBar from "@/components/warp-bar/warp-bar.vue";
import imgView from "../../components/img-view/img-view.vue";
// import TS-TimeOut from "@/components/TS-TimeOut/TS-TimeOut.vue";

export default {
  components: { imgView },
  data() {
    return {
      shopArr: [
        [
          {
            names: "智利车厘子J级1盒450g",
            url: "../../static/images/home/shop-1.png",
            price: "16.2",
          },
          {
            names: "丹东红颜草莓1盒500g",
            url: "../../static/images/home/shop-2.png",
            price: "16.2",
          },
          {
            names: "智利车厘子J级1盒450g",
            url: "../../static/images/home/shop-1.png",
            price: "16.2",
          },
          {
            names: "丹东红颜草莓1盒500g",
            url: "../../static/images/home/shop-2.png",
            price: "16.2",
          },
        ],
        [
          {
            names: "智利车厘子J级2盒450g",
            url: "../../static/images/home/shop-1.png",
            price: "26.2",
          },
          {
            names: "丹东红颜草莓2盒500g",
            url: "../../static/images/home/shop-2.png",
            price: "26.2",
          },
          {
            names: "智利车厘子J级2盒450g",
            url: "../../static/images/home/shop-1.png",
            price: "26.2",
          },
          {
            names: "丹东红颜草莓2盒500g",
            url: "../../static/images/home/shop-2.png",
            price: "26.2",
          },
        ],
        [
          {
            names: "智利车厘子J级3盒450g",
            url: "../../static/images/home/shop-1.png",
            price: "36.2",
          },
          {
            names: "丹东红颜草莓3盒500g",
            url: "../../static/images/home/shop-2.png",
            price: "36.2",
          },
          {
            names: "智利车厘子J级3盒450g",
            url: "../../static/images/home/shop-1.png",
            price: "36.2",
          },
          {
            names: "丹东红颜草莓3盒500g",
            url: "../../static/images/home/shop-2.png",
            price: "36.2",
          },
        ],
        [
          {
            names: "智利车厘子J级4盒450g",
            url: "../../static/images/home/shop-1.png",
            price: "46.2",
          },
          {
            names: "丹东红颜草莓4盒500g",
            url: "../../static/images/home/shop-2.png",
            price: "46.2",
          },
          {
            names: "智利车厘子J级4盒450g",
            url: "../../static/images/home/shop-1.png",
            price: "46.2",
          },
          {
            names: "丹东红颜草莓4盒500g",
            url: "../../static/images/home/shop-2.png",
            price: "46.2",
          },
        ],
      ],
      mess: [
        {
          msg: "新鲜蔬菜",
          url: "../../static/images/home/1.png",
        },
        {
          msg: "时令水果",
          url: "../../static/images/home/2.png",
        },
        {
          msg: "海鲜水产",
          url: "../../static/images/home/3.png",
        },
        {
          msg: "肉禽蛋类",
          url: "../../static/images/home/4.png",
        },
        {
          msg: "米面粮油",
          url: "../../static/images/home/5.png",
        },
        {
          msg: "方便速食",
          url: "../../static/images/home/6.png",
        },
        {
          msg: "加工调理",
          url: "../../static/images/home/7.png",
        },
        {
          msg: "蛋品豆面",
          url: "../../static/images/home/8.png",
        },
        {
          msg: "酒水饮料",
          url: "../../static/images/home/9.png",
        },
        {
          msg: "厨房用品",
          url: "../../static/images/home/10.png",
        },
      ],
      arrStatus: 0,
      arr: [
        {
          name: "全部",
          id: 1,
        },
        {
          name: "晚餐",
          id: 2,
        },
        {
          name: "人气",
          id: 3,
        },
        {
          name: "心选",
          id: 4,
        },
      ],
      con: [{}],
    };
  },
  methods: {
    getItem(index) {
      console.log(index);
      this.arrStatus = index;
    },
  },
  onShow() {
    uni.setTabBarBadge({
      index: 2,
      text: "1",
    });
    /*
				页面管理规则：
				4个tab页面要一直保持打开状态，非特殊情况不要使用replace和replaceAll关闭Tab页面；
				page.json 中所有的页面都要命名name，所有路由跳转使用name跳转
				
				以下是路由常用方法：
			
				//跳转到某个页面(在当前页面栈上增加) name 是页面名称，query是需要传递的参数，不需要传参就不写query
				this.$Router.push({name:'xxx',query:{xxx}}); //下面的方法参数和这个相同
				
				//关闭当前页面然后跳转到某个页面
				this.$Router.replace();
				
				//关闭所有页面然后跳转到某个页面(也可跳转到tab页面)   (很少使用，这个方法会把tab页面也关掉，慎用)
				this.$Router.replaceAll();
				
				//跳转到tab页面，并关闭所有其他非tab页面  如果要跳转到tab页面，只能使用这个方法，不要使用其他方法(replaceAll除外)
				this.$Router.pushTab();
				
				//n是数值型，这个方法作用是在页面记录中后退多少步
				this.$Router.back(n);
				
				//获取当前页面的query参数
				this.$Route.query;
			*/
  },
  onLoad() {},
};
</script>

<style lang="scss">
page {
  background-color: $color-page;
}

.warp-bar {
  width: 92%;
  height: 300rpx;
  margin: auto;
  margin-top: 40rpx;
}

.mation {
  width: 78%;
  height: 70rpx;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  line-height: 90rpx;
  font-size: 22rpx;
  color: $color-text3;
}

.btn {
  width: 750rpx;
  height: 100rpx;
  border: 2px solid #000;
}

.img-vip {
  width: 100%;
  height: 100rpx;

  .gvip {
    width: 100%;
    height: 100rpx;
  }
}

.food-img {
  width: 92%;
  height: 410rpx;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  text-align: center;
  line-height: 200rpx;
  padding: 28rpx 0;
  background: #fff;
  margin: 20rpx auto;
  border-radius: 30rpx;

  .font-query {
    width: 98rpx;
    height: 196rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 34rpx;

    .menu-font {
      width: 98rpx;
      height: 24rpx;
      margin-top: -60rpx;
      font-size: 24rpx;
    }

    .menu-img {
      width: 98rpx;
      height: 98rpx;
    }
  }
}

.vip-save {
  width: 690rpx;
  height: 120rpx;
  background: url("../../static/images/home/back.png") top center no-repeat;
  background-size: 100% 100%;
  margin: 48rpx auto 44rpx;
  display: flex;
  flex-direction: row;
  position: relative;

  .vip-left {
    width: 250rpx;
    height: 120rpx;
    margin-left: 44rpx;

    .opening-vip {
      width: 130rpx;
      height: 32rpx;
      font-size: 32rpx;
      color: #ecc28d;
      margin-top: 21rpx;
    }

    .year-vip {
      width: 239rpx;
      height: 30rpx;
      font-size: 28rpx;
      color: #ecc28d;
      margin-top: 15rpx;
    }
  }

  .vip-right {
    width: 167.9rpx;
    height: 62rpx;
    background: #ecc38e;
    border-radius: 30.99rpx;
    position: absolute;
    right: 44rpx;
    top: 30rpx;
    font-size: 30rpx;
    text-align: center;
    line-height: 62rpx;
  }
}

.limited {
  width: 100%;

  .lim-title {
    @include flexVtCenter;
    flex-direction: row;
    position: relative;
    width: 100%;
    height: 44rpx;
    padding: 0 30rpx;
    .lim {
      font-size: 40rpx;
      line-height: 40rpx;
      color: $color-text1;
      font-weight: 700;
    }
    .time-out {
      @include flexCenter;
      width: 146rpx;
      height: 36rpx;
      background-color: $color-red;
      color: #fff;
      border-radius: 999px;
      margin-left: 16rpx;
      .icon {
        font-size: 28rpx;
        margin-right: 4rpx;
      }
      .text {
        font-size: 22rpx;
      }
    }

    .more {
      position: absolute;
      font-size: 24rpx;
      color: #999;
      right: 3.87%;
    }
  }

  .limit-content {
    display: flex;
    width: 92%;
    flex-flow: row wrap;
    justify-content: space-between;
    margin: 36rpx auto 0;
    background-color: #fff;
    border-radius: 30rpx;
    padding: 30rpx 28rpx 0;
    .limt-query {
      position: relative;
      width: 300rpx;
      height: 470rpx;
      overflow: hidden;
      background: #ffffff;
      padding-top: 12rpx;

      .limit-img {
        width: 100%;
        height: 280rpx;
      }

      .name-food {
        @include ellipsis2(2);
        font-size: 28rpx;
        line-height: 32rpx;
        margin-top: 20rpx;
        color: $color-text1;
      }

      .pri {
        position: relative;
        width: 100%;
        height: 34rpx;
        margin-top: 30rpx;
        color: $color-red;
        font-weight: 700;
      }

      .btn-car {
			@include flexCenter;
			position: absolute;
			bottom: -8rpx;
			right: 0;
			width: 50rpx;
			height: 50rpx;
			border-radius: 50%;
			@include btnGreen-gradient-top;
			.icon-shopping-cart {
				color: #fff;
				font-size: 36rpx;
				font-weight: lighter;
			}
		}
    }
  }
}

.recommed {
  width: 100%;
  margin-top: 44rpx;

  .recom-title {
    @include flexVtCenter;
    flex-direction: row;
    position: relative;
    width: 100%;
    height: 44rpx;
    padding: 0 30rpx;
    .reco {
      font-size: 40rpx;
      line-height: 40rpx;
      color: $color-text1;
      font-weight: 700;
    }
  }

  .recom-content {
    width: 100%;
    height: auto;
    margin: 30rpx 0;
    padding: 0 24rpx;
    .content-top {
      display: flex;
      width: 100%;
      height: 74rpx;
      flex-flow: row nowrap;
      justify-content: space-between;
      background-color: #fff;
      border-radius: 16rpx 16rpx 0 0;
      .cli-font {
        position: relative;
        @include flexCenter;
        flex: 1;
        font-size: 28rpx;
        color: $color-text1;
        .select-hr {
          @include absLvCenter;
          bottom: 0;
          width: 60rpx;
          height: 4px;
          border-radius: 999px;
          background-color: $color-green;
        }
      }
    }

    .content-bottom {
      display: flex;
      width: 100%;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
      background-color: #fff;
      .content-query {
        margin-top: 30rpx;
        width: 340rpx;
        height: 480rpx;
        overflow: hidden;
        background: #ffffff;
        border-radius: 20rpx;
        display: flex;
        flex-direction: column;
        .shop-img {
          // width: 185rpx;
          // height: 106rpx;
          // background: #00C130;
        }
        .con-img {
          width: 300rpx;
          margin-left: 5%;
          margin-top: 20rpx;
        }

        .name-title {
          width: 273rpx;
          font-size: 28rpx;
          height: 59rpx;
          padding-left: 30rpx;
          margin-top: 20rpx;
        }

        .pri {
          position: relative;
          display: flex;
          width: 100%;
          height: 80rpx;
          flex-direction: row;
          position: relative;
          line-height: 70rpx;
          align-items: center;
          padding-left: 10rpx;
          margin-top: 18rpx;
          .price-t {
            color: $color-red;
            width: 77rpx;
            height: 72rpx;
            font-weight: bold;
          }

          .btn-car {
            @include flexCenter;
            position: absolute;
            bottom: 12rpx;
            right: 18rpx;
            width: 50rpx;
            height: 50rpx;
            border-radius: 50%;
            color: #fff;
            @include btnGreen-gradient-top;
			.icon-shopping-cart{
              font-size: 36rpx;
              color: #fff;
			  font-weight: lighter;
            }
          }
        }
      }
    }
  }
}
</style>
