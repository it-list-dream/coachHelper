// pages/postureAssessment/postureAssessment.js
var service = require('../../../utils/request.js');
const app = getApp();
const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    assessText: "对比",
    isAssess: false,
    testList: [],
    test: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  comparison() {
    let isAssess = this.data.isAssess,
      textValue = "",
      testList = this.data.testList;
    textValue = isAssess ? "对比" : "取消";
    if (textValue == '取消') {
      testList.forEach((item, index) => {
        item.selected = false
      })
    }
    this.setData({
      testList: testList,
      isAssess: !isAssess,
      assessText: textValue,
      test: []
    })
  },
  changeCheck(e) {
    var that = this,
      index = e.currentTarget.dataset.index,
      sd_id = e.currentTarget.dataset.sid,
      testList = that.data.testList,
      //存放选中数据
      test = that.data.test,
      val = testList[index].selected, //点击前的值
      limitNum = 2,
      //当前选中数量
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
      test.push(sd_id);
    } else {
      for (var j of test) {
        if (j == sd_id) {
          test.splice(j, 1);
        }
      }
    }
    testList[index].selected = !val;
    that.setData({
      testList: testList,
      test: test
    });
  },
  addAssement() {
    wx.navigateTo({
      url: '/evaluation/pages/newPosture/newPosture',
    })
  },
  assessContrast(e) {
    let selectedList = this.data.testList.filter(item=>item.selected)
    if (selectedList.length == 2) {
      wx.navigateTo({
        url: `/evaluation/pages/postureContrast/postureContrast?sd_id=${selectedList[0].SD_ID}&sd_id2=${selectedList[1].SD_ID}`,
      })
    } else {
      wx.showToast({
        title: '只能选择两组数据进行比较',
        icon: "none"
      })
    }
  },
  testReport(e) {
    let flag = this.data.isAssess,
        sd_id = e.currentTarget.dataset.sid;
    if (!flag) {
      wx.navigateTo({
        url: '/evaluation/pages/postureDetail/postureDetail?sd_id='+sd_id,
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
    service.post('/StatureDetermineByList', {
      UI_ID: app.globalData.custom.UI_ID,
      gi_id: wx.getStorageSync('gi_id')
    }).then(res => {
     // console.log(res)
     let assessmentList = res.data.data;
     assessmentList.forEach(item=>{
       item.RecordDate = util.format(item.RecordDate,'yyyy.mm.dd');
     });
      this.setData({
        testList: assessmentList
      })
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  }
})