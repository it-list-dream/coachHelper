var service = require('../../utils/request.js');
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    vanTabsList: ['方案'],
    tabsActive: 0,
    windowHeight: 0,
    //课程
    classList: [],
    //是否显示添加课程弹窗
    showClass: false,
    selectedClass: [{
      classTitle: "方案",
      cList: [{
        "cp_name": "次卡",
        "cp_id": "149",
        "cp_time": "60",
        "cp_logo": "file/584/Coach/2021/2021081118585206584.jpg",
        "priceList": [{
            "SaleLevel": 1,
            "MinNum": 1,
            "MaxNum": 20,
            "SalePrice": 0,
            "PosPrice": 10,
            "CP_ID": 149
          },
          {
            "SaleLevel": 2,
            "MinNum": 21,
            "MaxNum": 100,
            "SalePrice": 300,
            "PosPrice": 280,
            "CP_ID": 149
          },
          {
            "SaleLevel": 3,
            "MinNum": 100,
            "MaxNum": 200,
            "SalePrice": 198,
            "PosPrice": 188,
            "CP_ID": 149
          }
        ],
        "courseNum":1,
        "checked": false
      }]
    }],
    //总价格
    allPrice: 0,
    //isPos
    isPos: -1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight
        })
      }
    })
    this.getSaleCoachClass();
  },
  getSaleCoachClass() {
    service.post('/SaleCoachClassList', {
      user_token: wx.getStorageSync('token'),
      UI_ID: app.globalData.custom.UI_ID || 3834,
      gi_id: wx.getStorageSync('gi_id')
    }).then(res => {
      let cList = res.data.data;
      cList.forEach(item => {
        item.checked = false;
      });
      this.setData({
        classList: cList,
        isPos: res.data.isPos
      })
    })
  },
  changePrice(e) {
    let index = e.currentTarget.dataset.index,
      number = e.detail,
      classList = this.data.selectedClass[this.data.tabsActive].cList,
      totalPrice = 0,
      goodPrice = 0;
    var classStr = "selectedClass[" + this.data.tabsActive + "].cList[" + index + "].courseNum";
    this.setData({
      [classStr]: number
    });
    for (var i = 0; i < classList.length; i++) {
      for (var j = 0; j < classList[i].priceList.length; j++) {
        if (number >= classList[i].priceList[j].MinNum && number <= classList[i].priceList[j].MaxNum) {
          if (this.data.isPos == 1) {
            goodPrice = classList[i].priceList[j].PosPrice;
          } else {
            goodPrice = classList[i].priceList[j].SalePrice;
          }
        }
      }
      totalPrice += Number(goodPrice) * Number(classList[i].courseNum);
    }
    this.setData({
      allPrice: totalPrice
    });
  },
  addPlus() {
    let tabList = this.data.vanTabsList,
      slist = this.data.selectedClass;
    slist.push({
      classTitle: '方案' + tabList.length,
      cList: []
    });
    tabList.push('方案' + tabList.length);
    this.setData({
      vanTabsList: tabList,
      tabsActive: tabList.length - 1,
      selectedClass: slist
    });
    this.calculatePrice();
  },
  switchTab(e) {
    let current = e.currentTarget.dataset.current;
    this.setData({
      tabsActive: current
    })
    this.calculatePrice();
  },
  //确定 取消
  onCancel() {
    this.setData({
      showClass: false
    })
  },
  //确定
  onConfrim(e) {
    let classList = this.data.selectedClass[this.data.tabsActive].cList;
    for (let i = 0; i < e.detail.length; i++) {
      e.detail[i].courseNum = 1;
    }
    classList.push(...e.detail);
    var cStr = "selectedClass[" + this.data.tabsActive + "].cList";
    this.setData({
      [cStr]: classList,
      showClass: false
    });
    this.calculatePrice();
  },
  showMask() {
    this.setData({
      showClass: true
    });
  },
  payMoney() {
    wx.navigateTo({
      url: '/pages/courseContract/courseContract',
    });
  },
  //删除
  deleteClass(e) {
    var sList = this.data.selectedClass[this.data.tabsActive].cList,
      index = e.currentTarget.dataset.index;
    sList.splice(index, 1);
    let deleteStr = "selectedClass[" + this.data.tabsActive + "].cList";
    this.setData({
      [deleteStr]: sList
    });
  },
  //计算价格
  calculatePrice() {
    var classList = this.data.selectedClass[this.data.tabsActive].cList,
      allTotal = 0,
      goodPrice;
    for (var i = 0; i < classList.length; i++) {
      for (var j = 0; j < classList[i].priceList.length; j++) {
        if (classList[i].courseNum >= classList[i].priceList[j].MinNum && classList[i].courseNum <= classList[i].priceList[j].MaxNum) {
          if (this.data.isPos == 1) {
            goodPrice = classList[i].priceList[j].PosPrice;
          } else {
            goodPrice = classList[i].priceList[j].SalePrice;
          }
        }
      }
      allTotal += Number(goodPrice) * Number(classList[i].courseNum);
    }
    this.setData({
      allPrice: allTotal
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