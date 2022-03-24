// pages/courseTemplate/courseTemplate.js
const app = getApp();
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
    isOpen: false,
    templateValue: "",
    //判断是导出还是导入
    templateType: '',
    exportList: [{
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
    }]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  chooseTemplate(e) {
    let classes = e.currentTarget.dataset.template;
    let templateList = this.data.templateList;
    for (var i = 0; i < templateList.length; i++) {
      if (classes.templateName == templateList[i].templateName) {
        templateList[i].selected = true;
      } else {
        templateList[i].selected = false;
      }
    }
    this.setData({
      templateList: templateList
    })
  },
  templateConfrim() {
    this.setData({
      isOpen: true
    })
  },
  closePopup() {
    this.setData({
      isOpen: false
    })
  },
  success(e) {
    this.setData({
      isOpen: false,
      templateValue: e.detail.value
    })
    wx.showToast({
      title: '保存成功',
      icon: "success",
      mask: true,
      duration: 1500,
      success: function (res) {
        setTimeout(() => {
          wx.navigateBack({
            delta: 1,
          })
        }, 1500)
      }
    })
  },
  //导出
  exportTemplate(e) {
    console.log(e)
    let template = e.currentTarget.dataset.template;
    let exportList = this.data.exportList;
    for (var j = 0; j < exportList.length; j++) {
      if (template.templateName == exportList[j].templateName) {
        exportList[j].selected = !exportList[j].selected;
      }
    }
    this.setData({
      exportList: exportList
    })
  },
  exportConfrim() {
    wx.navigateBack({
      delta: 1,
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
    console.log(app.globalData.isExportTemplate)
    let isExportTemplate = app.globalData.isExportTemplate;
    let navigationBarTitle = isExportTemplate ? '选择导入模板' : '选择课程存为模板';
    wx.setNavigationBarTitle({
      title: navigationBarTitle
    })
    this.setData({
      templateType: navigationBarTitle
    })
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