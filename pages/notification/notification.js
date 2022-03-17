// pages/notification/notification.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList: ['生日提醒', '进场提醒', '课程到期提醒', '系统提醒'],
    active: 0,
    scrollHeight: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: (result) => {
        this.queryMultipleNodes(result.windowHeight);
      },
    })
  },
  queryMultipleNodes(height) {
    let scrollHeight = this.data.scrollHeight;
    const query = wx.createSelectorQuery()
    query.select('#tabs').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec((res) => {
      console.log(height, res[0].height)
      scrollHeight = height - res[0].height - 15;
      this.setData({
        scrollHeight:scrollHeight
      })
    })
  },
  tabChange(e) {
    console.log(e);
    this.setData({
      active: e.detail.name
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