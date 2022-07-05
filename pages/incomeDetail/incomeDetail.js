// pages/incomeDetail/incomeDetail.js
const util = require('../../utils/util.js');
var service = require('../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startTime: '2018-01-01', //默认起始时间  
    endTime: '', //默认结束时间 
    pageIndex: 1,
    isEnd: false,
    searchText: "",
    salesAmount:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let nowdate = util.format(new Date(), 'yyyy-mm-dd');
    let yesterday = util.yesterday(new Date());
    this.setData({
      endTime: nowdate,
      startTime: yesterday,
      distime: nowdate,
    });
    //排行
    this.getTeachamount();
    this.getSalesAmount();
  },
  bindDateChange: function (e) {
    this.setData({
      startTime: e.detail.value
    })
    this.repSales();
    this.getTeachamount();
  },
  bindDateChange2: function (e) {
    this.setData({
      endTime: e.detail.value
    });
    this.repSales();
    this.getTeachamount();
  },
  getTeachamount() {
    service.post('/RepMoneyCurrentMonth', {
      StartDate: this.data.startTime,
      EndDate: this.data.endTime,
      gi_id: wx.getStorageSync('gi_id')
    }).then(res => {
      let list = res.data.data;
      list.forEach(item => {
        item.AllMoney = Math.floor(item.AllMoney)
      })
      this.setData({
        teachList: list
      });
    })
  },
  getSalesAmount() {
    service.post('/RepSalesAmount', {
      StartDate: this.data.startTime,
      EndDate: this.data.endTime,
      pageIndex: this.data.pageIndex,
      pageSize: 20,
      //搜索 
      name: this.data.searchText,
      gi_id: wx.getStorageSync('gi_id')
    }).then(res => {
      let list = res.data.data,
        mylist = this.data.salesAmount;
      if (list.length > 0) {
        for (var i = 0; i < list.length; i++) {
          list[i].Money = Math.floor(list[i].Money)
          list[i].firstname = list[i].UI_Name.slice(0, 1)
          list[i].CreateDate = util.format(list[i].CreateDate, 'yyyy-mm-dd');
        }
        mylist = mylist.concat(list)
        this.setData({
          salesAmount: mylist
        });
      } else {
        this.setData({
          isEnd: true
        })
      }
    });
  },
  onClear() {
    this.setData({
      searchText: ""
    })
  },
  repSales() {
    this.data.pageIndex = 1;
    this.data.isEnd = false;
    this.data.salesAmount = [];
    service.post('/RepSalesAmount', {
      StartDate: this.data.startTime,
      EndDate: this.data.endTime,
      pageIndex: 1,
      pageSize: 20,
      //搜索 
      name: this.data.searchText,
      gi_id: wx.getStorageSync('gi_id')
    }).then(res => {
      let list = res.data.data;
      for (var i = 0; i < list.length; i++) {
        list[i].Money = Math.floor(list[i].Money)
        list[i].firstname = list[i].UI_Name.slice(0, 1)
        list[i].CreateDate = util.format(list[i].CreateDate, 'yyyy-mm-dd');
      }
      this.setData({
        salesAmount: list
      })
    });
  },
  onChange(e) {
    this.setData({
      searchText: e.detail,
      pageIndex: 1
    });
    this.repSales();
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
    let pageIndex = this.data.pageIndex;
    if (!this.data.isEnd) {
      pageIndex++;
      this.setData({
        pageIndex: pageIndex
      });
      this.getSalesAmount()
    }
  }
})