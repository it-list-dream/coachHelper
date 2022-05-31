// pages/action/action.js
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
    curNav: 1,
    curIndex: 0,
    //动作下标
    actionIndex: 0,
    actionIconList: [{
      actionName: "全部",
      actionPic: "/assets/images/acion/all_active.png",
      activeActionPic: "/assets/images/acion/all.png",
      selected: true
    },
    {
      actionName: "胸部",
      actionPic: "/assets/images/acion/chest_active.png",
      activeActionPic: "/assets/images/acion/chest.png",
      selected: false
    },
    {
      actionName: "背部",
      actionPic: "/assets/images/acion/backside_active.png",
      activeActionPic: "/assets/images/acion/backside.png",
      selected: false
    },
    {
      actionName: "肩部",
      actionPic: "/assets/images/acion/shoulders_active.png",
      activeActionPic: "/assets/images/acion/shoulders.png",
      selected: false
    }, {
      actionName: "手臂",
      actionPic: "/assets/images/acion/arm_active.png",
      activeActionPic: "/assets/images/acion/arm.png",
      selected: false
    },
    {
      actionName: "颈部",
      actionPic: "/assets/images/acion/neck_active.png",
      activeActionPic: "/assets/images/acion/neck.png",
      selected: false
    },
    {
      actionName: "腹部",
      actionPic: "/assets/images/acion/belly_active.png",
      activeActionPic: "/assets/images/acion/belly.png",
      selected: false
    }, {
      actionName: "腰部",
      actionPic: "/assets/images/acion/waist_active.png",
      activeActionPic: "/assets/images/acion/waist.png",
      selected: false
    }, {
      actionName: "臀部",
      actionPic: "/assets/images/acion/haunch_active.png",
      activeActionPic: "/assets/images/acion/haunch.png",
      selected: false
    }, {
      actionName: "腿部",
      actionPic: "/assets/images/acion/leg_active.png",
      activeActionPic: "/assets/images/acion/leg.png",
      selected: false
    }, {
      actionName: "全身",
      actionPic: "/assets/images/acion/whole_body_active.png",
      activeActionPic: "/assets/images/acion/whole_body.png",
      selected: false
    }, {
      actionName: "躯干",
      actionPic: "/assets/images/acion/trunk_active.png",
      activeActionPic: "/assets/images/acion/trunk.png",
      selected: false
    }
    ],
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
      index = parseInt(e.target.dataset.index);
    // 把点击到的某一项，设为当前index  
    this.setData({
      curNav: id,
      curIndex: index
    })
  },
  onClose() {
    this.setData({
      isShowDialog: false,
      isShowDialog: !this.data.isShowDialog
    })
  },
  switchBodyPart(e) {
    let index = e.currentTarget.dataset.index,
      actionIconList = this.data.actionIconList;
    //console.log(index, actionIconList)
    for (let i = 0; i < actionIconList.length; i++) {
      if (actionIconList[index] == actionIconList[i]) {
        actionIconList[i].selected = true
      } else {
        actionIconList[i].selected = false
      }
    }
    this.setData({
      actionIconList: actionIconList,
      actionIndex: index
    })
  },
  actionDetail() {
    wx.navigateTo({
      url: '/pages/actionDetail/actionDetail',
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