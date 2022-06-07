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
    // copyList: [],
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
      let list = this.data.allList;
      this.triggerEvent('trainConfrim', {
        trainList: list.filter(item => item.checked).map(item => item.name)
      });
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
        modelList = this.properties.modelList,
        trainPoint = wx.getStorageSync('trainPoint') || [],
        trainProject = wx.getStorageSync('trainProject') || [],
        allList = this.data.allList;
      if (title == '添加训练重点' && e.detail) {
        if ([...modelList, ...trainPoint].map(item => item.name).indexOf(e.detail) == -1) {
          trainPoint.push({
            name: e.detail,
            checked: false
          });
          wx.setStorageSync('trainPoint', trainPoint)
        } else {
          wx.showToast({
            icon: "none",
            title: '请勿重复添加',
          });
          return;
        }
      } else if (title == '添加训练项目' && e.detail) {
        if ([...modelList, ...trainProject].map(item => item.name).indexOf(e.detail) == -1) {
          trainProject.push({
            name: e.detail,
            checked: false
          });
          wx.setStorageSync('trainProject', trainProject);
        } else {
          wx.showToast({
            icon: "none",
            title: '请勿重复添加',
          });
          return;
        }
      }
      allList.push({
        name: e.detail,
        checked: false
      })
      this.setData({
        showDefined: false,
        allList: allList
      });
      this.triggerEvent('addTrain', {
        title: title,
        value: e.detail
      });
    }
  }
})