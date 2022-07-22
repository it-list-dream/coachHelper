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
    tabIndex: 0,
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
    allTotal: 0,
    followupList: [],
    f_index: 1,
    f_total: 0,
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
 
    this.setData({
      startDate: year + '-' + util.subTen(month) + '-' + '01',
      endDate: year + '-' + util.subTen(month) + '-' + day
    });
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
      UI_ID: app.globalData.custom.UI_ID,
      gi_id: wx.getStorageSync('gi_id'),
      pageIndex: this.data.pageIndex,
      pageSize: 10
    }).then(res => {
      let actList = res.data.data,
        dateList = [],
        dynamicList = [],
        dynamicChild = [];
      //分页
      let total = Math.floor((res.data.recordCount + 10 - 1) / 10);
      for (let i = 0; i < actList.length; i++) {
        actList[i].time = util.format(actList[i].Createdate, 'yyyy.mm.dd hh:mm').substr(11);
        actList[i].date = util.format(actList[i].Createdate, 'yyyy.mm.dd').substr(5);
        actList[0].flag = 1;
        actList[i].fullDate = util.format(actList[i].Createdate, 'yyyy.mm.dd')
        if (i + 1 < actList.length) {
          if (actList[i].cYear == actList[i + 1].cYear) {
            actList[i + 1].flag = 0;
          } else {
            actList[i + 1].flag = 1;
          }
        }
        if (!dateList.includes(actList[i].fullDate)) {
          dateList.push(actList[i].fullDate);
        }
      }
      for (let j = 0; j < dateList.length; j++) {
        dynamicList.push({
          date: dateList[j],
          cYear: dateList[j].split('.')[0],
          children: []
        });
        for (let k = 0; k < actList.length; k++) {
          if (dateList[j] == actList[k].fullDate) {
            dynamicChild.push(actList[k]);
          }
        }
        dynamicList[j].children = dynamicChild;
        dynamicChild = [];
      }
      let m_list = [];
      if (this.data.dynamicList.length > 0) {
        if (this.data.dynamicList[this.data.dynamicList.length - 1].date == dynamicList[0].date) {
          dynamicList[0].children[0].flag = 0;
          //就将两个数据进行合并
          this.data.dynamicList[this.data.dynamicList.length - 1].children.push(...dynamicList[0].children);
          dynamicList.splice(0, 1)
        }
      }

      m_list = [...this.data.dynamicList, ...dynamicList];
      //判断dynamicList中的最后一条记录和
      this.setData({
        allTotal: total,
        dynamicList: m_list
      })
    })
  },
  getUserFollowUp(searchDate, endDate) {
    //f_index:1,  f_total:0,
    service.post('/UserFollowUp', {
      UI_ID: app.globalData.custom.UI_ID || "3887",
      gi_id: wx.getStorageSync('gi_id'),
      SearchDate: searchDate,
      endDate: endDate,
      pageIndex: this.data.f_index,
      pageSize: 30,
      gi_id: wx.getStorageSync('gi_id')
    }).then(res => {
      let list = res.data.data,
        dateList = [],
        followList = [],
        followChild = [];
      //分页
      let total = Math.floor((res.data.recordCount + 30 - 1) / 30);
      for (let i = 0; i < list.length; i++) {
        list[i].date = util.format(list[i].Createdate, 'yyyy.mm.dd').substr(5);
        list[i].time = util.format(list[i].Createdate, 'yyyy.mm.dd hh:mm').substr(11);
        list[i].fullDate = util.format(list[i].Createdate, 'yyyy.mm.dd')
        if (!dateList.includes(list[i].fullDate)) {
          dateList.push(list[i].fullDate);
        }
      }

      for (let j = 0; j < dateList.length; j++) {
        followList.push({
          date: dateList[j],
          c_date: dateList[j].substr(5),
          children: []
        });
        for (let k = 0; k < list.length; k++) {
          if (dateList[j] == list[k].fullDate) {
            followChild.push(list[k]);
          }
        }
        followList[j].children = followChild;
        followChild = [];
      }
      let m_list = [];
      if (this.data.followupList.length > 0) {
        if (this.data.followupList[this.data.followupList.length - 1].c_date == followList[0].c_date) {
          this.data.followupList[this.data.followupList.length - 1].children.push(...followList[0].children);
          followList.splice(0, 1)
        }
      }
      m_list = [...this.data.followupList, ...followList]
      //是否有当前的跟单记录
      this.setData({
        followupList: m_list,
        f_total: total
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
  cancelRewords() {
    this.setData({
      isAdd: false
    })
  },
  confrimRewords(e) {
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
      });
      this.coachList();
      wx.showToast({
        icon:"none",
        title: '分配成功',
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
    });
  },
  selectGrid(e) {
    let index = Number(e.currentTarget.dataset.index);
    app.globalData.custom = this.data.custom;
    switch (index) {
      case 1:
        wx.navigateTo({
          url: '/questionnaire/pages/questionList/questionList',
        });
        break;
      case 2:
        wx.navigateTo({
          url: '/pages/trainning/trainning',
        });
        break;
      case 3:
        wx.navigateTo({
          url: '/pages/trainPlan/trainPlan',
        });
        break;
      case 4:
        wx.navigateTo({
          url: '/pages/coursePlanning/coursePlanning',
        });
        break;
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let hobbyTags = [];
    if(app.globalData.custom.TrainTarget && app.globalData.custom.TrainTarget.length>0){
      hobbyTags = app.globalData.custom.TrainTarget.split(',');
    }
    let coach = wx.getStorageSync('coach'),
      isAllow = false;
    if (coach.RoleName == '私教经理') {
      isAllow = true;
    }
    this.setData({
      custom: app.globalData.custom,
      hobbyTags,
      allowAllocation: isAllow
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let curr_page = 0;
    if (this.data.tabIndex == 0) {
      if (this.data.pageIndex < this.data.allTotal) {
        curr_page = this.data.pageIndex;
        curr_page++;
        this.setData({
          pageIndex: curr_page
        });
        this.getUserDynamic();
      }
    } else {
      if (this.data.f_index < this.data.f_total) {
        curr_page = this.data.f_index;
        curr_page++;
        this.setData({
          f_index: curr_page
        });
        this.getUserFollowUp(this.data.startDate,this.data.endDate);
      }
    }
  }
})