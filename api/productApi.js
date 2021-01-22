//请求器
import xhr from "@/api/xhr.js";

// #ifdef H5
const port = "";
// #endif
// #ifdef APP-PLUS
const port = ':9010';
// #endif

const productApi = {
    
    //查询类目下所有商品
    getCategoryData(data){
        const params = {
            url: port+'/product/categoryProductList?sendWay=${sendWay}',
            method: 'get',
            data: data,
			isFrom:true
        }
        return xhr.request(params)
    },
    
    //多规格商品弹窗界面
    goToGoodsDetail(data){
        const params = {
            url: port+'/product/findAttrProduct?id=${id}',
            method: 'get',
            data: data,
			isFrom:true
        }
        return xhr.request(params)
    },
    
}

export default productApi