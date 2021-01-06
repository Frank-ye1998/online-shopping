//请求器
import xhr from "@/api/xhr.js";

const userApi = {
	sendCode(data) {
		const params = {
			url: "/user/sendCode",
			method: "get",
			data: data
		};
		return xhr.request(params)
	}
}
export default userApi
