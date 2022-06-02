const app = getApp()
var baseURL = 'https://user.360ruyu.cn/MobileCoachV2.asmx';
let ajaxTimes = 0;
var fixtion = {};
const request = (url, options) => {
    return new Promise((resolve, reject) => {
        // wx.showLoading({
        //     title: '加载中',
        // })
        var gi_id = wx.getStorageSync('gi_id')
        if (url != "/WxUserLogin" && url != "/userPhoneBind") {
            var token = wx.getStorageSync('token');
            if (!token) {
                wx.navigateTo({
                    url: '/pages/login/login',
                })
                return;
            }else {
                fixtion.user_token = token;
            }
        }
        wx.request({
            url: baseURL + url || '',
            method: options.method,
            data: {
                ...fixtion,
                ...options.data
            },
            header: {
                'content-type': options.method == 'POST' ? 'application/x-www-form-urlencoded' : 'application/json'
            },
            success(res) {
                if (res.data.code == 1) {
                    resolve(res)
                } else {
                    wx.showToast({
                        title: res.data.msg || '未知错误',
                        icon: "none"
                    })
                }
            },
            fail(error) {
                console.log(url + " : fail");
                reject(error.data)
            },
            complete: () => {
                ajaxTimes--;
                if (ajaxTimes === 0) {
                    //  关闭正在等待的图标
                    //wx.hideLoading();
                }
            }
        })
    })
}

const get = (url, options = {}) => {
    return request(url, {
        method: 'GET',
        data: options
    })
}

//post参数
const post = (url, options) => {
    return request(url, {
        method: 'POST',
        data: options
    })
}
module.exports = {
    get,
    post
}