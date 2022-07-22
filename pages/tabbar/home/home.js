const app = getApp();
var service = require('../../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabbar: {},
    classList: [],
    gym: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.editTabbar();
    this.setData({
      menuRight: app.globalData.menuRight,
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop
    });
  },
  courseIntroduce(e) {
    let classes = e.currentTarget.dataset.course;
    wx.navigateTo({
      url: `/pages/classDetail/classDetail?cp_name=${classes.CP_Name}&cp_content=${classes.CP_Content}&classtime=${classes.ClassTime}&cp_logo=${classes.CP_Logo}&saleCount=${classes.SaleCount}`,
    })
  },
  moreText() {
    wx.navigateTo({
      url: '/pages/classType/classType',
    })
  },
  chooseStore() {
    wx.navigateTo({
      url: '/pages/selectStore/selectStore',
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
    var gi_id = wx.getStorageSync('gi_id');
    const {GymName} = wx.getStorageSync('coach');
    service.post('/CoachClassList', {
      gi_id: gi_id
    }).then(res => {
      this.setData({
        classList: res.data.data.slice(0, 4),
        gym:GymName
      })
    })
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