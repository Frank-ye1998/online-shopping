<template>
  <view class="index-main">
    <top-bar pageTitle="首页"></top-bar>
	<warp-bar></warp-bar>
  </view>
</template>

<script>
import userApi from "@/api/userApi.js";
import topBar from "@/components/top-bar/top-bar.vue";
import warpBar from "@/components/warp-bar/warp-bar.vue"
export default {
  data() {
    return {};
  },
  onLoad() {
    // //请求示例
    // userApi
    //   .sendCode({
    //     cellPhone: 17696769555,
    //     pageCode: "REGISTER_PAGE",
    //   })
    //   .then((res) => {
    //     console.log(res);
    //   });
  },
  methods: {},
};
</script>

<style>
</style>
