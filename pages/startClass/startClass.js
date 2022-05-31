// pages/startClass/startClass.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: 45 * 60 * 1000,
    timeData: {},
    actionList: [
      {
        actionName: "四足支撑",
        groupList: [
          {
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
          }
        ]
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
    currentAction: 0
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
    console.log('定时器结束了!')
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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