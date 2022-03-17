// pages/allocationCustom/allocationCustom.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabsList:['未分配','已分配'],
    tabIndex:0,
    tabsHeight:0,
    searchHeight:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    const query = wx.createSelectorQuery();
    query.select('.search-box').boundingClientRect()
    query.exec(function (res) {
      that.setData({
        searchHeight:res[0].height
      })
    })
  },
  tabsChange(e){
    this.setData({
      tabIndex:e.detail.currentNum
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
  loadMore(){
    console.log('加载更多')
  },
  getHeight(e){
    console.log(e.detail.height)
    this.setData({
      tabsHeight:e.detail.height
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