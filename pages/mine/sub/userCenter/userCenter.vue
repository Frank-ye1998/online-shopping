<template>
  <view>
    <top-bar pageTitle="个人中心"></top-bar>
    <view class="footage">
      <view class="msg">头像</view>
      <view class="pic">1111</view>
      <i class="icon icon-to"></i>
    </view>
    <view class="nickName">
      <view class="msg">昵称</view>
      <input type="text" placeholder="输入昵称" v-model="name" class="nickname-input" />
      <i class="icon icon-to"></i>
    </view>
    <view class="sex">
      <view class="msg">性别</view>
      <picker @change="sexSelect1" :value="item.sex1" :range="sexList">
        <view class="picker">{{ sexList[item.sex1] ? sexList[item.sex1] : '请选择' }}</view>
      </picker>
      <i class="icon icon-to"></i>
    </view>
    <view class="birth">
      <view class="msg">生日</view>
      <!-- <view class="pic"></view> -->
      <view class="uni-list">
        <view class="uni-list-cell">
          <!-- <view class="uni-list-cell-left">
						当前选择
					</view> -->
          <view class="uni-list-cell-db">
            <picker mode="date" :value="date" @change="bindDateChange">
              <view class="uni-input">{{date}}</view>
            </picker>
          </view>
        </view>
      </view>
      <i class="icon icon-to"></i>
    </view>
    <view class="phone">
      <view class="msg">手机号</view>
      <view class="pic">{{this.tel}}</view>
      <i class="icon icon-to"></i>
    </view>
    <view class="change" @tap="change()">确认修改</view>
    <view class="save" @tap="logOut()">退出登录</view>
  </view>
</template>

<script>
import userApi from "@/api/userApi.js";
export default {
  data() {
    const currentDate = this.getDate({
      format: true,
    });
    return {
      infoList: [],
      tel: "",
      name: "",
      index: 0,
      date: currentDate,
      sexList: ["男", "女"],
      item: {
        sex1: 0,
        sex2: "F",
      },
    };
  },

  onLoad() {
    console.log(this.$Route.query.obj);
    this.infoList = this.$Route.query.obj;
    this.name = this.infoList.nickName;
    this.tel = this.infoList.cellPhone;
  },

  methods: {
    sexSelect1(e) {
      this.item.sex1 = e.detail.value;
    },
    bindDateChange: function (e) {
      this.date = e.target.value;
      console.log(this.date);
    },
    logOut() {
      // 退出登录
      userApi.logOutNow();
    },
    getDate(type) {
      const date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();

      if (type === "start") {
        year = year - 60;
      } else if (type === "end") {
        year = year + 2;
      }
      month = month > 9 ? month : "0" + month;
      day = day > 9 ? day : "0" + day;
      return `${year}-${month}-${day}`;
    },
    change() {
      userApi.changeUserInfo({
        headUrl: "",
        nickName: this.name,
        sex: this.item.sex1,
      });
      this.$Router.push({ name: "mine" });
    },
  },
};
</script>

<style lang="scss">
.footage,
.nickName,
.sex,
.birth,
.phone {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 38rpx;
  height: 100rpx;
  text-align: left;
  line-height: 100rpx;

  .msg {
    width: 80%;
    margin-left: 25rpx;
  }

  .pic {
    display: flex;
    flex-direction: row;
    font-size: 38rpx;
    height: 100rpx;
    text-align: left;
    line-height: 100rpx;
  }

  .icon-to {
    margin-right: 25rpx;
  }
}

.nickname-input {
  display: flex;
  flex-direction: row;
  font-size: 38rpx;
  height: 100rpx;
  width: 220rpx;
  text-align: left;
  line-height: 100rpx;
}

.uni-input {
  width: 220rpx;
}

.change {
  height: 90rpx;
  width: 620rpx;
  @include btnRed margin-left: 60rpx;
  margin-top: 60rpx;
}

.save {
  height: 90rpx;
  width: 620rpx;
  @include btnRed margin-left: 60rpx;
  margin-top: 60rpx;
}
</style>
