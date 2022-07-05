var service = require('../../../utils/request.js');
var upLoad = require('../../../utils/upload.js')
const app = getApp();
var bodyList = [{
    key: 'weight',
    value: '体重',
    monad: 'kg',
    icon: "./images/weight.png"
  }, {
    key: 'fat',
    value: '脂肪量',
    monad: 'kg',
    icon: "./images/fat.png"
  },
  {
    key: 'smm',
    value: '骨骼肌',
    monad: 'kg',
    icon: "./images/skeleton.png"
  },
  {
    key: 'protein',
    value: '蛋白质',
    monad: 'kg',
    icon: "./images/protein.png"
  },
  {
    key: 'tbw',
    value: '身体总水分',
    monad: 'kg',
    icon: "./images/water.png"
  },
  {
    key: 'bmi',
    value: 'BMI',
    monad: '',
    icon: "./images/bim.png"
  }, {
    key: 'pbf',
    value: '体脂率',
    monad: '%',
    icon: "./images/fat_rate.png"
  }, {
    key: "muscle",
    value: "肌肉量",
    monad: "kg",
    icon: "./images/muscle1.png"
  },
  {
    key: "whfr",
    value: "腰臀比",
    monad: "",
    icon: "./images/waist_precent.png"
  },
  {
    key: "bmr",
    value: "基础代谢",
    monad: "kcal",
    icon: "./images/daixie.png"
  },
  {
    key: "vfi",
    value: "内脏脂肪指数",
    monad: "",
    icon: "./images/fatty_live.png"
  }
];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    physcalActive: 0,
    phsicalList: [],
    newBaseList: [],
    segmental_fat: null,
    segmental_muscle: null,
    testImage: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.rb_id = options.rb_id;
    this.getTestListById(options.rb_id);
    this.getBodyTestImage(options.rb_id);
  },
  getBodyTestImage(rb_id) {
    service.post('/BodyTestImageList', {
      rb_id: rb_id || 52,
      gi_id: wx.getStorageSync('gi_id')
    }).then(res => {
      this.setData({
        testImage: res.data.data
      })
    })
  },
  onChange(e) {
    this.setData({
      physcalActive: e.detail.index
    })
  },
  getTestListById(rb_id) {
    let figure = "";
    service.post('/MyBodyTestListById', {
      phone: app.globalData.custom.UI_Phone || "15575380983",
      rb_Id: rb_id || 52,
      gi_id: wx.getStorageSync('gi_id')
    }).then(res => {
      let composition = res.data.data.composition;
      let segmental_muscle, segmental_fat;
      for (var analysis in composition) {
        if (analysis == "figure") {
          figure = composition[analysis].figureName;
        }
        for (let i = 0; i < bodyList.length; i++) {
          if (bodyList[i].key == analysis) {
            bodyList[i].analysis = composition[analysis];
          }
        }
        if (analysis == "segmental_muscle") {
          segmental_muscle = composition[analysis];
        }
        if (analysis == "segmental_fat") {
          segmental_fat = composition[analysis];
        }
      }
      bodyList.forEach(item => {
        let analysis = item.analysis;
        for (let key in analysis) {
          if (key == 'grade') {
            if (analysis.grade == 1) {
              item.body_health = "偏低";
              item.health_color = "#0AE399";
            } else if (analysis.grade == 2) {
              item.body_health = "正常";
              item.health_color = "#FF9A11";
            } else {
              item.health_color = "#FF384C";
              item.body_health = "偏高";
            }
          }
        }
      });
      let phsicalList = [],
        baseList = ["肌肉量", "骨骼肌", "脂肪量", "腰臀比", "基础代谢"],
        newBaseList = [];
      for (let i = 0; i < bodyList.length; i++) {
        for (let j = 0; j < baseList.length; j++) {
          if (bodyList[i].value == baseList[j]) {
            newBaseList.push(bodyList[i])
          }
        }
        if (bodyList[i].value == "体重" || bodyList[i].value == "体脂率" || bodyList[i].value == "BMI" || bodyList[i].value == "腰臀比") {
          phsicalList.push(bodyList[i]);
        }
      }
      this.setData({
        composition: bodyList,
        figure,
        phsicalList,
        newBaseList,
        segmental_fat,
        segmental_muscle
      });
    })
  },
  //图片上传
  uploadPicture(e) {
    let index = parseInt(e.currentTarget.dataset.index);
    upLoad.chooseImage().then(res => {
      upLoad.uploadImage('/ReceiveFiles', res[0], 'report', {
        gi_id: wx.getStorageSync('gi_id')
      }).then(res => {
        this.saveImage(res.filesid, index);
      })
    })

  },
  saveImage(imageId, orderSort) {
    var json = {
      UI_ID: app.globalData.custom.UI_ID,
      RB_ID: this.rb_id,
      ImageId: imageId,
      OrderSort: orderSort
    };
    service.post('/SaveBodyTestImage', {
      json: JSON.stringify(json),
      gi_id: wx.getStorageSync('gi_id')
    }).then(res => {
      this.getBodyTestImage(this.rb_id);
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

  }
})