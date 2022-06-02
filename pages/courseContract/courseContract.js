// pages/courseContract/courseContract.js
const util = require('../../utils/util.js');
var service = require('../../utils/request.js')
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    showPay: false,
    //日期
    startDate: "2018-01-01",
    lastDate: "2100-01-01",
    saleDate: "",
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
      custom: app.globalData.custom
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
      this.setData({
        showPay: true
      })
    } else {
      wx.showToast({
        icon: "none",
        title: '请选择开始日期或结束日期',
      })
      return
    }
    //轮询判断是否付款
    this.getCoachOrderSave();
  },
  onClose() {
    this.setData({
      showPay: false
    })
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
    let newList = [],
      orderList = this.data.orderList;
    orderList.forEach(item => {
      newList.push({
        CP_ID: item.cp_id,
        CD_Price: item.price,
        CD_Num: item.courseNum,
        CD_Amount: item.amount
      });
    })
    var jsonStr = {
      UI_ID: this.data.custom.UI_ID,
      StartDate: this.data.formStart,
      EndDate: this.data.formEnd,
      SaleDate: this.data.saleDate,
      data: newList
    };
    service.post('/CoachOrderSave', {
      user_token: wx.getStorageSync('token'),
      json: JSON.stringify(jsonStr),
      gi_id: wx.getStorageSync('gi_id')
    }).then(res => {
      console.log(res)
      let {
        busNo,
        orderAmount,
        orderNo
      } = res.data;
       // this.checkOrderStatus(orderNo)
    });
  },
  checkOrderStatus(orderNo) {
    if(operId && this.orderStatus == '已完成'){
        clearInterval(operId);
    }else{
      var operId =  setInterval(function(){
        service.post('/CoachOrderCheckStatus', {
          orderNo: orderNo,
          user_token: wx.getStorageSync('token'),
          gi_id: wx.getStorageSync('gi_id')
        }).then(res => {
            this.orderStatus = res.data.OrderStatus;
        })
        },2000);
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

  }
})