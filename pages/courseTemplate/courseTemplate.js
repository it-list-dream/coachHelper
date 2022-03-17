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
      selected: false
    }, {
      templateId: 2,
      templateName: "女性减脂课程初级",
      courseName: "减脂",
      selected: false
    }, {
      templateId: 3,
      templateName: "增肌课程初级",
      courseName: "增肌",
      selected: false
    }, {
      templateId: 4,
      templateName: "拳击课程初级",
      courseName: "拳击",
      selected: false
    }],
    isShow:false,
    templateValue:""
  },
  onClose(){
    this.setData({
      isShow:false
    })
  },
  onCancel(){
    this.setData({
      isShow:false,
      templateValue:""
    })
  },
  getTemplateName(e){
      this.setData({
        templateValue:e.detail.value
      })
  },
  templateconfrim(){
    this.setData({
      isShow:true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  chooseTemplate(e) {
    let classes =  e.currentTarget.dataset.template;
    console.log(classes)
    let templateList = this.data.templateList;
    for (var i = 0; i < templateList.length; i++) {
        if(classes.templateName == templateList[i].templateName){
          templateList[i].selected = true;
        }else{
          templateList[i].selected = false;
        }
    }
    this.setData({
      templateList:templateList
    })
  },
  //保存
  save(){
    wx.navigateTo({
      url:"/pages/trainPlanDetail/trainPlanDetail"
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