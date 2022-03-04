// pages/courseTemplate/courseTemplate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    templateList: [{
      templateId: 1,
      templateName: "女性塑形课程初级",
      courseName: "塑形",
      selected:false
    }, {
      templateId: 2,
      templateName: "女性减脂课程初级",
      courseName: "减脂",
      selected:false
    }, {
      templateId: 3,
      templateName: "增肌课程初级",
      courseName: "增肌",
      selected:false
    }, {
      templateId: 4,
      templateName: "拳击课程初级",
      courseName: "拳击",
      selected:true
    }],
    result1: [{
      templateId: 1,
      templateName: "女性塑形课程初级",
      courseName: "塑形",
      selected:false
    }, {
      templateId: 2,
      templateName: "女性减脂课程初级",
      courseName: "减脂",
      selected:false
    }],
    list: ['a', 'b', 'c'],
    result: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onChange(event) {
    this.setData({
      result: event.detail,
    });
     console.log(111,event)
  },
  toggle(event) {
    const {
      index
    } = event.currentTarget.dataset;
    const checkbox = this.selectComponent(`.checkboxes-${index}`);
    console.log(checkbox)
    checkbox.toggle();
  },
  noop() {},

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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})