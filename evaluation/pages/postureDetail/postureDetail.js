// pages/postureDetail/postureDetail.js
var service = require('../../../utils/request.js');
var util = require('../../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postureDetail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    service.post('/StatureDetermineByUser', {
      sd_id: options.sd_id,
      gi_id: wx.getStorageSync('gi_id')
    }).then(res => {
      //console.log(res.data.data)
      var frontList = util.filterFn(res.data.data.front, "FrontImg", "SF_ID"),
        leftList = util.filterFn(res.data.data.left, "LeftImg", "SL_ID"),
        rightList = util.filterFn(res.data.data.right, "RightImg", "SR_ID");
      console.log(frontList, leftList, rightList)
      this.setData({
        postureDetail: res.data.data,
        frontTags: frontList,
        leftTags: leftList,
        rightTags: rightList
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