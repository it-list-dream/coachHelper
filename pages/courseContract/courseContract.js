// pages/courseContract/courseContract.js
const util = require('../../utils/util.js');
var service = require('../../utils/request.js');
var QRCode = require('../../utils/weapp-qrcode.js')
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    showPay: false,
    saleDate: "",
    //日期
    startDate: "2018-01-01",
    lastDate: "2100-01-01",
    formStart: "",
    formEnd: "",
    //订单
    orderList: [],
    //课程总数量
    classAmount: 0,
    allPrice: 0,
    custom: {}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    let nowtime = util.format(new Date(), 'yyyy-mm-dd')
    this.setData({
      saleDate: nowtime,
      custom: app.globalData.custom,
      formStart: app.globalData.custom.UI_FirstDate,
      formEnd: app.globalData.custom.UI_LastDate
    });
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('payOrder', function (res) {
      var order = res.orderInfo,
        sum = 0,
        allPrice = 0;
      order.forEach(item => {
        item.priceList.forEach(price => {
          if (item.courseNum >= price.MinNum && item.courseNum <= price.MaxNum) {
            if (res.isPos == 1) {
              item.price = price.PosPrice;
              item.amount = price.PosPrice * item.courseNum;
            } else {
              item.price = price.SalePrice;
              item.amount = price.SalePrice * item.courseNum;
            }
          }
        })
        allPrice += Number(item.amount);
      });
      sum = order.map(item => item.courseNum).reduce((prev, cur, index) => {
        return prev + cur;
      });
      that.setData({
        orderList: order,
        classAmount: sum,
        allPrice: allPrice
      });
    });
  },
  // 支付方式
  payChange(e) {
    if (this.data.formStart && this.data.formEnd) {
      this.getCoachOrderSave();
    } else {
      wx.showToast({
        icon: "none",
        title: '请选择开始日期或结束日期',
      })
    }
  },
  onClose() {
    this.setData({
      showPay: false
    })
    clearInterval(this.operId);
  },
  //日期
  startDateChange(e) {
    this.setData({
      formStart: e.detail.value
    })
  },
  endDateChange(e) {
    this.setData({
      formEnd: e.detail.value
    });
  },
  getCoachOrderSave() {
    wx.showLoading({
      title: '二维码生成中...',
    })
    let newList = [],
      orderList = this.data.orderList;
    orderList.forEach(item => {
      newList.push({
        CP_ID: item.cp_id,
        CD_Price: item.price,
        CD_Num: item.courseNum,
        CD_Amount: item.amount
      });
    });
    var jsonStr = {
      UI_ID: this.data.custom.UI_ID,
      StartDate: this.data.formStart,
      EndDate: this.data.formEnd,
      SaleDate: this.data.saleDate,
      data: newList
    };
    var body = orderList.map(item => item.cp_name).join(',')
    service.post('/CoachOrderSave', {
      user_token: wx.getStorageSync('token'),
      json: JSON.stringify(jsonStr),
      gi_id: wx.getStorageSync('gi_id')
    }).then(res => {
      // console.log(res)
      let {
        busNo,
        orderAmount,
        orderNo
      } = res.data;
      this.onlinePayment(orderNo, body, orderAmount, busNo);

    });
  },
  checkOrderStatus(orderNo) {
    var that = this;
    this.operId = setInterval(function () {
      service.post('/CoachOrderCheckStatus', {
        orderNo: orderNo,
        user_token: wx.getStorageSync('token'),
        gi_id: wx.getStorageSync('gi_id')
      }).then(res => {
        if (res.data.data[0].OrderStatus == '已付款') {
          that.setData({
            showPay:false
          });
          clearInterval(this.operId);
          wx.redirectTo({
            url: '/pages/others/others',
          })
        }
      })
    }, 2000);
    // setTimeout(function () {
    //   that.orderStatus = "已付款"
    //   console.log('已付款')
    // }, 4000);
  },
  //线上支付
  onlinePayment(orderNo, body, orderAmount, merchantNo) {
    service.post('/GetPayUrlV2', {
      user_token: wx.getStorageSync('token'),
      orderNo: orderNo,
      productId: "1121311",
      //商品信息
      body: body,
      gi_id: wx.getStorageSync('gi_id'),
      sub_mch_id: merchantNo,
      total_fee: orderAmount * 100
    }, 1).then(res => {
      wx.hideLoading();
      new QRCode('canvas', {
        text: res.data.wxPayurl,
        width: 160,
        height: 160,
        colorDark: "black",
        colorLight: "white",
        correctLevel: QRCode.CorrectLevel.H,
      });
      this.setData({
        showPay: true
      });
      this.checkOrderStatus(orderNo);
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
    clearInterval(this.operId);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(this.operId);
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  }
})