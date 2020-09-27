import http from './http'
export function getInfo(params) {
    return http.get('/http://129.204.83.203', params)
}