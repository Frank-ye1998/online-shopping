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
            url: port+'/product/categoryProductList',
            method: 'get',
            data: data,
			isFrom:true
        }
        return xhr.request(params)
    },
    
	//商品详情
    findAttrProduct(data){
        const params = {
            url: port+'/product/findAttrProduct',
            method: 'get',
            data: data,
			isFrom:true
        }
        return xhr.request(params)
    },
    
}

export default productApi