// pages/trainPlanDetail/trainPlanDetail.js
const app = getApp();
var service = require("../../utils/request.js");
var util = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classDetail: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.coId = options.co_id;
    // this.caId = options.ca_id;
    //console.log(options.co_id)
    console.log(app)
    this.setData({
      custom: app.globalData.custom
    });
  },
  // 状态
  templateType: function (e) {
    var type = e.currentTarget.dataset.type;
    app.globalData.isExportTemplate = type;
    let myList = this.data.classDetail;
    var newList = [];
    if (type == 1) {
      for (let i = 0; i < myList.length; i++) {
        myList[i].selected = false;
        if (myList[i].CS_ID > 0) {
          newList.push(myList[i]);
        }
      }
    } else if (type == 2) {
      newList = myList.filter(item => item.CS_State == "预约中")
    }
    app.globalData.temIdList = newList;
    // app.globalData.coId = this.coId;
    console.log(app.globalData.coId )
    wx.navigateTo({
      url: '/pages/courseTemplate/courseTemplate'
    });
  },
  // 
  getClassStatus(className) {
    service.post('/CoachActLibDetails', {
      co_id: app.globalData.coId,
      cs_id: app.globalData.csId,
      gi_id: wx.getStorageSync('gi_id')
    }).then(res => {
      var list = res.data.data;
      if (list.length > 0) {
        wx.navigateTo({
          url: '/pages/haveClass/haveClass',
        })
      } else {
        wx.navigateTo({
          url: `/pages/editCourse/editCourse?courseName=${className}`,
        });
      }
    })
  },
  newcurriculum(e) {
    //co_id在修改动作库时候传递
    let cs_id = e.currentTarget.dataset.csid,
      className = e.currentTarget.dataset.ctitle,
      cList = this.data.classDetail,
      index = e.currentTarget.dataset.index,
      isReady = e.currentTarget.dataset.isready;
    app.globalData.csId = cs_id;
    if (cs_id == 0) {
      wx.showToast({
        icon: "none",
        title: '你还未预约，请先去预约',
      })
      return;
    }
    if (isReady == 1) {
      wx.navigateTo({
        url: '/pages/startClass/startClass',
      })
      return;
    }
    if (cList[index].CS_State == "已完成") {
      wx.navigateTo({
        url: '/pages/trainConfrim/trainConfrim',
      });
    } else {
      //根据ca_id区分到那个页面
      this.getClassStatus(className);
    }
  },
  appointmentList(co_id) {
    service.post('/CoachClassListAappoint', {
      co_id: co_id,
      gi_id: wx.getStorageSync('gi_id')
    }).then(res => {
      var list = res.data.data;
      list.forEach(item => {
        if (item.CS_Spenddate) {
          item.time = util.format(item.CS_Spenddate, 'yyyy-mm-dd hh:mm').substr(11, 16)
        }
      });
      this.setData({
        classDetail: list
      })
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
    this.appointmentList(app.globalData.coId);
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