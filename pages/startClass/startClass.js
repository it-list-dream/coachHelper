var service = require('../../utils/request.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: 45 * 60 * 1000,
    timeData: {},
    actionList: [{
        actionName: "四足支撑",
        groupList: []
      },
      {
        actionName: "箭步蹲",
        groupList: []
      },
      {
        actionName: "跪姿卧撑",
        groupList: []
      }
    ],
    //memeList: ['一般', '良好', '优秀'],
    currentAction: 0,
    startInfo: {}
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
      actionList = this.data.actionList,
      actionItem = Object.assign({}, actionList[index].groupList[0]);
    actionItem.status = "";
    actionItem.open = true;
    actionList[index].groupList.push(actionItem)
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
    actionList[actionIndex].groupList[index].status = express;
    actionList[actionIndex].groupList[index].open = false;
    this.setData({
      actionList: actionList
    });
    //this.saveStartClass();
  },
  deleteact(e) {
    let index = e.currentTarget.dataset.index,
      actionIndex = this.data.currentAction,
      actList = this.data.actionList;
    if (actList[actionIndex].groupList.length > 1) {
      actList[actionIndex].groupList.splice(index, 1);
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
    actionList[actionIndex].groupList[currentIndex].open = true;
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
        time = time >cp_time?cp_time:time;
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
    let allList = this.data.actionList,
      newList = [],
      list = [];
    var obj = {},
      count = 0;
    for (let i = 0; i < allList.length; i++) {
      obj = allList[i].groupList[0];
      obj.SM_Count = allList[i].groupList.length;
      list = allList[i].groupList.map(item => {
        var obj = {};
        obj.SS_State = item.status
        if (item.status.length > 0) {
          count++;
        }
        return obj
      });
      obj.ActualCount = count;
      count = 0;
      obj.data = list;
      newList.push(obj);
    }
    var jsonStr = {
      CS_ID: app.globalData.csId || "3245",
      data: newList
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
    this.getAllAction();
    wx.onAppHide(function () {
      that.saveStartClass();
    });
  },
  getAllAction() {
    var actionList = [],
      list = [],
      tList = [];
    let temObj = {};
    service.post('/CoachActLibDetails', {
      co_id: app.globalData.coId || "1769",
      cs_id: app.globalData.csId || "3245",
      gi_id: wx.getStorageSync('gi_id')
    }).then(res => {
      wx.setNavigationBarTitle({
        title: res.data.data[0].CP_Name,
      })
      list = res.data.data[0].data;
      for (let i = 0; i < list.length; i++) {
        temObj = {
          actionName: list[i].SM_Name,
          groupList: []
        };
        for (let j = 0; j < parseInt(list[i].SM_Count); j++) {
          temObj.groupList.push({
            SM_Name: list[i].SM_Name,
            SM_LableName: list[i].SM_LableName,
            SM_Num: list[i].SM_Num,
            SM_Count: parseInt(list[i].SM_Count),
            SM_CountType: list[i].SM_CountType,
            SM_Time: list[i].SM_Time,
            SM_TimeType: list[i].SM_TimeType,
            SM_Rest: list[i].SM_Rest,
            SM_RestType: list[i].SM_RestType,
            SM_Resistance: list[i].SM_Resistance,
            SM_ResistanceType: list[i].SM_ResistanceType,
            SM_Apparatus: list[i].SM_Apparatus,
            FK_AL_ID: list[i].FK_AL_ID,
            Remarks: list[i].Remarks,
            CA_Type: list[i].CA_Type,
            status: "",
            open: true
          })
        }
        tList.push(list[i].SM_Name)
        actionList.push(temObj);
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