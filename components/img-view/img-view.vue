<template>
  <view class="img-view-main">
    <image v-if="!isErr" lazy-load="true" @error="imgErr" class="img" :src="src" :mode="mode"></image>
	<text v-else class="img">加载失败</text>
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
    return {
		isErr:false
	};
  },
  methods:{
	  imgErr:function(){
		  this.isErr = true;
	  }
  }
};
</script>

<style lang="scss" scoped>
.img-view-main {
  position: relative;
  overflow: hidden;
  .img {
    @include absCenter;
    width: 100%;
	font-size: 20rpx;
	color: $color-text3;
  }
}
</style>
