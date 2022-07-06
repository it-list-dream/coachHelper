var service = require('../../utils/request.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    appoinmentStatus: "去上课",
    navTitle: "",
    warmUpList: [],
    relaxList: [],
    officialList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
   // console.log(options)
    if (options.cs_id == 0) {
      this.setData({
        appoinmentStatus: "去预约"
      })
    }
    this.getActLibDetails(app.globalData.coId,app.globalData.csId)
  },
  getActLibDetails(co_id, cs_id) {
    var warmUpList = [],
      relaxList = [],
      officialList = [];
    service.post('/CoachActLibDetails', {
      co_id: co_id,
      cs_id: cs_id,
      gi_id: wx.getStorageSync('gi_id')
    }).then(res => {
      var list = res.data.data[0].data;
      list.forEach(item => {
        if (item.CA_Type == 1) {
          warmUpList.push(item)
        } else if (item.CA_Type == 2) {
          officialList.push(item)
        } else if (item.CA_Type == 3) {
          relaxList.push(item)
        }
      })
      this.setData({
        navTitle: res.data.data[0].CP_Name,
        warmUpList,
        officialList,
        relaxList
      });
     
      app.globalData.navTitle = res.data.data[0].CP_Name;
      this.CS_ID = res.data.data[0].CS_ID;
      this.CO_ID = res.data.data[0].CO_ID;
      wx.setNavigationBarTitle({
        title: res.data.data[0].CP_Name
      })
    })
  },
  gohaveClass() {
    if(this.data.appoinmentStatus=="去上课"){
      wx.navigateTo({
        url: '/pages/preparationClass/preparationClass',
      })       
    }else{
      wx.redirectTo({
        url: '/pages/addAppointment/addAppointment?type=0',
      });
    }
  },
  editclasses() {
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    if (prevPage.route == 'pages/editCourse/editCourse') {
      wx.navigateBack({
        delta: 1
      });
    }else{
      wx.navigateTo({
        url: `/pages/editCourse/editCourse?csID=${this.CS_ID}&coId=${this.CO_ID}`,
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