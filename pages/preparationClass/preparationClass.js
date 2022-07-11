var service = require('../../utils/request.js');
const app = getApp()
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
    chooseMood: '',
    chooseActive: '',
    currentStatus: -1,
    weight: "",
    sleepTime: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPerpareStatus();
  },
  getPerpareStatus() {
    let currentStatus;
    service.post('/OverClass', {
      CS_ID: app.globalData.csId,
      gi_id: wx.getStorageSync('gi_id')
    }).then(res => {
      if (res.data.data1.length > 0) {
        let {
          CustWeight,
          SleepTime,
          Appetite,
          Vitality,
          CustState
        } = res.data.data1[0];
        if( CustState == "不好"){
          currentStatus = 0;
        }else if(CustState == "一般"){
          currentStatus = 1;
        }else if(CustState =="好"){
          currentStatus = 2;
        }else{
          currentStatus = 3;
        }
        this.setData({
          weight: CustWeight,
          sleepTime: SleepTime,
          chooseMood:Appetite,
          chooseActive:Vitality,
          currentStatus
        })
      }
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
  appetite() {
    this.setData({
      moodShow: true
    })
  },
  active() {
    this.setData({
      activeShow: true
    })
  },
  moodindex(e) {
    if (e.detail.length > 0) {
      this.setData({
        chooseMood: e.detail[0].moodtitle,
        moodShow: false
      })
    }
  },
  vitalindex(e) {
    if (e.detail.length > 0) {
      this.setData({
        chooseActive: e.detail[0].moodtitle,
        activeShow: false
      })
    }
  },
  status(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      currentStatus: index
    })
  },
  startClass() {
    var state = "";
    switch (parseInt(this.data.currentStatus)) {
      case 0:
        state = "不好";
        break;
      case 1:
        state = "一般";
        break;
      case 2:
        state = "好";
        break;
      case 3:
        state = "非常高"
        break;
    }
    var jsonStr = {
      CustState: state,
      CustWeight: this.data.weight,
      SleepTime: this.data.sleepTime,
      Appetite: this.data.chooseMood,
      Vitality: this.data.chooseActive,
      CO_ID: app.globalData.coId,
      CS_ID: app.globalData.csId,
      RB_ID: 0
    };
    if (this.data.chooseMood != "" && this.data.chooseActive.length != "" && this.data.weight != "" && this.data.sleepTime != "" && this.data.currentStatus >= 0) {
      service.post('/ReadyClassBeforeSave', {
        json: JSON.stringify(jsonStr),
        gi_id: wx.getStorageSync('gi_id')
      }).then(res => {
        wx.navigateTo({
          url: '/pages/startClass/startClass',
        });
      })
    } else {
      wx.showToast({
        icon: "none",
        title: '请先完成课前准备',
      });
    }
  },
  changeSleep(e) {
    this.setData({
      sleepTime: e.detail.value
    })
  },
  changeWeight(e) {
    this.setData({
      weight: e.detail.value
    });
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