// pages/referenceData/referenceData.js
const app = getApp();
var service = require('../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //身体状态
    reference: {},
    bodyStatus: {
      UserHeight: "",
      MuscleMass: "",
      UserWeight: "",
      BodyFatRatio: "",
      BMI: ""
    },
    //健身目标
    fitnessGoals: [{
      subjectTitle: "您希望通过健身达到哪些改变？",
      subjectType: "多选",
      answerList: [{
          name: "减脂",
          value: "减脂",
          checked: false
        },
        {
          name: "增肌",
          value: "增肌",
          checked: false
        }, {
          name: "瘦身",
          value: "瘦身",
          checked: false
        }, {
          name: "塑形",
          value: "塑形",
          checked: false
        }, {
          name: "运动康复",
          value: "运动康复",
          checked: false
        }, {
          name: "提高运动表现",
          value: "提高运动表现",
          checked: false
        }
      ]
    }, {
      subjectTitle: "您最想改变哪些部位？",
      subjectType: "多选",
      answerList: [{
          name: "腹部",
          value: "腹部",
          checked: false
        },
        {
          name: "胸部",
          value: "胸部",
          checked: false
        },
        {
          name: "背部",
          value: "背部",
          checked: false
        }, {
          name: "手臂",
          value: "手臂",
          checked: false
        }, {
          name: "腿部",
          value: "腿部",
          checked: false
        }
      ],
    }, {
      subjectTitle: "您希望多长时间完成目标？",
      subjectType: "单选",
      answerList: [{
          name: "1个月",
          value: "1个月"
        },
        {
          name: "2个月",
          value: "2个月"
        }, {
          name: "3个月",
          value: "3个月"
        }, {
          name: "6个月",
          value: "6个月"
        }
      ],
      radio: ''
    }, {
      subjectTitle: "为了您的目标您每周能来运动几天？",
      subjectType: "单选",
      answerList: [{
          name: "1天",
          value: "1天"
        },
        {
          name: "2天",
          value: "2天"
        }, {
          name: "3天",
          value: "3天"
        }, {
          name: "4天",
          value: "4天"
        }, {
          name: "5天",
          value: "5天"
        }, {
          name: "6天",
          value: "6天"
        }, {
          name: "7天",
          value: "7天"
        }
      ],
      radio: ''
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let pages = getCurrentPages();
    let prevpage = pages[pages.length - 2];
    this.prevpage = prevpage;
    if (prevpage.route == 'pages/trainning/trainning') {
      this.getReferenceData();
    } else {
      this.getTrainDetail();
    }
  },
  referenceSave() {
    var custom = app.globalData.custom,
      targetdata = [],
      answers = "",
      fitnessGoals = this.data.fitnessGoals;
    let {
      UserHeight,
      MuscleMass,
      UserWeight,
      BodyFatRatio,
      BMI
    } = this.data.bodyStatus;
    fitnessGoals.forEach(goals => {
      if (goals.subjectType == '多选') {
        answers = goals.answerList.filter(item => item.checked).map(item1 => item1.value).join()
      } else if (goals.subjectType == '单选') {
        answers = goals.radio
      }
      targetdata.push({
        Questions: goals.subjectTitle,
        SubjectType: goals.subjectType,
        Answer: answers,
        UI_Phone: ""
      })
    })
    var jsonStr = {
      UI_ID: custom.UI_ID,
      rd_id: 0,
      UserHeight: UserHeight,
      MuscleMass: MuscleMass,
      UserWeight: UserWeight,
      BodyFatRatio: BodyFatRatio,
      BMI: BMI,
      targetdata: targetdata
    };
    if (!UserHeight || !MuscleMass || !UserWeight || !BodyFatRatio || !BMI) {
      wx.showToast({
        icon: "none",
        title: '请填写身体状态',
      })
      return
    }
    service.post('/ReferenceDataSave', {
      user_token: wx.getStorageSync('token'),
      json: JSON.stringify(jsonStr),
      gi_id: wx.getStorageSync('gi_id')
    }).then(res => {
      app.globalData.rd_id = res.data.rd_id;
      if (this.prevpage.route == 'pages/newtrainProgram/newtrainProgram') {
        wx.navigateBack({
          delta: 1,
        });
        this.prevpage.getReferenceData(false, res.data.rd_id);
      } else {
        wx.redirectTo({
          url: '/pages/newtrainProgram/newtrainProgram',
        })
      }
    })
  },
  getTrainDetail() {
    var fitnessGoals = this.data.fitnessGoals;
    service.post('/TrainProgrammeDetails', {
      user_token: wx.getStorageSync('token'),
      rd_Id: app.globalData.rd_id,
      gi_id: wx.getStorageSync('gi_id')
    }).then(res => {
      let {
        UserHeight,
        MuscleMass,
        UserWeight,
        BodyFatRatio,
        BMI
      } = res.data.data;
      for (let i = 0; i < fitnessGoals.length; i++) {
        res.data.data.qsdata.forEach(item => {
          if (fitnessGoals[i].subjectTitle == item.Questions) {
            fitnessGoals[i] = this.filterTarget(fitnessGoals[i], item.Answer.split(','));
          }
        })
      }
      this.setData({
        reference: res.data.data,
        bodyStatus: {
          UserHeight,
          MuscleMass,
          UserWeight,
          BodyFatRatio,
          BMI
        },
        fitnessGoals: fitnessGoals
      })
    })
  },
  getReferenceData() {
    var custom = app.globalData.custom,
      fitnessGoals = this.data.fitnessGoals;
    service.post('/ReferenceDataNew', {
      user_token: wx.getStorageSync('token'),
      UI_ID: custom.UI_ID || '3834',
      gi_id: wx.getStorageSync('gi_id')
    }).then(res => {
      let {
        UserHeight,
        MuscleMass,
        UserWeight,
        BodyFatRatio,
        BMI
      } = res.data.data;
      for (let i = 0; i < fitnessGoals.length; i++) {
        res.data.data.targetdata.forEach(item => {
          if (fitnessGoals[i].subjectTitle == item.Questions) {
            fitnessGoals[i] = this.filterTarget(fitnessGoals[i], item.Answer.split(','));
          }
        })
      }
      this.setData({
        reference: res.data.data,
        bodyStatus: {
          UserHeight,
          MuscleMass,
          UserWeight,
          BodyFatRatio,
          BMI
        },
        fitnessGoals: fitnessGoals
      })
    })
  },
  filterTarget(subject, arr1) {
    subject.answerList.forEach(item => {
      arr1.forEach(item1 => {
        if (subject.subjectType == "多选") {
          if (item.value == item1) {
            item.checked = true;
          }
        } else {
          if (item1 == item.value) {
            subject.radio = item1;
          }
        }
      })
    })
    return subject;
  },
  //复选框
  checkboxChange(e) {
    let index = e.currentTarget.dataset.id,
      values = e.detail.value,
      answerList = this.data.fitnessGoals[index].answerList,
      temp = '';
    for (let i = 0, lenI = answerList.length; i < lenI; ++i) {
      answerList[i].checked = false
      for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (answerList[i].value == values[j]) {
          answerList[i].checked = true;
          break;
        }
      }
    }
    temp = "fitnessGoals[" + index + "].answerList";
    this.setData({
      [temp]: answerList
    })
  },
  //单选框
  radioChange(event) {
    let index = event.currentTarget.dataset.id,
      value = event.detail,
      list = this.data.fitnessGoals;
    for (let i = 0; i < list.length; i++) {
      list[index].radio = value;
    }
    this.setData({
      fitnessGoals: list
    });
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

  }
})