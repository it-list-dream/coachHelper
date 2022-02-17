// pages/chooseCustom/chooseCustom.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: "",
    currentActive: 0,
    //tablist
    tabsList: ['最近联系', '全部客户'],
    memberList: [{
        name: "宁康",
        phone: '1213131313',
        img: '',
        firstName:"宁"
      },
      {
        name: "长进",
        phone: '3213131313',
        img: '',
        firstName:"长"
      },
      {
        name: "使者",
        phone: '6213131313',
        img: '',
        firstName:"使"
      },{
        name: "使者",
        phone: '6213131313',
        img: '',
        firstName:"使"
      },{
        name: "使者",
        phone: '6213131313',
        img: '',
        firstName:"使"
      },{
        name: "使者",
        phone: '6213131313',
        img: '',
        firstName:"使"
      },{
        name: "使者",
        phone: '6213131313',
        img: '',
        firstName:"使"
      }

    ]
  },
  swichNav: function (res) {
    if (this.data.currentActive == res.detail.currentNum) return;
    this.setData({
      currentActive: res.detail.currentNum
    })
  },
  addPeople(){
     wx.navigateTo({
       url: '/pages/addCustom/addCustom',
     })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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