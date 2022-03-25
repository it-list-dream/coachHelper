Component({
  /**
   * 组件的属性列表
   */
  options: {
    multipleSlots: true
  },
  properties: {
    //步骤条数据
    stepList: {
      type: Array,
      value: [{
        name: "名称",
        time: "2021-07-19：12:30:01"
      }]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isClose: false
  },
  /**
   * 组件的方法列表
   */
  methods: {
    addFollow() {
      this.setData({
        isClose: true
      })
    },
    cancel() {
      this.setData({
        isClose: false
      })
    },
    confrim(e) {
      this.setData({
        isClose: false
      })
      this.triggerEvent('success', e.detail)
    },
    editText(){
      this.setData({
        isClose: true
      })
    },
    deleteText(){
       
    }
  }
})