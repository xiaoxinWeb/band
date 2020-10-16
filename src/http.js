import axios from 'axios'
import qs from 'qs'

axios.defaults.timeout = 30000; //响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'; //配置请求头

axios.defaults.baseURL = 'http://129.204.83.203'


//返回一个Promise(发送post请求)
export function fetchPost(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, qs.stringify(params))
            .then(response => {
                resolve(response);
            }, err => {
                reject(err);
                console.log(err)

            })
            .catch((error) => {
                reject(error)
                console.log(err)
            })
    })
}
export function fetchPostJson(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(response => {
                resolve(response);
            }, err => {
                reject(err);
                console.log(err)
            })
            .catch((error) => {
                reject(error)
                console.log(err)
            })
    })
}


export function fetDelect(url, params) {
    return new Promise((resolve, reject) => {
        axios.delete(url, params)
            .then(response => {
                resolve(response);
            }, err => {
                reject(err);
                console.log(err)
            })
            .catch((error) => {
                reject(error)
                console.log(err)
            })
    })
}

////返回一个Promise(发送get请求)
export function fetchGet(url, param) {
    return new Promise((resolve, reject) => {
        axios.get(url, { params: param })
            .then(response => {
                resolve(response)
            }, err => {
                reject(err)
                console.log(err)
            })
            .catch((error) => {
                reject(error)
            })
    })
}
export default {
    fetchPost,
    fetchGet,
    axios,
    fetchPostJson,
    fetDelect,
}