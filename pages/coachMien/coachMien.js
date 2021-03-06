// pages/coachMien/coachMien.js
var service = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coachList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    service.post('/CoachStyleList', {
      gi_id: wx.getStorageSync('gi_id')
    }).then(res => {
      var list = res.data.data;
      list.forEach((item, index) => {
        item.AI_GoodAt = item.AI_GoodAt.replace(/\,/g, '、');
      })
      this.setData({
        coachList: list
      })
    })
  },
  styleDetail(e){
    let coach = e.currentTarget.dataset.coach;
    wx.navigateTo({
      url: '/pages/coachStyleDetail/coachStyleDetail',
      success: function(res) {
        res.eventChannel.emit('style',{
          coach:coach
        })
      }
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