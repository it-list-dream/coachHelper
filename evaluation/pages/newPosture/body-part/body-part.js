var upLoad = require('../../../../utils/upload.js')
Component({
  /**
   * 组件的属性列表
   */
  options: {
    multipleSlots: true
  },
  properties: {
    bodyList: {
      type: Array,
      value: []
    },
    bodyAngle: {
      type: String,
      value: ""
    },
    bodyTitle: {
      type: String,
      value: ""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    //图片地址
    fileList: [],
    // pictureUrl: "",
    coachRemark: "",
    limit: 0
  },
  /**
   * 组件的方法列表
   */
  methods: {
    afterRead(event) {
      var fileList = this.data.fileList;
      fileList.push({
        name: "图片1",
        url: event.detail.file.url
      });
      this.setData({
        fileList
      });
      upLoad.uploadImage('/ReceiveFiles', fileList[0].url, 'front', {
        gi_id: wx.getStorageSync('gi_id')
      }).then(res => {
        this.triggerEvent('imageSuccess', {
          fiedsid: res.filesid,
          bodyPostition: this.data.bodyAngle
        })
      })
    },
    deletePicture(e) {
      let index = e.detail.index,
        fileList = this.data.fileList;
      fileList.splice(index, 1);
      this.setData({
        fileList,
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
      this.triggerEvent('labChange', {
        bodyPostition: this.data.bodyAngle,
        bodyList: bodyList
      });
    },
    getLimit(e) {
      this.setData({
        coachRemark: e.detail.value,
        limit: e.detail.value.length
      })
      this.triggerEvent('remark', {
        coachRemark: e.detail.value,
        bodyPostition: this.data.bodyAngle
      })
    }
  }
})