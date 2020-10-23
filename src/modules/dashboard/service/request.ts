import { message } from 'antd'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const checkSuccess = (config, data) => {
	const { url, checkRequestSuccess } = config
	const { success, retcode, status, code } = data

	if (checkRequestSuccess && typeof checkRequestSuccess === 'function') {
		return checkRequestSuccess({ data })
	}
	if (/^\/bi-gateway/.test(url)) {
		return success === true || status === 200
	}
	return success === true
}

const axiosWindowInstance = axios.create({
	withCredentials: true, headers: {
		Accept: "application/json",
		"Content-Type": "application/json"
	}
})
axiosWindowInstance.defaults.timeout = 10000

axiosWindowInstance.interceptors.response.use(
	(response) => {
		const data = response.data
		if (checkSuccess(response.config, data)) {
			return data
		} else {
			return Promise.reject(data)
		}
	}, (error) => {
		if (error.response.status === 401) {
			message.error('登录状态失效，请重新登录')
			window.location.href = window.location.origin + window.location.pathname + '#/dashboard/login'
		}
		if (error.response.status === 500 || error.response.status===504) {
			message.error('网络错误')
			return Promise.reject(error)
		}
	}
)

export default {
	get(url, param, extraParam = {}) {
		return axiosWindowInstance.get(url, { params: param, ...extraParam })
	},
	post(url, param, extraParam = {}) {
		return axiosWindowInstance.post(url, param, extraParam)
	},
	// req: axiosWindowInstance.request
}