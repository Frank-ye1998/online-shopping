import store from "@/store";
//购物车所需参数 key
const keyList = ['specsValues', 'badgeImg', 'buyLimit', 'canBookingMsg', 'price', 'width',
	'height', 'isBooking', 'isGift', 'isInvoice', 'isPresale', 'isPromotion',
	'length', 'markDiscount', 'markNew', 'minimumOrderQuantity', 'originPrice',
	'presaleDeliveryDateDisplay', 'price', 'roughWeight', 'salePointMsg', 'saleUnit', 'smallImage', 'vipPrice'
];

function createCartRequestData(skuInfo, quantity) {
	let shippingData = {};
	let itemsObj = {};
	//items 数据生成
	itemsObj.quantity = quantity;
	itemsObj.skuCode = skuInfo.code;
	itemsObj.skuId = skuInfo.spuId;
	itemsObj.skuName = skuInfo.name;
	itemsObj.spuType = 1;
	keyList.forEach(key => {
		itemsObj[key] = skuInfo[key];
	});


	//shippingData 数据生成
	if (store.getters.$receivingMethod) { //外送
		let currentAddress = store.getters.$currentAddress; //当前收货地址
		let storeInfo = store.getters.$storeList.find(item => { //当前收货地址所属门店信息
			return item.code == currentAddress.storeId
		})
		shippingData.storeCode = currentAddress.storeId;
		shippingData.storeName = storeInfo.name;
		shippingData.cityName = currentAddress.cityName;
		shippingData.cityCode = currentAddress.cityId;
	} else { //自取
		//当前自取门店
		let currentStore = store.getters.$currentStore;
		shippingData.storeCode = currentStore.code;
		shippingData.storeName = currentStore.name
		shippingData.cityName = currentStore.cityName;
		shippingData.cityCode = currentStore.cityId;
	}
	shippingData.item = itemsObj;

	return shippingData
}
export {
	createCartRequestData
}
