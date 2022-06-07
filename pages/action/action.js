var service = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cateItems: [{
        cate_id: 1,
        cate_name: "热身",
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
        cate_name: "正式",
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
        cate_name: "放松",
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
        cate_name: "常用",
        ishaveChild: false,
        children: []
      }
    ],
    //左侧
    curNav: 0,
    // curIndex: 0,
    //动作下标
    actionIndex: 0,
    //nav
    actionCategory: [],
    //左侧
    leftCategory: [],
    //右侧
    rightCategory: [],
    serachText: "",
    isShowDialog: false,
    showActionDetail: false,
    //购物车
    cartList: [],
    shoppingCarSize: {
      top: 0,
      left: 0
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.quertShoppingCarSize();
    this.getCategoryList();
  },
  /**
   * 加入购物车
   */
  setDataAddShoppingCar(e) {
    let index = e.currentTarget.dataset.index,
      cart = this.data.cartList;
    cart.push({
      id: index,
      name: "哈哈哈"
    })
    this.setData({
      cartList: cart
    })
  },
  // 加入购物车动画 start
  selectGoods(e) {
    let that = this;
    let top = e.detail.y - 40;
    let left = e.detail.x - 40;
    that.setData({
      style: `top: ${top}px;left: ${left}px;`
    })
    clearTimeout(that.aniTimer);
    that.playAnimation(e, left, top);
  },

  /**
   * 小球飞入购物车动画
   */
  playAnimation(e, left, top) {
    let that = this;
    this.aniTimer = setTimeout(function () {
      that.setData({
        style: `--startLeft: ${left}px;--startTop: ${top}px;--endLeft: ${that.data.shoppingCarSize.left}px;--endTop: ${that.data.shoppingCarSize.top}px;animation: runTop .3s cubic-bezier(.66,.1,1,.41), runLeft .3s linear;`
      })
    }, 20);
    that.setDataAddShoppingCar(e);
  },
  /**
   * 获取左下角购物车图标top, left值
   */
  quertShoppingCarSize() {
    let that = this;
    this.quertElementSize('cart', function (rect) {
      console.log(rect)
      that.setData({
        'shoppingCarSize.top': Math.floor(rect.top + (rect.height / 2)),
        'shoppingCarSize.left': Math.floor(rect.left + (rect.width / 2))
      })
    });
  },
  quertElementSize(id, callback) {
    let query = wx.createSelectorQuery();
    query.select('.' + id).boundingClientRect((rect) => {
      callback && callback(rect);
    }).exec()
  },
  showDetail() {
    let flag = this.data.showActionDetail;
    this.setData({
      showActionDetail: !flag,
      isShowDialog: !this.data.isShowDialog
    })
  },
  // //  封装事件处理函数  
  switchRightTab: function (e) {
    // 获取item项的id，和数组的下标值  
    let id = e.target.dataset.id,
      index = e.target.dataset.index;
    // 把点击到的某一项，设为当前index  
    this.setData({
      curNav: index
    });
    this.getRightCateList(id);
  },
  onClose() {
    this.setData({
      isShowDialog: false,
      isShowDialog: !this.data.isShowDialog
    })
  },
  switchBodyPart(e) {
    let index = e.currentTarget.dataset.index;
    // for (let i = 0; i < actionIconList.length; i++) {
    //   if (actionIconList[index] == actionIconList[i]) {
    //     actionIconList[i].selected = true
    //   } else {
    //     actionIconList[i].selected = false
    //   }
    // }
    if (index == this.data.actionIndex) return
    this.setData({
      actionIndex: index
    });
    var lev1 = this.data.actionIndex;
    //二级类目的ID
    this.getRightCateList(this.data.leftCategory[this.data.curNav].ST_ID);
  },
  actionDetail() {
    wx.navigateTo({
      url: '/pages/actionDetail/actionDetail',
    })
  },
  getCategoryList() {
    service.post('/ActLibraryList', {
      gi_id: wx.getStorageSync('gi_id')
    }).then(res => {
      var list = res.data.data,
        navList = [];
      for (var i = 0; i < list.length; i++) {
        navList.push({
          sl_id: list[i].sl_id,
          sl_name: list[i].sl_name
        });
      }
      this.setData({
        leftCategory: list[0].data,
        actionCategory: navList
      });
      this.cateList = res.data.data;
      this.getRightCateList(list[0].data[0].ST_ID)
    })
  },
  getRightCateList(st_id) {
    service.post('/ActLibraryDetailsList', {
      st_id: st_id,
      gi_id: wx.getStorageSync('gi_id')
    }).then(res => {
      this.setData({
        rightCategory: res.data.data
      })
    })
  },
  //动作详情
  getActionDetail(st_id) {
    service.post('/ActLibraryDetailsList', {
      st_id: st_id,
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

  }
})