//请求器
import xhr from "@/api/xhr.js";

const devApi = {
    //发送验证码
    getPhoneCaptcha(data){
        const params = {
            url: '/user/sendCode',
            method: 'get',
            data: data
        }
        return xhr.request(params)
    },
    //验证码登录
    smsLogin(data){
        const params = {
            url: '/user/loginCode',
            method: 'post',
            data: data
        }
        return xhr.request(params)
    },
    //注册
    phoneCaptchaLogin(data){
        const params = {
            url: '/user/register',
            method: 'post',
            data: data
        }
        return xhr.request(params)
    },
    //账号密码登录
    pwdLogin(data){
        const params = {
            url: '/user/login/pwd',
            method: 'post',
            data: data
        }
        return xhr.request(params)
    },
    //获取用户信息
    getUserInfo(){
        const params = {
            url: '/user',
            method: 'get'
        }
        return xhr.request(params)
    },
    //获取图形验证码
    getImgCaptcha(data){
        const params = {
            url: '/user/captcha',
            method: 'post',
            data:data
        }
        return xhr.request(params)
    },
    //退出登录
    logOutNow(){
        const params = {
            url: '/user/logout',
            method: 'get',
        }
        return xhr.request(params)
    },
    //查询地址
    findAddress() {
        const params = {
            url: '/userConsign',
            method: 'get'
        }
        return xhr.request(params)
    },
    //删除地址
    deleteAddress(data) {
        const params = {
            url: '/userConsign/del',
            method: 'post',
            data: data
        }
        return xhr.request(params)
    },
    //添加地址
    addAddress(data){
        const params = {
            url: '/userConsign',
            method: 'post',
            data: data
        }
        return xhr.request(params)
    },
    //修改地址
    editAddress(data){
        const params = {
            url: '/userConsign',
            method: 'put',
            data: data
        }
        return xhr.request(params)
    },
    //修改默认地址
    changeDefaultAddress(data){
        const params = {
            url: '/userConsign/changeDefaultAddress',
            method: 'post',
            data: data
        }
        return xhr.request(params)
    },
    //修改用户信息
    changeUserInfo(data){
        const params = {
            url: '/user',
            method: 'put',
            data: data
        }
        return xhr.request(params)
    },
    //查询类目下所有商品
    getCategoryData(data){
        const params = {
            url: '/product/categoryProductList?sendWay=${sendWay}',
            method: 'get',
            data: data
        }
        return xhr.request(params)
    },
    //查询购物车
    getCartInfo(){
        const params = {
            url: '/shopper',
            method: 'get',
        }
        return xhr.request(params)
    },
    //添加放购物车
    addCart(data){
        const params = {
            url: '/shopper',
            method: 'post',
            data: data
        }
        return xhr.request(params)
    },
    //清空购物车
    clearCartInfo(){
        const params = {
            url: '/shopper/clear',
            method: 'post',
        }
        return xhr.request(params)
    },
    //修改购物车
    changeCartInfo(data){
        const params = {
            url: '/shopper/change/num',
            method: 'post',
            data: data
        }
        return xhr.request(params)
    },
    //删除购物车
    deleteCartInfo(data){
        const params = {
            url: '/shopper/delete?skuCode=${skuCode}',
            method: 'post',
            data: data
        }
        return xhr.request(params)
    },
    //多规格商品弹窗界面
    goToGoodsDetail(data){
        const params = {
            url: '/product/findAttrProduct?id=${id}',
            method: 'get',
            data: data
        }
        return xhr.request(params)
    },
    //查询门店列表
    getStoreList(){
        const params = {
            url: '/order/store/list',
            method: 'get',
        }
        return xhr.request(params)
    },
    //提交订单
    postOrder(data){
        const params = {
            url: '/order',
            method: 'post',
            data: data
        }
        return xhr.request(params)
    },
    //查询所有订单
    findOrder(data){
        const params = {
            url: '/order?orderStatus=${orderStatus}',
            method: 'get',
            data: data
        }
        return xhr.request(params)
    },
    //查询订单详情
    findOrderDetail(data){
        const params = {
            url: '/order/detail?id=${id}',
            method: 'get',
            data: data
        }
        return xhr.request(params)
    }
}

export default devApi