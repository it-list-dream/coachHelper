// pages/selectStore/selectStore.js
var service = require('../../utils/request.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allBrand: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var brand = {},
      allList = [];
    service.post('/searchGymListByPhone').then(res => {
      allList = res.data.data;
      allList.forEach(item => {
        brand.BrandName = item.BrandName;
        item.checked = false;
      })
      brand.brandCount = allList.length;
      brand.list = allList;
      this.setData({
        allBrand: brand
      })
    })
  },
  switchStore(e) {
    var brand = e.currentTarget.dataset.store,
      storeList = this.data.allBrand.list;
    for (var i = 0; i < storeList.length; i++) {
       if(storeList[i].FK_GB_ID == brand.FK_GB_ID){
        storeList[i].checked = true;
       }else{
        storeList[i].checked = false;
       }
    }
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