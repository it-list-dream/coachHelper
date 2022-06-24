const app = getApp();
var service = require('../../utils/request.js');
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    belongList: ['张三', '李四', '王五'],
    chooseIndex: -1,
    sexList: ["男", "女"],
    endDate: '',
    targetList: [{
        id: 1,
        value: '减脂',
        checked: false
      },
      {
        id: 2,
        value: '增肌',
        checked: false
      }, {
        id: 3,
        value: '瘦身',
        checked: false
      }, {
        id: 4,
        value: '塑形',
        checked: false
      }, {
        id: 5,
        value: '运动康复',
        checked: false
      }, {
        id: 6,
        value: '提高表现力',
        checked: false
      }
    ],
    //选中的标签
    newTargetsList: [],
    pictures: '',
    showTag: false,
    showTag1: false,
    //新建标签
    newTagValue: "",
    //备注
    remark: ""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let date = new Date();
    let month = date.getMonth() + 1 < 10 ? '0' + date.getMonth() + 1 : date.getMonth() + 1;
    let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    let custom = app.globalData.custom;
    custom.UI_Birthday = util.format(custom.UI_Birthday, 'yyyy-mm-dd');
    this.setData({
      endDate: date.getFullYear() + '-' + month + '-' + day,
      custom: custom,
      chooseIndex: app.globalData.custom.UI_Sex == '男' ? 0 : 1
    })
  },
  getCustomName(e) {
    let updateName = "customInfo.name";
    this.setData({
      [updateName]: e.detail.value
    })
  },
  // choosePhoto() {
  //   console.log('选择照片')
  //   var that = this;
  //   wx.chooseImage({
  //     count: 1,
  //     sizeType: ['original', 'compressed'],
  //     sourceType: ['album', 'camera'],
  //     success(res) {
  //       const tempFilePaths = res.tempFilePaths
  //       that.setData({
  //         pictures: tempFilePaths
  //       })
  //     }
  //   })
  // },
  chooseSex(event) {
    let index = event.currentTarget.dataset.index;
    let updateSex = "customInfo.sex"
    if (index == this.data.chooseIndex) {
      return
    }
    this.setData({
      chooseIndex: index,
      [updateSex]: index == 0 ? '男' : '女'
    })
  },
  bindDateChange(e) {
    let updateDate = "custom.UI_Birthday";
    this.setData({
      [updateDate]: e.detail.value
    })
  },
  getCustomPhone(e) {
    let updatephone = "customInfo.phoneNumber";
    this.setData({
      [updatephone]: e.detail.value
    })
  },
  bindPickerChange(e) {
    let updateMembership = "customInfo.membership";
    let value = this.data.belongList[e.detail.value];
    this.setData({
      [updateMembership]: value
    })
  },
  checkLabs(e) {
    //newTargetsList
    var that = this,
      index = e.currentTarget.dataset.index,
      value = e.currentTarget.dataset.value,
      items = this.data.targetList,
      arr = this.data.newTargetsList,
      val = items[index].checked;
    //点击前的值
    if (!val) {
      arr.push(value);
    } else {
      for (var i in arr) {
        if (arr[i] == value) {
          arr.splice(i, 1);
        }
      }
    }
    items[index].checked = !val;
    that.setData({
      targetList: items,
      newTargetsList: arr
    })
  },
  setTarget(e) {
    this.setData({
      showTag: true
    });
  },
  onClose() {
    this.setData({
      showTag: false
    });
  },
  onClose1() {
    this.setData({
      showTag1: false,
      newTagValue: ""
    });
  },
  newCreateTag() {
    // console.log('新建标签');
    this.setData({
      showTag1: true
    })
  },
  onConfrim1() {
    let newTag = this.data.newTagValue;
    let targetList = this.data.targetList;
    if (newTag.trim().length > 0) {
      targetList.push({
        id: Number(targetList[targetList.length - 1].id) + 1,
        value: newTag,
        checked: false
      })
      this.setData({
        showTag1: false,
        targetList: targetList,
        newTagValue: ""
      })
    } else {
      wx.showToast({
        title: '内容不能为空',
        icon: "none"
      })
    }
  },
  changeTextarea(e) {
    this.setData({
      newTagValue: e.detail.value
    })
  },
  onRemark(e) {
    this.setData({
      "custom.UI_Content": e.detail.value
    })
  },
  saveCustom() {
    var jsonStr = {
      UI_ID: this.data.custom.UI_ID,
      TrainTarget: "xx,xx,x,xx",
      UI_Sex: this.data.custom.UI_Sex,
      UI_Birthday: this.data.custom.UI_Birthday,
      UI_Name: this.data.custom.UI_Name,
      UI_Content: this.data.custom.UI_Content
    };
    service.post('/UpdateUserInfo', {
      json: JSON.stringify(jsonStr),
      gi_id: wx.getStorageSync('gi_id')
    }).then(res => {
       console.log(res)
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