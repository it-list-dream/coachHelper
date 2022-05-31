// pages/tabbar/profile/profile.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabbar: {},
    isLogin: false,
    roleName: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    this.setData({
      menuRight: app.globalData.menuRight,
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
    })
    app.editTabbar();
  },
  doLogin() {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  toChooseStore() {
    wx.navigateTo({
      url: '/pages/selectStore/selectStore',
    })
  },
  allotCustom() {
    wx.navigateTo({
      url: '/pages/allocationCustom/allocationCustom',
    })
  },
  turnClass() {
    wx.navigateTo({
      url: '/pages/memberTurnClass/memberTurnClass',
    })
  },
  turnCoach() {
    wx.navigateTo({
      url: '/pages/turnCoach/turnCoach',
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
    const {RoleName} = wx.getStorageSync('coach');
    if (app.globalData.phoneNumber || wx.getStorageInfoSync('phone')) {
      this.setData({
        isLogin: true,
        RoleName:RoleName
      })
    }
  },
  editProfile() {
    wx.navigateTo({
      url: '/pages/personalSet/personalSet',
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})