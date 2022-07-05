var service = require('../../utils/request.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    custList: [{
      custTitle: "减脂",
      custCount: 0,
      bg: "/assets/images/clientCase/lose_weight.png"
    }, {
      custTitle: "增肌",
      custCount: 0,
      bg: "/assets/images/clientCase/gain_muscle.png"
    }, {
      custTitle: "塑形",
      custCount: 0,
      bg: "/assets/images/clientCase/moulding.png"
    }, {
      custTitle: "恢复",
      custCount: 0,
      bg: "/assets/images/clientCase/revover.png"
    }, {
      custTitle: "运动表现",
      custCount: 0,
      bg: "/assets/images/clientCase/performance.png"
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCustCaseTypeList();
  },
  getCustCaseTypeList() {
    service.post('/CustCaseTypeList', {
      gi_id: wx.getStorageSync('gi_id')
    }).then(res => {
      let custList = this.data.custList,
        list = res.data.data;
      for (let i = 0; i < custList.length; i++) {
        for(let j=0;j<list.length;j++){
         if(custList[i].custTitle == list[j].CaseLable){
            custList[i].custCount = list[j].CaseCount
         }
        }
      }
      this.setData({
        custList:custList
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