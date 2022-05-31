// components/van-model/van-model.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showModel: {
      type: Boolean,
      value: false
    },
    modelTitle: {
      type: String,
      value: ""
    },
    checkedList: {
      type: Array,
      value: []
    },
    modelList: {
      type: Array,
      value: []
    }
  },
  lifetimes: {
    attached() {
      let mList = this.properties.modelList,
        cList = this.properties.checkedList;
      mList.forEach(item => {
        cList.forEach(c => {
          if (item.name == c) {
            item.checked = true;
          }
        })
      });
      this.setData({
        allList: mList
      })
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    allList: [],
    copyList: [],
    showDefined: false
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onClose() {
      this.triggerEvent("off");
    },
    trainTag(e) {
      let value = e.currentTarget.dataset.value,
        allList = this.data.allList;
      allList.forEach(item => {
        if (item.name == value) {
          item.checked = !item.checked
        }
      })
      this.setData({
        allList: allList
      })
    },
    //确定
    onConfrim() {
      let list = this.data.allList,
        copyList = this.data.copyList;
      for (var i = 0; i < copyList.length; i++) {
        list.filter(item => item.checked).forEach(item => {
          if (item.name == copyList[i].name) {
            copyList[i].checked = true;
          }
        })
      }
      this.setData({
        copyList: copyList
      })
      this.triggerEvent('trainConfrim', {
        trainList: list.filter(item => item.checked).map(item => item.name)
      })
    },
    //自定义
    handleDefined() {
      this.setData({
        showDefined: true
      })
    },
    handleClose() {
      this.setData({
        showDefined: false
      })
    },
    handleConfrim(e) {
      let title = this.properties.modelTitle,
        trainPoint = wx.getStorageSync('trainPoint') || [],
        trainProject = wx.getStorageSync('trainProject') || [];
      // console.log('allList:',this.data.allList);
      // console.log('copyList:',this.data.copyList)
      if (title == '添加训练重点' && e.detail) {
        trainPoint.push({
          name: e.detail,
          checked: false
        })
        wx.setStorageSync('trainPoint', trainPoint)
      } else if (title == '添加训练项目' && e.detail) {
        trainProject.push({
          name: e.detail,
          checked: false
        })
        wx.setStorageSync('trainProject', trainProject)
      }
      this.setData({
        showDefined: false
      })
      this.triggerEvent('addTrain', {
        title: title,
        value: e.detail
      })
    }
  }
})