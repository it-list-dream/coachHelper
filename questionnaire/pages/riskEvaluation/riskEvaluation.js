// questionnaire/pages/riskEvaluation/riskEvaluation.js
const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    questionNum: 0,
    questionList: [{
        topic: "1.医生曾否说过你的心脏有问题并只可以进行医 生建议的体能活动？",
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
        topic: "2.您进行体能活动时是否感到胸口痛？",
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
        topic: "3.过去一个月，您曾否在没有进行体能活动时感 到胸口痛？",
        answerList: [{
          name: "没有",
          checked: false
        }, {
          name: "有",
          checked: false
        }
        ],
        type: 1,
        isOhters: false
      }, {
        topic: "4.您曾否因眩晕而失去平衡或知觉？？",
        answerList: [{
          name: "没有",
          checked: false
        }, {
          name: "有",
          checked: false
        }
        ],
        type: 1,
        isOhters:false
      },
      {
        topic: "5.您的骨骼或关节是否有问题，且因改变体能活动而恶化？",
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
        topic: "6.先阶段医生是否有开降压药或心脏药物给你服用？",
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
        topic: "7.是否有其他理由令您不应该进行体能活动?",
        answerList: [{
          name: "没有",
          checked: false
        }, {
          name: "有",
          checked: false
        }],
        type: 1,
        isOhters: false
      }
    ],
    str:"结果说明#如果全部问题回答“否”：#如果你对所有PAR-Q问题都回答了“否”，那么，你有理由相信你能：参加更多的体力活动，但要缓慢开始并循序渐进，这是最安全，最容易的方法。进行体适能评价，这是确定你的额基础体适能的良好方法，并是你能够确定实现积极生活方式的最佳途径。强烈推荐你测量血压。如果你的血压高于14494Hmmg,请在参加更多体力活动前咨询医生"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    if (answer_index < this.data.questionList.length) {
      answer_index++;
      this.setData({
        questionNum: answer_index
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})