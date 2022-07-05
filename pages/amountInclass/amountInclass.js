const util = require('../../utils/util.js');
var service = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startTime: '2018-01-01', //默认起始时间  
    endTime: '', //默认结束时间 
    pageIndex: 1,
    searchText: "",
    distime: "",
    isEnd: false,
    amountList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 得到当前日期
    let nowdate = util.format(new Date(), 'yyyy-mm-dd')
    let yesterday = util.yesterday(new Date());
    this.setData({
      endTime: nowdate,
      startTime: yesterday,
      distime: nowdate,
    });
    this.getClassamount();
  },
  getClassamount() {
    service.post('/CoachSpendList', {
      StartDate: this.data.startTime,
      EndDate: this.data.endTime,
      pageIndex: this.data.pageIndex,
      pageSize: 20,
      searchText: "",
      gi_id: wx.getStorageSync('gi_id')
    }).then(res => {
      let list = res.data.data,
        myList = this.data.amountList;
      if (list.length > 0) {
        for (let i = 0; i < list.length; i++) {
          list[i].AllMoney = Math.floor(list[i].AllMoney)
          list[i].CS_Money = Math.floor(res.data.data[i].CS_Money)
          list[i].firstname = list[i].UI_Name.slice(0, 1);
        }
        myList = [...myList, ...list];
        this.setData({
          amountList: myList,
          allMoney: list[0].AllMoney,
          allNum: list[0].AllNum
        });
      } else {
        this.setData({
          isEnd: true
        })
      }
    })
  },
  getspend(e) {
    this.data.pageIndex = 1;
    this.data.amountList = [];
    this.data.isEnd = false;
    service.post('/CoachSpendList', {
      StartDate: this.data.startTime,
      EndDate: this.data.endTime,
      pageIndex: 1,
      pageSize: 20,
      searchText: this.data.searchText,
      gi_id: wx.getStorageSync('gi_id')
    }).then(res => {
      for (var i = 0; i < res.data.data.length; i++) {
        res.data.data[i].AllMoney = Math.floor(res.data.data[i].AllMoney)
        res.data.data[i].CS_Money = Math.floor(res.data.data[i].CS_Money)
        res.data.data[i].firstname = res.data.data[i].UI_Name.slice(0, 1)
      }
      this.setData({
        amountList: res.data.data
      });
    });
  },
  onChange(e) {
    this.setData({
      searchText: e.detail
    });
    this.getspend();
  },
  onClear() {
    this.setData({
      searchText: ""
    });
  },
  bindDateChange: function (e) {
    this.setData({
      startTime: e.detail.value
    });
    this.getspend();
  },
  bindDateChange2: function (e) {
    this.setData({
      endTime: e.detail.value
    })
    this.getspend();
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
      this.getClassamount();
    }
  }
})