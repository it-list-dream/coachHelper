const app = getApp();
var service = require('../../utils/request.js');
var util = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showclass: false,
    classtypeList: [],
    selectedClass: null,
    //备注
    remarkText: "",
    //训练计划
    trianPlain: false,
    trainPlanList: [],
    selectedPlan: null,
    isOthers: 0,
    //是否弹出event
    isEvent: false,
    eventList: [{
        id: 1,
        event_name: "客户体测",
        checked: true
      },
      {
        id: 2,
        event_name: "客户跟进",
        checked: false
      },
      {
        id: 3,
        event_name: "其他",
        checked: false
      }
    ],
    endTime: '',
    eventTypeText: "",
    custom:{},
    pageIndex: 1,
    pageSize:10,
    pageTotal:0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.eventType == '客户体测'){
       this.setData({
        eventTypeText:options.eventType,
        custom:app.globalData.custom
       })
    }
    this.setData({
      isOthers: options.type,
    });
    this.getActTemplate();
  },
  chooseCustom() {
    wx.navigateTo({
      url: '/pages/chooseCustom/chooseCustom?type=6&appoinment=1',
    })
  },
  chooseclasstype() {
    if (!this.data.custom.FK_UI_ID) {
      wx.showToast({
        icon: "none",
        title: '请先选择会员',
      })
      return;
    }
    service.post('/TeachUserClass', {
      UI_ID: this.data.custom.FK_UI_ID,
      gi_id: wx.getStorageSync('gi_id')
    }).then(res => {
      // console.log(res.data.data)
      this.setData({
        classtypeList: res.data.data,
        showclass: true,
      })
    })
  },
  handleCancel() {
    this.setData({
      showclass: false
    })
  },
  trianPlain() {
    if (!this.data.custom.FK_UI_ID) {
      wx.showToast({
        icon: "none",
        title: '请先选择会员',
      })
      return;
    }
    this.setData({
      trianPlain:true
    });
  },
  loadMore(){
    if(this.data.pageIndex <= this.data.pageTotal ){
        let curr_page = this.data.pageIndex;
        curr_page ++;
        this.setData({
          pageIndex:curr_page
        });
        this.getActTemplate()
    }else{
      console.log('已经到底了')
    }
  },
  getActTemplate(){
    service.post('/ActLibTemplateList', {
      pageIndex: this.data.pageIndex,
      pageSize: 10,
      gi_id: wx.getStorageSync('gi_id')
    }).then(res => {
      let trainList = this.data.trainPlanList;  
      let total = Math.floor((res.data.recordCount + this.data.pageSize - 1) / this.data.pageSize);
      this.setData({
        trainPlanList: [...trainList,...res.data.data],
        pageTotal:total
      })
    })
  },
  // 选择训练计划
  chooseClassPlan(e) {
    let index = e.currentTarget.dataset.index,
      trainPlanList = this.data.trainPlanList;
    this.setData({
      selectedPlan: trainPlanList[index],
      trianPlain: false
    })
  },
  handleRemark(e) {
    this.setData({
      remarkText: e.detail.value
    })
  },
  bindMultiPickerChange(e) {
    //console.log(e)
    this.date = e.detail;
  },
  saveAppointment() {
    let toastContent = "";
    if (this.data.isOthers == 0) {
      if (!this.data.custom.FK_UI_ID) {
        toastContent = "请选择客户";
      } else if (!this.data.selectedClass) {
        toastContent = "请选择课程类型";
      } else if (!this.date) {
        toastContent = "请选择上课时间";
      }
      if (toastContent.length > 0) {
        wx.showToast({
          icon: "none",
          title: toastContent,
        })
        return;
      }
      this.saveSchedule()
    } else {
      if (this.data.eventTypeText.length == 0) {
        toastContent = "请选择事件";
      } else if (this.data.eventTypeText != "其他" && !this.data.custom.FK_UI_ID) {
        toastContent = "请选择客户";
      } else if (!this.date && endTime.length == 0) {
        toastContent = "请选择开始时间或结束时间";
      }
      if (toastContent.length > 0) {
        wx.showToast({
          icon: "none",
          title: toastContent,
        })
        return;
      }
      this.saveOthersSchedule();
    }
  },
  onClose2() {
    this.setData({
      trianPlain: false
    })
  },
  //其他
  handleEvent(e) {
    let id = Number(e.currentTarget.dataset.index) + 1;
    let eventList = this.data.eventList;
    eventList.forEach((item, index, arr) => {
      if (item.id == id) {
        arr[index].checked = true
      } else {
        arr[index].checked = false
      }
    })
    this.setData({
      eventList: eventList
    })
  },
  eventClose() {
    this.setData({
      isEvent: false
    })
  },
  eventConfrim() {
    let eventTypeText = "",
      eventList = this.data.eventList;
    eventTypeText = eventList.filter(item => item.checked)[0].event_name;
    this.setData({
      eventTypeText,
      isEvent: false
    })
  },
  eventPoupon() {
    this.setData({
      isEvent: true
    })
  },
  selectedTime(e) {
    this.setData({
      endTime: e.detail.value
    })
  },
  //弹窗
  bindConfrim(e) {
    this.setData({
      showclass: false,
      selectedClass: e.detail
    });
  },
  saveSchedule() {
    let spendDate = this.date[0] + '-' + this.date[1] + '-' + this.date[2],
      s_hour = parseInt(this.date[3]),
      s_minute = parseInt(this.date[4]),
      e_hour,
      e_minute,
      cp_time = parseInt(this.data.selectedClass.CP_Time),
      time = "";
    if (s_minute + cp_time < 60) {
      e_minute = s_minute + cp_time;
      e_hour = s_hour;
    } else {
      e_hour = s_hour + parseInt((cp_time + s_minute) / 60);
      e_minute = s_minute + cp_time - 60 * parseInt((cp_time + s_minute) / 60);
    }
    time = util.subTen(s_hour) + ":" + util.subTen(s_minute) + "-" + util.subTen(e_hour) + ":" + util.subTen(e_minute);
    service.post('/Coach_SpendAddFromCoach', {
      Content: this.data.remarkText,
      templateId: this.data.selectedPlan ? this.data.selectedPlan.AT_ID : 0,
      CO_ID: this.data.selectedClass.CO_ID,
      UI_ID: this.data.custom.FK_UI_ID,
      FK_CP_ID: this.data.selectedClass.CP_ID,
      SpendDate: spendDate,
      Time: time,
      gi_id: wx.getStorageSync('gi_id')
    }).then(res => {
      wx.navigateBack({
        delta: 1,
      })
    })
  },
  saveOthersSchedule() {
   // console.log(this.date);
    let s_date = this.date[0] + "-" + util.subTen(this.date[1]) + "-" + util.subTen(this.date[2]);
    var jsonStr = {
      UI_ID: this.data.custom.FK_UI_ID?this.data.custom.FK_UI_ID:0,
      StartDate: s_date + " " + this.date[3] + ":" + this.date[4],
      EndDate: s_date + " " + this.data.endTime,
      Remarks: this.data.remarkText,
      TypeName: this.data.eventTypeText
    }
    service.post('/Coach_ScheduleSave', {
      json: JSON.stringify(jsonStr),
      gi_id: wx.getStorageSync('gi_id')
    }).then(res => {
      wx.navigateBack({
        delta: 1,
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