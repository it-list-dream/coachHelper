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
        groupList: [{
          actionCount: '20次',
          instrumentWeight: "--",
          restTime: '20s',
          instrument: "--",
          statusIndex: -1,
          open: true
        }, {
          actionCount: '20次',
          instrumentWeight: "--",
          restTime: '20s',
          instrument: "--",
          statusIndex: -1,
          open: true
        }, {
          actionCount: '20次',
          instrumentWeight: "--",
          restTime: '20s',
          instrument: "--",
          statusIndex: -1,
          open: true
        }]
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
    memeList: ['一般', '良好', '优秀'],
    currentAction: 0,
    startInfo: {}
  },

  onChange(e) {
    this.setData({
      timeData: e.detail,
    });
  },
  finish() {
    wx.showModal({
      title: '提示',
      content: '确定要结束课程吗?',
      success(res) {
        if (res.confirm) {
          // console.log('用户点击确定')
          wx.navigateTo({
            url: '/pages/trainConfrim/trainConfrim',
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  gameover() {
    console.log('定时器结束了!');

  },
  //查看所有
  lookallAction() {

  },
  estimate(e) {
    let index = e.currentTarget.dataset.index,
      currentIndex = e.currentTarget.dataset.current,
      actionIndex = this.data.currentAction,
      actionList = this.data.actionList;
    actionList[actionIndex].groupList[currentIndex].statusIndex = index;
    actionList[actionIndex].groupList[currentIndex].open = false;
    this.setData({
      actionList: actionList
    })
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
    service.post('/StartClass', {
      CS_ID: app.globalData.csId || "3245",
      gi_id: wx.getStorageSync('gi_id')
    }).then(res => {
      this.setData({
        startInfo: res.data.data[0],
        time: res.data.data[0].CP_Time * 60 * 1000
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getStartClass();
    this.getAllAction();
  },
  getAllAction() {
    var actionList = [],
      list = [];
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
          groupList:[]
        };
        for (let j = 0; j < list[i].SM_Count; j++) {
          temObj.groupList.push({
            SM_Name:list[i].SM_Name,
            SM_LableName:list[i].SM_LableName,
            SM_Num
          })
        }
      }
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

  }
})