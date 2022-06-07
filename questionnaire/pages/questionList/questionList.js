var service = require('../../../utils/request.js');
const util = require('../../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    scrollHeight: 0,
    //问卷
    questionList: [],
    //风险评估
    riskAssessList: [],
    custom: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: (result) => {
        this.queryMultipleNodes(result.windowHeight);
      },
    })
  },
  getQuestList(ui_id) {
    service.post('/QuestListByUser', {
      UI_ID: ui_id,
      gi_id: wx.getStorageSync('gi_id')
    }).then(res => {
      let qList = res.data.data;
      qList.forEach(item => {
        item.q = '/questionnaire/pages/systemQuestion/systemQuestion?type=1&qr_id=' + item.QR_ID;
        item.Createdate = util.format(item.Createdate, 'yyyy.mm.dd');
      })
      this.setData({
        questionList: qList
      })
    })
  },
  getRiskAssessment(ui_id) {
    service.post('/RiskAssessmentByUser', {
      UI_ID: ui_id,
      gi_id: wx.getStorageSync('gi_id')
    }).then(res => {
      let qList = res.data.data;
      qList.forEach(item => {
        item.q = '/questionnaire/pages/systemQuestion/systemQuestion?type=2&qr_id=' + item.QR_ID;
        item.Createdate = util.format(item.Createdate, 'yyyy.mm.dd');
      })
      this.setData({
        riskAssessList: qList
      })
    })
  },
  onChange(e) {
    let activeIndex = e.detail.name;
    if (this.data.active == activeIndex) {
      return;
    }
    if (activeIndex == 0) {
      this.getQuestList(app.globalData.custom.UI_ID);
    } else {
      this.getRiskAssessment(app.globalData.custom.UI_ID);
    }
    this.setData({
      active: e.detail.name
    })
  },
  queryMultipleNodes(height) {
    let scrollHeight = this.data.scrollHeight;
    const query = wx.createSelectorQuery()
    query.select('#tabs').boundingClientRect()
    query.exec((res) => {
      scrollHeight = height - res[0].height - 170;
      this.setData({
        scrollHeight: scrollHeight,
        custom: app.globalData.custom
      })
    })
  },
  deleteQuestion(e) {
    var that = this;
    let qr_id = e.currentTarget.dataset.id,
      questionList = this.data.questionList,
      riskAssessList = this.data.riskAssessList;
    wx.showModal({
      title: '',
      content: '确定要删除该基础问卷吗？',
      success(res) {
        if (res.confirm) {
          if (that.data.active == 0) {
            that.deleteQuestionOrRisk(qr_id, function () {
              questionList.splice(questionList.findIndex(item => item.QR_ID == qr_id), 1);
              that.setData({
                questionList: questionList
              });
              wx.showToast({
                icon:"none",
                title: '删除成功',
              });
            });
          } else if (that.data.active == 1) {
            that.deleteQuestionOrRisk(qr_id,function(){
              riskAssessList.splice(questionList.findIndex(item => item.QR_ID == qr_id), 1);
              that.setData({
                riskAssessList: riskAssessList
              })
              wx.showToast({
                icon:"none",
                title: '删除成功',
              });
            });
          }
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  deleteQuestionOrRisk(qr_id, callback) {
    service.post('/QuestRiskAssessmentDel', {
      qr_id: qr_id,
      gi_id: wx.getStorageSync('gi_id')
    }).then(res => {
      callback && callback();
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  defaultquestion() {
    wx.navigateTo({
      url: '/questionnaire/pages/systemQuestion/systemQuestion',
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //问卷列表
    this.getQuestList(app.globalData.custom.UI_ID);
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