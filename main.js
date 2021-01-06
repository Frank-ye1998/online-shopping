import Vue from 'vue'
import App from './App'
//请求器
import xhr from "./api/xhr.js";
Vue.prototype.$request = xhr.request;


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
