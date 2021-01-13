<script>
import Vue from "vue";
export default {
  onLaunch: function () {
    Vue.prototype.sessionId = uni.getStorageSync("sessionId");
    Vue.prototype.userId = uni.getStorageSync("userId");
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style>
/*全局样式*/
@import url("./static/css/global.scss");
/*字体图标*/
@import url("./static/fonts/iconfont.css");
</style>
