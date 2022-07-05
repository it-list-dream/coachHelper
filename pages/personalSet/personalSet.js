
Page({

  /**
   * 页面的初始数据
   */
  data: {
   coachInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var coachInfo = wx.getStorageSync('coach');
      this.setData({
        coachInfo:coachInfo
      })
  },
  //退出
  exit(){
    wx.showModal({
      title: '',
      content: '是否退出登录？',
      success (res) {
        if (res.confirm) {
          wx.clearStorageSync();

          wx.navigateBack({
            delta: 1
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
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