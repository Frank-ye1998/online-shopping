import Vue from 'vue'
import App from './App'
import store from './store'

//请求器
import xhr from "./api/xhr.js";
Vue.prototype.$request = xhr.request;
//路由守卫
import {router,RouterMount} from './router/router.js'
Vue.use(router)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})

// #ifdef H5
RouterMount(app, router, '#app')
// #endif

// #ifndef H5
app.$mount(); //兼容小程序及app端
// #endif
