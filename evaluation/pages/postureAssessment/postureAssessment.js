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
    ],
    test: []
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
    var that = this,
      index = e.currentTarget.dataset.index,
      value = e.currentTarget.dataset.value,
      testList = that.data.testList,
      test = that.data.test,
      val = testList[index].selected, //点击前的值
      limitNum = 2,
      curNum = 0;
    //已选择数量
    for (var i in testList) {
      if (testList[i].selected) {
        curNum += 1;
      }
    }
    if (!val) {
      if (curNum == limitNum) {
        wx.showToast({
          title: '只能选择两组数据进行比较',
          icon: "none"
        })
        return;
      }
      test.push(value);
    } else {
      for (var j in test) {
        if (test[j] == value) {
          test.splice(j, 1);
        }
      }
    }
    testList[index].selected = !val;
    that.setData({
      testList: testList,
      test: test
    })
  },
  addAssement() {
    wx.navigateTo({
      url: '/evaluation/pages/newPosture/newPosture',
    })
  },
  assessContrast(e) {
    let selectedList = this.data.test;
    if (selectedList.length == 2) {
      wx.navigateTo({
        url: '/evaluation/pages/postureContrast/postureContrast',
      })
    } else {
      wx.showToast({
        title: '只能选择两组数据进行比较',
        icon: "none"
      })
    }
  },
  testReport(){
     let flag = this.data.isAssess;
     if(!flag){
        wx.navigateTo({
          url: '/evaluation/pages/postureDetail/postureDetail',
        })
     }
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