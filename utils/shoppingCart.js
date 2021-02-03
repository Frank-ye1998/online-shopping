import store from "@/store";
//购物车所需参数 key
const keyList = ['specsValues', 'badgeImg', 'buyLimit', 'canBookingMsg', 'price', 'width',
	'height', 'isBooking', 'isGift', 'isInvoice', 'isPresale', 'isPromotion',
	'length', 'markDiscount', 'markNew', 'minimumOrderQuantity', 'originPrice',
	'presaleDeliveryDateDisplay', 'price', 'roughWeight', 'salePointMsg', 'saleUnit', 'smallImage', 'vipPrice'
];

function getCartRequestData(detail) {
	let itemsObj = {};
	keyList.forEach(key => {
		itemsObj[key] = detail[key];
	});
	let shippingData = {};
	if (store.getters.$receivingMethod) {
		shippingData.storeCode = store.getters.$currentAddress.storeId;
		shippingData.storeName = store.getters.$currentAddress.storeId;
		shippingData.cityName = 666;
		shippingData.cityCode = 666;
	} else {
		shippingData.storeCode = 666;
		shippingData.storeName = 666;
		shippingData.cityName = 666;
		shippingData.cityCode = 666;
	}
}

export {

}
