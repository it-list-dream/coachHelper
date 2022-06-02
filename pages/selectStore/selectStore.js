// pages/selectStore/selectStore.js
var service = require('../../utils/request.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allBrand: [],
    currentIndex: -1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var brand = {},
      allList = [],
      index = -1;
    var currentCoach = wx.getStorageSync('coach');
    service.post('/searchGymListByPhone').then(res => {
      allList = res.data.data;
      allList.forEach(item => {
        brand.BrandName = item.BrandName;
      })
      brand.brandCount = allList.length;
      brand.list = allList;
      for (let i = 0; i < brand.list.length; i++) {
        if (brand.list[i].FK_AI_ID == currentCoach.FK_AI_ID) {
          index = i;
        }
      }
      this.setData({
        allBrand: brand,
        currentIndex:index
      });
    })
  },
  switchStore(e) {
    var brand = e.currentTarget.dataset.store;
    wx.setStorageSync("gi_id", brand.GI_ID);
    wx.setStorageSync('coach', brand);
    wx.navigateBack({
      delta: 1,
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})