<template>
  <view>
    <div ref="map" class="map"></div>
    <div ref="point" class="gps-point">
      <div class="top"></div>
      <div class="center"></div>
      <div class="bottom"></div>
    </div>

    <address-picker />
  </view>
</template>

<script>
import config from "@/config.js";
import TencentMap from "tencent-map"; //地图组件
import AddressPicker from "@/components/address-picker/address-picker";
export default {
  components: {
    "address-picker": AddressPicker,
  },
  data() {
    return {};
  },
  methods: {
    //坐标逆解析
    getLocationByXy: function ({ lat, lng }) {
      this.$jsonp("https://apis.map.qq.com/ws/geocoder/v1/", {
        location: `${lat},${lng}`,
        key: config.tencentMapKey,
        get_poi: 1,
        output: "jsonp",
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          uni.showToast({
            title: "坐标解析失败",
            icon: "none",
          });
        });
    },
  },
  created() {
    //加载地图
    this.$nextTick(() => {
      setTimeout(() => {
        TencentMap.load(this.$refs.map, {
          mapKey: config.tencentMapKey,
        }).then(({ maps }) => {
          //获取当前定位
          const nowLatLng = new maps.LatLng(
            this.$location.lat,
            this.$location.lng
          );

          //当前定位逆解析
          this.getLocationByXy(this.$location);

          //地图初始化参数
          const myOptions = {
            zoom: 14,
            minZoom: 10,
            backgroundColor: "#a4ebc9",
            mapTypeControl: false,
            center: nowLatLng,
            zoomControl: true,
            mapTypeId: qq.maps.MapTypeId.ROADMAP,
          };
          //添加地图中心点
          let mapsDom = new maps.Map(TencentMap.elements, myOptions);
          mapsDom.controls[maps.ControlPosition.CENTER].push(this.$refs.point);

          //监听地图拖动
          maps.event.addListener(mapsDom, "center_changed", () => {
            //逆解析地图中心点坐标
            this.getLocationByXy(mapsDom.getCenter());
          });
        });
      }, 200);
    });
  },
};
</script>

<style lang="scss">
.map {
  width: 100%;
  height: 600rpx;
}

.gps-point {
  position: relative;
  .top {
    @include absLvCenter;
    top: 0;
    width: 48rpx;
    height: 48rpx;
    background-color: #f74344;
    border-radius: 50%;
  }
  .center {
    @include absLvCenter;
    top: 48rpx;
    width: 2px;
    height: 48rpx;
    background-color: #979697;
  }
  .bottom {
    @include absLvCenter;
    top: 88rpx;
    width: 20rpx;
    height: 8rpx;
    border-radius: 50%/50%;
    background-color: #5e5e5e;
  }
}
</style>
