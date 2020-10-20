import axios from 'axios'


const checkSuccess = (config, data) => {
	const { url, checkRequestSuccess } = config
	const { success, retcode, status, code } = data

	if (checkRequestSuccess && typeof checkRequestSuccess === 'function') {
		return checkRequestSuccess({ data })
	}

	return success === true
}

const axiosWindowInstance = axios.create({withCredentials: true,headers: {
	'Content-Type': 'application/json;charset=UTF-8'
} })

axiosWindowInstance.interceptors.response.use(
    response => {
        const data = response.data
        if (checkSuccess(response.config, data)) {
			return data
		}else {
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
	req: axiosWindowInstance.request
}