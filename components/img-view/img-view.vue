<template>
  <view class="img-view-main">
    <image class="img" :src="src" :mode="mode"></image>
  </view>
</template>

<script>
export default {
  props: {
    src: String,
    mode: {
      type: String,
      default: "",
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
