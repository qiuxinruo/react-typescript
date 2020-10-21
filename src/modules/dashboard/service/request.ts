import axios from 'axios'


const checkSuccess = (config, data) => {
	console.log(config,data)
	const { url, checkRequestSuccess } = config
	const { success, retcode, status, code } = data

	if (checkRequestSuccess && typeof checkRequestSuccess === 'function') {
		return checkRequestSuccess({ data })
	}
	if (/^\/bi-gateway/.test(url)) {
		return success === true
	}
	return success === true
}

const axiosWindowInstance = axios.create({withCredentials: true,headers: {
	Accept: "application/json",
	"Content-Type": "application/json"
} })
axiosWindowInstance.defaults.timeout = 10000

axiosWindowInstance.interceptors.response.use(
    (response) => {
		console.log(response)
		const data = response.data
		console.log(data)
        if (checkSuccess(response.config, data)) {
			return data
		}else {
			console.log(data,'data')
            return Promise.reject(data)
        }
    }
)

export default {
    get(url,param,extraParam={}) {
        return axiosWindowInstance.get(url, { params:param, ...extraParam })
    },
    post(url, param, extraParam = {}) {
		return axiosWindowInstance.post(url, param, extraParam)
	},
	// req: axiosWindowInstance.request
}