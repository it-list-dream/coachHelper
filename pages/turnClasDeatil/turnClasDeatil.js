var service = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    memberList: [],
    turnClassMember: null,
    turnNumber: 0,
    giveMember: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let member = JSON.parse(options.member)
    this.setData({
      turnClassMember: member,
      turnNumber: member.CO_Have
    });
  },

  bindPickerChange(e) {
    this.setData({
      chooseIndex: e.detail.value
    });
  },
  changeClassNum(e) {
    this.setData({
      turnNumber: e.detail.value
    })
  },
  selectmember() {
    wx.navigateTo({
      url: '/pages/selectMember/selectMember',
    });
  },
  turnCommit() {
    let giveMember = this.data.giveMember;
    if(giveMember){
      service.post('/UserTransferClass', {
        newUi_Id: this.data.giveMember.UI_ID,
        co_Id: this.data.turnClassMember.co_ID,
        oldUi_Id: this.data.turnClassMember.UI_ID,
        co_Have: this.data.turnNumber,
        gi_id: wx.getStorageSync('gi_id')
      }).then(res => {
        let pages = getCurrentPages();
        let prevpage = pages[pages.length - 2];
        prevpage.setData({
          memberList:[],
          select:-1,
          pageIndex:1,
          isEnd:false
        });
        prevpage.getUserList();
        wx.showToast({
          icon: "none",
          title: '转课成功',
        })
        setTimeout(() => {
          wx.navigateBack({
            delta: 1,
          })
        }, 1500)
      })
    }else{
      wx.showToast({
        icon:"none",
        title: '请选择要转课的会员',
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