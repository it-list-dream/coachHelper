// pages/preparationClass/child/pouple-status/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isShow: {
      type: Boolean,
      value: false
    },
    statusList: {
      type: Array,
      value: []
    },
    statusTitle: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    list: []
  },
  lifetimes: {
    attached() {
      let myList = this.properties.statusList;
      this.setData({
        list: myList
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onClose() {
      this.triggerEvent('close')
    },
    selectCore(e) {
      let index = e.currentTarget.dataset.index;
      let list = this.data.list;
      for (let i = 0; i < list.length; i++) {
        if (index == i) {
          list[i].selected = true;
        } else {
          list[i].selected = false;
        }
      }
      this.setData({
        list: list
      })
    },
    cancle() {
      this.triggerEvent('close')
    },
    confrim() {
      let list = this.data.list;
      let selectedList = list.filter(item => item.selected == true);
      this.triggerEvent('confrim',selectedList)
    },
    moveHandle(){
      
    }
  }
})