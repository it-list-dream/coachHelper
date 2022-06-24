var util = require('../../utils/util.js')
const app = getApp();
var service = require('../../utils/request.js');
var util = require('../../utils/util.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // tabsList: ['客户动态', '跟进记录'],
    tabIndex: 1,
    addRecords: false,
    //记录数组
    recordsList: [],
    //只取前10个元素
    tagsPostion: [
      [72, 88],
      [216, 160],
      [180, 46],
      [32, 210],
      [0, 340],
      [36, 512],
      [146, 496],
      [178, 616]
    ],
    hobbyTags: [],
    isFollow: false,
    startDate: "",
    endDate: "",
    e_date: "",
    dynamicList: [],
    pageIndex: 1,
    followupList: [],
    isAdd: false,
    serviceCoach: [],
    distributionList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let year = new Date().getFullYear(),
      month = new Date().getMonth() + 1,
      day = new Date(year, month, 0).getDate();
    this.year = year;
    this.month = month;
    this.day = day;
    let hobbyTags = app.globalData.custom.TrainTarget.length > 0 ? app.globalData.custom.TrainTarget.split(',') : [];
    let coach = wx.getStorageSync('coach'),
      isAllow = false;
    if (coach.RoleName == '私教经理') {
      isAllow = true;
    }
    this.setData({
      startDate: year + '-' + util.subTen(month) + '-' + '01',
      endDate: year + '-' + util.subTen(month) + '-' + day,
      custom: app.globalData.custom,
      hobbyTags,
      allowAllocation: isAllow
    })
    this.getUserDynamic();
    this.getUserFollowUp(year + '-' + util.subTen(month) + '-' + '01', year + '-' + util.subTen(month) + '-' + day);
    this.coachList();
  },
  coachList() {
    service.post('/ServiceCoachList', {
      UI_ID: app.globalData.custom.UI_ID,
      gi_id: wx.getStorageSync('gi_id')
    }).then(res => {
      let list = res.data.data;
      list.forEach(item => {
        item.firstName = item.AI_Name.substr(0, 1)
      });
      this.setData({
        serviceCoach: list
      })
    })
  },
  tabChange(e) {
    this.setData({
      tabIndex: e.detail.index
    })
  },
  getUserDynamic() {
    service.post('/UserDynamic', {
      UI_ID: app.globalData.custom.UI_ID || "3843",
      gi_id: wx.getStorageSync('gi_id'),
      pageIndex: this.data.pageIndex,
      pageSize: 100
    }).then(res => {
      let list = res.data.data,
        dateList = [],
        dynamicList = [],
        dynamicChild = [];
      for (let i = 0; i < list.length; i++) {
        list[i].date = util.format(list[i].Createdate, 'yyyy.mm.dd').substr(5);
        list[i].time = util.format(list[i].Createdate, 'yyyy.mm.dd hh:mm').substr(11);
        if (!dateList.includes(list[i].date)) {
          dateList.push(list[i].date);
        }
      }
      for (let j = 0; j < dateList.length; j++) {
        dynamicList.push({
          date: dateList[j],
          children: []
        });
        for (let k = 0; k < list.length; k++) {
          if (dateList[j] == list[k].date) {
            dynamicChild.push(list[k]);
          }
        }
        dynamicList[j].children = dynamicChild;
        dynamicChild = [];
      }
      this.setData({
        dynamicList: dynamicList
      })
    })
  },
  getUserFollowUp(searchDate, endDate) {
    service.post('/UserFollowUp', {
      UI_ID: app.globalData.custom.UI_ID || "3887",
      gi_id: wx.getStorageSync('gi_id'),
      SearchDate: searchDate,
      endDate: endDate,
      pageIndex: this.data.pageIndex,
      pageSize: 100,
      gi_id: wx.getStorageSync('gi_id')
    }).then(res => {
      let list = res.data.data,
        dateList = [],
        followList = [],
        followChild = [];
      var curr_date = Date.parse(this.year + '-' + util.subTen(this.month) + '-' + util.subTen(this.day));
      for (let i = 0; i < list.length; i++) {
        list[i].date = util.format(list[i].Createdate, 'yyyy.mm.dd').substr(5);
        list[i].time = util.format(list[i].Createdate, 'yyyy.mm.dd hh:mm').substr(11);
        if (curr_date > Date.parse(util.format(list[i].Createdate, 'yyyy-mm-dd'))) {
          this.setData({
            isNowFollow: true
          });
        }
        if (!dateList.includes(list[i].date)) {
          dateList.push(list[i].date);
        }
      }

      for (let j = 0; j < dateList.length; j++) {
        followList.push({
          date: dateList[j],
          children: []
        });
        for (let k = 0; k < list.length; k++) {
          if (dateList[j] == list[k].date) {
            followChild.push(list[k]);
          }
        }
        followList[j].children = followChild;
        followChild = [];
      }
      //是否有当前的跟单记录
      this.setData({
        followupList: followList
      })
    })
  },
  deleteRewords(e) {
    let followupList = this.data.followupList,
      index = e.currentTarget.dataset.index;
    console.log(index, followupList)
    service.post('/UserFollowUpDetailDel', {
      UD_ID: e.detail.ud_id,
      UI_ID: app.globalData.custom.UI_ID,
      gi_id: wx.getStorageSync('gi_id'),
    }).then(res => {
      let deleteId = followupList[index].children.findIndex(item => item.UD_ID == e.detail.ud_id);
      followupList[index].children.splice(deleteId, 1);
      this.setData({
        followupList
      })
    })
  },
  addClick(e) {
    this.setData({
      addRecords: true
    })
  },
  confrimEvent(e) {
    console.log(e.detail)
    let recordsList = this.data.recordsList;
    if (e.detail.trim() && e.detail.length > 0) {
      recordsList.push(e.detail)
      this.setData({
        recordsList: recordsList,
        addRecords: false
      })
    }
  },
  cancelEvent() {
    this.setData({
      addRecords: false
    })
  },
  editProfile() {
    wx.navigateTo({
      url: '/pages/addCustom/addCustom',
    })
  },
  getTagValue(e) {
    this.getUserFollowUp(this.data.startDate, this.data.endDate)
  },
  confrim(e) {
    let value = e.detail;
    if (value.length > 0) {
      service.post('/UserFollowUpDetailAdd', {
        Remarks: value,
        UD_ID: 0,
        UI_ID: app.globalData.custom.UI_ID,
        gi_id: wx.getStorageSync('gi_id')
      }).then(res => {
        this.setData({
          isAdd: false
        })
        this.getUserFollowUp(this.data.startDate, this.data.endDate);
      })
    }

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
  //关闭
  onClose() {
    this.setData({
      isFollow: false
    })
  },
  onConfrim() {
    let coachList = this.data.distributionList;
    coachList = coachList.filter(item => item.FSelChk == 1).map((item) => {
      var obj = {};
      obj.coachid = item.AI_ID;
      return obj
    });
    var jsonStr = {
      UI_ID: app.globalData.custom.UI_ID,
      data: coachList
    }
    service.post('/CoachListDistributionUser', {
      json: JSON.stringify(jsonStr),
      gi_id: wx.getStorageSync('gi_id')
    }).then(res => {
      this.setData({
        isFollow: false
      })
    })
  },
  allocateCoach() {
    service.post('/CoachListDistribution', {
      UI_ID: app.globalData.custom.UI_ID,
      gi_id: wx.getStorageSync('gi_id')
    }).then(res => {
      this.setData({
        distributionList: res.data.data,
        isFollow: true
      })
    })
  },
  bindstartDateChange(e) {
    this.setData({
      startDate: e.detail.value
    })
    this.getUserFollowUp(e.detail.value, this.data.endDate);
  },
  bindendDateChange(e) {
    this.setData({
      endDate: e.detail.value
    })
    this.getUserFollowUp(this.data.startDate, e.detail.value);
  },
  addFollow2(e) {
    this.setData({
      isAdd: true
    })
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