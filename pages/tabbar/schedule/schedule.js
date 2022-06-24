// pages/schedule/schedule.js
const app = getApp();
const util = require('../../../utils/util.js')
var service = require('../../../utils/request.js')
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
    if (this.data.tabIndex == 0) {
      this.getscheduleList(e.detail.dateString)
    } else {
      getOhterAppoinment(e.detail.dateString)
    }
    this.setData({
      dateString: e.detail.dateString
    })
  },
  tabClick(event) {
    let index = event.detail.index;
    if (index == this.data.tabIndex) {
      return
    }
    if (index == 0) {
      this.getscheduleList(this.data.dateString)
    } else {
      this.getOhterAppoinment(this.data.dateString);
    }
    this.setData({
      tabIndex: index
    })
  },
  getOhterAppoinment(searchDate) {
    service.post('/Coach_ScheduleMyList', {
      SearchDate: searchDate,
      gi_id: wx.getStorageSync('gi_id')
    }).then(res => {
      let list = res.data.data;
      list.forEach(item => {
        item.startTime = util.format(item.StartDate, 'yyyy-mm-dd hh:mm').substr(item.StartDate.length - 7);
        item.endTime = util.format(item.EndDate, 'yyyy-mm-dd hh:mm').substr(item.EndDate.length - 7);
      });
      this.setData({
        otherAppoinmentList: list
      });
    })
  },
  getscheduleList(searchDate) {
    service.post('/Coach_AppointmentList', {
      SearchDate: searchDate,
      gi_id: wx.getStorageSync('gi_id')
    }).then(res => {
      this.setData({
        appoinmentList: res.data.data
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.editTabbar();
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
    if (this.data.tabIndex == 0) {
      this.getscheduleList(this.data.dateString)
    } else {
      this.getOhterAppoinment(this.data.dateString)
    }
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

  }
})