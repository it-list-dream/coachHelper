// pages/selectStore/selectStore.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
       brandList:[
         {
          brandName:'如渔科技',
          brandCount:2,
          gymList:[
            {
              gymName:"徐汇店",
              gymAddress:"上海市徐汇区永升大厦4层",
              isSelf:false
            },
            {
              gymName:"银都店",
              gymAddress:"上海市闵行区IF如果B栋402",
              isSelf:false
            }
          ]
       },
       {
        brandName:'帕姆猫健身',
        brandCount:3,
        gymList:[
          {
            gymName:"徐帕姆猫健身(嘉里不夜城店)",
            gymAddress:"上海市静安区梅园路277号102-1(201-203室)",
            isSelf:true
          },
          {
            gymName:"帕姆猫健身游泳(徐汇天然居)",
            gymAddress:"上海市徐汇区百色路206号",
            isSelf:false
          },
          {
            gymName:"帕姆猫健身(普陀区长风大悦城店)",
            gymAddress:"上海市普陀区大渡河路长风大悦城4楼",
            isSelf:false
          }
        ]
     }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})