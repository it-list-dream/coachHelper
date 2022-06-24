// pages/courseTemplate/courseTemplate.js
const app = getApp();
var service = require('../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageIndex: 1,
    //是否
    isEnd: false,
    allSaveList: [],
    templateType: 0,
    isShow: false,
    exportList: [],
    totalPages: 0,
    pageSize: 15,
    isNone: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      templateType: app.globalData.isExportTemplate
    });
    //模板列表
    this.getTemplateList();
    if (this.data.templateType == 1) {
      this.getTemplateAction();
    }
    if (this.data.templateType == 2) {
      this.selectList = [];
    }
    switch (parseInt(app.globalData.isExportTemplate)) {
      case 1:
        wx.setNavigationBarTitle({
          title: "存为模板"
        });
        break;
      case 2:
        wx.setNavigationBarTitle({
          title: "导入模板"
        });
        break;
      case 3:
        wx.setNavigationBarTitle({
          title: "删除模板"
        });
    }
  },
  getTemplateList() {
    service.post('/ActLibTemplateList', {
      pageIndex: this.data.pageIndex,
      pageSize: this.data.pageSize,
      gi_id: wx.getStorageSync('gi_id')
    }).then(res => {
      if (res.data.data.length > 0) {
        var list = [...res.data.data, ...this.data.exportList];
        list.forEach(item => {
          item.selected = false
        });
        let total = Math.floor((res.data.recordCount + this.data.pageSize - 1) / this.data.pageSize);
        this.setData({
          exportList: list,
          totalPages: total
        })
      } else {
        this.setData({
          isNone: true
        });
      }
    })
  },
  getTemplateAction() {
    var list = app.globalData.temIdList,
      co_id = app.globalData.coId,
      isNone = false;
      isNone = list.length==0?true:false;
    this.setData({
      isNone
    })
    for (let i = 0; i < list.length; i++) {
      service.post('/CoachActLibDetails', {
        co_id: co_id,
        cs_id: list[i].CS_ID,
        gi_id: wx.getStorageSync('gi_id')
      }).then(res => {
        if (res.data.data.length > 0) {
          list[i].data = res.data.data[0].data;
        } else {
          list.splice(i, 1);
        }
        this.setData({
          allSaveList: list
        });
      });
    }
  },
  chooseTemplate(e) {
    var index = e.currentTarget.dataset.index,
      temList = this.data.allSaveList,
      exportList = this.data.exportList,
      at_id = e.currentTarget.dataset.atid,
      selectCount = 0,
      currentValue = "";
    let myClass = app.globalData.temIdList;
    console.log(myClass)
    if (app.globalData.isExportTemplate == 1) {
      for (let i = 0; i < temList.length; i++) {
        if (index == i) {
          temList[i].selected = true;
        } else {
          temList[i].selected = false
        }
      }
      this.setData({
        allSaveList: temList
      })
    } else if (app.globalData.isExportTemplate == 2) {
      if (myClass.length > 0) {
        currentValue = exportList[index].selected;
        exportList.forEach(item => {
          if (item.selected) {
            selectCount += 1;
          }
        })
        if (!currentValue) {
          if (selectCount == myClass.length) {
            return;
          }
          this.selectList.push(exportList[index])
        } else {
          for (let j = 0; j < this.selectList.length; j++) {
            if (this.selectList[j].AT_ID == at_id) {
              this.selectList[j].splice(j, 1)
            }
          }
        }
        exportList[index].selected = !exportList[index].selected;
        this.setData({
          exportList: exportList
        })
        // exportList[index].selected = !exportList[index].selected;
        // for (let k = 0; k < this.selectList.length; k++) {
        //   if (this.selectList[k].AT_ID != exportList[index].AT_ID) {
        //     this.selectList.push(exportList[index]);
        //   } else {
        //     this.selectList.splice(k,index);
        //   }
        // }
      } else {
        wx.showToast({
          icon: "none",
          title: '你还未预约，请先预约',
        })
      }
      this.setData({
        exportList: exportList
      });
    } else {
      exportList[index].selected = !exportList[index].selected;
      this.setData({
        exportList: exportList
      });
    }
  },
  temConfrim() {
    let type = this.data.templateType,
      slist = this.data.allSaveList;
    var that = this;
    slist = slist.filter(item => item.selected);
    if (type == 1) {
      if (slist.length.length == 0) {
        wx.showToast({
          icon: "none",
          title: '请选择课程',
        });
        return
      }
      this.setData({
        isShow: true
      });
    } else if (type == 2) {
      this.saveAction()
    } else {
      wx.showModal({
        title: '提示',
        content: '是否删除此模板？',
        success(res) {
          if (res.confirm) {
            that.deleteTemplate();
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },
  deleteTemplate() {
    var exportList = this.data.exportList;
    var deleteArr = [];
    for (let i = 0; i < exportList.length; i++) {
      if (exportList[i].selected) {
        console.log(i)
        deleteArr.push(i);
        service.post('/ActLibTemplateDel', {
          at_id: exportList[i].AT_ID,
          gi_id: wx.getStorageSync('gi_id')
        }).then(res => {});
      }
    }
    for (let j = deleteArr.length - 1; j >= 0; j--) {
      exportList.splice(deleteArr[j], 1);
    }
    this.setData({
      exportList: exportList
    })
  },
  saveAction() {
    var myClass = app.globalData.temIdList,
      exportList = this.data.exportList;
    exportList = exportList.filter(item => item.selected);
    let jsonStr;
    for (let j = 0; j < exportList.length; j++) {
      jsonStr = {
        CA_ID: 0,
        UI_ID: app.globalData.custom.UI_ID,
        CO_ID: app.globalData.coId,
        CS_ID: myClass[j].CS_ID,
        CP_Name: myClass[j].CP_Name,
        data: exportList[j].data
      };
      service.post('/CoachActLibSave', {
        json: JSON.stringify(jsonStr),
        gi_id: wx.getStorageSync('gi_id')
      }).then(res => {
        wx.showToast({
          icon: "none",
          title: '导入成功',
        });
        setTimeout(() => {
          wx.navigateBack({
            delta: 1,
          }, 1500)
        })
      })
    }

  },
  temCancel() {
    this.setData({
      isShow: false
    })
  },
  handletemplate(e) {
    let value = e.detail.value;
    this.templateSave(value);
    this.setData({
      isShow: false
    })
  },
  templateSave(tempalteName) {
    var savelist = this.data.allSaveList;
    var saveNew = {};
    for (let i = 0; i < savelist.length; i++) {
      if (savelist[i].selected) {
        saveNew.TemplateName = tempalteName;
        saveNew.AT_ID = 0;
        saveNew.data = savelist[i].data;
      }
    }
    service.post('/ActLibTemplateSave', {
      json: JSON.stringify(saveNew),
      gi_id: wx.getStorageSync('gi_id')
    }).then(res => {
      wx.showToast({
        icon: "success",
        title: '保存成功',
      })
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {
    var currPage = this.data.pageIndex;
    if (currPage < this.data.totalPages) {
      currPage++;
      this.getTemplateList();
    } else {
      this.setData({
        isEnd: true
      })
    }
  }
})