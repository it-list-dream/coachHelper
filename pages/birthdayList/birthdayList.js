var service = require('../../utils/request.js');
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    tabList: ['今天', '本周', '本月', '下周', '下月'],
    scrollHeight: 0,
    birthdayList: []
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
    this.setData({
      nowDate: util.format(new Date(), 'yyyy-mm-dd')
    })
    this.getUserBirthday(util.format(new Date(),'yyyy-mm-dd'), util.format(new Date(), 'yyyy-mm-dd'));
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
        scrollHeight: scrollHeight
      })
    })
  },
  getUserBirthday(startDate, endDate) {
    service.post('/UserBirthdayList', {
      startDate: startDate,
      endDate: endDate,
      gi_id: wx.getStorageSync('gi_id')
    }).then(res => {
      this.setData({
        birthdayList: res.data.data
      })
    })
  },
  tabChange(e) {
    let now = this.data.nowDate;
    let s_date = "",
      e_date = "";
    if (e.detail.index != this.data.active) {
      if (e.detail.index == 0) {
        s_date = now;
        e_date = now;
      } else if (e.detail.index == 1) {
        s_date = this.getWeekDay(now).begin;
        e_date = this.getWeekDay(now).end;
      } else if (e.detail.index == 2) {
        s_date = this.getMonthDate(now).monthStartDate;
        e_date = this.getMonthDate(now).monthEndDate;
      } else if (e.detail.index == 3) {
        s_date = this.getWeekDay(Date.parse(now) + 7 * 1000 * 60 * 60 * 24).begin;
        e_date = this.getWeekDay(Date.parse(now) + 7 * 1000 * 60 * 60 * 24).end;
      } else {
        let firstDate = new Date(this.getMonthDate(now).monthEndDate);
        firstDate = firstDate.setDate(firstDate.getDate() + 1);
        s_date = this.getMonthDate(firstDate).monthStartDate;
        e_date = this.getMonthDate(firstDate).monthEndDate;
      }
      this.getUserBirthday(s_date, e_date);
      this.setData({
        active: e.detail.index
      })
    }

  },
  getWeekDay(date) {
    //周
    var date = new Date(date);
    date.setDate(date.getDate() - date.getDay() + 1);
    var begin = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    date.setDate(date.getDate() + 6);
    var end = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    return {
      begin: begin,
      end: end
    }
  },
  getMonthDate(date) {
    var now = new Date(date);
    var nowMonth = now.getMonth(); //当前月 
    var nowYear = now.getFullYear(); //当前年 
    //本月的开始时间
    var monthStartDate = util.format(new Date(nowYear, nowMonth, 1), 'yyyy-mm-dd');
    //本月的结束时间
    var monthEndDate = util.format(new Date(nowYear, nowMonth + 1, 0), 'yyyy-mm-dd');
    return {
      monthStartDate,
      monthEndDate
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

  }
})