var util = require('../../utils/util.js')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // tabsList: ['客户动态', '跟进记录'],
    tabIndex: 0,
    stepList: [{
        name: "训练计划",
        time: "2021-07-19",
        status: "0"
      },
      {
        name: "测试评估",
        time: "2021-07-19",
        status: 0
      },
      {
        name: "系统默认问卷",
        time: "2021-07-20",
        status: 1
      }
    ],
    addRecords: false,
    //记录数组
    recordsList: [],
    //只取前10个元素
    tagsPostion: [
      [72, 88],
      [216, 160],
      [180, 46],
      [32, 210],
      [0, 340],
      [36, 512],
      [146, 496],
      [178, 616]
    ],
    hobbyTags: ['塑性', '减脂', '增肌', '提高表现力', '瘦身', '运动', '减肥'],
    isFollow: false,
    coachList: [{
        name: "张教练",
        selected: false
      },
      {
        name: "张教练",
        selected: false
      },
      {
        name: "张教练",
        selected: false
      }, {
        name: "张教练",
        selected: false
      }, {
        name: "张教练",
        selected: false
      },
      {
        name: "张教练",
        selected: false
      },
      {
        name: "张教练",
        selected: false
      },
      {
        name: "张教练",
        selected: false
      }, {
        name: "张教练",
        selected: false
      }, {
        name: "张教练",
        selected: false
      }
    ],
    endDate: "",
    currentDate: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let nowDate = util.format(new Date(), 'yyyy-mm-dd');
    this.setData({
      currentDate: nowDate,
      endDate: nowDate
    })

    // this.setData({
    //   menuRight: app.globalData.menuRight,
    //   navHeight: app.globalData.navHeight,
    //   navTop: app.globalData.navTop,
    // })
  },
  tabChange(e) {
    // console.log(e)
    this.setData({
      tabIndex: e.detail.index
    })
  },
  addClick(e) {
    this.setData({
      addRecords: true
    })
  },
  confrimEvent(e) {
    console.log(e.detail)
    let recordsList = this.data.recordsList;
    if (e.detail.trim() && e.detail.length > 0) {
      recordsList.push(e.detail)
      this.setData({
        recordsList: recordsList,
        addRecords: false
      })
    }
  },
  cancelEvent() {
    this.setData({
      addRecords: false
    })
  },
  editProfile() {
    wx.navigateTo({
      url: '/pages/addCustom/addCustom',
    })
  },
  getTagValue(e) {
    console.log(e)
    let tagList = this.data.stepList;
    tagList.push({
      name: e.detail,
      time: "2021-07-19",
      status: 0
    })
    this.setData({
      stepList: tagList
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  selelctCoach(e) {
    console.log(e)
    let index = e.currentTarget.dataset.index,
      cList = this.data.coachList;
    for (let i = 0; i < cList.length; i++) {
      if (index == i) {
        cList[i].selected = !cList[i].selected;
      }
    }
    this.setData({
      coachList: cList
    })
  },
  //关闭
  onClose() {
    this.setData({
      isFollow: false
    })
  },
  allocateCoach() {
    this.setData({
      isFollow: true
    })
  },
  bindDateChange(e){
     this.setData({
      currentDate:e.detail.value
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