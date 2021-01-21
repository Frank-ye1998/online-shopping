<template>
  <view class="swiper-page-main">
    <div class="top-order-type">
      <div class="type" v-for="(item,index) in tabList" :key="index">
        {{item.name}}
        <div v-if="false" class="hr"></div>
      </div>
    </div>
    <div class="top-order-type-plc"></div>
    <swiper class="swiper-view" :current="current" :duration="200">
      <swiper-item class="swiper-item" v-for="(item,index) in tabList" :key="index+'swiper'">
        <scroll-view class="item-content" scroll-y="true">
          <slot :name="item.id"></slot>
        </scroll-view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
export default {
  props: {
    tabList: {
      type: Array,
      required: true
    },
  },
  data() {
    return {
      current: 0
    };
  },
  created() {

  },
};
</script>

<style lang="scss">
page {
  background-color: $color-page;
}
.top-order-type {
  display: flex;
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 88rpx;
  background-color: #fff;
  justify-content: space-around;
  .type {
    position: relative;
    @include flexCenter;
    flex: 1;
    font-size: 28rpx;
    color: $color-text1;
    .hr {
      @include absLvCenter;
      bottom: 0;
      width: 50%;
      height: 2px;
      background-color: $color-green;
    }
  }
}

.top-order-type-plc {
  width: 100%;
  height: 88rpx;
}
.swiper-view {
  width: 100%;
  height: calc(100vh - 88rpx - var(--status-bar-height));

  .swiper-item {
    width: 100%;
    height: 100%;
    .item-content {
      width: 100%;
      height: 100%;
    }
    .test {
      width: 100%;
      border: 1px solid #000;
    }
    .test1 {
      height: 500rpx;
    }
    .test2 {
      height: 2500rpx;
    }
    .test3 {
      height: 15500rpx;
    }
  }
}
</style>
