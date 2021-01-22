<template>
  <view class="swiper-page-main">
    <div class="top-order-type">
      <div @tap="current = index" :class="['type',index===topStatus?'top-selected':'']" v-for="(item,index) in tabList" :key="index">
        {{item.name}}
        <div class="hr"></div>
      </div>
    </div>
    <div class="top-order-type-plc"></div>
    <swiper class="swiper-view" @change="swiperChange" :current="current" :duration="200">
      <swiper-item class="swiper-item" v-for="(item,index) in tabList" :key="item.id">
        <scroll-view @scrolltolower="item.toBottom(item.id)" class="item-content" scroll-y="true">
          <slot :name="`tab${index}`"></slot>
        </scroll-view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
/*
	swiper-page页面组件

	props参数：
		tabList:数组，每个数组元素为{ name: "全部",id: "tab0",toBottom: this.getList,}格式的对象
		name为tab标签名称;id必须是 任意命名+当前索引的形式;toBottom为当前列表触底回调方法
		
	父级页面需使用和tab数量一样的插槽，插槽命名为tabList中的id
*/

export default {
  props: {
    tabList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      current: 0,
      topStatus: 0,
    };
  },
  methods: {
    swiperChange: function (e) {
      this.topStatus = e.detail.current;
    },
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
  top: calc(var(--status-bar-height) + 82rpx);
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
      display: none;
      @include absLvCenter;
      bottom: 0;
      width: 50%;
      height: 2px;
      background-color: $color-green;
    }
  }
}

.top-selected {
  color: $color-green !important;
  .hr {
    display: block !important;
  }
}

.top-order-type-plc {
  width: 100%;
  height: 88rpx;
}

.swiper-view {
  width: 100%;
  height: calc(100vh - 88rpx - 82rpx - var(--status-bar-height));

  .swiper-item {
    width: 100%;
    height: 100%;

    .item-content {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
