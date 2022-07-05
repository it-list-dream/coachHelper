var service = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coachList: [],
    chooseIndex: -1,
    turnMember: [],
    turnClass: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    const eventChannel = this.getOpenerEventChannel()
    // 监听 acceptDataFromOpenerPage 事件，获取上一页面通过 eventChannel 传送到当前页面的数据
    eventChannel.on('trunCoach', function (res) {
      if (res.data.length == 1) {
        that.setData({
          turnClass: res.data[0].CO_Have
        });
      }
      that.setData({
        turnMember: res.data
      })
    });
    this.getCoachList();
  },
  bindPickerChange(e) {
    this.setData({
      chooseIndex: e.detail.value
    })
  },
  getCoachList() {
    service.post('/CoachList', {
      gi_id: wx.getStorageSync('gi_id')
    }).then(res => {
      this.setData({
        coachList: res.data.data
      })
    })
  },
  turnMember(e) {
    let value = e.detail.value;
    this.setData({
      turnClass: value
    })
  },
  turnCoachCommit() {
    let turnMember = this.data.turnMember;
    //多个会员转直接全部将所有课程剩余数量全部转出
    if (this.data.chooseIndex > 0) {
      let coachId = this.data.coachList[this.data.chooseIndex].AI_ID;
      var co_have = "",
        co_id = "";
      if (turnMember.length > 1) {
        co_have = turnMember.map(item => item.CO_Have).join(',');
        co_id = turnMember.map(item => item.co_ID).join(',')
      } else {
        co_have = turnMember[0].CO_Have;
        co_id = turnMember[0].co_ID;
      }
      service.post('/CoachClassTransferSave', {
        co_Id: co_id,
        co_Have: co_have,
        coachId: coachId,
        gi_id: wx.getStorageSync('gi_id')
      }).then(res => {
        wx.showToast({
          icon:"none",
          title: '转课成功',
        });
        setTimeout(()=>{
          wx.navigateBack({
            delta: 1,
          });
        },1500)
         
      })
    } else {
      wx.showToast({
        icon: "none",
        title: '请选择转课教练',
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

  }
})