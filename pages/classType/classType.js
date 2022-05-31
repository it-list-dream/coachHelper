// pages/courseType/courseType.js
var service = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    service.post('/CoachClassList', {
      gi_id: wx.getStorageSync('gi_id')
    }).then(res => {
      this.setData({
        typeList: res.data.data
      })
    })
  },
  selectedClass(e) {
    let classes = e.currentTarget.dataset.classes;
    wx.navigateTo({
      url: `/pages/classDetail/classDetail?cp_name=${classes.CP_Name}&cp_content=${classes.CP_Content}&classtime=${classes.ClassTime}&cp_logo=${classes.CP_Logo}&saleCount=${classes.SaleCount}`,
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})