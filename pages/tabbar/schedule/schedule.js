// pages/schedule/schedule.js
const app = getApp();
const util = require('../../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dateString: "",
    spot: [],
    nowTime: "",
    tabIndex: 0,
    // tabList: ['私教', '自定义'],
    tabbar: {},
  },
  dateChange(e) {
    console.log("选中日期变了,现在日期是", e.detail.dateString)
    this.setData({
      dateString: e.detail.dateString
    })
  },
  tabClick(event) {
    let index = event.detail.index;
    if(index == this.data.tabIndex){
         return
    }
    this.setData({
      tabIndex:index
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.editTabbar();
    this.setData({
      nowTime:util.format(new Date(),'yyyy-mm-dd')
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