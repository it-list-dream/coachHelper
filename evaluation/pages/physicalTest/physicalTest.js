// evaluation/pages/physicalTest/physicalTest.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selfInfo: {
      age: 18,
      height: 161,
      weight: 40
    },
    active: 0,
    bodyComposition: {
      compsitionList: [],
      physicalStateList: [{
          physicalName: "血压",
          physicalImage: "./images/blood_pressure.png",
          value: "",
          unit: "mmHg"
        },
        {
          physicalName: "心率",
          physicalImage: "./images/heart_rate.png",
          value: "",
          unit: "bpm"
        },
        {
          physicalName: "胸围",
          physicalImage: "./images/breast.png",
          value: "",
          unit: "cm"
        },
        {
          physicalName: "肩围",
          physicalImage: "./images/headback.png",
          value: "",
          unit: "cm"
        }, {
          physicalName: "腰围",
          physicalImage: "./images/waist.png",
          value: "",
          unit: "cm"
        }, {
          physicalName: "臀围",
          physicalImage: "./images/hip.png",
          value: "",
          unit: "cm"
        }, {
          physicalName: "左上臂围",
          physicalImage: "./images/left_arm.png",
          value: "",
          unit: "cm"
        }, {
          physicalName: "右上臂围",
          physicalImage: "./images/right_arm.png",
          value: "",
          unit: "cm"
        }, {
          physicalName: "左大腿围",
          physicalImage: "./images/left_leg.png",
          value: "",
          unit: "cm"
        }, {
          physicalName: "右大腿围",
          physicalImage: "./images/right_leg.png",
          value: "",
          unit: "cm"
        }, {
          physicalName: "左小腿围",
          physicalImage: "./images/left_shank.png",
          value: "",
          unit: "cm"
        },
        {
          physicalName: "右小腿围",
          physicalImage: "./images/right_shank.png",
          value: "",
          unit: "cm"
        }
      ]
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  nextstep() {
    if (this.data.active == 0) {
      this.setData({
        active: 1
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})