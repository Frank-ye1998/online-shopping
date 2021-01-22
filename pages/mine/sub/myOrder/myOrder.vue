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
	import orderApi from "@/api/orderApi.js"
	export default {
		data() {
			return {
				active: 0,
				recNum: 0,
				itemsTitle: [{
						"name": "全部"
					},
					{
						"name": "待支付"
					},
					{
						"name": "已支付"
					},
					{
						"name": "待收货"
					}
				],
				orderList: [],
				needPay: [],
				alreadyPay: [],
				needReceive: [],
				allList: [],
			}
		},
		onLoad() {
			this.getOrderInfo()
		},
		methods: {
			gotoDetail(id) {
				this.$store.orderId = id
				this.$Router.push({
					name: 'orderDetail'
				})	
			},
			getOrderInfo() {
				orderApi
					.findOrder({
						orderStatus: ""
					})
					.then((res) => {
						this.allList = res.data
					})
			},
			fz(e) {
				// 通过点击自定义组件，获取index值，根据index值调用订单信息接口
				// 订单状态(订单状态:1-待支付 2-已支付 3-待收货 不传就是全部订单 )
				this.recNum = e
				if (this.recNum == 1) {
					orderApi.findOrder({
							orderStatus: this.recNum
						})
						.then((res) => {
							this.needPay = res.data
						})
				} else if (this.recNum == 2) {
					orderApi.findOrder({
							orderStatus: this.recNum
						})
						.then((res) => {
							this.alreadyPay = res.data
						})
				} else if (this.recNum == 3) {
					orderApi.findOrder({
							orderStatus: this.recNum
						})
						.then((res) => {
							this.needReceive = res.data
						})
				} else if (this.recNum == 0) {
					orderApi.findOrder({
							orderStatus: ""
						})
						.then((res) => {
							this.allList = res.data
						})
				}
				console.log(this.recNum)
			},
		},
		computed: {
			lengthCount() {
				return Object.keys(this.needReceive).length;
			},
			allLength() {
				return Object.keys(this.allList).length;
			},
			payLength() {
				return Object.keys(this.needPay).length;
			},
			alreadyLength() {
				return Object.keys(this.alreadyPay).length;
			}
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
