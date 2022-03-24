// pagese/newPosture/newPosture.js
const util = require('../../../utils/util.js');
const body = require('../../../utils/body.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    date: "2021-01-26",
    endDate: "",
    //前侧
    frontSide:[],
    //左侧
    leftSide:[],
    //右侧
    rightSide:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //  let nowtime = 
    let nowtime = util.format(new Date(), 'yyyy-mm-dd')
    this.setData({
      endDate: nowtime,
      frontSide:body.frontSideList,
      leftSide:body.leftSideList,
      rightSide:body.rightSideList
    })
  },

  bindDateChange: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  onChange(e) {
    console.log(e);
    this.setData({
      active: e.detail.index
    })
  },
  handleNext(e) {
    console.log(e.detail)
    if (e.detail.active <= 2) {
      this.setData({
        active: e.detail.active
      })
    } else {
      wx.redirectTo({
        url: '/evaluation/pages/postureDetail/postureDetail',
      })
    }
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