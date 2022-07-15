var service = require('../../utils/request.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: 45 * 60 * 1000,
    timeData: {},
    actionList: [],
    //memeList: ['一般', '良好', '优秀'],
    currentAction: 0,
    startInfo: {},
    titleList: [],
    isAddAction: false
  },
  timeChange(e) {
    this.setData({
      timeData: e.detail,
    });
  },
  finish() {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定要结束课程吗?',
      success(res) {
        if (res.confirm) {
          that.saveStartClass(function () {
            // wx.navigateTo({
            //   url: '/pages/trainConfrim/trainConfrim',
            // });
            wx.redirectTo({
              url: '/pages/trainConfrim/trainConfrim',
            });
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  gameover() {
    // wx.navigateTo({
    //   url: '/pages/trainConfrim/trainConfrim',
    // });
    wx.redirectTo({
      url: '/pages/trainConfrim/trainConfrim',
    })
  },
  addactionGroup(e) {
    this.setData({
      isAddAction: true
    })
  },
  ationClose(){
    this.setData({
      isAddAction: false
    })
  },
  chooseActType(e) {
    let type = e.currentTarget.dataset.type;
    if (type == 1) {
      let index = this.data.currentAction,
        actionList = this.data.actionList;
      if (Array.isArray(actionList[index].data)) {
        actionList[index].data.push({
          SS_State: "",
          open: true
        });
      }
      actionList[index].SM_Count = parseInt(actionList[index].SM_Count) + 1;
      this.setData({
        actionList
      });
    } else {
      wx.navigateTo({
        url: '/pages/action/action',
      })
    }
    this.setData({
      isAddAction:false
    })
  },
  estimate(e) {
    let index = e.currentTarget.dataset.index,
      actionIndex = this.data.currentAction,
      actionList = this.data.actionList,
      express = e.currentTarget.dataset.express;
    console.log(index, express);
    actionList[actionIndex].data[index].SS_State = express;
    actionList[actionIndex].data[index].open = false;
    this.setData({
      actionList: actionList
    });
    //this.saveStartClass();
  },
  deleteact(e) {
    let index = e.currentTarget.dataset.index,
      actionIndex = this.data.currentAction,
      actList = this.data.actionList;
    if (actList[actionIndex].data.length > 1) {
      actList[actionIndex].data.splice(index, 1);
    }
    this.setData({
      actionList: actList
    });
    // this.saveStartClass();
  },
  openMeme(e) {
    let currentIndex = e.currentTarget.dataset.current,
      actionIndex = this.data.currentAction,
      actionList = this.data.actionList;
    actionList[actionIndex].data[currentIndex].open = true;
    this.setData({
      actionList: actionList
    })
  },
  getStartClass() {
    service.post('/StartClass', {
      CS_ID: app.globalData.csId || "3245",
      gi_id: wx.getStorageSync('gi_id')
    }).then(res => {
      let time,
        cp_time = res.data.data[0].CP_Time;
      cp_time = res.data.data[0].CP_Time;
      if (Date.now() - Date.parse(res.data.data[0].EndDate) > 0) {
        time = 0;
      } else {
        time = Date.now() - Date.parse(res.data.data[0].StartDate);
        cp_time = cp_time * 60 * 1000;
        time = cp_time - time;
      }
      this.setData({
        startInfo: res.data.data[0],
        time: time,
        duration: res.data.data[0].CP_Time
      });
    })
  },
  //保存
  saveStartClass(callback) {
    let actList = this.data.actionList;
    for (let i = 0; i < actList.length; i++) {
      actList[i].ActualCount = actList[i].data.filter(item => item.SS_State.length > 0).length;
    }
    var jsonStr = {
      CS_ID: app.globalData.csId || "3245",
      data: actList
    }
    service.post('/SaveStartClassRecord', {
      gi_id: wx.getStorageSync('gi_id'),
      json: JSON.stringify(jsonStr)
    }).then(res => {
      callback && callback();
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.getStartClass();
    this.getClassRecordList();

    wx.onAppHide(function () {
      that.saveStartClass();
    });
    wx.setNavigationBarTitle({
      title: app.globalData.navTitle || ""
    })
  },
  getClassRecordList() {
    var tList = [];
    service.post('/StartClassRecordList', {
      CS_ID: app.globalData.csId || "3245",
      gi_id: wx.getStorageSync('gi_id')
    }).then(res => {
      if (res.data.data.length > 0) {
        var list = res.data.data;
        for (let i = 0; i < list.length; i++) {
          for (let j = 0; j < list[i].data.length; j++) {
            list[i].data[j].open = true;
          }
          tList.push(list[i].SM_Name);
        }
        this.setData({
          actionList: list,
          titleList: tList
        });
      } else {
        this.getAllAction();
      }
    })
  },
  getAllAction() {
    var actionList = [],
      tList = [];
    let list = [];
    service.post('/CoachActLibDetails', {
      co_id: app.globalData.coId || "1769",
      cs_id: app.globalData.csId || "3245",
      gi_id: wx.getStorageSync('gi_id')
    }).then(res => {
      actionList = res.data.data[0].data;
      for (let i = 0; i < actionList.length; i++) {
        for (let j = 0; j < parseInt(actionList[i].SM_Count); j++) {
          list.push({
            SS_State: "",
            open: true
          });
        }
        actionList[i].data = list;
        list = [];
        tList.push(actionList[i].SM_Name)
      }
      this.setData({
        actionList,
        titleList: tList
      })
    })
  },
  swichAction: function (e) {
    let currentIndex = this.data.currentAction,
      oper = e.currentTarget.dataset.oper,
      actionCount = this.data.titleList.length;
    if (oper == "next") {
      if (actionCount > 1 && currentIndex < actionCount - 1) {
        currentIndex++;
      }
    } else if (oper == "perv") {
      if (currentIndex > 0) {
        currentIndex--;
      }
    }
    this.setData({
      currentAction: currentIndex
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.saveStartClass();
  }
})