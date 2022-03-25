// pages/chooseCustom/chooseCustom.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: "",
    currentActive: 0,
    //tablist
    tabsList: ['最近联系', '全部客户', '私教会员', '普通会员', '意向会员', '公海池'],
    memberList: [{
        name: "宁康",
        phone: '1213131313',
        img: '',
        firstName: "宁"
      },
      {
        name: "长进",
        phone: '3213131313',
        img: '',
        firstName: "长"
      },
      {
        name: "使者",
        phone: '6213131313',
        img: '',
        firstName: "使"
      }

    ],
    tabbar: {},
    scrollHeight: 0,
    filterIndex:0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.editTabbar();
    wx.getSystemInfo({
      success: (result) => {
        //console.log(result)
        this.getNodeHeight(result.windowHeight);
      },
    })
  },
  swichNav: function (event) {
    console.log(event);
    this.setData({
      currentActive: event.detail.index
    })
  },
  addPeople() {
    wx.navigateTo({
      url: '/pages/addCustom/addCustom',
    })
  },
  memberDetail() {
    wx.navigateTo({
      url: '/pages/customerDetail/customerDetail',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getNodeHeight(height) {
    var that = this,
      sHeight = 0;
    const query = wx.createSelectorQuery();
    query.select('.serach-box').boundingClientRect();
    query.select('#tabs').boundingClientRect();
    query.exec(function (res) {
      sHeight = height - res[0].height - Math.ceil(res[1].height) - 70;
      that.setData({
        scrollHeight:sHeight
      })
    })
  },
  filterMember(e){
     this.setData({
       filterIndex:e.currentTarget.dataset.index
     })
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