var service = require('../../utils/request.js');
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList: ['生日提醒', '进场提醒', '课程到期提醒'],
    active: 0,
    scrollHeight: 0,
    newsList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: (result) => {
        this.queryMultipleNodes(result.windowHeight);
      },
    });
    this.getBirthdayTip();
  },
  queryMultipleNodes(height) {
    let scrollHeight = this.data.scrollHeight;
    const query = wx.createSelectorQuery()
    query.select('#tabs').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec((res) => {
      console.log(height, res[0].height)
      scrollHeight = height - res[0].height - 15;
      this.setData({
        scrollHeight: scrollHeight
      })
    })
  },
  getBirthdayTip() {
    service.post('/UserBirthdayTip', {
      gi_id: wx.getStorageSync('gi_id')
    }).then(res => {
      this.setData({
        newsList: res.data.data
      })
    })
  },
  getUserCoachExpireTip() {
    service.post('/UserCoachExpireTip', {
      gi_id: wx.getStorageSync('gi_id')
    }).then(res => {
      let list = res.data.data;
      list.forEach(item=>{
        item.CO_ActiveEnd = util.format( item.CO_ActiveEnd,'yyyy-mm-dd');
      });
      this.setData({
        newsList: list
      })
    })
  },
  getUserChcekInTip() {
    service.post('/UserChcekInTip', {
      gi_id: wx.getStorageSync('gi_id')
    }).then(res => {
      let list = res.data.data;
      list.forEach(item=>{
        item.time = util.format( item.Createdate,'yyyy-mm-dd hh:mm').substr(11);
      });
      this.setData({
        newsList: list
      })
    })
  },
  tabChange(e) {
    let index = e.detail.index;
    if(this.data.active != index){
      if(index == 0){
          this.getBirthdayTip();
      }else if(index == 1){
        this.getUserChcekInTip()
      }else{
        this.getUserCoachExpireTip();
      }
      this.setData({
        active: e.detail.name
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