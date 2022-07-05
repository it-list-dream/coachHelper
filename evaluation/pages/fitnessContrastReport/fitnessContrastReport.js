const app = getApp();
var service = require('../../../utils/request.js');
var util = require('../../../utils/util.js')
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
    key: "bmr",
    value: "基础代谢",
    monad: "kcal",
    icon: "./images/daixie.png"
  }
];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addExmple: false,
    exmpleList: [{
      name: "减脂",
      checked: false
    }, {
      name: "增肌",
      checked: false
    }, {
      name: "塑形",
      checked: false
    }, {
      name: "恢复",
      checked: false
    }, {
      name: "运动表现",
      checked: false
    }],
    isExample: false,
    exampleText: "+添加为案例"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //
    let id = options.id,
        id2 = options.id2;
    this.cc_id = options.cc_id;
    this.setData({
      custom: app.globalData.custom,
    });
    this.getFitness(id, id2);
    this.getBodyTestImageList(id, 'photoList');
    this.getBodyTestImageList(id2, 'photoList2');
  },
  //关闭
  onClose() {
    let exmpleList = this.data.exmpleList;
    exmpleList.forEach(item => {
      item.checked = false;
    });
    this.setData({
      addExmple: false,
      exmpleList
    });
  },
  addexmple() {
    if(this.data.exampleText == "+添加为案例"){
      this.setData({
        addExmple: true
      });
    }else{
      wx.showModal({
        title: '提示',
        content: '是否删除此案例？',
        success (res) {
          if (res.confirm) {
            service.post("/CustCaseDel",{
              cc_id:	this.cc_id,
              gi_id:wx.getStorageSync('gi_id')
             }).then(res=>{
                wx.navigateBack({
                  delta: 1,
                })
             })
          } else if (res.cancel) {}
        }
      })
    }
  },
  trainTag(e) {
    let index = e.currentTarget.dataset.index;
    let typeList = this.data.exmpleList;
    typeList[index].checked = true;
    for (let i = 0; i < typeList.length; i++) {
      if (index == i) {
        typeList[i].checked = true;
      } else {
        typeList[i].checked = false;
      }
    }
    this.setData({
      exmpleList: typeList
    });
  },
  getBodyTestImageList(rb_id, test) {
    service.post('/BodyTestImageList', {
      rb_id: rb_id,
      gi_id: wx.getStorageSync('gi_id')
    }).then(res => {
      this.setData({
        [test]: res.data.data
      })
    })
  },
  onConfrim(e) {
    let exmpleList = this.data.exmpleList,
      label = exmpleList.filter(item => item.checked)[0].name;
    var cycle = Date.parse(this.data.date2) - Date.parse(this.data.date),
      tagList = [{
        reportId: 52,
        StartDate:util.format( this.data.date,'yyyy-mm-dd')
      }, {
        reportId: 53,
        StartDate:util.format( this.data.date2,'yyyy-mm-dd')
      }];
    cycle = cycle / 1000 / 60 / 60 / 24;
    this.setData({
      addExmple: false
    });
    //保存案例
    var json = {
      CaseLable: label,
      CaseType: "身体成分",
      UI_ID: this.data.custom.UI_ID,
      CycleDays: cycle,
      CastData: this.data.changeData.weight,
      ImageId:this.data.photoList2[0]?this.data.photoList2[0].ImageId : 0,
      data: tagList
    }
    service.post('/SaveCustCase', {
      gi_id: wx.getStorageSync('gi_id'),
      json: JSON.stringify(json)
    }).then(res => {
      wx.showToast({
        icon: "none",
        title: '案例添加成功',
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
    let isExample = app.globalData.isCase,
      exampleText = '';
    exampleText = isExample ? "移除案例" : "+添加为案例";
    this.setData({
      isExample: isExample,
      exampleText: exampleText
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},
  getFitness(rb_id1, rb_id2) {
    service.post('/BodyTestVs', {
      gi_id: wx.getStorageSync('gi_id'),
      rb_id1: rb_id1,
      rb_id2: rb_id2
    }).then(res => {
      let composition = this.handleCase(res.data.data.composition),
        composition2 = this.handleCase(res.data.data1.composition);
      let date = util.format(res.data.data.start_time, 'yyyy.mm.dd'),
        date2 = util.format(res.data.data1.start_time, 'yyyy.mm.dd');
      let changeData = {};
      for (let com in composition) {
        for (let com2 in composition2) {
          if (com == com2) {
            changeData[com] = (composition2[com].value - composition[com].value).toFixed(1);
          }
        }
      }
      this.setData({
        composition,
        composition2,
        date,
        date2,
        changeData
      })
    })
  },
  handleCase(list) {
    var newObj = {};
    for (var analysis in list) {
      for (let i = 0; i < bodyList.length; i++) {
        if (bodyList[i].key == analysis) {
          bodyList[i].analysis = list[analysis];
          newObj[analysis] = bodyList[i].analysis;
        }
      }
    }
    return newObj;
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    app.globalData.isCase = false;
  },
  toPoster(){
    wx.navigateTo({
      url: '/evaluation/pages/poster/poster',
    })
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