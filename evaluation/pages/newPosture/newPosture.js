// pagese/newPosture/newPosture.js
const util = require('../../../utils/util.js');
const body = require('../../../utils/body.js');
var service = require('../../../utils/request.js')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    date: "",
    endDate: "",
    //前侧
    frontSide: [],
    //左侧
    leftSide: [],
    //右侧
    rightSide: [],
    frontOthers: {
      fiedsid: "",
      coachRemark: ""
    },
    leftOthers: {
      fiedsid: "",
      coachRemark: ""
    },
    rightOhters: {
      fiedsid: "",
      coachRemark: ""
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //  let nowtime = 
    let nowtime = util.format(new Date(), 'yyyy-mm-dd')
    this.setData({
      endDate: nowtime,
      date: nowtime,
      frontSide: body.frontSideList,
      leftSide: body.leftSideList,
      rightSide: body.rightSideList,
      custom:app.globalData.custom
    })
  },

  bindDateChange: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  onChange(e) {
    this.setData({
      active: e.detail.index
    })
  },
  nextStep(e) {
    let activeIndex = parseInt(e.currentTarget.dataset.index);
    if (activeIndex <= 2) {
      this.setData({
        active: activeIndex
      })
      this.toTop();
    } else {
      //体态保存
      var frontStatus = this.getFrontOhters(),
        leftStatus = this.getSideOthers(this.data.leftSide),
        rightStatus = this.getSideOthers(this.data.rightSide);
      if (!this.data.frontOthers.fiedsid || !this.data.leftOthers.fiedsid || !this.data.rightOhters.fiedsid) {
        wx.showToast({
          title: '请上传图片',
          icon: 'none'
        });
        return;
      }
      // console.log(frontStatus, leftStatus, rightStatus);
      var jsonStr = {
        RecordDate: this.data.date,
        UI_ID: this.data.custom.UI_ID || 4233,
        front: {
          ...frontStatus,
          Remarks: this.data.frontOthers.coachRemark,
          FrontImg: this.data.frontOthers.fiedsid
        },
        left: {
          ...leftStatus,
          Remarks: this.data.leftOthers.coachRemark,
          LeftImg: this.data.leftOthers.fiedsid
        },
        right: {
          ...rightStatus,
          Remarks: this.data.rightOhters.coachRemark,
          RightImg: this.data.rightOhters.fiedsid
        }
      }
       //将体态数据提交
      console.log(JSON.stringify(jsonStr));
      service.post('/StatureDetermineSave', {
        gi_id: wx.getStorageSync('gi_id'),
        json: JSON.stringify(jsonStr)
      }).then(res => {
        wx.redirectTo({
          url: '/evaluation/pages/postureDetail/postureDetail?sd_id='+res.data.sd_id,
        })
      })
    }
  },
  handleRemark(e) {
    let postion = e.detail.bodyPostition;
    switch (postion) {
      case "正面":
        this.data.frontOthers.coachRemark = e.detail.coachRemark;
        break;
      case "左侧":
        this.data.leftOthers.coachRemark = e.detail.coachRemark;
        break;
      case "右侧":
        this.data.rightOhters.coachRemark = e.detail.coachRemark
        break;
      default:
        console.log('其他')
    }
  },
  //图片上传
  imageUpload(e) {
    let postion = e.detail.bodyPostition;
    switch (postion) {
      case "正面":
        this.data.frontOthers.fiedsid = e.detail.fiedsid;
        break;
      case "左侧":
        this.data.leftOthers.fiedsid = e.detail.fiedsid;
        break;
      case "右侧":
        this.data.rightOhters.fiedsid = e.detail.fiedsid
        break;
      default:
        console.log('其他')
    }
  },
  //体态保存
  getFrontOhters() {
    let fList = this.data.frontSide;
    var Head = "", Shoulder = "", Scapula = "",
      UpperLimb = "", ThoracoLumbarSpine = "",
      Pelvis = "", HipUp = "", HipJoint = "",
      Ankle = "", Foot = "";
    for (let i = 0; i < fList.length; i++) {
      if (fList[i].partTitle == "头部") {
        Head = fList[i].list.filter(item => item.checked).map(item => fList[i].partTitle + ":" + item.value).join(',');
      } else if (fList[i].partTitle == "肩部") {
        Shoulder = fList[i].list.filter(item => item.checked).map(item => fList[i].partTitle + ":" + item.value).join(',');
      } else if (fList[i].partTitle == "肩胛骨") {
        Scapula = fList[i].list.filter(item => item.checked).map(item => fList[i].partTitle + ":" + item.value).join(',');
      } else if (fList[i].partTitle == "上肢") {
        UpperLimb = fList[i].list.filter(item => item.checked).map(item => fList[i].partTitle + ":" + item.value).join(',');
      } else if (fList[i].partTitle == "胸腰椎") {
        ThoracoLumbarSpine = fList[i].list.filter(item => item.checked).map(item => fList[i].partTitle + ":" + item.value).join(',');
      } else if (fList[i].partTitle == "骨盆") {
        Pelvis = fList[i].list.filter(item => item.checked).map(item => fList[i].partTitle + ":" + item.value).join(',');
      } else if (fList[i].partTitle == "臀线") {
        HipUp = fList[i].list.filter(item => item.checked).map(item => fList[i].partTitle + ":" + item.value).join(',');
      } else if (fList[i].partTitle == "髋关节") {
        HipJoint = fList[i].list.filter(item => item.checked).map(item => fList[i].partTitle + ":" + item.value).join(',');
      } else if (fList[i].partTitle == "踝关节") {
        Ankle = fList[i].list.filter(item => item.checked).map(item => fList[i].partTitle + ":" + item.value).join(',');
      } else {
        Foot = fList[i].list.filter(item => item.checked).map(item => fList[i].partTitle + ":" + item.value).join(',')
      }
    }
    return {
      Head, Shoulder, Scapula,
      UpperLimb, ThoracoLumbarSpine,
      Pelvis, HipUp, HipJoint,
      Ankle, Foot
    }
  },
  getSideOthers(list) {
    let lList = list;
    var WholeBody = "", Head = "", CervicalVertebra = "", Scapula = "",
      ThoracicVertebra = "", LumbarVertebra = "", Pelvis = "", HipJoint = "",
      Kneejoint = "", AnkleJoint = "";
    for (let i = 0; i < lList.length; i++) {
      if (lList[i].partTitle == "全身") {
        WholeBody = lList[i].list.filter(item => item.checked).map(item => lList[i].partTitle + ":" + item.value).join(',')
      } else if (lList[i].partTitle == "头部") {
        Head = lList[i].list.filter(item => item.checked).map(item => lList[i].partTitle + ":" + item.value).join(',');
      } else if (lList[i].partTitle == "颈椎") {
        CervicalVertebra = lList[i].list.filter(item => item.checked).map(item => lList[i].partTitle + ":" + item.value).join(',');
      } else if (lList[i].partTitle == "肩胛骨") {
        Scapula = lList[i].list.filter(item => item.checked).map(item => lList[i].partTitle + ":" + item.value).join(',');
      } else if (lList[i].partTitle == "胸椎") {
        ThoracicVertebra = lList[i].list.filter(item => item.checked).map(item => lList[i].partTitle + ":" + item.value).join(',');
      } else if (lList[i].partTitle == "腰椎") {
        LumbarVertebra = lList[i].list.filter(item => item.checked).map(item => lList[i].partTitle + ":" + item.value).join(',');
      } else if (lList[i].partTitle == "骨盆") {
        Pelvis = lList[i].list.filter(item => item.checked).map(item => lList[i].partTitle + ":" + item.value).join(',');
      } else if (lList[i].partTitle == "髋关节") {
        HipJoint = lList[i].list.filter(item => item.checked).map(item => lList[i].partTitle + ":" + item.value).join(',');
      } else if (lList[i].partTitle == "膝关节") {
        Kneejoint = lList[i].list.filter(item => item.checked).map(item => lList[i].partTitle + ":" + item.value).join(',');
      } else {
        AnkleJoint = lList[i].list.filter(item => item.checked).map(item => lList[i].partTitle + ":" + item.value).join(',')
      }
    }
    return {
      WholeBody, Head, CervicalVertebra, Scapula,
      ThoracicVertebra, LumbarVertebra, Pelvis, HipJoint,
      Kneejoint, AnkleJoint
    }
  },
  bodyStatusChange(e) {
    // console.log(e)
    let postion = e.detail.bodyPostition;
    switch (postion) {
      case "正面":
        this.setData({
          frontSide: e.detail.bodyList
        })
        break;
      case "左侧":
        this.setData({
          leftSide: e.detail.bodyList
        })
        break;
      case "右侧":
        this.setData({
          rightSide: e.detail.bodyList
        })
        break;
      default:
        console.log('其他')
    }
  },
  toTop() {
    wx.pageScrollTo({
      scrollTop: 0
    })
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