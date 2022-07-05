var service = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    memberList: [],
    searchHeight: 0,
    select: -1,
    searchText: "",
    pageIndex: 1,
    pageSize: 20,
    isEnd: false
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
    })
    this.getUserList();
  },
  getUserList() {
    service.post('/UserListByCoachTeach', {
      searchText: this.data.searchText,
      teachID: 0,
      typeId: 0,
      co_Have: 0,
      pageSize: 20,
      pageIndex: this.data.pageIndex,
      gi_id: wx.getStorageSync('gi_id')
    }).then(res => {
      let list = res.data.data;
      if (list.length > 0) {
        list.forEach(item => {
          item.firstName = item.UI_Name.slice(0, 1)
        });
        let allList = [...this.data.memberList, ...list];
        this.setData({
          memberList: allList
        });
      } else {
        this.setData({
          isEnd: true
        });
      }
    })
  },
  selectMember(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      select: index
    })
  },
  onChange(e) {
    this.setData({
      searchText: e.detail,
      pageIndex: 1,
      memberList: []
    })
    service.post('/UserListByCoachTeach', {
      searchText: e.detail,
      teachID: 0,
      typeId: 0,
      co_Have: 0,
      pageSize: 20,
      pageIndex: this.data.pageIndex,
      gi_id: wx.getStorageSync('gi_id')
    }).then(res => {
      res.data.data.forEach(item => {
        item.firstName = item.UI_Name.slice(0, 1);
      });
      this.setData({
        memberList: res.data.data
      });
    })
  },
  loadMore() {
    //console.log('是否还有更多')
    if (!this.data.isEnd) {
      let curr_page = this.data.pageIndex;
      curr_page++;
      this.setData({
        pageIndex: curr_page
      });
      this.getUserList();
    }
  },
  turnClass() {
    if (this.data.select > 0) {
      let selectMemeber = this.data.memberList[this.data.select];
      let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
      let prevPage = pages[pages.length - 2];
      prevPage.setData({
        giveMember: selectMemeber
      });
      wx.navigateBack({
        delta: 1,
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

  }
})