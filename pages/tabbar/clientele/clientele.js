// pages/chooseCustom/chooseCustom.js
const app = getApp();
var service = require('../../../utils/request.js');
var util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentActive: 0,
    tabsList: [{
      name: "全部客户",
      flag: false
    }, {
      name: "私教会员",
      flag: false
    }, {
      name: "普通会员",
      flag: false
    }, {
      name: "公海池",
      flag: false
    }],
    memberList: [],
    tabbar: {},
    searchHeight: 0,
    scrollHeight: 0,
    filterIndex: 0,
    searchText: "",
    //分页
    pageIndex: 1,
    pageSize: 20,
    //总页数
    totalPage: 0,
    isEnd: false,
    jurisdiction: 0,
    isMy: 0,
    // 竖向滚动条位置
    scrollTop: 0,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    app.editTabbar();
    let query = wx.createSelectorQuery();
    query.select('#search2').boundingClientRect();
    query.exec(function (res) {
      that.setData({
        searchHeight: res[0].height
      });
    });
    this.getCustomType(0, 0);
  },
  //公海池
  getPublicWaters(isSearch = 0) {
    var jsonStr = {
      gi_id: wx.getStorageSync('gi_id'),
      searchText: this.data.searchText,
      pageIndex: this.data.pageIndex,
      pageSize: 20,
      userType: 0
    };
    var list = [],
      total = 0;
    if (!this.data.isEnd) {
      service.post('/PublicWaters', {
        json: JSON.stringify(jsonStr)
      }).then(res => {
        if (isSearch == 1) {
          list = res.data.data;
          total = Math.floor((res.data.recordCount + this.data.pageSize - 1) / this.data.pageSize);
        } else {
          list = this.data.memberList;
          total = Math.floor((res.data.recordCount + this.data.pageSize - 1) / this.data.pageSize);
          list = list.concat(res.data.data);
        }
        list.forEach(item => {
          item.firstName = item.UI_Name.substring(0, 1);
        });
        this.setData({
          memberList: list,
          totalPage: total
        });
      })
    }
  },
  getCustomType(userType, isMy, isSearch = 0) {
    //userType(会员类型0全部1普通会员2私教会员),isMy(0全部会员1我的会员)
    var jsonStr = {
      gi_id: wx.getStorageSync('gi_id'),
      searchText: this.data.searchText,
      pageIndex: this.data.pageIndex,
      pageSize: this.data.pageSize,
      userType: userType,
      isMy: isMy
    };
    var list = [],
      total = 0;
    if (!this.data.isEnd) {
      service.post('/SelectCustList', {
        json: JSON.stringify(jsonStr)
      }).then(res => {
        if (isSearch == 1) {
          list = res.data.data;
          total = Math.floor((res.data.recordCount + this.data.pageSize - 1) / this.data.pageSize);
        } else {
          list = this.data.memberList;
          total = Math.floor((res.data.recordCount + this.data.pageSize - 1) / this.data.pageSize);
          list = list.concat(res.data.data)
        }
        list.forEach(item => {
          item.firstName = item.UI_Name.substring(0, 1);
        });
        this.setData({
          memberList: list,
          totalPage: total
        })
      })
    }
  },
  addPeople() {
    wx.navigateTo({
      url: '/pages/addCustom/addCustom',
    });
  },
  memberDetail(e) {
    let member = e.currentTarget.dataset.member;
    app.globalData.custom = member;
    wx.navigateTo({
      url: '/pages/customerDetail/customerDetail',
    });
  },
  //
  seachChange: util.throttle(function (e) {
    this.setData({
      searchText: e.detail
    });
    this.data.isEnd = false;
    this.data.pageIndex = 1;
    this.data.memberList = [];
    switch (this.data.currentActive) {
      case 0:
        this.getCustomType(0, 0, 1)
        break;
      case 1:
        if (this.data.filterIndex == 0) {
          this.getCustomType(2, 0, 1)
        } else {
          this.getCustomType(2, 1, 1)
        }
        break;
      case 2:
        //普通
        this.getCustomType(1, 0, 1)
        break;
      case 3:
        this.getPublicWaters(1);
        break;
    }
  }, 300),
  getHeight(e) {
    this.setData({
      scrollHeight: e.detail.height
    })
  },
  ismyMember(e) {
    let index = e.currentTarget.dataset.index;
    if (index !== this.data.filterIndex) {
      this.data.isMy = index;
      this.data.memberList = [];
      this.data.isEnd = false;
      this.data.pageIndex = 1;
      if (index == 0) {
        this.getCustomType(2, 0);
      } else {
        this.getCustomType(2, 1);
      }
      this.setData({
        filterIndex: index,
        scrollTop: 0
      })
    }
  },
  tabsChange(e) {
    let index = e.detail.currentNum
    if (this.data.currentActive != index) {
      this.setData({
        currentActive: e.detail.currentNum,
        pageIndex: 1,
        memberList: [],
        isEnd: false,
        scrollTop: 0,
        filterIndex:0
      });
      switch (index) {
        case 0:
          this.getCustomType(0, 0)
          break;
        case 1:
          this.getCustomType(2, 0)
          break;
        case 2:
          this.getCustomType(1, 0);
          break;
        case 3:
          this.getPublicWaters();
          break;
      }
    }
  },
  loadMore() {
    if (this.data.pageIndex < this.data.totalPage) {
      var curpage = this.data.pageIndex * 1 + 1 //上滑一次就加载下一页 在当前页数加一  就是加载下一页
      this.setData({
        pageIndex: curpage
      });
      if (this.data.currentActive == 0) {
        this.getCustomType(0, 0)
      } else if (this.data.currentActive == 1) {
        this.getCustomType(2, 0)
      } else if (this.data.currentActive == 2) {
        this.getCustomType(1, 0);
      } else {
        this.getPublicWaters();
      }
    } else {
      this.setData({
        isEnd: true
      })
      wx.showToast({
        title: '暂无更多数据', //如果当前页数大于总页数则不会刷新并显示提示
        icon: "none"
      });
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let tabsList = this.data.tabsList
    var coach = wx.getStorageSync('coach');
    if (coach && coach.RoleName == "私教经理") {
      tabsList.forEach(item => {
        if (item.name == '私教会员') {
          item.flag = true;
        }
      })
      this.setData({
        jurisdiction: 1,
        tabsList: tabsList
      });
    }
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