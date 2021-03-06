var service = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
   togetherList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let gi_id = wx.getStorageSync('gi_id');
    service.post('/CardTogetherList', {
      gi_id: gi_id
    }).then(res=>{
      console.log(res);
       this.setData({
        togetherList:res.data.data
       })
    })
  },
// 预览图片
previewBigImage(e) {
  let imgs = this.data.togetherList.map(item=>item.imgurl);
  let {index} = e.currentTarget.dataset;
  wx.previewImage({
    //当前显示图片
    current: imgs[index],
    //所有图片
    urls: imgs
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