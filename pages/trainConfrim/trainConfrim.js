// pages/trainConfrim/trainConfrim.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sliderValue: 0,
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
    customInfo: {
      weight: 54,
      sleeptime: 8,
      appetite: "一般",
      vitality: "好"
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  sliderChange(e) {
    console.log('滑块在移动', e)
    this.setData({
      sliderValue: e.detail
    })
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
  moodindex(e) {
    let custom = this.data.customInfo;
    if (e.detail.length > 0) {
        custom.appetite = e.detail[0].moodtitle;
        this.setData({
          customInfo:custom,
          moodShow:false
        })
    }
  },
  vitalindex(e) {
    let custom = this.data.customInfo;
    if (e.detail.length > 0) {
      custom.vitality = e.detail[0].moodtitle;
      this.setData({
        customInfo:custom,
        activeShow:false
      })
  }
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
  customSign(){
     wx.navigateTo({
       url: '/pages/signature/signature',
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