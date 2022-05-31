// questionnaire/pages/systemList/systemList.js
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
      console.log(options)
      this.ui_id = options.ui_id;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  toQuestionnaire(){
      wx.navigateTo({
        url: '/questionnaire/pages/question/question?ui_id='+this.ui_id,
      })
  },
  toRisk(){
    wx.navigateTo({
      url: '/questionnaire/pages/riskEvaluation/riskEvaluation?ui_id='+this.ui_id,
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