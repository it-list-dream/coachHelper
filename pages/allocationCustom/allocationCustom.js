// pages/allocationCustom/allocationCustom.js
var api = require('../../utils/request.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabsList:['私教会员','普通会员','意向会员','公海池'],
    tabIndex:0,
    filterIndex:0,
    filterList:['未为配','已分配'],
    tabsHeight:0,
    searchHeight:0,
    customList:[
      {
        customName:"张三",
        customId:"fx001",
        selected:false
      },
      {
        customName:"涛涛",
        customId:"fx002",
        selected:false
      },{
        customName:"丽丽",
        customId:"fx003",
        selected:false
      },
      {
        customName:"小明",
        customId:"fx004",
        selected:false
      },{
        customName:"小红",
        customId:"fx011",
        selected:false
      },{
        customName:"黎民",
        customId:"sg001",
        selected:false
      },{
        customName:"王辉",
        customId:"sg002",
        selected:false
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    const query = wx.createSelectorQuery();
    query.select('.search-box').boundingClientRect()
    query.exec(function (res) {
      that.setData({
        searchHeight:res[0].height
      })
    })
  },
  tabsChange(e){
    this.setData({
      tabIndex:e.detail.currentNum
    })
  },
  //分配
  allocation(e){
    let member = e.currentTarget.dataset.custom,
     customList = this.data.customList;
     for(let i =0;i<customList.length;i++){
       if(customList[i].customId == member.customId){
        customList[i].selected = !customList[i].selected;
       }
     }
    this.setData({
      customList:customList
    })
  },
  allocationCoach(){
    //弹窗
    //  wx.navigateTo({
    //    url: '/pages/selectCoach/selectCoach',
    //  })
  },
  //分配
  filterTab(e){
      let index = e.currentTarget.dataset.index;
      this.setData({
        filterIndex:index
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
  loadMore(){
    console.log('加载更多')
  },
  getHeight(e){
    console.log(e.detail.height)
    this.setData({
      tabsHeight:e.detail.height
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  }
})