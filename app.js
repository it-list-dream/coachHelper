// app.js
App({
  onLaunch() {
    var phone = wx.getStorageSync('phone');
    if (phone) {
      this.globalData.phoneNumber = phone;
    }
    this.getMenuInfo();
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
  getMenuInfo() {
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
    tabBar: {
      "backgroundColor": "#ffffff",
      "color": "#222222",
      "selectedColor": "#2564F6",
      "list": [{
          "pagePath": "/pages/tabbar/home/home",
          "text": "首页",
          "iconPath": "/assets/images/tabbar/home.png",
          "selectedIconPath": "/assets/images/tabbar/home-active.png"
        },
        {
          "pagePath": "/pages/tabbar/schedule/schedule",
          "text": "日程",
          "iconPath": "/assets/images/tabbar/calendar.png",
          "selectedIconPath": "/assets/images/tabbar/calendar_active.png"
        },
        {
          "pagePath": "/pages/tabbar/clientele/clientele",
          "text": "客户",
          "iconPath": "/assets/images/tabbar/customer.png",
          "selectedIconPath": "/assets/images/tabbar/customer-active.png"
        },
        {
          "pagePath": "/pages/tabbar/profile/profile",
          "text": "我的",
          "iconPath": "/assets/images/tabbar/profile.png",
          "selectedIconPath": "/assets/images/tabbar/profile_active.png"
        }
      ]
    },
    //是否是案例
    isCase: false,
    //是否是导出的模板
    isExportTemplate: false,
    //是否登录
    phoneNumber: null,
    custom:{}
  }
})