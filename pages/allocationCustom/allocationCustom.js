// pages/allocationCustom/allocationCustom.js
var service = require('../../utils/request.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabsList: [{
      name: "私教会员",
      flag: true
    }, {
      name: "普通会员",
      flag: true
    }],
    tabIndex: 0,
    filterIndex: 0,
    filterList: ['未为配', '已分配'],
    tabsHeight: 0,
    searchHeight: 0,
    customList: [],
    select: -1,
    searchText: "",
    pageIndex: 1,
    pageSize: 20,
    totalPage: 0,
    //分配
    isFollow: false,
    distributionList: [],
    //
    isEnd: false,
    scrollTop:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    const query = wx.createSelectorQuery();
    query.select('.search-box').boundingClientRect()
    query.exec(function (res) {
      that.setData({
        searchHeight: res[0].height
      })
    });
    this.getPublicWaters(2);
  },
  //Tab
  tabsChange(e) {
    let index = e.detail.currentNum,
      filterIndex = this.data.filterIndex;
    this.data.customList = [];
    this.data.pageIndex = 1;
    this.data.isEnd = false;
    if (index !== this.data.tabIndex) {
      if (index == 0 && filterIndex == 0) {
        this.getPublicWaters(2);
      } else if (index == 0 && filterIndex == 1) {
        this.getAllCustom(2)
      } else if (index == 1 && filterIndex == 0) {
        this.getPublicWaters(1);
      } else if (index == 1 && filterIndex == 1) {
        this.getAllCustom(1)
      }
      this.setData({
        tabIndex: index,
        scrollTop:0
      })
    }
  },
  //分配
  filterTab(e) {
    let index = e.currentTarget.dataset.index,
      tabIndex = this.data.tabIndex;
    this.data.customList = [];
    this.data.pageIndex = 1;
    this.data.isEnd = false;
    if (tabIndex == 0 && index == 0) {
      this.getPublicWaters(2);
    } else if (tabIndex == 0 && index == 1) {
      this.getAllCustom(2)
    } else if (index == 0 && tabIndex == 1) {
      this.getPublicWaters(1);
    } else if (index == 1 && tabIndex == 1) {
      this.getAllCustom(1)
    }
    this.setData({
      filterIndex: index,
      scrollTop:0
    })
  },
  //选择公海池
  getPublicWaters(userType, isSearch = 0) {
    var json = {
      gi_id: wx.getStorageSync('gi_id'),
      searchText: this.data.searchText,
      pageIndex: this.data.pageIndex,
      pageSize: this.data.pageSize,
      userType: userType
    }
    if (isSearch == 1) {
      this.setData({
        customList: [],
        pageIndex: 1
      })
    };
    service.post('/PublicWaters', {
      json: JSON.stringify(json)
    }).then(res => {
      if (res.data.data.length > 0) {
        let list = res.data.data;
        list.forEach(item => {
          item.firstName = item.UI_Name.slice(0, 1)
        });
        let totalPage = Math.floor((res.data.recordCount + this.data.pageSize - 1) / this.data.pageSize);
        this.setData({
          customList: [...this.data.customList, ...list],
          totalPage: totalPage
        });
      }
    })
  },
  getAllCustom(userType, isSearch = 0) {
    var json = {
      gi_id: wx.getStorageSync('gi_id'),
      searchText: this.data.searchText,
      pageIndex: this.data.pageIndex,
      pageSize: this.data.pageSize,
      userType: userType,
      isMy: 0
    };
    if (isSearch == 1) {
      this.setData({
        customList: [],
        pageIndex: 1
      })
    }
    service.post('/SelectCustList', {
      json: JSON.stringify(json)
    }).then(res => {
      if (res.data.data.length > 0) {
        let list = res.data.data;
        list.forEach(item => {
          item.firstName = item.UI_Name.slice(0, 1)
        });
        let totalPage = Math.floor((res.data.recordCount + this.data.pageSize - 1) / this.data.pageSize);
        this.setData({
          customList: [...this.data.customList, ...list],
          totalPage: totalPage
        });
      }
    });
  },
  onClear() {
    this.setData({
      searchText: ""
    })
  },
  onSearch(e) {
    let value = e.detail;
    let tabIndex = this.data.tabIndex,
      filterIndex = this.data.filterIndex;
    this.data.searchText = value;
    this.data.pageIndex = 1;
    this.data.customList = [];
    this.data.isEnd = false;
    if (tabIndex == 0 && filterIndex == 0) {
      this.getPublicWaters(2, 1);
    } else if (tabIndex == 0 && filterIndex == 1) {
      this.getAllCustom(2, 1)
    } else if (tabIndex == 1 && filterIndex == 0) {
      this.getPublicWaters(1, 1);
    } else {
      this.getAllCustom(1, 1)
    }
  },
  allocation(e) {
    //分配教练
    let index = e.currentTarget.dataset.index;
    this.setData({
      select: index
    });
  },
  onClose() {
    this.setData({
      isFollow: false
    });
  },
  selelctCoach(e) {
    let index = e.currentTarget.dataset.index,
      disList = this.data.distributionList;
    if (disList[index].FSelChk == 1) {
      disList[index].FSelChk = 0;
    } else {
      disList[index].FSelChk = 1;
    }
    this.setData({
      distributionList: disList
    })
  },
  allocationCoach() {
    if (this.data.select > 0) {
      let curr_id = this.data.customList[this.data.select].UI_ID;
      service.post('/CoachListDistribution', {
        UI_ID: curr_id,
        gi_id: wx.getStorageSync('gi_id')
      }).then(res => {
        this.setData({
          distributionList: res.data.data,
          isFollow: true
        });
      })
    }
  },
  onConfrim() {
    let coachList = this.data.distributionList;
    let curr_id = this.data.customList[this.data.select].UI_ID;
    coachList = coachList.filter(item => item.FSelChk == 1).map((item) => {
      var obj = {};
      obj.coachid = item.AI_ID;
      return obj
    });
    var jsonStr = {
      UI_ID: curr_id,
      data: coachList
    }
    service.post('/CoachListDistributionUser', {
      json: JSON.stringify(jsonStr),
      gi_id: wx.getStorageSync('gi_id')
    }).then(res => {
      this.setData({
        isFollow: false
      })
      wx.showToast({
        icon: "none",
        title: '分配成功',
      })
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
  loadMore() {
    let tabIndex = this.data.tabIndex,
      filterIndex = this.data.filterIndex;
    if (this.data.pageIndex <= this.data.totalPage) {
      let curpage = this.data.pageIndex + 1;
      this.setData({
        pageIndex: curpage
      })
      if (tabIndex == 0 && filterIndex == 0) {
        this.getPublicWaters(2);
      } else if (tabIndex == 0 && filterIndex == 1) {
        this.getAllCustom(2)
      } else if (tabIndex == 1 && filterIndex == 0) {
        this.getPublicWaters(1);
      } else {
        this.getAllCustom(1)
      }
    } else {
      wx.showToast({
        title: '暂无更多数据',
        icon: "none"
      })
    }
  },
  getHeight(e) {
    console.log(e.detail.height)
    this.setData({
      tabsHeight: e.detail.height
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  }
})