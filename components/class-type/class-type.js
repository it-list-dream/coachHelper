// components/class-type/class-type.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    pouponHeight: {
      type: String,
      value: '60vh'
    },
    typeList: {
      type: Array,
      value: []
    },
    //是否默认选中一个
    isChecked: {
      type: Boolean,
      value: false
    }
  },
  lifetimes: {
    attached() {
      this.setData({
        list:this.properties.typeList
      })
    }
  },
  observers: {
    'typeList': function (val) {
      //console.log(this.properties.isChecked);
      if (this.properties.isChecked) {
        for (let i = 0; i < val.length; i++) {
          if (!val[i].checked) {
            val[0].checked = true;
          }
        }
      }
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    show: true,
    list:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClose(e) {
      this.setData({
        show: false
      });
    },
    // 选择
    classCancel() {
      this.setData({
        show: false
      });
    },
    classConfrim() {
      this.triggerEvent('confrim', {
        name: 'zs',
        sex: '男'
      })
    }
  }
})