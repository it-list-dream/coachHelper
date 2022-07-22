// pages/chooseCustom/chooseCustom.js
const app = getApp();
var service = require('../../utils/request.js');
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    tabsList: [{
      name: "私教会员",
      flag: false
    }, {
      name: "普通会员",
      flag: false
    }],
    memberList: [],
    // recentlyList: [],
    tabsHeight: 0,
    //搜索
    pageIndex: 1,
    pageSize: 12,
    isEnd: false,
    searchText: "",
    totalPages: 0,
    jurisdiction: 0,
    //属于
    isBelong: 0,
    scrollTop: 0,
    //
    isFinished: false,
    p_index: 1,
    appoinmentList: []
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
    });
    let coach = wx.getStorageSync('coach'),
      tabsList = this.data.tabsList;
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
    //全部
    this.getCustomList(2, 0);
  },
  swichNav: function (e) {
    if (this.data.active != e.detail.currentNum)
      this.setData({
        pageIndex: 1,
        isEnd: false,
        memberList: [],
        scrollTop: 0,
        isBelong: 0,
        active: e.detail.currentNum
      })
    if (e.detail.currentNum == 0) {
      this.getCustomList(2, 0);
    } else {
      this.getCustomList(1, 0);
    }
  },
  getTabHeight(e) {
    this.setData({
      tabsHeight: e.detail.height
    })
  },
  selectCustom(e) {
    let index = e.currentTarget.dataset.index;
    if (index != 6) {
      app.globalData.custom = e.currentTarget.dataset.member;
    }
    //0 问卷 1 体适能 2 静态评估
    switch (parseInt(this.type)) {
      case 0:
        wx.navigateTo({
          url: '/questionnaire/pages/questionList/questionList',
        });
        break;
      case 1:
        wx.navigateTo({
          url: '/evaluation/pages/fitnessList/fitnessList',
        })
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
      case 5:
        wx.navigateTo({
          url: '/pages/trainPlan/trainPlan',
        });
        break;
        //预约
      case 6:
        //获取上一个页面的数据
        let pages = getCurrentPages(); //当前页面栈
        let prevPage = pages[pages.length - 2];
        var custom = e.currentTarget.dataset.member;
        prevPage.setData({
          custom: custom
        })
        wx.navigateBack({
          delta: 1,
        });
        break;
      case 7:
        wx.navigateTo({
          url: '/pages/trialClass/trialClass',
        });
        break;
      default:
    }
  },
  //搜索
  seachChange: util.throttle(function (e) {
    this.setData({
      searchText: e.detail,
      pageIndex: 1,
      isEnd: false,
      memberList: [],
      scrollTop: 0,
      isFinished: false,
      p_index: 1,
      appoinmentList: []
    });
    if (this.data.appoinment == 1) {
      this.getMyCoachUser(1);
    } else {
      if (this.data.active == 0) {
        if (this.data.isBelong == 0 && this.data.jurisdiction == 1) {
          this.getCustomList(2, 0);
        } else if (this.data.isBelong == 1 && this.data.jurisdiction == 1) {
          this.getCustomList(2, 1);
        } else {
          this.getCustomList(2, 1);
        }
      } else {
        this.getCustomList(1, 0);
      }
    }
  }, 200),
  seachCancel() {
    this.setData({
      searchText: ""
    })
  },
  //获取所有会员的列表
  getCustomList(userType, isMy, isSearch = 0) {
    let allList = this.data.memberList;
    var jsonStr = {
      gi_id: wx.getStorageSync('gi_id'),
      searchText: this.data.searchText,
      pageIndex: this.data.pageIndex,
      pageSize: this.data.pageSize,
      userType: userType,
      isMy: isMy
    }
    if (isSearch == 1) {
      this.setData({
        pageIndex: 1,
        isEnd: false,
        memberList: [],
        scrollTop: 0
      })
    }
    service.post('/SelectCustList', {
      json: JSON.stringify(jsonStr)
    }).then(res => {
      if (Array.isArray(res.data.data)) {
        res.data.data.forEach(item => {
          item.firstName = item.UI_Name.substr(0, 1);
        })
        //分页
        let total = Math.floor((res.data.recordCount + this.data.pageSize - 1) / this.data.pageSize);
        allList = allList.concat(res.data.data);
        this.setData({
          memberList: allList,
          totalPages: total
        })
      }
    })
  },
  //所属关系
  ismyMember(e) {
    let index = e.currentTarget.dataset.index;
    if (index != this.data.isBelong) {
      this.setData({
        isBelong: index,
        pageIndex: 1,
        isEnd: false,
        memberList: [],
        scrollTop: 0
      });
      if (index == 0) {
        this.getCustomList(2, 0);
      } else {
        this.getCustomList(2, 1);
      }
    }
  },
  //搜索
  //加载更多
  loadMore() {
    console.log('加载更多');
    let active = this.data.active;
    if (this.data.pageIndex < this.data.totalPages) {
      var curpage = this.data.pageIndex * 1 + 1;
      this.setData({
        pageIndex: curpage
      });
      if (active == 0) {
        if (this.data.isBelong == 0 && this.data.jurisdiction == 1) {
          this.getCustomList(2, 0);
        } else if (this.data.isBelong == 1 && this.data.jurisdiction == 1) {
          this.getCustomList(2, 1);
        } else {
          this.getCustomList(2, 1);
        }
      } else {
        this.getCustomList(1, 0);
      }
    } else {
      wx.showToast({
        title: '暂无更多数据',
        icon: "none"
      })
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let pages = getCurrentPages();
    // 数组中索引最大的页面--当前页面
    let currentPage = pages[pages.length - 1];
    this.type = currentPage.options.type;
    if(currentPage.options.appoinment == 1){
      this.setData({
        appoinment: currentPage.options.appoinment
      });
      this.getMyCoachUser();
    }
  },
  //预约列表
  getMyCoachUser(isSearch = 0) {
    if (isSearch == 1) {
      this.setData({
        appoinmentList: [],
        p_index: 1,
        isFinished: false
      })
    }
    service.post('/MyCoachUser', {
      searchText: this.data.searchText,
      pageSize: this.data.pageSize,
      pageIndex: this.data.p_index,
      gi_id: wx.getStorageSync('gi_id')
    }).then(res => {
      if (res.data.data.length > 0) {
        let myList = this.data.appoinmentList
        res.data.data.forEach(item => {
          item.firstName = item.UI_Name.substr(0, 1);
        });
        this.setData({
          appoinmentList: [...myList, ...res.data.data]
        })
      } else {
        this.setData({
          isFinished: true
        })
      }
    })
  },
  loadAppoinment() {
    console.log('预约加载')
    let currPage = this.data.p_index;
    if (!this.data.isFinished) {
      currPage++;
      this.data.p_index = currPage;
      this.getMyCoachUser();
    } else {
      wx.showToast({
        title: '暂无更多数据',
        icon: "none"
      })
    }
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