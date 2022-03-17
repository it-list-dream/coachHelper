// questionnaire/pages/questionList/questionList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    params: {
      q: "/questionnaire/pages/systemQuestion/systemQuestion?type=1"
    },
    params2: {
      q: "/questionnaire/pages/systemQuestion/systemQuestion?type=2"
    },
    scrollHeight:0
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
  onChange(e) {
    this.setData({
      active: e.detail.name
    })
  },
  queryMultipleNodes(height) {
    let scrollHeight = this.data.scrollHeight;
    const query = wx.createSelectorQuery()
    query.select('#tabs').boundingClientRect()
    query.exec((res) => {
      scrollHeight = height - res[0].height - 170;
      this.setData({
        scrollHeight: scrollHeight
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  defaultquestion() {
    wx.navigateTo({
      url: '/questionnaire/pages/systemQuestion/systemQuestion',
    })
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