// questionnaire/pages/question/question.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //type 0 多选 type 1代表单选 2代表多选 3代表输入框
    questionNum: 0,
    questionList: [{
        topic: "1.您之前有没有参加过健身？",
        answerList: [{
          name: "没有",
          checked: false
        }, {
          name: "有",
          checked: false
        }],
        type: 1,
        isOhters: false
      },
      {
        topic: "2.您现在有没有任何的健身计划？",
        answerList: [{
          name: "没有",
          checked: false
        }, {
          name: "有",
          checked: false
        }],
        type: 1,
        isOhters: false
      },
      {
        topic: "3.您现在有没有任何的健身计划？",
        answerList: [{
            name: "减脂",
            checked: false
          }, {
            name: "增肌",
            checked: false
          }, {
            name: "廋身",
            checked: false
          }, {
            name: "塑形",
            checked: false
          }, {
            name: "运动康复",
            checked: false
          },
          {
            name: "提高运动表现",
            checked: false
          }
        ],
        type: 2,
        isOhters: true
      }, {
        topic: "4.您现在有没有任何的健身计划？",
        answerList: [{
            name: "胸部",
            checked: false
          }, {
            name: "背部",
            checked: false
          }, {
            name: "手臂",
            checked: false
          }, {
            name: "腹部",
            checked: false
          }, {
            name: "腿部",
            checked: false
          },
          {
            name: "腿部",
            checked: false
          }
        ],
        type: 2,
        isOhters: true
      },
      {
        topic: "5.您希望多长时间完成目标？",
        answerList: [{
          name: "1个月",
          checked: false
        }, {
          name: "2个月",
          checked: false
        }, {
          name: "3个月",
          checked: false
        }, {
          name: "6个月",
          checked: false
        }, {
          name: "12个月",
          checked: false
        }],
        type: 0,
        isOhters: true
      },
      {
        topic: "6.您是否聘请过私人教练？",
        answerList: [{
          name: "没有",
          checked: false
        }, {
          name: "有",
          checked: false
        }],
        type: 1,
        isOhters: false
      },
      {
        topic: "7.为了您的目标您每周能来运动几天？",
        answerList: [{
          name: "1-2天",
          checked: false
        }, {
          name: "2-3天",
          checked: false
        }, {
          name: "3-4天",
          checked: false
        }, {
          name: "4-5天",
          checked: false
        }, {
          name: "5-6天",
          checked: false
        }, {
          name: "6-7天",
          checked: false
        }],
        type: 0,
        isOhters: false
      },
      {
        topic: "8.您通常每天什么时间能来运动？（多选）",
        answerList: [{
          name: "上午",
          checked: false
        }, {
          name: "中午",
          checked: false
        }, {
          name: "下午",
          checked: false
        }, {
          name: "晚上",
          checked: false
        }],
        type: 2,
        isOhters: true
      },
      {
        topic: "您有什么好的建议？",
        idea: "",
        type: 3,
      }
    ],
    isShowQuestion: false,
    //是否超过页面
    isOverHeight: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  radioChange(e) {
    let answer_value = e.detail.value;
    let answer_index = e.currentTarget.dataset.id;
    let answerList = this.data.questionList;
    for (let i = 0; i < answerList[answer_index].length; i++) {
      if (answerList[answer_index][i].name == answer_value) {
        answerList[answer_index][i].checked = true;
      } else {
        answerList[answer_index][i].checked = false;
      }
    }
    // this.setData({
    //   questionList: answerList 
    // })
  },
  checkboxChange(e) {

  },
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
    let answer_index = this.data.questionNum;
    if (answer_index < this.data.questionList.length - 1) {
      answer_index++;
      this.setData({
        questionNum: answer_index
      })
    }
  },
  onClose() {
    this.setData({
      isShowQuestion: false
    });
  },
  onCancel() {
    this.setData({
      isShowQuestion: false
    })
  },
  onSave() {
    this.setData({
      isShowQuestion: false
    })
  },
  defined() {
    this.setData({
      isShowQuestion: true
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