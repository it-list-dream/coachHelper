var service = require('../../../utils/request.js');
const app = getApp();
var util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isComparison: false,
    btnType: "对比",
    testList: [],
    test: [],
    firstDate: "2018-9",
    lastDate: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      custom: app.globalData.custom,
      endDate: util.format(new Date(), 'yyyy-mm-dd'),
      lastDate: util.format(new Date(), 'yyyy-mm-dd').slice(0, 7)
    });
    this.getMyBodyTest();
  },
  appoinement() {
    wx.navigateTo({
      url: '/pages/addAppointment/addAppointment?type=1',
    });
  },
  handleComparison() {
    let contrastText = this.data.btnType,
      isFlag = this.data.isComparison,
      testList = this.data.testList;
    isFlag = !isFlag;
    contrastText = isFlag ? '取消' : "对比";
    if (contrastText == '取消') {
      testList.forEach((item, index) => {
        item.selected = false
      })
    }
    this.setData({
      testList: testList,
      isComparison: isFlag,
      btnType: contrastText,
      test: []
    })
  },
  bindDateChange(e) {
    this.setData({
      firstDate: e.detail.value
    });
    this.getMyBodyTest();
  },
  bindDateChange2(e) {
    this.setData({
      lastDate: e.detail.value
    });
    this.getMyBodyTest();
  },
  test(e) {
    let rb_id = e.currentTarget.dataset.id;
    if (!this.data.isComparison) {
      wx.navigateTo({
        url: '/evaluation/pages/physicalReport/physicalReport?rb_id=' + rb_id,
      })
    }
  },
  chooseMultip(e) {
    var that = this,
      index = e.currentTarget.dataset.index,
      rb_id = e.currentTarget.dataset.id,
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
      test.push(rb_id);
    } else {
      test.splice(test.findIndex(item => item == rb_id), 1);
    }
    testList[index].selected = !val;
    that.setData({
      testList: testList,
      test: test
    })
  },
  toCompeletDetail() {
    if (this.data.test.length == 2) {
      wx.navigateTo({
        url: `/evaluation/pages/fitnessContrastReport/fitnessContrastReport?id=${this.data.test[0]}&id2=${this.data.test[1]}`,
      })
      return;
    } else {
      wx.showToast({
        title: '只能选择两组数据进行比较',
        icon: "none"
      })
    }

  },
  getMyBodyTest() {
    service.post('/MyBodyTestList', {
      phone: this.data.custom.UI_Phone || '15575380983',
      dateFrom: this.data.firstDate,
      dateTo: this.data.lastDate,
      gi_id: wx.getStorageSync('gi_id')
    }).then(res => {
      let list = res.data.data;
      list.forEach(item => {
        item.StartDate = util.format(item.StartDate, 'yyyy-mm-dd').substr(5)
      });
      this.setData({
        testList: list
      });
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