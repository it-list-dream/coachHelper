// pages/addAppointment/addAppointment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showclass: false,
    // clsstypeList: ["女性塑形课程", "廋身课程", "增肌课程", "健身入门课程", "运动康复课程", "产后修复课程", "私教体验课", "自主训练", "减脂课"],
    clsstypeList: [{
        name: "女性塑形课程",
        checked: false
      }, {
        name: "瘦身课程",
        checked: false
      }, {
        name: "增肌课程",
        checked: false
      }, {
        name: "健身入门课程",
        checked: false
      },
      {
        name: "运动康复课程",
        checked: false
      }, {
        name: "产后修复课程",
        checked: false
      }, {
        name: "私教体验课",
        checked: false
      }, {
        name: "自主训练",
        checked: false
      },
      {
        name: "减脂课",
        checked: false
      }
    ],
    //是否显示重复
    showtips: false,
    weekList: [{
      value: "周一",
      checked: false
    }, {
      value: "周二",
      checked: false
    }, {
      value: "周三",
      checked: false
    }, {
      value: "周四",
      checked: false
    }, {
      value: "周五",
      checked: false
    }, {
      value: "周六",
      checked: false
    }, {
      value: "周日",
      checked: false
    }],
    choose1: true,
    choose2: false,
    //备注
    remarkText: "",
    repeatDate: "无重复",
    //训练计划
    trianPlain: false,
    isOthers: 0,
    //是否弹出event
    isEvent: false,
    eventList: [{
        id: 1,
        event_name: "客户体侧",
        checked: true
      },
      {
        id: 2,
        event_name: "客户跟进",
        checked: false
      },
      {
        id: 3,
        event_name: "休息",
        checked: false
      },
      {
        id: 4,
        event_name: "其他",
        checked: false
      },
    ],
    endTime: '',
    eventTypeText: "",
    //是否显示textarea
    isShowTextarea: true,
    formData: {
      classType: ""
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options.type == 0)
    this.setData({
      isOthers: options.type
    })
  },
  chooseCustom() {
    wx.navigateTo({
      url: '/pages/chooseCustom/chooseCustom',
    })
  },
  onClose1() {
    this.setData({
      showtips: false
    })
  },
  chooseclasstype() {
    this.setData({
      showclass: true,
      isShowTextarea: false
    })
  },
  repetition() {
    this.setData({
      showtips: true,
      isShowTextarea: false
    })
  },
  // 当选
  change1(e) {
    let ch1 = this.data.choose1
    this.setData({
      choose1: !ch1,
      choose2: ch1
    })
  },
  change2(e) {
    let ch2 = this.data.choose2
    this.setData({
      choose2: !ch2,
      choose1: ch2
    })
  },
  handleweek(e) {
    let index = e.currentTarget.dataset.index;
    let item = this.data.weekList[index];
    let weekList = this.data.weekList;
    if (!this.data.choose2) {
      return
    }
    item.checked = !item.checked;
    this.setData({
      weekList: weekList,
    });
  },
  handleConfrim() {
    //判断是否选择时间
    let weekList = this.data.weekList;
    if (!weekList.some(item => item.checked)) {
      wx.showToast({
        icon: "none",
        title: '请选择重复时间'
      })
      return
    }
    console.log(weekList.filter(item => item.checked).map(item => item.value).join('、'))
    this.setData({
      showtips: false,
      repeatDate: weekList.filter(item => item.checked).map(item => item.value).join('、')
    })
  },
  handleRemark(e) {
    this.setData({
      remarkText: e.detail.value
    })
  },
  //上课日期选择
  bindMultiPickerChange: function (e) {
    console.log(e.detail)
  },
  bindCancel() {
    console.log('取消')
  },
  onClose2() {
    this.setData({
      trianPlain: false,
      isShowTextarea: true
    })
  },
  trianPlain1() {
    this.setData({
      trianPlain: true,
      isShowTextarea: false
    })
  },
  addPlain() {
     wx.navigateTo({
       url: '/pages/addTrainPlan/addTrainPlan',
     })
  },
  bindMultiPickerChange2() {

  },
  bindCancel2() {

  },
  handleEvent(e) {
    // console.log(e.currentTarget.dataset.index)
    let id = Number(e.currentTarget.dataset.index) + 1;
    let eventList = this.data.eventList;
    let eventTypeText = '';
    eventList.forEach((item, index, arr) => {
      if (item.id == id) {
        arr[index].checked = true
      } else {
        arr[index].checked = false
      }
    })
    this.eventTypeText = eventList.filter(item => item.checked)[0].event_name
    this.setData({
      eventList: eventList
    })
  },
  onCancel2() {
    this.setData({
      isEvent: false,
      isShowTextarea: true
    })
  },
  onConfirm2() {
    this.setData({
      isEvent: false,
      eventTypeText: this.eventTypeText
    })
  },
  eventPoupon() {
    this.setData({
      isEvent: true,
      isShowTextarea: false
    })
  },
  selectedTime(e) {
    this.setData({
      selectedTime: e.detail.value
    })
  },
  //弹窗
  bindConfrim(e) {
    let classType = e.detail.filter(item => item.checked == true).map(item=>item.name);
    this.setData({
      showclass: false,
      clsstypeList: e.detail,
      "formData.classType": classType[0]
    })
  },
  handleCancel() {
    this.setData({
      showclass: false
    })
  },
  // 选择训练计划
  chooseClassPlan(){
    this.setData({
      trianPlain:false
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})