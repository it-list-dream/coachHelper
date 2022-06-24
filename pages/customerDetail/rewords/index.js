var service = require('../../../utils/request.js');
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  options: {
    multipleSlots: true
  },
  properties: {
    //步骤条数据
    step: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isClose: false,
    chooseId: -1
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
      let ud_id = this.properties.step.children[this.data.chooseId].UD_ID || 0;
      if (e.detail.length > 0) {
        service.post('/UserFollowUpDetailAdd', {
          Remarks: e.detail,
          UD_ID: ud_id,
          UI_ID: app.globalData.custom.UI_ID,
          gi_id: wx.getStorageSync('gi_id')
        }).then(res => {
          this.setData({
            isClose: false
          })
          this.triggerEvent('success')
        })
      }
    },
    editText(e) {
      let index = e.currentTarget.dataset.index;
      this.setData({
        isClose: true,
        chooseId: index
      })
    },
    deleteText(e) {
      let  ud_id = e.currentTarget.dataset.udid;
      console.log(e);
      this.triggerEvent('deleteText',{
        ud_id:ud_id
      })
    }
  }
})