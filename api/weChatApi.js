//请求器
import xhr from "@/api/xhr.js";

const weChatApi = {
    getJsApiTicket() {
        const params = {
            url: '/wechat/getJsApiTicket',
            method: 'get',
        }
        return xhr.request(params)
    },
    getAccessToken(){
        const params = {
            url: '/wechat/getAccessToken',
            method: 'get',
        }
        return xhr.request(params)
    }
}
export default weChatApi;