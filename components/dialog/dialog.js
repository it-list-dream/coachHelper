Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  externalClasses: ['custom-class'],
  /**
   * 组件的属性列表
   * 
   * 用于组件自定义设置
   */
  properties: {
    // 弹窗取消按钮文字
    isShow:{            // 属性名
      type: Boolean,     
      value: false 
    },
    dialogTitle: {
      type: String,
      value:""
    },
    limit: {
      type: Number,
      value:0
    }
  },
  
  /**
   * 私有数据,组件的初始数据
   * 可用于模版渲染
   */
  data: {
    // 弹窗显示控制
    tagValue: ""
  },

  /**
   * 组件的方法列表
   * 更新属性和数据的方法与更新页面数据的方法类似
   */
  methods: {
    /*
     * 公有方法
     */
    _getTagContent(e) {
      this.setData({
        tagValue: e.detail.value
      })
    },
    /*
     * 内部私有方法建议以下划线开头
     * triggerEvent 用于触发事件
     */
    _cancelEvent() {
      //触发取消回调
      this.setData({
        tagValue:""
      })
      this.triggerEvent("cancelEvent")
    },
    _confirmEvent() {
      //触发成功回调
      if(this.data.tagValue.length>0){
        this.triggerEvent("confirmEvent",this.data.tagValue);
        this.setData({
          tagValue:""
        })
      }
    }
  }
})