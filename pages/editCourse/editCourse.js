var util = require('../../utils/util.js');
var service = require('../../utils/request.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    warmUpList: [],
    officialList: [],
    relaxList: [],
    classTitle: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.CS_ID = options.csID;
    this.CO_ID = options.coId;
    if (options.courseName) {
      this.setData({
        classTitle: options.courseName
      });
    }
    this.getClassDetail();
  },
  //关闭
  closeArrow(e) {
    let index = e.currentTarget.dataset.index,
      identify = e.currentTarget.dataset.identify;
    var warmUpList = this.data.warmUpList,
      officialList = this.data.officialList,
      relaxList = this.data.relaxList;
    if (identify == "热身训练") {
      warmUpList[index].isOpen = !warmUpList[index].isOpen;
      warmUpList[index].SM_Num = parseInt(warmUpList[index].SM_Num);
      this.setData({
        warmUpList: warmUpList
      });
    } else if (identify == "正式训练") {
      officialList[index].isOpen = !officialList[index].isOpen;
      officialList[index].SM_Num = parseInt(officialList[index].SM_Num);
      this.setData({
        officialList: officialList
      });
    } else if (identify == "放松整理") {
      relaxList[index].isOpen = !relaxList[index].isOpen;
      relaxList[index].SM_Num = parseInt(relaxList[index].SM_Num);
      this.setData({
        relaxList: relaxList
      });
    }
  },
  saveEditClass(callback) {
    var warmUpList = this.data.warmUpList,
      officialList = this.data.officialList,
      relaxList = this.data.relaxList;
    warmUpList.forEach(item => {
      item.CA_Type = 1
    });
    officialList.forEach(item => {
      item.CA_Type = 2
    });
    relaxList.forEach(item => {
      item.CA_Type = 3
    });
    if (this.data.classTitle.trim().length == 0) {
      wx.showToast({
        icon: "none",
        title: '请编辑课程名',
      });
      return;
    }
    var jsonStr = {
      CA_ID: this.CA_ID ? this.CA_ID : 0,
      UI_ID: app.globalData.custom.UI_ID,
      CO_ID: this.CO_ID,
      CS_ID: this.CS_ID,
      CP_Name: this.data.classTitle,
      data: [...warmUpList, ...officialList, ...relaxList]
    };
    service.post('/CoachActLibSave', {
      json: JSON.stringify(jsonStr),
      gi_id: wx.getStorageSync('gi_id')
    }).then(res => {
      callback && callback();
    });
  },
  editConfrim() {
    var that = this;
    if (this.data.warmUpList.length > 0 || this.data.officialList.length > 0 || this.data.relaxList.length > 0) {
      this.saveEditClass(function () {
        // wx.navigateTo({
        //   url: `/pages/haveClass/haveClass?cs_id=${that.CS_ID}&co_id=${that.CO_ID}`
        // })
        wx.redirectTo({
          url: '/pages/haveClass/haveClass',
        })
      });
    } else {
      wx.showToast({
        icon: "none",
        title: '请先添加动作',
      });
    }
  },
  addAction(e) {
    var flag = e.currentTarget.dataset.flag;
    wx.navigateTo({
      url: '/pages/action/action?flag=' + flag,
    });
  },
  getClassName(e) {
    this.setData({
      classTitle: e.detail.value
    });
  },
  getClassDetail() {
    var warmUpList = [],
      officialList = [],
      relaxList = [];
    service.post('/CoachActLibDetails', {
      co_id: this.CO_ID,
      cs_id: this.CS_ID,
      gi_id: wx.getStorageSync('gi_id')
    }).then(res => {
      var list = res.data.data;
      if (list.length > 0) {
        console.log(list[0]);
        list[0].data.forEach(item => {
          if (item.CA_Type == 1) {
            warmUpList.push(item)
          } else if (item.CA_Type == 2) {
            officialList.push(item)
          } else if (item.CA_Type == 3) {
            relaxList.push(item)
          }
        });
        this.CA_ID = list[0].CA_ID;
        this.setData({
          warmUpList,
          officialList,
          relaxList,
          classTitle: list[0].CP_Name
        });
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  deleteModel(deleteArr, index, oper) {
    var that = this;
    wx.showModal({
      title: '',
      content: '是否删除这组动作？',
      success(res) {
        if (res.confirm) {
          deleteArr.splice(index, 1);
          that.setData({
            [oper]: deleteArr
          });
        }
      }
    })
  },
  delete(e) {
    let index = e.currentTarget.dataset.index,
      identify = e.currentTarget.dataset.identify,
      isall = e.currentTarget.dataset.isall;
    var warmUpList = this.data.warmUpList,
      officialList = this.data.officialList,
      relaxList = this.data.relaxList,
      that = this;
    if (identify == "热身训练") {
      if (this.is && isall == 1) {
        that.deleteModel(warmUpList, index, "warmUpList");
        return;
      }
      if (warmUpList[index].SM_Num == 1) {
        that.deleteModel(warmUpList, index, "warmUpList");
      } else {
        warmUpList[index].SM_Num = warmUpList[index].SM_Num - 1;
        this.setData({
          warmUpList: warmUpList
        });
      }
    } else if (identify == "正式训练") {
      if (this.is && isall == 1) {
        that.deleteModel(officialList, index, "officialList");
        return;
      }
      if (officialList[index].SM_Num == 1) {
        that.deleteModel(officialList, index, "officialList");
      } else {
        officialList[index].SM_Num = officialList[index].SM_Num - 1;
        this.setData({
          officialList: officialList
        });
      }
    } else if (identify == "放松整理") {
      if (this.is && isall == 1) {
        that.deleteModel(relaxList, index, "relaxList");
        return;
      }
      if (relaxList[index].SM_Num == 1) {
        that.deleteModel(relaxList, index, "relaxList");
      } else {
        relaxList[index].SM_Num = relaxList[index].SM_Num - 1;
        this.setData({
          relaxList: relaxList
        });
      }
    }
  },
  addGroup(e) {
    let index = e.currentTarget.dataset.index,
      identify = e.currentTarget.dataset.identify;
    var warmUpList = this.data.warmUpList,
      officialList = this.data.officialList,
      relaxList = this.data.relaxList;
    // console.log(index, identify )
    switch (identify) {
      case "热身训练":
        warmUpList[index].SM_Num += 1;
        this.setData({
          warmUpList: warmUpList
        });
        break;
      case "正式训练":
        officialList[index].SM_Num += 1;
        this.setData({
          officialList: officialList
        });
        break;
      case "放松整理":
        relaxList[index].SM_Num += 1;
        this.setData({
          relaxList: relaxList
        });
        break;
    }
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  }
})