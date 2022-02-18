// components/tabbar/tabbar.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabbar: {
      type: Object,
      value: {
        "backgroundColor": "#ffffff",
        "color": "#222222",
        "selectedColor": "#2564F6",
        "list": [
          {
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
            "pagePath": "/pages/addCustom/addCustom",
            "text": "",
            "iconPath": "/assets/images/tabbar/addCustom.png",
            "isSpecial": true
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
      }
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    isIphoneX: app.globalData.systemInfo.model.search('iPhone X') != -1 ? true : false
  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {

     },
    moved: function () { },
    detached: function () { },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    switchTab(e) {
      // const data = e.currentTarget.dataset;
      // const url = data.path;
      // const phone = wx.getStorageSync('phone');
      // if (url === '/pages/tabbar/sport/sport' && !phone && phone == '') {
      //   wx.navigateTo({
      //     url: '/page2/login/login' //可以带参数，在登录页面接收
      //   })
      //   return;
      // }
      // wx.switchTab({
      //   url
      // })
    }
  }
})