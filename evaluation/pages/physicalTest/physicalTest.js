// evaluation/pages/physicalTest/physicalTest.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selfInfo: {
      age: 18,
      height: 161,
      weight: 40
    },
    active: 0,
    //身体成分
    bodyCompsition: {
      fatMass: "",
      water: "",
      skeletal: "",
      muscle: "",
      whr: ""
    },
    //身体测量
    physicalStateList: [{
        physicalName: "血压",
        physicalImage: "./images/blood_pressure.png",
        value: "",
        unit: "mmHg"
      },
      {
        physicalName: "心率",
        physicalImage: "./images/heart_rate.png",
        value: "",
        unit: "bpm"
      },
      {
        physicalName: "胸围",
        physicalImage: "./images/breast.png",
        value: "",
        unit: "cm"
      },
      {
        physicalName: "肩围",
        physicalImage: "./images/headback.png",
        value: "",
        unit: "cm"
      }, {
        physicalName: "腰围",
        physicalImage: "./images/waist.png",
        value: "",
        unit: "cm"
      }, {
        physicalName: "臀围",
        physicalImage: "./images/hip.png",
        value: "",
        unit: "cm"
      }, {
        physicalName: "左上臂围",
        physicalImage: "./images/left_arm.png",
        value: "",
        unit: "cm"
      }, {
        physicalName: "右上臂围",
        physicalImage: "./images/right_arm.png",
        value: "",
        unit: "cm"
      }, {
        physicalName: "左大腿围",
        physicalImage: "./images/left_leg.png",
        value: "",
        unit: "cm"
      }, {
        physicalName: "右大腿围",
        physicalImage: "./images/right_leg.png",
        value: "",
        unit: "cm"
      }, {
        physicalName: "左小腿围",
        physicalImage: "./images/left_shank.png",
        value: "",
        unit: "cm"
      },
      {
        physicalName: "右小腿围",
        physicalImage: "./images/right_shank.png",
        value: "",
        unit: "cm"
      }
    ],
    //血压
    multiArray: [],
    multiIndex: [104, 0, 74],
    fileList1: [],
    fileList2: [],
    fileList3: [],
    fileList4: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var sys_pressure = [],
      dia_pressure = [],
      multiArray = this.data.multiArray;
    for (let i = 1; i <= 200; i++) {
      sys_pressure.push(i);
      dia_pressure.push(i)
    }
    multiArray[0] = sys_pressure;
    multiArray[1] = ['/'];
    multiArray[2] = dia_pressure;
    this.sys_pressure = sys_pressure;
    this.dia_pressure = dia_pressure;
    this.setData({
      multiArray: multiArray,
    })
  },
  onChange(e) {
    this.setData({
      active: e.detail.index
    })
  },
  nextstep() {
    if (this.data.active == 0) {
      this.setData({
        active: 1
      })
    }
  },
  report() {
    wx.navigateTo({
      url: '/evaluation/pages/physicalReport/physicalReport',
    })
  },
  getbodyCom(event) {
    let key = event.currentTarget.dataset.key,
      bodyCom = this.data.bodyCompsition;
    for (var k in bodyCom) {
      if (k == key) {
        bodyCom[k] = event.detail.value
      }
    }
    console.log(bodyCom)
    this.setData({
      bodyCompsition: bodyCom
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
  //picker
  bindMultiPickerChange(e) {
    console.log('picker的值：', e.detail.value);
    let value = e.detail.value,
      bloodText,
      physicalList = this.data.physicalStateList;
    bloodText = this.data.multiArray[0][value[0]] + '/' + this.data.multiArray[2][value[2]];
    physicalList.forEach(item => {
      if (item.physicalName == '血压') {
        item.value = bloodText
      }
    });
    this.setData({
      physicalStateList: physicalList
    })
  },
  afterRead(e) {
    let index = e.currentTarget.dataset.index;
    var fileList1 = this.data.fileList1,
      fileList2 = this.data.fileList2,
      fileList3 = this.data.fileList3,
      fileList4 = this.data.fileList4;
    if (index == 0) {
      fileList1.push({
        name: "图片1",
        url: e.detail.file.url
      });
      this.setData({
        fileList1
      });
    } else if (index == 1) {
      fileList2.push({
        name: "图片2",
        url: e.detail.file.url
      });
      this.setData({
        fileList2
      });
    } else if (index == 2) {
      fileList3.push({
        name: "图片3",
        url: e.detail.file.url
      });
      this.setData({
        fileList3
      });
    } else if (index == 3) {
      fileList4.push({
        name: "图片4",
        url: e.detail.file.url
      });
      this.setData({
        fileList4
      });
    }
  },
  deletePicture(e) {
    var fileList1 = this.data.fileList1,
      fileList2 = this.data.fileList2,
      fileList3 = this.data.fileList3,
      fileList4 = this.data.fileList4;
    let index = e.currentTarget.dataset.index;
    switch (parseInt(index)) {
      case 0:
        fileList1.splice(0, 1);
        this.setData({
          fileList1
        });
        break;
      case 1:
        fileList2.splice(0, 1);
        this.setData({
          fileList2
        });
        break;
      case 2:
        fileList3.splice(0, 1);
        this.setData({
          fileList3
        });
        break;
      case 3:
        fileList4.splice(0, 1);
        this.setData({
          fileList4
        });
        break;
    }
  },
  bindBloodChange(e) {},
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  }
})