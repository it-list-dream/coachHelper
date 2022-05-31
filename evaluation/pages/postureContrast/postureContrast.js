// pages/postureContrast/postureContrast.js
var service = require('../../../utils/request.js');
var util = require('../../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
     assementVs:{},
     assementVs2:{},
     assementFrontTags:[],
     assementLeftTags:[],
     assementRightTags:[],
     assement2FrontTags:[],
     assement2LeftTags:[],
     assement2RightTags:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     service.post('/StatureDetermineByVS',{
      sd_id:options.sd_id,
      sd_id1:	options.sd_id2,
      gi_id:wx.getStorageSync('gi_id')
     }).then(res=>{
      var frontList = util.filterFn(res.data.data.front, "FrontImg", "SF_ID"),
      leftList = util.filterFn(res.data.data.left, "LeftImg", "SL_ID"),
      rightList = util.filterFn(res.data.data.right, "RightImg", "SR_ID"),
      frontList2 = util.filterFn(res.data.data1.front, "FrontImg", "SF_ID"),
      leftList2 = util.filterFn(res.data.data1.left, "LeftImg", "SL_ID"),
      rightList2 = util.filterFn(res.data.data1.right, "RightImg", "SR_ID")
        this.setData({
          assementVs:res.data.data,
          assementVs2:res.data.data1,
          assementFrontTags:frontList,
          assementLeftTags:leftList,
          assementRightTags:rightList,
          assement2FrontTags:frontList2,
          assement2LeftTags:leftList2,
          assement2RightTags:rightList2
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