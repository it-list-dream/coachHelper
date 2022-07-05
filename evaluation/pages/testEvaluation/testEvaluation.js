var service = require("../../../utils/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statureCount: 0,
    bodyTestCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTestCount();
  },
  getTestCount() {
    service.post('/StatureDetermineCount', {
      gi_id: wx.getStorageSync('gi_id')
    }).then(res => {
      let {
        statureCount,
        bodyTestCount
      } = res.data;
      this.setData({
        statureCount: parseInt(statureCount),
        bodyTestCount: parseInt(bodyTestCount)
      })
    })
  },
  testFitness() {
    wx.navigateTo({
      url: '/pages/chooseCustom/chooseCustom?type=1',
    });
  },
  posture() {
    wx.navigateTo({
      url: '/pages/chooseCustom/chooseCustom?type=2',
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