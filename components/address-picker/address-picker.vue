<template>
  <view class="address-picker-main" @tap="emitClose">
    <div class="picker-view" @tap.stop="">
      <div class="title">
        请选择所在地区
        <i @tap="emitClose" class="icon icon-close"></i>
      </div>
      <div class="level-bar">
        <div @tap="levelTap('province_list')" class="province level-sub">
          {{provinceName||'请选择'}}
          <div v-show="level==='province_list'" class="selected-hr"></div>
        </div>
        <div v-show="level==='city_list'||level==='county_list'" @tap="levelTap('city_list')" class="city level-sub">
          {{cityName||'请选择'}}
          <div v-show="level==='city_list'" class="selected-hr"></div>
        </div>
        <!-- <div v-show="level==='county_list'" @tap="levelTap('county_list')" class="county level-sub">
          <div class="selected-hr"></div>
          {{countyName||'请选择'}}
        </div> -->
      </div>
      <scroll-view v-show="level === 'province_list'" scroll-y="true" class="city-list">
        <div class="list-sub" v-for="(sub,idx) in area.province_list" @tap="pickerTap('province_list',sub,idx)" :key="idx">
          <text>{{sub}}</text>
          <i v-if="provinceName === sub" class="icon icon-check"></i>
        </div>
      </scroll-view>
      <scroll-view v-show="level === 'city_list'" scroll-y="true" class="city-list">
        <div class="list-sub" v-for="(sub,idx) in cityList" @tap="pickerTap('city_list',sub,idx)" :key="idx">
          <text>{{sub}}</text>
          <i v-if="cityName === sub" class="icon icon-check"></i>
        </div>
      </scroll-view>

      <!-- <scroll-view v-show="level === 'county_list'" scroll-y="true" class="city-list">
        <div class="list-sub" v-for="(sub,idx) in countyList" @tap="pickerTap('county_list',sub,idx)" :key="idx">
          <text>{{sub}}</text>
          <i v-if="countyName === sub" class="icon icon-check"></i>
        </div>
      </scroll-view> -->
    </div>
  </view>
</template>

<script>
//县级选择暂不需要 注释
import area from "@/libs/area";
export default {
  data() {
    return {
      area: {},
      level: "province_list",
      code: Object.keys(area.province_list)[0],
      cityList: {},
      countyList: {},
      provinceName: "",
      cityName: "",
      countyName: "",
    };
  },

  methods: {
    levelTap: function (level) {
      this.level = level;
      if (level === "province_list") {
        this.cityName = "";
        this.countyName = "";
        this.cityList = {};
        this.countyList = {};
      } else if (level === "city_list") {
        this.countyName = "";
        this.countyList = {};
      }
    },

    pickerTap: function (index, sub, idx) {
      this.code = idx;
      if (index === "province_list") {
        this.getCityList();
        this.level = "city_list";
        this.provinceName = sub;
      } else if (index === "city_list") {
        // this.getCountyList();
        // this.level = "county_list";
        this.cityName = sub;
        uni.$emit("citySelected", { adcode: idx, city: sub });
        setTimeout(() => {
          this.emitClose();
        }, 240);
      } else if (index === "county_list") {
        // this.countyName = sub;
        // uni.$emit("citySelected", { adcode: idx, city: sub });
        // setTimeout(() => {
        //   this.emitClose();
        // }, 240);
      }
    },

    //获取市列表
    getCityList: function () {
      if (this.code.substring(0, 2) === "00") return;
      let obj = {};
      let keyArr = Object.keys(this.area.city_list);
      keyArr.forEach((item) => {
        if (item.substring(0, 2) === this.code.substring(0, 2)) {
          obj[item] = this.area.city_list[item];
        }
      });
      this.cityList = obj;
    },
    //获取县列表
    getCountyList: function () {
      if (this.code.substring(2, 4) === "00") return;

      let obj = {};
      let keyArr = Object.keys(this.area.county_list);
      keyArr.forEach((item) => {
        if (item.substring(0, 4) === this.code.substring(0, 4)) {
          obj[item] = this.area.county_list[item];
        }
      });
      this.countyList = obj;
    },

    emitClose: function () {
      uni.$emit("addressPickerClose");
    },

    //地区编码提取
    getSubCode: function (level, str) {
      switch (level) {
        case "province_list":
          str = str.substring(0, 2);
          break;
        case "city_list":
          str = str.substring(2, 4);
          break;
        case "county_list":
          str = str.substring(4, 6);
          break;
      }
      return str;
    },
  },
  created() {
    this.area = area;
    this.getCityList();
  },
};
</script>

<style lang="scss">
.address-picker-main {
  @include mask;
}
.picker-view {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 900rpx;
  background-color: #fff;
  border-radius: 24rpx 24rpx 0 0;
  animation: show-picker 0.3s ease-out;
  animation-fill-mode: forwards;
  .title {
    position: relative;
    @include flexCenter;
    width: 100%;
    height: 88rpx;
    font-size: 32rpx;
    color: #000;
    font-weight: 700;
    border-bottom: 1px solid $color-page;
    .icon-close {
      @include flexCenter;
      position: absolute;
      top: 0;
      right: 3%;
      width: 80rpx;
      height: 100%;
      color: #000;
      font-weight: 700;
    }
  }
  .level-bar {
    display: flex;
    width: 100%;
    height: 78rpx;
    justify-content: flex-start;
    border-bottom: 1px solid $color-page;
    .level-sub {
      position: relative;
      @include flexCenter;
      height: 100%;
      padding: 0 32rpx;
      font-size: 28rpx;
      color: $color-text1;
      .selected-hr {
        @include absLvCenter;
        bottom: 0;
        width: calc(100% - 64rpx);
        height: 3px;
        border-radius: 3px;
        background-color: $color-green;
      }
    }
  }
  .city-list {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 734rpx;
    padding: 0 14rpx;
    .list-sub {
      position: relative;
      @include flexVtCenter;
      width: 100%;
      height: 78rpx;
      font-size: 28rpx;
      line-height: 28rpx;
      color: $color-text1;
      padding-left: 18rpx;
      border-bottom: 1px solid $color-page;
      .icon {
        @include absVtCenter;
        right: 8%;
        font-size: 32rpx;
        color: $color-green;
      }
    }
  }
}

@keyframes show-picker {
  0% {
    transform: translateY(100%);
  }

  100% {
    transform: translateY(0%);
  }
}
</style>
