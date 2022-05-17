import axios from "axios";

const request = axios.create({
    // baseURL: 'http://localhost:7001',
    timeout: 5000,
})

//响应拦截器
request.interceptors.response.use((config) => {
    return config.data
}, () => {
    return Promise.reject(new Error('数据请求失败'))
})

export default request