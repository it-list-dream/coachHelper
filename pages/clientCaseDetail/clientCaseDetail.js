var service = require('../../utils/request.js')
const app = getApp();
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ishowPeroid: false,
    cycleText: "周期时间由短到长",
    sort: 1,
    custDeatil: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCustCaseDetail(options.custTitle);
    this.custTitle = options.custTitle;
    wx.setNavigationBarTitle({
      title: options.custTitle + '案例',
    });
  },
  achievement(e) {
    let cust = e.currentTarget.dataset.cust;
    let {
      UI_Name,
      SC_Name,
      UI_Sex,
      UI_Phone,
      UI_Face,
      UI_ID
    } = e.currentTarget.dataset.cust;
    app.globalData.isCase = true;
    app.globalData.custom = {
      UI_Name,
      SC_Name,
      UI_Sex,
      UI_Phone,
      UI_Face,
      UI_ID
    }
    wx.navigateTo({
      url: `/evaluation/pages/fitnessContrastReport/fitnessContrastReport?cc_id=${cust.cc_id}&id=${cust.data[0].ReportId}&id2=${cust.data[1].ReportId}`,
    })
  },
  chooseTime(e) {
    this.setData({
      ishowPeroid: !this.data.ishowPeroid
    })
  },
  peroidSort(e) {
    let index = parseInt(e.currentTarget.dataset.index) + 1,
      peroid = e.currentTarget.dataset.text;
    this.setData({
      ishowPeroid: false,
      cycleText: peroid,
      sort: index
    })
    this.getCustCaseDetail(this.custTitle)
  },
  getCustCaseDetail(cTitle) {
    service.post('/CustCaseList', {
      label: cTitle,
      sort: this.data.sort,
      gi_id: wx.getStorageSync('gi_id')
    }).then(res => {
      let list = res.data.data;
      for (let i = 0; i < list.length; i++) {
        for (let j = 0; j < list[i].data.length; j++) {
          //console.log(list[i].data[j].StartDate)
          list[i].data[j].StartDate = util.format(list[i].data[j].StartDate, 'yyyy.mm.dd');
        }
      }
      this.setData({
        custDeatil: res.data.data
      });
    });
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