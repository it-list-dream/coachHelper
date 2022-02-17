// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    let menuButtonObject = wx.getMenuButtonBoundingClientRect();
    wx.getSystemInfo({
      success: res => {
        let statusBarHeight = res.statusBarHeight,
          navTop = menuButtonObject.top, //胶囊按钮与顶部的距离
          navHeight = statusBarHeight + menuButtonObject.height + (menuButtonObject.top - statusBarHeight) * 2; //导航高度
        this.globalData.menuRight = res.screenWidth - menuButtonObject.right;
        this.globalData.navHeight = navHeight;
        this.globalData.navTop = navTop;
        this.globalData.windowHeight = res.windowHeight;
      },
      fail(err) {
        console.log(err);
      }
    })
    //获取设备信息
    this.getSystemInfo();
  },
  editTabbar() {
    var tabbar = this.globalData.tabBar;
    var currentPages = getCurrentPages();
    var that = currentPages[currentPages.length - 1];
    var pagePath = that.route;
    (pagePath.indexOf('/') != 0) && (pagePath = '/' + pagePath);
    for (var i in tabbar.list) {
      tabbar.list[i].selected = false;
      (tabbar.list[i].pagePath == pagePath) && (tabbar.list[i].selected = true);
    }
    that.setData({
      tabbar: tabbar
    });
  },
  getSystemInfo: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.globalData.systemInfo = res;
      }
    });
  },
  globalData: {
    systemInfo: null, //客户端设备信息
    userInfo: null,
    tabBar: {
      "backgroundColor": "#ffffff",
      "color": "#979795",
      "selectedColor": "#1c1c1b",
      "list": [{
          "pagePath": "pages/tabbar/home/home",
          "text": "首页",
          "iconPath": "/assets/images/tabbar/home.png",
          "selectedIconPath": "/assets/images/tabbar/home-active.png"
        },
        {
          "pagePath": "pages/tabbar/schedule/schedule",
          "text": "日程",
          "iconPath": "/assets/images/tabbar/calendar.png",
          "selectedIconPath": "/assets/images/tabbar/calendar_active.png"
        },
        {
          "pagePath": "pages/addCustom/addCustom",
          "text": "",
          "iconPath": "/assets/images/tabbar/addCustom.png",
          "isSpecial": true
        },
        {
          "pagePath": "pages/tabbar/clientele/clientele",
          "text": "客户",
          "iconPath": "/assets/images/tabbar/customer.png",
          "selectedIconPath": "/assets/images/tabbar/customer-active.png"
        },
        {
          "pagePath": "pages/tabbar/profile/profile",
          "text": "我的",
          "iconPath": "/assets/images/tabbar/profile.png",
          "selectedIconPath": "/assets/images/tabbar/profile_active.png"
        }
      ]
    }
  }
})