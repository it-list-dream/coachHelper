// pages/actionSearch/actionSearch.js
var service = require('../../utils/request.js');
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchText: "",
    searchList: [],
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
    var that = this;
    var eventChannel = this.getOpenerEventChannel()
    eventChannel.on('searchAction', function (res) {
      that.setData({
        cartList: res.cartList
      })
    })
    this.quertShoppingCarSize();
  },
  search: util.throttle(function (e) {
    this.setData({
      searchText: e.detail
    }, () => {
      this.getActionSeachList();
    })
  }, 500),
  //搜索
  getActionSeachList() {
    service.post('/ActLibraryDetailsSearchList', {
      seachText: this.data.searchText,
      gi_id: wx.getStorageSync('gi_id')
    }).then(res => {
      var list = res.data.data;
      list.forEach(item => {
        item.SM_LableName = item.SM_LableName.replaceAll(',', " ")
      })
      this.setData({
        searchList: res.data.data
      })
    });
  },
  add(e) {
    let index = e.currentTarget.dataset.index;
    var cartList = this.data.cartList,
      goods = this.data.searchList[index];
    cartList.push({
      id: cartList.length + 1,
      ...goods
    });
    this.setData({
      cartList: cartList
    })
  },
  actionConfrim() {
    var eventChannel = this.getOpenerEventChannel();
    eventChannel.emit('searchAction', {
      cartList: this.data.cartList
    });
    wx.navigateBack({
      delta: 1
    })
  },
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
    that.add(e);
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