// components/train-dialog/train-dialog.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    trainTitle: {
      type: "添加训练重点"
    }
  },
  options: {
    multipleSlots: true
  },
  /**
   * 组件的初始数据
   */
  data: {
    show: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClose(){
      console.log('我是弹窗中的内容')
    }
  }
})