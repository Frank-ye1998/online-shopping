<template>
  <view>
    <top-bar pageTitle="我的订单"></top-bar>

    <swiper-page :tabList="tabList">
      <template #tab0>
        <div class="list" v-for="item in listA" :key="item.id">
          <div class="top">
            <div class="order-type">
              外卖
            </div>
            <div class="address">
              徐汇日月光 8楼802
            </div>
            <div class="order-status">
              已完成
            </div>
          </div>
          <div class="content">
            <img-view class="img-view" src="/static/images/home/shop-2.png"></img-view>
            <div class="name">大草莓一箱</div>
            <div class="num">x 1</div>
          </div>
          <div class="order-info">
            <div class="time">2021-01-21 20:44</div>
            <div class="price">
              共1件商品 合计：¥ 99.88
            </div>
          </div>
        </div>

      </template>
      <template #tab1>
        <div class="list">
          <div class="list" v-for="item in testList" :key="item">
            <div class="top">
              <div class="order-type">
                外卖
              </div>
              <div class="address">
                徐汇日月光 8楼802
              </div>
              <div class="order-status">
                已完成
              </div>
            </div>
            <div class="content">
              <img-view class="img-view" src="/static/images/home/shop-2.png"></img-view>
              <div class="name">大西瓜一箱</div>
              <div class="num">x 1</div>
            </div>
            <div class="order-info">
              <div class="time">2021-01-21 20:44</div>
              <div class="price">
                共1件商品 合计：¥ 99.88
              </div>
            </div>
          </div>
        </div>
      </template>
      <template #tab2>
        <div class="list">
          C
        </div>
      </template>
      <template #tab3>
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
				//swiper-page 组件tab参数
				tabList: [{
						name: "全部",
						id: "tab0",
						toBottom: this.getList,
					},
					{
						name: "待支付",
						id: "tab1",
						toBottom: this.getList,
					},
					{
						name: "待收货",
						toBottom: this.getList,
					},
					{
						name: "售后/退款",
						toBottom: this.getList,
					},
				],
				isOnload: false, //页面加载标识
				timeAbs: 0, //接口节制
				listA: [], //tab对应列表
				listB: [], //……
				listC: [], //……
				listD: [], //……
				testList: [
					1,
					2,
					3,
					4,
					5,
					6,
					7,
					8,
					9,
					10,
					11,
					12,
					13,
					14,
					15,
					16,
					17,
					18,
					19,
					20,
				],
			};
		},
		methods: {
			//请求订单数据
			getList: function(type) {
				let now = new Date().getTime(); //当前时间
				if (this.isOnload && now - this.timeAbs < 1000) return; //接口节制
				this.timeAbs = new Date().getTime(); //更新节制时间
				console.log(type);
				switch (type) {
					case 'tab0':
						type = '';
						break;
					case 'tab1':
						type = 1;
						break;
					case 'tab2':
						type = 3;
						break;
					case 'tab3':
						type = 8;
						break;
				}
				orderApi
					.findOrder({
						orderStatus: type,
					})
					.then((res) => {
						console.log(res);
						switch (type) {
							case "":
								this.listA = res.data;
								break;
							case 1:
								this.listB = res.data;
								break;
							case 3:
								this.listC = res.data;
								break;
							case 8:
								this.listD = res.data;
								break;
						}
					});
			},
		},
		onLoad() {
			this.getList(""); //获取全部订单
			this.isOnload = true;
		},
	};
</script>

<style lang="scss">
page {
  background-color: $color-page;
}

.list {
  width: 96%;
  height: 320rpx;
  background-color: #fff;
  border-radius: 14rpx;
  margin: 20rpx auto;
  padding: 0 16rpx;

  .top {
    @include flexVtCenter;
    width: 100%;
    height: 84rpx;
    border-bottom: 1px solid #f1f1f1;

    .order-type {
      @include flexCenter;
      width: 88rpx;
      height: 40rpx;
      background-color: $color-green;
      border-radius: 4px;
      font-size: 26rpx;
      line-height: 26rpx;
      color: #fff;
      margin-right: 16rpx;
    }

    .address {
      width: 68%;
      font-size: 28rpx;
      color: $color-text0;
      @include ellipsis;
    }

    .order-status {
      margin-left: auto;
      font-size: 28rpx;
      color: $color-text2;
    }
  }

  .content {
    @include flexVtCenter;
    position: relative;
    width: 100%;
    height: 150rpx;

    .img-view {
      width: 110rpx;
      height: 110rpx;
      border-radius: 4px;
    }

    .name {
      font-size: 30rpx;
      color: $color-text0;
      font-weight: 700;
      margin-left: 18rpx;
    }

    .num {
      position: absolute;
      top: 8%;
      right: 0;
      font-size: 28rpx;
      color: $color-text2;
    }
  }

  .order-info {
    display: flex;
    width: 100%;
    justify-content: space-between;

    .time {
      font-size: 24rpx;
      color: $color-text2;
    }

    .price {
      font-size: 28rpx;
      color: $color-text0;
    }
  }
}
</style>
