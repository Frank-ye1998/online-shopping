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
		onShow() {
			/*
				页面管理规则：
				4个tab页面要一直保持打开状态，非特殊情况不要使用replace和replaceAll关闭Tab页面；
				page.json 中所有的页面都要命名name，所有路由跳转使用name跳转
				
				以下是路由常用方法：
			
				//跳转到某个页面(在当前页面栈上增加) name 是页面名称，query是需要传递的参数，不需要传参就不写query
				this.$Router.push({name:'xxx'},query:{xxx}); //下面的方法参数和这个相同
				
				//关闭当前页面然后跳转到某个页面
				this.$Router.replace();
				
				//关闭所有页面然后跳转到某个页面(也可跳转到tab页面)   (很少使用，这个方法会把tab页面也关掉，慎用)
				this.$Router.replaceAll();
				
				//跳转到tab页面，并关闭所有其他非tab页面  如果要跳转到tab页面，只能使用这个方法，不要使用其他方法(replaceAll除外)
				this.$Router.pushTab();
				
				//n是数值型，这个方法作用是在页面记录中后退多少步
				this.$Router.back(n);
				
				//获取当前页面的query参数
				this.$Route.query;
			*/
		},
		onLoad() {

		},
		methods: {},
	};
</script>

<style lang="scss">
	.btn {
		width: 750rpx;
		height: 100rpx;
		border: 2px solid #000;
	}
</style>
