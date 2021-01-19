<script>
import Vue from "vue";
import { appMixin } from "@/utils/mixin";
export default {
  mixins: [appMixin],
  watch:{
    loginKey(nv,ov){
      console.log(nv);
    }
  },
  onLaunch: function () {
    //获取用户设备信息
    uni.getSystemInfo({
      success: (info) => {
        this.setDeviceInfo(info);
      },
    });

    //获取登录缓存数据
    Vue.prototype.sessionId = uni.getStorageSync("sessionId");
    Vue.prototype.userId = uni.getStorageSync("userId");
    this.setLoginKey({
      sessionId: uni.getStorageSync("sessionId"),
      userId: uni.getStorageSync("userId"),
    });

    //获取定位
    uni.getLocation({
      type: "gcj02",
      success: (res) => {
        console.log("定位成功：", {
          lat: res.latitude,
          longitude: res.longitude,
        });
        Vue.prototype.$location = {
          lat: res.latitude,
          lng: res.longitude,
        };
      },
      fail: (err) => {
        console.log(err);
      },
    });
  },
  onShow: function () {},
  onHide: function () {},
};
</script>

<style>
/*全局样式*/
@import url("@/static/css/global.scss");
/*字体图标*/
@import url("@/static/fonts/iconfont.css");
</style>
