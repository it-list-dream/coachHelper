// pages/rank/rank.js
const util = require('../../utils/util');
var service = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startDate: '',
    endDate: '',
    tabIndex: 0,
    thirdList: [],
    rankList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let nowdate = util.format(new Date(), 'yyyy-mm-dd');
    let yesterday = util.yesterday(new Date());
    this.setData({
      endDate: nowdate,
      startDate: yesterday,
      disdate: nowdate,
    });
    this.getConsumeRank();
  },
  swichTab(e) {
    let index = e.detail.name;
    if (index != this.data.tabIndex) {
      if (index == 0) {
        this.getConsumeRank()
      } else {
        this.getSaleRank();
      }
      this.setData({
        tabIndex: index
      });
    }
  },
  getConsumeRank() {
    service.post('/CoachClassBeginsRankingList', {
      StartDate: this.data.startDate,
      EndDate: this.data.endDate,
      gi_id: wx.getStorageSync('gi_id')
    }).then(res => {
      this.setData({
        rankList: res.data.data
      });
    })
  },
  getSaleRank() {
    service.post('/CoachClassRankingList', {
      StartDate: this.data.startDate,
      EndDate: this.data.endDate,
      gi_id: wx.getStorageSync('gi_id')
    }).then(res => {
      this.setData({
        rankList: res.data.data
      })
    })
  },
  changestartDate(e) {
    this.setData({
      startDate: e.detail.value
    })
    if (this.data.tabIndex == 0) {
     this.getConsumeRank()
    }else{
      this.getSaleRank()
    }
  },
  changeendDate(e) {
    this.setData({
      endDate: e.detail.value
    })
    if (this.data.tabIndex == 0) {
      this.getConsumeRank()
     }else{
       this.getSaleRank()
     }
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