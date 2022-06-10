// pages/trainPlanDetail/trainPlanDetail.js
const app = getApp();
var service = require("../../utils/request.js");
var util = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classDetail: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.coachClassListAappoint(options.co_id);
    this.coId = options.co_id;
    this.caId = options.ca_id;
  },
  saveTemplate() {
    app.globalData.isExportTemplate = false;
    wx.navigateTo({
      url: '/pages/courseTemplate/courseTemplate'
    })
  },
  exportTemplate() {
    app.globalData.isExportTemplate = true;
    wx.navigateTo({
      url: '/pages/courseTemplate/courseTemplate'
    })
  },
  getClassStatus(cs_id, ca_id, className) {
    service.post('/CoachActLibDetails', {
      co_id: this.coId,
      cs_id: cs_id,
      gi_id: wx.getStorageSync('gi_id')
    }).then(res => {
      var list = res.data.data;
      if (list.length > 0) {
        wx.navigateTo({
          url: `/pages/haveClass/haveClass?cs_id=${cs_id}&co_id=${this.coId}`,
        })
      } else {
        wx.navigateTo({
          url: `/pages/editCourse/editCourse?csID=${cs_id}&caId=${ca_id}&coId=${this.coId}&courseName=${className}`,
        });
      }
    })
  },
  newcurriculum(e) {
    let cs_id = e.currentTarget.dataset.csid,
      ca_id = e.currentTarget.dataset.ca_id,
      className = e.currentTarget.dataset.ctitle;
    //根据ca_id区分到那个页面
    this.getClassStatus(cs_id, ca_id, className);
  },
  coachClassListAappoint(co_id) {
    service.post('/CoachClassListAappoint', {
      co_id: co_id,
      gi_id: wx.getStorageSync('gi_id')
    }).then(res => {
      var list = res.data.data;
      list.forEach(item => {
        if (item.CS_Spenddate) {
          item.time = util.format(item.CS_Spenddate, 'yyyy-mm-dd hh:mm').substr(11, 16)
        }
      });
      this.setData({
        classDetail: list
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