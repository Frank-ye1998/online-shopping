<template>
  <view class="img-view-main">
    <image class="img" :src="src" :mode="mode"></image>
  </view>
</template>

<script>
/*
  图片自适应组件
*/
export default {
  props: {
    src: String,
    mode: {
      type: String,
      default: "scaleToFill",
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
