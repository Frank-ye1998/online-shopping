//请求器
import xhr from "@/api/xhr.js";

const userApi = {
    //发送验证码
    sendCode(data){
        const params = {
            url: '/user/sendCode',
            method: 'get',
            data: data,
            isFrom:true
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
    
}

export default userApi