// pages/trainning/trainning.js
const app = getApp();
var service = require('../../utils/request.js');
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    custom: {},
    trainProgramme: [],
    hideRound: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      custom: app.globalData.custom
    })
    this.getTrainProgramme();
  },
  getTrainProgramme() {
    service.post('/TrainProgrammeList', {
      UI_ID: app.globalData.custom.UI_ID || 4233,
      gi_id: wx.getStorageSync('gi_id')
    }).then(res => {
      let handleList = res.data.data;
      handleList.forEach(item => {
        item.Createdate = util.format(item.Createdate, 'yyyy.mm.dd');
        item.Answer = item.Answer.split(',').join('、')
      });
      this.setData({
        trainProgramme: handleList
      })
    })
  },
  trainDetail(e) {
    let rd_id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/trainReport/trainReport?rd_id=' + rd_id,
    })
  },
  deleteTrainProgramme(rd_id) {
    var programemeList = this.data.trainProgramme;
    service.post('/TrainProgrammeDel', {
      rd_Id: rd_id,
      gi_id: wx.getStorageSync('gi_id')
    }).then(res => {
      programemeList.splice(programemeList.findIndex(item => item.rd_id == rd_id), 1);
      this.setData({
        trainProgramme: programemeList
      })
    })
  },
  trainDelete(e) {
    var id = e.currentTarget.dataset.rdid,
      that = this;
    wx.showModal({
      title: '',
      content: '确定要删除该训练方案吗？',
      confirmColor: "#FF3131",
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定');
          that.deleteTrainProgramme(e.currentTarget.dataset.rdid);
        } else if (res.cancel) {
          // that.selectComponent(`#swipe-cell${id}`).close();
          console.log('用户点击取消')
        }
      }
    });
    this.setData({
      hideRound: false
    })
  },
  trainEdit(e) {
    var id = e.currentTarget.dataset.rdid;
    wx.navigateTo({
      url: '/pages/newtrainProgram/newtrainProgram?isEdit=1&rdId=' + id,
    });
  },
  addscheme() {
    wx.navigateTo({
      url: '/pages/referenceData/referenceData',
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

  }
})