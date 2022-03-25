// evaluation/pages/newPosture/body-part/body-part.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    bodyList: {
      type: Array,
      value: []
    },
    bodyTitle: {
      type: String,
      value: ""
    },
    buttonText:{
      type:String,
      value:""
    },
    activeIndex:{
      type:Number,
      value:0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    //图片地址
    pictureUrl: "",
    coachRemark:"",
    limit:0
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //拍照
    takePhone() {
      //拍摄照片
      var that = this;
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success(res) {
          // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFilePaths
          that.setData({
            pictureUrl: tempFilePaths
          })
        }
      })
    },
    checkLabs(e) {
      let part = e.currentTarget.dataset.part,
        partTitle = e.currentTarget.dataset.partTitle,
        index = e.currentTarget.dataset.index,
        bodyList = this.data.bodyList;
      //console.log(bodyList[index]);
      for (let j = 0; j < bodyList[index].list.length; j++) {
        if (part.value == bodyList[index].list[j].value) {
          bodyList[index].list[j].checked = !bodyList[index].list[j].checked;
        }
      }
      //var str = "bodyList[" + index + "].list[" + part.id + "].checked";
      // this.setData({
      //   [str]: !bodyList[index].list[part.id].checked
      // })
      this.setData({
        bodyList:bodyList
      })
    },
    getLimit(e){
       this.setData({
        coachRemark:e.detail.value,
        limit:e.detail.value.length
       })
    },
    nextStep(e){
      this.triggerEvent('next', {
        active:e.currentTarget.dataset.index
      })
    }
  }
})