// pages/coursePlanning/coursePlanning.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    vanTabsList: ['方案'],
    tabsActive: 0,
    class_number: 1,
    windowHeight: 0,
    classessList: [{
      class_pic: "/assets/images/fitness_img.png",
      class_name: "女性塑形课程",
      class_price: 300
    }, {
      class_pic: "/assets/images/fitness_img.png",
      class_name: "廋身课程",
      class_price: 450
    }, {
      class_pic: "/assets/images/fitness_img.png",
      class_name: "增肌课程",
      class_price: 280
    }],
    typeList: [{
        name: "女性塑形课程",
        checked: false
      }, {
        name: "瘦身课程",
        checked: false
      }, {
        name: "增肌课程",
        checked: false
      }, {
        name: "健身入门课程",
        checked: false
      },
      {
        name: "运动康复课程",
        checked: false
      }, {
        name: "产后修复课程",
        checked: false
      }, {
        name: "私教体验课",
        checked: false
      }, {
        name: "自主训练",
        checked: false
      },
      {
        name: "减脂课",
        checked: false
      }
    ],
    //是否显示添加课程弹窗
    showClass:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight
        })
      }
    })
  },
  changePriceevent(event) {
    // console.log(event.detail);
    this.setData({
      class_number: event.detail
    })
  },
  addPlus() {
    let tabList = this.data.vanTabsList;
    tabList.push('方案' + tabList.length)
    this.setData({
      vanTabsList: tabList,
      tabsActive: tabList.length - 1
    })
  },
  switchTab(e) {
    let current = e.currentTarget.dataset.current;
    this.setData({
      tabsActive: current
    })
  },
  //确定 取消
  onCancel(){
     this.setData({
       showClass:false
     })
  },
  onConfrim(e){
    console.log(e)
     this.setData({
       showClass:false,
       typeList:e.detail
     })
  },
  showMask(){
    this.setData({
      showClass:true
    })
  },
  payMoney(){
    wx.navigateTo({
      url: '/pages/courseContract/courseContract',
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