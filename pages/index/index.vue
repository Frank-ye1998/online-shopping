<template>
  <view class="index-main">
    <warp-bar></warp-bar>
    <view class="img-vip">
      <image
        src="../../static/images/home/VIP.jpg"
        mode=""
        class="gvip"
      ></image>
    </view>
    <view class="food-img">
      <view class="food-top">
        <view class="query">
          <!-- <image src="../../static/images/tabBar/tabA-true.png" mode=""></image> -->
          <text>营养早餐</text>
        </view>
        <view class="query">
          <!-- <image src="../../static/images/tabBar/tabA-true.png" mode=""></image> -->
          <text>营养早餐</text>
        </view>
        <view class="query">
          <!-- <image src="../../static/images/tabBar/tabA-true.png" mode=""></image> -->
          <text>营养早餐</text>
        </view>
        <view class="query">
          <!-- <image src="../../static/images/tabBar/tabA-true.png" mode=""></image> -->
          <text>营养早餐</text>
        </view>
        <view class="query">
          <!-- <image src="../../static/images/tabBar/tabA-true.png" mode=""></image> -->
          <text>营养早餐</text>
        </view>
      </view>
      <view class="food-boot">
        <view class="query">
          <!-- <image src="../../static/images/tabBar/tabA-true.png" mode=""></image> -->
          <text>营养早餐</text>
        </view>
        <view class="query">
          <!-- <image src="../../static/images/tabBar/tabA-true.png" mode=""></image> -->
          <text>营养早餐</text>
        </view>
        <view class="query">
          <!-- <image src="../../static/images/tabBar/tabA-true.png" mode=""></image> -->
          <text>营养早餐</text>
        </view>
        <view class="query">
          <!-- <image src="../../static/images/tabBar/tabA-true.png" mode=""></image> -->
          <text>营养早餐</text>
        </view>
        <view class="query">
          <!-- <image src="../../static/images/tabBar/tabA-true.png" mode=""></image> -->
          <text>营养早餐</text>
        </view>
      </view>
    </view>
    <view class="vip-save">
      <image
        src="../../static/images/home/VIP.jpg"
        mode=""
        class="save-img"
      ></image>
    </view>
    <view class="limited">
      <view class="lim-title">
        <view title="" class="lim">限时抢购</view>
        <TS-TimeOut></TS-TimeOut>
        <text class="more">更多</text>
      </view>
      <view class="limit-content">
        <view class="limt-query">
          <image
            src="../../static/images/home/food.jpg"
            mode=""
            class="limit-food"
          ></image>
          <text>现磨豆浆</text>
          <view class="pri">
            <text>￥3</text>
            <button type="default" class="btn-car"></button>
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
          <view
            v-for="(item, index) in arr"
            :key="index"
            :class="[
              'cli-font',
              index === arrStatus ? 'content-top-select' : '',
            ]"
            @tap="getItem(index)"
            >{{ item.name }}</view
          >
        </view>
      </view>
    </view>
	<h1>测试</h1>
  </view>
</template>

<script>
import userApi from "@/api/userApi.js";
import topBar from "@/components/top-bar/top-bar.vue";
import warpBar from "@/components/warp-bar/warp-bar.vue";
// import TS-TimeOut from "@/components/TS-TimeOut/TS-TimeOut.vue";

export default {
  data() {
    return {
      arrStatus: 0,
      arr: [
        {
          name: "全部",
        },
        {
          name: "晚餐",
        },
        {
          name: "人气",
        },
        {
          name: "心选",
        },
      ],
    };
  },
  methods: {
    getItem(index) {
      console.log(index);
      //this.arrStatus = index
    },
  },
  onShow() {
    /*
				页面管理规则：
				4个tab页面要一直保持打开状态，非特殊情况不要使用replace和replaceAll关闭Tab页面；
				page.json 中所有的页面都要命名name，所有路由跳转使用name跳转
				
				以下是路由常用方法：
			
				//跳转到某个页面(在当前页面栈上增加) name 是页面名称，query是需要传递的参数，不需要传参就不写query
				this.$Router.push({name:'xxx'},query:{xxx}); //下面的方法参数和这个相同
				
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
  onLoad() {}
};
</script>

<style lang="scss">
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
  width: 100%;
  height: 400rpx;

  .food-top {
    width: 100%;
    height: 200rpx;
    text-align: center;
    line-height: 250rpx;
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    .query {
      width: 20%;
      height: 200rpx;
      font-size: 14px;
    }
  }

  .food-boot {
    width: 100%;
    height: 200rpx;
    text-align: center;
    line-height: 230rpx;
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    .query {
      width: 20%;
      height: 200rpx;
      font-size: 14px;
    }
  }
}

.vip-save {
  width: 100%;
  height: 70rpx;

  .save-img {
    width: 100%;
    height: 70rpx;
  }
}

.limited {
  width: 100%;
  height: auto;
  margin-top: 60rpx;

  .lim-title {
    width: 90%;
    height: 60rpx;
    line-height: 60rpx;
    padding-left: 30rpx;
    border-left: solid 5px #3cb963;
    font-size: 40rpx;
    display: flex;
    flex-direction: row;

    .more {
      font-size: 15rpx;
      margin-left: 220rpx;
      color: #3cb963;
    }
  }

  .limit-content {
    width: 100%;
    height: auto;
    margin-left: 50rpx;
    margin-top: 50rpx;

    .limt-query {
      width: 40%;
      height: auto;

      .limit-food {
        width: 100%;
        height: 200rpx;
        margin-top: 10rpx;
      }

      .pri {
        width: 100%;
        height: 50rpx;
        display: flex;
        flex-direction: row;
        margin-top: 30rpx;

        .btn-car {
          width: 50rpx;
          height: 50rpx;
          background: #3cb963;
          margin-left: 180rpx;
          border-radius: 50%;
        }
      }
    }
  }
}

.recommed {
  width: 100%;
  height: auto;

  .recom-title {
    width: 90%;
    height: 60rpx;
    line-height: 60rpx;
    padding-left: 30rpx;
    border-left: solid 5px $color-green;
    font-size: 40rpx;
  }

  //content-top
  .recom-content {
    width: 100%;
    height: auto;

    .content-top {
      width: 100%;
      height: 70rpx;
      display: flex;
      flex-direction: row;
      text-align: center;
      justify-content: space-around;
      line-height: 70rpx;
      color: $color-text3;
      .cli-font {
        width: 25%;
      }
    }
    .content-top-select {
      color: $color-green;
      border-bottom: solid 2px $color-green;
    }
  }
}
</style>
