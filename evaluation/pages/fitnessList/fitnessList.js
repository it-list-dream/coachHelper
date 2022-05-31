// evaluation/pages/fitnessList/fitnessList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isComparison: false,
    btnType: "对比",
    testList: [{
        testName: "王教练",
        testTime: "2021-10-01",
        selected: false
      },
      {
        testName: "李教练",
        testTime: "2021-12-01",
        selected: false
      },
      {
        testName: "唐教练",
        testTime: "2022-1-01",
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
  appoinement() {
    wx.navigateTo({
      url: '/pages/addAppointment/addAppointment?type=1',
    })
  },
  handleComparison() {
    let contrastText = this.data.btnType,
      isFlag = this.data.isComparison,
      testList = this.data.testList;
    isFlag = !isFlag;
    contrastText = isFlag ? '取消' : "对比";
    if(contrastText == '取消'){
      testList.forEach((item,index)=>{
          item.selected = false
      })
    }
    this.setData({
      testList:testList,
      isComparison: isFlag,
      btnType: contrastText,
      test:[]
    })
  },
  test() {
    if (!this.data.isComparison) {
      wx.navigateTo({
        url: '/evaluation/pages/physicalReport/physicalReport',
      })
    }
  },
  chooseMultip(e) {
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
          icon:"none"
        })
        return;
      }
      test.push(value);
    } else {
      for (var j of test) {
        if (j == value) {
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
  toCompeletDetail() {
    if(this.data.test.length == 2){
      wx.navigateTo({
        url: '/evaluation/pages/fitnessContrastReport/fitnessContrastReport',
      })
      return;
    }else{
      wx.showToast({
        title: '只能选择两组数据进行比较',
        icon:"none"
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