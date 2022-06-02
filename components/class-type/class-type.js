Component({
  /**
   * 组件的属性列表
   */
  properties: {
    height: {
      type: String,
      value: '60vh'
    },
    classes: {
      type: Array,
      value: {
        type: []
      },
      observer: function (newList) {
        var selectList = this.properties.selectList;
        if (!this.properties.multichoice) {
          this.setData({
            selected: 0
          })
        }else{
          for (let i = 0; i < newList.length; i++) {
            for (let j = 0; j < selectList.length; j++) {
              if (selectList[j] == i) {
                newList[i].checked = true;
              }
            }
          };
        }
        this.setData({
          courseList: newList
        })
      }
    },
    //选中的数组
    selectList: {
      type: Array,
      value: {
        type: []
      }
    },
    //是否默认选中一个
    multichoice: {
      type: Boolean,
      value: false
    },
    isShow: {
      type: Boolean,
      value: false
    }
  },
  lifetimes: {
    attached() {}
  },
  /**
   * 组件的初始数据
   */
  data: {
    show: true,
    courseList: [],
    //单选
    selected: -1,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClose(e) {
      this.triggerEvent('cancel')
    },
    classConfrim() {
      //console.log('确定按钮')
      var typeList = this.data.courseList;
      this.triggerEvent('confrim', typeList.filter(item=>{
        item.courseNum = 1;
        return item.checked
      }))
    },
    selectedType(e) {
      let type = e.currentTarget.dataset.type,
        courseList = this.data.courseList;
      if (this.properties.multichoice) {
        for (let i = 0; i < courseList.length; i++) {
           if(courseList[i].cp_id == type.cp_id){
            courseList[i].checked = !courseList[i].checked;
           }
        }
      }
      this.setData({
        courseList:courseList
      })
    }
  }
})