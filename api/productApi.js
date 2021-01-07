//请求器
import xhr from "@/api/xhr.js";

const productApi = {
    
    //查询类目下所有商品
    getCategoryData(data){
        const params = {
            url: '/product/categoryProductList?sendWay=${sendWay}',
            method: 'get',
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
    
}

export default productApi