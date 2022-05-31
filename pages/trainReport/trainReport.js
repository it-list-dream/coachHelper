// pages/trainReport/trainReport.js
var service = require('../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fitTargetList:[],
    allTrain:[]
  },
  getReportDetail(rd_id) {
    service.post('/TrainProgrammeReport', {
      user_token: wx.getStorageSync('token'),
      rd_Id:rd_id,
      gi_id: wx.getStorageSync('gi_id')
    }).then(res => {
       let targetList = res.data.data.Answer.split(',');
        this.setData({
          fitTargetList:targetList,
          allTrain:res.data.data.traindata
        })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
     this.getReportDetail(options.rd_id);
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