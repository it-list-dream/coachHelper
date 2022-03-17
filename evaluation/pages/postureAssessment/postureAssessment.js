// pages/postureAssessment/postureAssessment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    assessText: "对比",
    isAssess: false,
    testList: [{
        testName: "测试1",
        coachName: "李教练",
        date: "2022.02.01",
        selected: false
      },
      {
        testName: "测试2",
        coachName: "王教练",
        date: "2022.02.04",
        selected: false
      },
      {
        testName: "测试3",
        coachName: "刘教练",
        date: "2022.02.08",
        selected: false
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  comparison() {
    let isAssess = this.data.isAssess,
      textValue = "";
    textValue = isAssess ? "对比" : "取消"
    this.setData({
      isAssess: !isAssess,
      assessText: textValue
    })
  },
  changeCheck(e) {
    let testList = this.data.testList,
      test = e.currentTarget.dataset.test,
      checkedList = [],
      sameIndex = -1;
    for (var i = 0; i < testList.length; i++) {
      if (checkedList.length > 2) {
        checkedList.unshift(checkedList[0]);
        sameIndex = testList.findIndex(item => checkedList[0].testName == item.testName);
        testList[sameIndex].selected = false;
      }
      if (testList[i].testName == test.testName) {
        testList[i].selected = true;
        checkedList.push(testList[i])
      }
    }
    console.log(checkedList, testList)
    this.setData({
      testList: testList
    })
  },
  addAssement(){
     wx.navigateTo({
       url: '/evaluation/pages/newPosture/newPosture',
     })
  },
  assessContrast(){
    wx.navigateTo({
      url: '/evaluation/pages/postureContrast/postureContrast',
    })
  },
  testReport(){
      wx.navigateTo({
        url: '/evaluation/pages/postureDetail/postureDetail',
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