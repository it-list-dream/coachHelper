// pages/courseContract/courseContract.js
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // methodsList: ['线上', '线下'],
    // payIndex: -1,
    showPay: false,
    //日期
    startDate: "2018-01-01",
    lastDate: "2100-01-01",
    saleDate: "",
    // 
    formStart: "",
    formEnd: ""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let nowtime = util.format(new Date(), 'yyyy-mm-dd')
    this.setData({
      saleDate: nowtime
    })
  },
  // 支付方式
  payChange(e) {
    if(this.data.formStart && this.data.formEnd){
      this.setData({
        showPay: true
      })
    }else{
      wx.showToast({
        icon:"none",
        title: '请选择开始日期或结束日期',
      })
       return
    }
    //轮询判断是否付款
  },
  onClose() {
    this.setData({
      showPay: false
    })
  },
  //日期
  startDateChange(e) {
    this.setData({
      formStart: e.detail.value
    })
  },
  endDateChange(e) {
    this.setData({
      formEnd: e.detail.value
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