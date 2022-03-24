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
        }],
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
        }],
        type: 1,
        isOhters: false
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
    context1: null,
    hasDraw: false, //默认没有画
    src: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var context1 = wx.createCanvasContext('handWriting1');
    context1.setStrokeStyle("#000000")
    context1.setLineWidth(3);
    this.setData({
      context1: context1,
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
      console.log("签字是空白的 没有签字")
    } else {
      var context1 = that.data.context1;
      context1.draw(true, wx.canvasToTempFilePath({
        canvasId: 'handWriting1',
        success(res) {
          console.log(res.tempFilePath) //得到了图片下面自己写上传吧
          that.setData({
            src: res.tempFilePath
          })
          wx.redirectTo({
            url: '/questionnaire/pages/questionList/questionList',
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