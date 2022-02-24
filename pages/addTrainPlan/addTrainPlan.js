// pages/addTrainPlan/addTrainPlan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    customInfo: {
      name: "娜娜",
      planName: "娜娜的训练计划",
      picture: "",
      isDisabled:true
    },
    classesList: [],
    classesIndex:-1,
    classesTypeList:['女性塑形课程','健身入门课程','运动康复课程','增肌课程','廋身课程'],
    typeIndex:-1
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let cList = this.data.classesList;
    for (let i = 1; i <= 100; i++) {
      cList.push(i)
    }
    this.setData({
      classesList: cList
    })
  },
  setClassName(e) {
    let classesName = e.detail.value;
    let str = "customInfo.planName";
    this.setData({
      [str]: classesName
    })
  },
  classNumber(e){
    this.setData({
      classesIndex:e.detail.value
    })
  },
  setClassType(e){
    this.setData({
      typeIndex:e.detail.value
    })
  },
  setCustomName(){
    let flag = this.data.customInfo.isDisabled;
     this.setData({
       "customInfo.isDisabled": !flag
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