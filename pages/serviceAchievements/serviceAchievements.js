var service = require('../../utils/request.js');
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dateIndex: -1,
    serviceRestult: null,
    nowDate: "",
    startDate: "2020-01-01",
    endDate: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      nowDate: util.format(new Date(), 'yyyy.mm.dd'),
      endDate: util.format(new Date(), 'yyyy.mm.dd')
    });
    this.getServiceResult();
  },
  changeDate(e) {
    let index = e.currentTarget.dataset.index;
    let endDate = this.data.endDate,
      days = 0,
      s_date = "";
    if (index == 1) {
      days = 30
    } else if (index == 2) {
      days = 60;
    } else {
      days = 90;
    }
    s_date = Date.parse(endDate) - days * 1000 * 60 * 60 * 24;
    s_date = util.format(new Date(s_date), 'yyyy.mm.dd');
    if (index !== this.data.dateIndex) {
      this.setData({
        dateIndex: index,
        startDate:s_date
      })
      this.getServiceResult()
    }
  },
  getServiceResult() {
    service.post('/CoachServiceResult', {
      startDate: this.data.startDate,
      endDate: this.data.endDate,
      gi_id: wx.getStorageSync('gi_id')
    }).then(res => {
      this.setData({
        serviceRestult: res.data.data
      })
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

  }
})