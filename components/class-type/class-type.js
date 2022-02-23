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
    },
    isShow: {
      type: Boolean,
      value: false
    }
  },
  lifetimes: {
    attached() {
      this.setData({
        list: this.properties.typeList
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
    list: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClose(e) {
      let index = e.currentTarget.dataset.index,
        myList = this.data.list;
      if (index > 0) {
        for (let i = 0; i < myList.length;i++) {
            if(myList[i].checked){
                myList.checked  = false;
            }
        }
      }
      this.triggerEvent('cancel')
    },
    // 选择
    // classCancel() {
    //   console.log('取消')
    //   this.setData({
    //     show: false
    //   });
    // },
    classConfrim() {
      console.log('确定按钮')
      let typeList = this.data.list;
      this.triggerEvent('confrim',typeList)
    },
    selectedType(e) {
      let type = e.currentTarget.dataset.type;
      let allList = this.data.list;
      console.log(type)
      for (let i = 0; i < allList.length; i++) {
        if (allList[i].name == type.name) {
          allList[i].checked = !allList[i].checked
        }
      }
      this.setData({
        list: allList
      })
    }
  }
})