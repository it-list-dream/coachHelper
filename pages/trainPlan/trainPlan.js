var service = require('../../utils/request.js');
var util = require('../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageIndex: 0,
    isEnd:false,
    pageTotal:0,
    classList:[],
    custom:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.setData({
       custom:app.globalData.custom
     });
     this.getCustomClass();
  },
  getCustomClass() {
    service.post('/UserCoachClassList', {
      UI_ID:this.data.custom.UI_ID || "3840",
      pageIndex: this.data.pageIndex,
      pageSize: 20,
      gi_id: wx.getStorageSync('gi_id')
    }).then(res=>{
      var list = res.data.data;
      list.forEach(item=>{
        item.Createdate = util.format(item.Createdate,'yyyy.mm.dd');
        item.progress = 100 - parseInt(item.CO_Have / item.CO_Num * 100) 
      });
      this.setData({
        classList:list
      });
    })
  },
  planDetail(e) {
    var classId = e.currentTarget.dataset.coid;
    app.globalData.coId = classId;
    wx.navigateTo({
      url: '/pages/trainPlanDetail/trainPlanDetail?co_id='+classId,
    })
  },
  switchCustom(){
     wx.navigateTo({
       url: '/pages/chooseCustom/chooseCustom?type=5',
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