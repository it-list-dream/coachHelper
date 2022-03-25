// pages/courseTemplate/children/template-popup/template-popup.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isOpen: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    inputVlaue: ""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClose() {
      this.triggerEvent('cancel')
    },
    onCancel() {
      this.setData({
        inputVlaue: ""
      })
      this.triggerEvent('cancel')
    },
    getTemplateName(e) {
      this.setData({
        inputVlaue: e.detail.value
      })
    },
    //保存
    onSave() {
      let inputValue = this.data.inputVlaue;
      if(!inputValue.length){
         wx.showToast({
           title: '请输入模板名称',
           icon:"none"
         })
         return
      }
      this.setData({
        inputVlaue:""
      })
      this.triggerEvent('confrim', {
        value: inputValue
      })
    }
  }
})