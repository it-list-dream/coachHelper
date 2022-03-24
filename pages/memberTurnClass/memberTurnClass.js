// pages/memberTurnClass/memberTurnClass.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    memberList: [{
        selected: false
      },
      {
        selected: false
      }, {
        selected: false
      }, {
        selected: false
      }, {
        selected: false
      }, {
        selected: false
      }, {
        selected: false
      }, {
        selected: false
      }
    ],
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
  selectMember(e) {
    let index = e.currentTarget.dataset.index;
    let memberList = this.data.memberList;
    for (var i = 0; i < memberList.length; i++) {
      if (index == i) {
         memberList[i].selected = !memberList[i].selected;
      }
    }
   this.setData({
    memberList:memberList
   })
  },
  loadMore() {
    console.log('是否还有更多')
  },
  turnClass(){
    wx.navigateTo({
      url: '/pages/turnClasDeatil/turnClasDeatil',
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