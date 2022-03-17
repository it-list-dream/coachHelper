// pages/preparationClass/preparationClass.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    moodList: [{
        moodtitle: "非常好",
        selected: false
      },
      {
        moodtitle: "好",
        selected: false
      },
      {
        moodtitle: "一般",
        selected: false
      },
      {
        moodtitle: "不好",
        selected: false
      }
    ],
    activeList: [{
        moodtitle: "非常好",
        selected: false
      },
      {
        moodtitle: "好",
        selected: false
      },
      {
        moodtitle: "一般",
        selected: false
      },
      {
        moodtitle: "不好",
        selected: false
      }
    ],
    moodShow: false,
    activeShow: false,
    chooseMood: '',
    chooseActive: '',
    currentStatus: -1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  handleclose() {
    this.setData({
      moodShow: false
    })
  },
  activeclose() {
    this.setData({
      activeShow: false
    })
  },
  appetite() {
    this.setData({
      moodShow: true
    })
  },
  active() {
    this.setData({
      activeShow: true
    })
  },
  moodindex(e) {
    if (e.detail.length > 0) {
      this.setData({
        chooseMood: e.detail[0].moodtitle,
        moodShow: false
      })
    }
  },
  vitalindex(e) {
    if (e.detail.length > 0) {
      this.setData({
        chooseActive: e.detail[0].moodtitle,
        activeShow: false
      })
    }
  },
  status(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      currentStatus: index
    })
  },
  startClass(){
     wx.navigateTo({
       url: '/pages/trainConfrim/trainConfrim',
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