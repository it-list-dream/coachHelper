// pages/customerDetail/customerDetail.js
// "navigationStyle":"custom"
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabsList: ['客户动态', '跟进记录'],
    tabIndex: 0,
    stepList: [{
        name: "下单时间",
        event: "",
        time: "2021-07-19",
        status: "0"
      },
      {
        name: "支付时间",
        event: "微信小程序，微信支付10.00元",
        time: "2021-07-19",
        status: "0"
      },
      {
        name: "降锁时间",
        event: "",
        time: "2021-07-20",
        status: "1" //status步骤条状态。=1表示最后一条渲染不同样式
      }
    ],
    addRecords: false,
    //记录数组
    recordsList: [],
    pageName: '客户详情',
    showNav: false,
    //跟进记录
    // stepList1:[]
    followRecords:[
      {
        name:"名称",
        time:"2021-07-16：12:30:01",
      },
      {
        name:"张三1",
        time:"2021-07-19：12:30:01",
      },
      {
        name:"李四",
        time:"2021-07-20：12:30:01",
      }
    ]
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
  },
  tabClick(e) {
    let index = e.currentTarget.dataset.index;
    console.log(index)
    if (index == this.data.tabIndex) {
      return
    }
    this.setData({
      tabIndex: index
    })
  },
  addClick(e) {
   this.setData({
    addRecords:true
   })
  },
  confrimEvent(e) {
    console.log(e.detail)
    let recordsList = this.data.recordsList;
    if (e.detail.trim() && e.detail.length > 0) {
      recordsList.push(e.detail)
      this.setData({
        recordsList:recordsList,
        addRecords:false
      })
    }
  },
  cancelEvent() {
    this.setData({
      addRecords:false
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