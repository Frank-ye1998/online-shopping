import Vue from 'vue'
import App from './App'
import store from './store'

//请求器
import xhr from "./api/xhr.js"
Vue.prototype.$request = xhr.request

//路由守卫
import {
	router,
	RouterMount
} from '@/router/router.js'
Vue.use(router)

//JSONP
import {
	VueJsonp
} from 'vue-jsonp'
Vue.use(VueJsonp)

// #ifdef H5
//Vconsole
import Vconsole from 'vconsole'
let vConsole = new Vconsole()
Vue.use(vConsole)
// #endif


//全局组件
import imgView from '@/components/img-view/img-view.vue'
Vue.component('img-view', imgView)
import stepper from '@/components/stepper/stepper.vue'
Vue.component('stepper', stepper)


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
