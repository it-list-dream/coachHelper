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
    titleList: []
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
            wx.navigateTo({
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
    this.saveStartClass(function () {
      wx.navigateTo({
        url: '/pages/trainConfrim/trainConfrim',
      });
    });
  },
  addactionGroup(e) {
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
    let time,
      cp_time = 0;
    service.post('/StartClass', {
      CS_ID: app.globalData.csId || "3245",
      gi_id: wx.getStorageSync('gi_id')
    }).then(res => {
      time = Date.now() - new Date(res.data.data[0].StartDate).getTime();
      cp_time = res.data.data[0].CP_Time;
      time = parseInt(time / 1000 / 60);
      if (time > cp_time) {
        time = cp_time * 60 * 1000
      } else {
        time = time > cp_time ? cp_time : time;
        time = (cp_time - time) * 60 * 1000;
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
          titleList:tList
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
      if (actionCount > 2 && currentIndex < actionCount - 1) {
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
    // console.log('sdd')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  }
})