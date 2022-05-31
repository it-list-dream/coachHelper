// questionnaire/pages/question/question.js
var service = require('../../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //type 0 多选 type 1代表单选 2代表多选 3代表输入框
    questionNum: 0,
    //其他
    isShowQuestion: false,
    allQuestion: null,
    //其他
    othersAnwer: "",
    limitCount: 10,
    //文本列表
    texList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.ui_id = options.ui_id;
    //console.log(options)
    this.getQuestionDetail();
  },
  getQuestionDetail() {
    let gi_id = wx.getStorageSync('gi_id');
    service.post('/QuestList', {
      gi_id: gi_id
    }).then(res => {
      service.post('/QuestDetailed', {
        questId: res.data.data[0].QuestID,
        gi_id: gi_id
      }).then(res => {
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
        console.log(allList)
        this.setData({
          allQuestion: allList
        })
      })
    })
  },
  radioChange(e) {
    let answer_value = e.detail.value,
      questList = this.data.allQuestion.questList;
    //题号
    let answer_index = e.currentTarget.dataset.id;
    //console.log(answer_value, answer_index);
    //找到当前的题号
    for (var i = 0; i < questList.length; i++) {
      if (answer_index == questList[i].orderSort) {
        console.log('当前题目:', questList[i].optionList);
        // debugger;
        for (var j = 0; j < questList[i].optionList.length; j++) {
          // console.log(questList[i].optionList[j])
          if (answer_value == questList[i].optionList[j].Answer) {
            questList[i].optionList[j].checked = true;
          } else {
            questList[i].optionList[j].checked = false;
          }
        }
      }
    }
    this.setData({
      "allQuestion.questList": questList
    })
  },
  checkboxChange(e) {
    const questList = this.data.allQuestion.questList;
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
      "allQuestion.questList": questList
    })
  },
  //
  perv() {
    let answer_index = this.data.questionNum;
    if (answer_index >= 1) {
      answer_index--;
      this.setData({
        questionNum: answer_index
      })
    }
  },
  next() {
    let answer_index = this.data.questionNum,
      questList = this.data.allQuestion.questList
    if (answer_index < questList.length - 1) {
      answer_index++;
      this.setData({
        questionNum: answer_index
      })
    }
  },
  onClose(e) {
    let id = e.currentTarget.dataset.id;
    this.setData({
      isShowQuestion: false
    });
  },
  others(e) {
    this.setData({
      othersAnwer: e.detail.value
    })
  },
  onSave() {
    //othersAnwer
    //将textarea中的数据存放到数组中
    let answerIndex = this.data.questionNum,
      questList = this.data.allQuestion.questList,
      othersAnwer = this.data.othersAnwer;
    if (othersAnwer.length > 0) {
      console.log(questList[answerIndex].optionList)
      questList[answerIndex].optionList.push({
        Answer: othersAnwer,
        checked: false
      })
    }
    this.setData({
      isShowQuestion: false,
      othersAnwer: "",
      "allQuestion.questList": questList
    })
  },
  defined() {
    this.setData({
      isShowQuestion: true
    })
  },
  handleAssess() {
    //提交问卷
    this.commitform(function () {
      wx.redirectTo({
        url: '/questionnaire/pages/riskEvaluation/riskEvaluation',
      })
    })
  },
  questionCommit() {
    this.commitform(function () {
      wx.redirectTo({
        url: '/questionnaire/pages/questionList/questionList',
      })
    })
  },
  commitform(fn) {
    let questLit = this.data.allQuestion.questList,
      allQuestion = this.data.allQuestion;
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
    console.log(allQuestion.questList)
    allQuestion.questList = questLit;
    allQuestion.UI_ID = this.ui_id;
    console.log(JSON.stringify(allQuestion))
    service.post('/QuestResultSave', {
      json: JSON.stringify(allQuestion),
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
  //文本
  changeInputText(e) {
    let questList = this.data.allQuestion.questList,
      questId = e.currentTarget.dataset.id,
      optionText = e.detail.value;
    questList.forEach(item => {
      if (questId == item.questionsId) {
        item.optionText = optionText;
      }
    });
    console.log('all', questList)
    this.setData({
      "allQuestion.questList": questList
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