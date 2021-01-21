<template>
  <view>
    <swiper-page :tabList="tabList">
      <template #tabA>
        <div class="list" v-for="(item,index) in allList" :key="'tabA'+index">
          {{item.id}}
          <div class="top">
            <div class="order-type">

            </div>
            <div class="address">

            </div>
            <div class="order-status">

            </div>
          </div>
        </div>
      </template>
      <template #tabB>
        <div class="list">
          B
        </div>
      </template>
      <template #tabC>
        <div class="list">
          C
        </div>
      </template>
      <template #tabD>
        <div class="list">
          D
        </div>
      </template>
    </swiper-page>
  </view>
</template>

<script>
import swiperPage from "@/components/swiper-page/swiper-page";
import orderApi from "@/api/orderApi.js";

export default {
  components: {
    "swiper-page": swiperPage,
  },
  data() {
    return {
      tabList: [
        { name: "全部", id: "tabA" },
        { name: "待支付", id: "tabB" },
        { name: "待收货", id: "tabC" },
        { name: "售后/退款", id: "tabD" },
      ],
      allList: [],
    };
  },
  methods: {
    getList: function (type) {
      orderApi
        .findOrder({
          orderStatus: type,
        })
        .then((res) => {
          console.log(res);
          switch (type) {
            case "":
              this.allList = res.data;
              break;
          }
        });
    },
  },
  onLoad() {
    this.getList(""); //获取全部订单
  },
};
</script>

<style lang="scss">
.list {
  width: 96%;
  height: 340rpx;
  background-color: #fff;
  border-radius: 14rpx;
  margin: 20rpx auto;
  padding: 0 16rpx;
}
</style>
