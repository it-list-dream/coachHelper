
const app = getApp()
 
const request = (url, options) => {
    return new Promise((resolve, reject) => {
        wx.showLoading({
            title: '加载中',
        })
        wx.request({
            url: `${app.globalData.baseUrl}${url}`,
            method: options.method,
            data: options.data,
            header: {
                'content-type': 'application/json',
            },
            success(res) {
                if (res.data.code == 0) {
                    resolve(res)
                } else {
                    reject(resolve)
                }
            },
            fail(error) {
                console.log(url + " : fail");
                reject(error.data)
            }, 
            complete: () => {
                setTimeout(() => {
                    wx.hideLoading();
                }, 100);
            }
        })
    })
}
 
const get = (url, options = {}) => {
    return request(url, { method: 'GET', data: options })
}
 
//post对象
const postObj = (url, options) => {
    return request(url, { method: 'POST', data: options, isObj: true })
}
//post参数
const post = (url, options) => {
    return request(url, { method: 'POST', data: options, isObj: false })
}
module.exports = {
    get,
    post,
    postObj
}