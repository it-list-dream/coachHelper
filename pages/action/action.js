// pages/action/action.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cateItems: [{
        cate_id: 1,
        cate_name: "护肤",
        ishaveChild: true,
        children: [{
            child_id: 1,
            name: '洁面皂',
            image: "https://img2.baidu.com/it/u=1000228727,1004721926&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
          },
          {
            child_id: 2,
            name: '卸妆',
            image: "https://img2.baidu.com/it/u=1000228727,1004721926&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
          },
          {
            child_id: 3,
            name: '洁面乳',
            image: "https://img2.baidu.com/it/u=1000228727,1004721926&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
          },
          {
            child_id: 4,
            name: '面部祛角质',
            image: "https://img2.baidu.com/it/u=1000228727,1004721926&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
          }
        ]
      },
      {
        cate_id: 2,
        cate_name: "彩妆",
        ishaveChild: true,
        children: [{
            child_id: 1,
            name: '气垫bb',
            image: "https://img2.baidu.com/it/u=1000228727,1004721926&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
          },
          {
            child_id: 2,
            name: '修容/高光',
            image: "https://img2.baidu.com/it/u=1000228727,1004721926&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
          },
          {
            child_id: 3,
            name: '遮瑕',
            image: "https://img2.baidu.com/it/u=1000228727,1004721926&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
          },
          {
            child_id: 4,
            name: '腮红',
            image: "https://img2.baidu.com/it/u=1000228727,1004721926&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
          },
          {
            child_id: 5,
            name: '粉饼',
            image: "https://img2.baidu.com/it/u=1000228727,1004721926&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
          },
          {
            child_id: 6,
            name: '粉底',
            image: "https://img2.baidu.com/it/u=1000228727,1004721926&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
          },
          {
            child_id: 7,
            name: '蜜粉/散粉',
            image: "https://img2.baidu.com/it/u=1000228727,1004721926&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
          },
          {
            child_id: 8,
            name: '隔离霜',
            image: "https://img2.baidu.com/it/u=1000228727,1004721926&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
          }
        ]
      },
      {
        cate_id: 3,
        cate_name: "香水/香氛",
        ishaveChild: true,
        children: [{
            child_id: 1,
            name: '淡香水EDT',
            image: "https://img2.baidu.com/it/u=1000228727,1004721926&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
          },
          {
            child_id: 2,
            name: '浓香水EDP',
            image: "https://img2.baidu.com/it/u=1000228727,1004721926&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
          },
          {
            child_id: 3,
            name: '香体走珠',
            image: "https://img2.baidu.com/it/u=1000228727,1004721926&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
          },
          {
            child_id: 4,
            name: '古龙香水男士的最爱',
            image: "https://img2.baidu.com/it/u=1000228727,1004721926&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
          }
        ]
      },
      {
        cate_id: 4,
        cate_name: "个人护理",
        ishaveChild: false,
        children: []
      }
    ],
    curNav: 1,
    curIndex: 0,
    //
    actionIconList: [{
        actionName: "颈部",
        actionPic: "/assets/images/acion/neck.png"
      },
      {
        actionName: "腹部",
        actionPic: "/assets/images/acion/belly.png"
      }, {
        actionName: "腰部",
        actionPic: "/assets/images/acion/waist.png"
      }, {
        actionName: "臀部",
        actionPic: "/assets/images/acion/haunch.png"
      }, {
        actionName: "腿部",
        actionPic: "/assets/images/acion/leg.png"
      }, {
        actionName: "全身",
        actionPic: "/assets/images/acion/whole_body.png"
      }, {
        actionName: "躯干",
        actionPic: "/assets/images/acion/trunk.png"
      }
    ],
    value: "",
    isShowDialog: false,
    showActionDetail: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  showDetail() {
    let flag = this.data.showActionDetail;
    this.setData({
      showActionDetail: !flag,
      isShowDialog: !this.data.isShowDialog
    })
  },
  //  封装
  //事件处理函数  
  switchRightTab: function (e) {
    // 获取item项的id，和数组的下标值  
    let id = e.target.dataset.id,
      index = parseInt(e.target.dataset.index);
    // 把点击到的某一项，设为当前index  
    this.setData({
      curNav: id,
      curIndex: index
    })
  },
  onClose() {
    thhis.setData({
      isShowDialog: false
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})