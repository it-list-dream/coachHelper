// pages/newtrainProgram/newtrainProgram.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeNames: ['0'],
    periodList: ['适应期', '进步期', '巩固期']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onChange(event) {
    this.setData({
      activeNames: event.detail,
    });
  },
  addperiod() {
    let pList = this.data.periodList;
    pList.push('第' + (pList.length + 1) + '阶段');
    this.setData({
      periodList: pList
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