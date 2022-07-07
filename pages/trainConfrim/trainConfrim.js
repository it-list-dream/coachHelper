var service = require('../../utils/request.js');
const app = getApp();
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    moodList: [{
        moodtitle: "非常好",
        selected: false
      },
      {
        moodtitle: "好",
        selected: false
      },
      {
        moodtitle: "一般",
        selected: false
      },
      {
        moodtitle: "不好",
        selected: false
      }
    ],
    activeList: [{
        moodtitle: "非常好",
        selected: false
      },
      {
        moodtitle: "好",
        selected: false
      },
      {
        moodtitle: "一般",
        selected: false
      },
      {
        moodtitle: "不好",
        selected: false
      }
    ],
    moodShow: false,
    activeShow: false,
    customInfo: {
      weight: "",
      sleeptime: "",
      appetite: "",
      vitality: ""
    },
    customFeel: 0,
    trainFeel: "",
    actionList: [],
    pageEdit: true,
    customState: "",
    finishiDate: "",
    signImage: "",
    signId: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRecordList();
    this.setData({
      phone: wx.getStorageSync('phone'),
      custom: app.globalData.custom
    });
    this.getCustomClass();
  },
  foldAction(e) {
    let index = e.currentTarget.dataset.index,
      actionList = this.data.actionList;
    actionList[index].isShow = !actionList[index].isShow
    this.setData({
      actionList
    })
  },
  estimateGroup(e) {
    var express = e.currentTarget.dataset.express,
      index = e.currentTarget.dataset.index;
    let actionList = this.data.actionList;
    if (!this.data.pageEdit) {
      return;
    }
    for (let i = 0; i < actionList[index].data.length; i++) {
      actionList[index].data[i].SS_State = express;
    }
    actionList[index].ActualCount = actionList[index].data.length;
    actionList[index].all_state = express;
    this.setData({
      actionList
    })
  },
  estimate(e) {
    let actionList = this.data.actionList;
    var currentGroup = e.currentTarget.dataset.current,
      index = e.currentTarget.dataset.index,
      express = e.currentTarget.dataset.express,
      count = parseInt(actionList[currentGroup].ActualCount);
    if (!this.data.pageEdit) {
      return;
    }
    //console.log(express, index, currentGroup)
    actionList[currentGroup].data[index].SS_State = express;
    count += 1;
    actionList[currentGroup].ActualCount = count;
    this.setData({
      actionList
    })
  },
  //获取所有记录
  getRecordList() {
    let list = [];
    // var expressCount = 0;
    service.post('/OverClass', {
      CS_ID: app.globalData.csId || "3245",
      gi_id: wx.getStorageSync('gi_id')
    }).then(res => {
      if (res.data.data.length == 0 && res.data.data1.length == 0) {
        return;
      }
      list = res.data.data;
      let {
        CustState,
        Appetite,
        CustWeight,
        SleepTime,
        Vitality
      } = res.data.data1[0];
      for (let i = 0; i < list.length; i++) {
        list[i].isShow = false;
        if (list[i].data.every(item => item.SS_State == "一般")) {
          list[i].all_state = "一般";
        } else if (list[i].data.every(item => item.SS_State == "良好")) {
          list[i].all_state = "良好";
        } else if (list[i].data.every(item => item.SS_State == "优秀")) {
          list[i].all_state = "优秀";
        } else {
          list[i].all_state = "";
        }
      }
      this.setData({
        actionList: list,
        customState: CustState,
        customInfo: {
          weight: CustWeight,
          sleeptime: SleepTime,
          appetite: Appetite,
          vitality: Vitality
        }
      })
    })
  },
  sliderChange(e) {
    this.setData({
      customFeel: e.detail
    })
  },
  handleclose() {
    this.setData({
      moodShow: false
    })
  },
  activeclose() {
    this.setData({
      activeShow: false
    })
  },
  moodindex(e) {
    let custom = this.data.customInfo;
    if (e.detail.length > 0) {
      custom.appetite = e.detail[0].moodtitle;
      this.setData({
        customInfo: custom,
        moodShow: false
      })
    }
  },
  vitalindex(e) {
    let custom = this.data.customInfo;
    if (e.detail.length > 0) {
      custom.vitality = e.detail[0].moodtitle;
      this.setData({
        customInfo: custom,
        activeShow: false
      })
    }
  },
  appetite() {
    if (!this.data.pageEdit) {
      return;
    }
    this.setData({
      moodShow: true
    })
  },
  active() {
    if (!this.data.pageEdit) {
      return;
    }
    this.setData({
      activeShow: true
    })
  },
  weightChange(e) {
    var oper = "customInfo.weight";
    this.setData({
      [oper]: e.detail.value
    })
  },
  sleepChange(e) {
    var oper = "customInfo.sleeptime";
    this.setData({
      [oper]: e.detail.value
    })
  },
  customSign() {
    wx.navigateTo({
      url: '/pages/signature/signature',
    })
  },
  saveFinalClass() {
    //签字了就不能修改
    var jsonStr = {
      CustState: this.data.customState,
      CustWeight: this.data.customInfo.weight,
      SleepTime: this.data.customInfo.sleeptime,
      Appetite: this.data.customInfo.appetite,
      Vitality: this.data.customInfo.vitality,
      TrainResults: this.data.trainFeel,
      Remarks: this.data.customFeel,
      CustSign: this.data.signId,
      CS_ID: app.globalData.csId || "3245",
      data: this.data.actionList
    };
    service.post('/UpdateClass', {
      gi_id: wx.getStorageSync('gi_id'),
      json: JSON.stringify(jsonStr)
    }).then(res => {
      wx.reLaunch({
        url: '/pages/tabbar/home/home',
      });
    })
  },
  //确定
  handlefeel(e) {
    this.setData({
      trainFeel: e.detail.value
    })
  },
  getCustomClass() {
    let time,
      minute = 0,
      second = 0,
      finishTime = "",
      isEditAll = true;
    service.post('/StartClass', {
      CS_ID: app.globalData.csId || "3245",
      gi_id: wx.getStorageSync('gi_id')
    }).then(res => {
      if (res.data.data[0].CustSign > 0) {
        isEditAll = false;
      }
      if(res.data.data[0].ActualData.length>0){
        time = Date.parse(res.data.data[0].ActualData) - Date.parse(res.data.data[0].StartDate)
        minute = parseInt(time / 60 / 1000) < 10 ? '0' + parseInt(time / 60 / 1000) : parseInt(time / 60 / 1000);
        second = time % 60 < 10 ? '0' + time % 60 : time % 60;
        time = minute + ':' + second;
        finishTime = util.format(res.data.data[0].ActualData, 'yyyy.mm.dd').substr(finishTime.length - 5, 5);
      }else{
        finishiDate = "--";
        duration = "--";
      }
      this.setData({
        finishiDate: finishTime,
        duration: time,
        trainFeel: res.data.data[0].TrainResults,
        customFeel: res.data.data[0].remarks,
        signImage: res.data.data[0].imgurl,
        pageEdit: isEditAll
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