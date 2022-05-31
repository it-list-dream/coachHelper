// questionnaire/pages/systemQuestion/systemQuestion.js
var service = require('../../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 0,
    questionDetail:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let pageTitle = options.type == 1 ? "基础问卷" : "风险评估";
    wx.setNavigationBarTitle({
      title: pageTitle
    })
    service.post('/QuestDetailedByUser', {
      qr_id: options.qr_id,
      gi_id: wx.getStorageSync('gi_id')
    }).then(res=>{
      this.setData({
        type: options.type,
        questionDetail:res.data.data
      })
    })

  },
  successAll() {
    wx.redirectTo({
      url: 'questionnaire/pages/questionList/questionList',
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

  }
})