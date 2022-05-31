// pages/chooseCustom/chooseCustom.js
const app = getApp();
var service = require('../../utils/request.js');
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: "",
    currentActive: 1,
    //tablist
    tabsList: ['最近联系', '全部客户'],
    allmemberList: [],
    recentlyList: [],
    tabsHeight: 0,
    //搜索
    pageIndex: 1,
    pageSize: 12,
    isEnd: false,
    searchText: "",
    totalPages: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.type = options.type;
    const query = wx.createSelectorQuery();
    query.select('.serach-box').boundingClientRect()
    query.exec(function (res) {
      that.setData({
        searchHeight: res[0].height
      })
    })
    //全部
    this.getCustomList();
    console.log(options)
  },
  swichNav: function (res) {
    if (this.data.currentActive == res.detail.currentNum) return;
    this.setData({
      pageIndex: 1,
      isEnd: false,
      currentActive: res.detail.currentNum
    })
  },
  addPeople() {
    wx.navigateTo({
      url: '/pages/addCustom/addCustom',
    })
  },
  getTabHeight(e) {
    this.setData({
      tabsHeight: e.detail.height
    })
  },
  selectCustom(e) {
    app.globalData.custom = e.currentTarget.dataset.member;
    //0 问卷 1 体适能 2 静态评估
    switch (parseInt(this.type)) {
      case 0:
        wx.navigateTo({
          url: '/questionnaire/pages/questionList/questionList',
        });
        break;
      case 1:
        //体适能
        break;
      case 2:
        wx.navigateTo({
          url: '/evaluation/pages/postureAssessment/postureAssessment',
        });
        break;
      case 3:
        wx.navigateTo({
          url: '/pages/trainning/trainning'
        });
        break;
      case 4:
        wx.navigateTo({
          url: '/pages/coursePlanning/coursePlanning',
        });
        break;
      default:
        console.log('其他')
    }
  },
  //搜索
  seachChange: util.throttle(function (e) {
    // console.log(e)
    this.setData({
      searchText: e.detail
    })
    this.getCustomSeach();
  }, 500),
  seachCancel() {
    this.setData({
      searchText: ""
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  //获取所有会员的列表
  getCustomList() {
    let allList = this.data.allmemberList;
    var jsonStr = {
      gi_id: wx.getStorageSync('gi_id'),
      searchText: this.data.searchText,
      pageIndex: this.data.pageIndex,
      pageSize: this.data.pageSize,
      userType: 0,
      isMy: 0
    }
    service.post('/SelectCustList', {
      json: JSON.stringify(jsonStr)
    }).then(res => {
      if (Array.isArray(res.data.data)) {
        res.data.data.forEach(item => {
          item.firstName = item.UI_Name.substr(0, 1);
        })
        //（总记录数 + 每页数据大小  - 1） / 每页数据大小
        let total = Math.floor((res.data.recordCount + this.data.pageSize - 1) / this.data.pageSize);
        allList = allList.concat(res.data.data);
        this.setData({
          allmemberList: allList,
          totalPages: total
        })
      }
    })
  },
  //搜索
  getCustomSeach() {
    let allList = this.data.allmemberList;
    var jsonStr = {
      gi_id: wx.getStorageSync('gi_id'),
      searchText: this.data.searchText,
      pageIndex: 1,
      pageSize: this.data.pageSize,
      userType: 0,
      isMy: 0
    }
    service.post('/SelectCustList', {
      json: JSON.stringify(jsonStr)
    }).then(res => {
      if (Array.isArray(res.data.data)) {
        res.data.data.forEach(item => {
          item.firstName = item.UI_Name.substr(0, 1);
        })
        //（总记录数 + 每页数据大小  - 1） / 每页数据大小
        let total = Math.floor((res.data.recordCount + this.data.pageSize - 1) / this.data.pageSize);
        this.setData({
          allmemberList: res.data.data,
          totalPages: total
        })
      }
    })
  },
  //加载更多
  loadMore() {
    console.log('加载更多')
    if (this.data.pageIndex <= this.data.totalPages) {
      var curpage = this.data.pageIndex * 1 + 1 //上滑一次就加载下一页 在当前页数加一  就是加载下一页
      this.setData({
        pageIndex: curpage
      })
      this.getCustomList();
    } else {
      wx.showToast({
        title: '暂无更多数据', //如果当前页数大于总页数则不会刷新并显示提示
        icon: "none"
      })
    }

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