// questionnaire/pages/riskEvaluation/riskEvaluation.js
const util = require('../../../utils/util.js');
var service = require('../../../utils/request.js');
var upLoad = require('../../../utils/upload.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    questionNum: 0,
    riskAssessment: {},
    //画布
    context1: null,
    hasDraw: false, //默认没有画
    src: null,
    ideaText: "",
    //其他
    isShowRisk: false,
    othersAnwer: "",
    limitCount: 8
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    var context1 = wx.createCanvasContext('handWriting1');
    context1.setStrokeStyle("#000000")
    context1.setLineWidth(3);
    this.setData({
      context1: context1,
    })
    this.ui_id = options.ui_id;
    this.getRiskAssessment();
  },
  getRiskAssessment() {
    var gi_id = wx.getStorageSync('gi_id');
    service.post('/RiskAssessmentList', {
      gi_id: gi_id
    }).then(res => {
      service.post('/QuestDetailed', {
        questId: res.data.data[0].QuestID,
        gi_id: gi_id
      }).then(res => {
        console.log('风险评估列表:', res.data.data)
        var allList = res.data.data;
        //题目
        for (let j = 0; j < allList.questList.length; j++) {
          if (allList.questList[j].optionList && allList.questList[j].optionList.length > 0) {
            for (let k = 0; k < allList.questList[j].optionList.length; k++) {
              allList.questList[j].optionList[k].checked = false;
            }
          } else {
            allList.questList[j].optionText = "";
          }
        }
        //console.log(allList)
        this.setData({
          riskAssessment: allList
        })
      })
    })
  },
  touchstart: function (e) {
    var context1 = this.data.context1;
    context1.moveTo(e.touches[0].x, e.touches[0].y);
    this.setData({
      context1: context1,
      hasDraw: true, //要签字了
    });
  },
  touchmove: function (e) {
    var x = e.touches[0].x;
    var y = e.touches[0].y;
    var context1 = this.data.context1;
    context1.setLineWidth(3);
    context1.lineTo(x, y);
    context1.stroke();
    context1.setLineCap('round');
    context1.draw(true);
    context1.moveTo(x, y);
  },
  reSign: function () { //重新画
    var that = this;
    var context1 = that.data.context1;
    context1.draw(); //清空画布
    that.setData({
      hasDraw: false, //没有画
      src: null
    });
  },
  handleSubmit() {
    var that = this;
    if (!that.data.hasDraw) {
      //console.log("签字是空白的 没有签字");
      wx.showToast({
        icon: "none",
        title: "签字是空白的 没有签字"
      })
    } else {
      var context1 = that.data.context1;
      context1.draw(true, wx.canvasToTempFilePath({
        canvasId: 'handWriting1',
        success(res) {
          console.log(res.tempFilePath) //得到了图片下面自己写上传吧
          that.setData({
            src: res.tempFilePath
          })
          //上传图片 //ReceiveFiles token gi_id
          upLoad.uploadImage('/ReceiveFiles', res.tempFilePath, 'signature', {
            gi_id: wx.getStorageSync('gi_id')
          }).then(res => {
            //先将图片提交，在提交表单中的内容
            //console.log(res, res.filesid);
            that.commitform(function () {
              wx.redirectTo({
                url: '/questionnaire/pages/questionList/questionList',
              })
            }, res.filesid)
          })
        }
      }))
    }
  },
  //上一题
  perv() {
    let answer_index = this.data.questionNum;
    if (answer_index >= 1) {
      answer_index--;
      this.setData({
        questionNum: answer_index
      })
    }
  },
  //下一题
  next() {
    let answer_index = this.data.questionNum;
    if (answer_index < this.data.riskAssessment.questList.length) {
      answer_index++;
      this.setData({
        questionNum: answer_index
      })
    }
  },
  //单选
  radioChange(e) {
    let answer_value = e.detail.value,
      questList = this.data.riskAssessment.questList;
    //题号
    let answer_index = e.currentTarget.dataset.id;
    //console.log(answer_value, answer_index);
    //找到当前的题号
    for (var i = 0; i < questList.length; i++) {
      if (answer_index == questList[i].orderSort) {
        console.log('当前题目:', questList[i].optionList);
        // debugger;
        for (var j = 0; j < questList[i].optionList.length; j++) {
          if (answer_value == questList[i].optionList[j].Answer) {
            questList[i].optionList[j].checked = true;
          } else {
            questList[i].optionList[j].checked = false;
          }
        }
      }
    }
    this.setData({
      "riskAssessment.questList": questList
    })
  },
  //多选
  checkboxChange(e) {
    const questList = this.data.riskAssessment.questList;
    const values = e.detail.value;
    let id = e.currentTarget.dataset.id,
      items = [],
      qIndex;
    questList.forEach((item, index) => {
      if (item.orderSort == id) {
        items = item.optionList;
        qIndex = index;
      }
    })
    for (let i = 0, lenI = items.length; i < lenI; ++i) {
      items[i].checked = false
      for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (items[i].Answer === values[j]) {
          items[i].checked = true
          break
        }
      }
    }
    questList[qIndex].optionList = items;
    this.setData({
      "riskAssessment.questList": questList
    })
  },
  commitform(fn, fileId) {
    let questLit = this.data.riskAssessment.questList,
      riskAssessment = this.data.riskAssessment;
    var checkedList = [],
      textareaList = [];
    for (let i = 0; i < questLit.length; i++) {
      if (Array.isArray(questLit[i].optionList)) {
        checkedList = questLit[i].optionList.filter(item => item.checked);
        if (checkedList.length > 0) {
          questLit[i].optionList = checkedList;
        } else {
          wx.showToast({
            title: '请完成 \n' + questLit[i].questions,
            icon: "none",
            duration: 1500
          })
          this.setData({
            questionNum: i
          })
          return;
        }
      }
      //输入框
      if (questLit[i].subjectType == '单选' && !questLit[i].optionList && questLit[i].isOtherOption == 1) {
        if (questLit[i].optionText.length > 0) {
          textareaList.push({
            Answer: questLit[i].optionText
          })
          questLit[i].optionList = textareaList;
        } else {
          wx.showToast({
            title: '请完成 \n' + questLit[i].questions,
            icon: "none"
          })
        }
      }
    }
    riskAssessment.questList = questLit;
    riskAssessment.UI_ID = this.ui_id;
    if (fileId) {
      riskAssessment.userSign = fileId;
    }
    //console.log(JSON.stringify(riskAssessment))
    service.post('/QuestResultSave', {
      json: JSON.stringify(riskAssessment),
      gi_id: wx.getStorageSync('gi_id')
    }).then(res => {
      fn && fn();
    }).catch(err => {
      wx.showToast({
        title: err,
        icon: "none"
      })
    })
  },
  //
  others(e) {
    console.log('others', e)
    this.setData({
      othersAnwer: e.detail.value
    })
  },
  defined() {
    this.setData({
      isShowRisk: true
    })
  },
  onClose() {
    this.setData({
      isShowRisk: false
    })
  },
  onSave() {
    console.log('保存');
    var answerList = this.data.riskAssessment.questList[this.data.questionNum];
    if (this.data.othersAnwer.length > 0) {
      answerList.optionList.push({
        Answer: this.data.othersAnwer,
        checked: false
      })
    }
    var oper = "riskAssessment.questList[" + this.data.questionNum + "]"
    this.setData({
      isShowRisk: false,
      othersAnwer: "",
      [oper]: answerList
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

  }
})