<template>
  <view class="img-view-main">
    <image class="img" :src="src" :mode="mode"></image>
  </view>
</template>

<script>
/*
  图片自适应组件 防止图片显示溢出||宽高比异常
  传入参数见props
*/
export default {
  props: {
    src: {
      type: String,
      required: true
    },
    mode: {
      type: String,
      default: "widthFix",
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.img-view-main {
  position: relative;
  overflow: hidden;
  .img {
    @include absCenter;
    width: 100%;
  }
}
</style>
