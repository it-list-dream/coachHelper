// pages/login/login.js
var service = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.login({
      success: function (res) {}
    })
  },
  getPhoneNumber: function (e) {
    if (e.detail.errMsg == 'getPhoneNumber:ok') {
      //登录
      const {
        encryptedData,
        iv
      } = e.detail;
      //console.log(encryptedData, iv)
      wx.login({
        success(res) {
          if (res.code) {
            //发起网络请求
            service.post('/WxUserLogin', {
              code: res.code,
              key: 'BD687B66ECDBED4E12C4320B0ABB3BB111'
            }).then(res => {
              service.post('/userPhoneBind', {
                user_token: res.data.user_token,
                encryptedDataStr: encryptedData,
                iv: iv
              }).then(res => {
                const {
                  phone,
                  user_token
                } = res.data;
                wx.setStorageSync('token', user_token);
                wx.setStorage({
                  data: phone,
                  key: 'phone',
                })
                wx.redirectTo({
                  url: '/pages/selectStore/selectStore',
                })
              })
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    } else if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
      //返回上一个页面
      console.log('登录失败')
    }
  },
  userAgreement() {
    wx.navigateTo({
      url: '/pages/serverAgreement/serverAgreement',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  }
})