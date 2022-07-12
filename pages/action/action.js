var service = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //左侧
    curNav: 0,
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
    this.flag = options.flag;
    this.quertShoppingCarSize();
    this.getCategoryList();
  },
  /**
   * 加入购物车
   */
  setDataAddShoppingCar(e) {
    let index = e.currentTarget.dataset.index,
      cart = this.data.cartList,
      goods = this.data.rightCategory[index];
    cart.push({
      id: cart.length + 1,
      ...goods,
      SL_Name: this.data.actionCategory[this.data.actionIndex].sl_name,
      ST_Name: this.data.leftCategory[this.data.curNav].ST_Name
    });
    this.setData({
      cartList: cart
    });
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
      // console.log(rect)
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
    if (index == this.data.actionIndex) return
    //二级类目的ID
    var leftList = this.cateList[index].data;
    this.setData({
      actionIndex: index,
      leftCategory: leftList,
      curNav: 0
    });
    this.getRightCateList(leftList[0].ST_ID);
  },
  actionDetail(e) {
    var action = e.currentTarget.dataset.action;
    action.SL_Name = this.data.actionCategory[this.data.actionIndex].sl_name;
    action = JSON.stringify(action)
    wx.navigateTo({
      url: '/pages/actionDetail/actionDetail?action=' + action,
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
      var list = res.data.data;
      list.forEach(item => {
        item.SM_LableName = item.SM_LableName.replaceAll(",", "  ")
      });
      this.setData({
        rightCategory: list
      })
    })
  },
  clearAction() {
    this.setData({
      cartList: []
    })
  },
  //删除
  deleteActions(e) {
    var cartList = this.data.cartList,
      index = e.currentTarget.dataset.index;
    cartList.splice(index, 1)
    this.setData({
      cartList: cartList
    })
  },
  toSearch() {
    var that = this;
    wx.navigateTo({
      url: '/pages/actionSearch/actionSearch',
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        searchAction: function (res) {
          that.setData({
            cartList: res.cartList
          })
        }
      },
      success: function (res) {
        // 通过 eventChannel 向被打开页面传送数据
        res.eventChannel.emit('searchAction', {
          cartList: that.data.cartList
        });
      }
    })
  },
  actionConfrim() {
    var pages = getCurrentPages(); //当前页面
    var prevPage = pages[pages.length - 2]; //上一页面
    //根据路由来判断要跳转的页面
    if (prevPage.route == 'pages/editCourse/editCourse') {
      if (this.flag == 1) {
        var warmUpList = prevPage.data.warmUpList;
        let list = [...warmUpList, ...this.data.cartList];
        list.forEach(item => {
          item.isOpen = false
        })
        prevPage.setData({
          warmUpList: list
        });
      } else if (this.flag == 2) {
        var officialList = prevPage.data.officialList;
        let list = [...officialList, ...this.data.cartList];
        list.forEach(item => {
          item.isOpen = false
        })
        prevPage.setData({
          officialList: list
        })
      } else if (this.flag == 3) {
        var relaxList = prevPage.data.relaxList;
        let list = [...relaxList, ...this.data.cartList];
        list.forEach(item => {
          item.isOpen = false
        });
        prevPage.setData({
          relaxList: list
        })
      }
    } else if (prevPage.route == "pages/startClass/startClass") {
      //将cartList中的数据添加到上课中去
      let cartList = this.data.cartList,
        statusList = [],
        actionList = prevPage.data.actionList,
        titleList = prevPage.data.titleList;
      var ca_type = prevPage.data.actionList[prevPage.data.currentAction].CA_Type;
      for (let i = 0; i < cartList.length; i++) {
        cartList[i].ActualCount = 0;
        cartList[i].CA_Type = ca_type;
        for (let j = 0; j < parseInt(cartList[i].SM_Count); j++) {
          statusList.push({
            SS_State: "",
            open: true
          })
        }
        cartList[i].data = statusList;
        titleList.push(cartList[i].SM_Name);
      }
      actionList = [...actionList,...cartList];
      prevPage.setData({
        titleList:titleList,
        actionList:actionList
      })
    }
    wx.navigateBack({
      delta: 1,
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