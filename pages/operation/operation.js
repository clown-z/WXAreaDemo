// pages/operation/operation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
	areaId: undefined,
	areaName: '',
	priority: '',
	addUrl: "http://192.168.8.102:8082/smdemo/admin/addarea",
	modifyUrl: "http://192.168.8.102:8082/smdemo/admin/modifyarea"
  },
  formSumbit: function(e){
	  var that = this;
	  var formData = e.detail.value;
	  var url = that.data.addUrl;
	  console.log(formData);
	  if(that.data.areaId != undefined){
		  formData.areaId = that.data.areaId;
		  url = that.data.modifyUrl;
	  }
	  wx.request({
		 url: url,
		  data: JSON.stringify(formData),
		  method: "POST",
		  header:{
			  'Content-Type': 'application/json'
		  },
		  success: (res) => {
		  	var result = res.data.success
			var toastText = "操作成功"
			if(result != true){
				toastText = "操作失败" + res.data.errMsg;
			}
			wx.showToast({
				title: toastText,
				icon: '',
				duration: 2000
			});
			if(that.data.areaId == undefined || result){
				wx.redirectTo({
					url: '../list/list',
				});
			}
		  }
	  });
  },
  formReset: function(){
  	  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	var that = this;
	//页面初始化 options为页面跳转所带来的参数
	console.log("operation Page options: " + options.areaId);	
	if(options.areaId == undefined){
		return;
	}else{
		this.setData({
			areaId: options.areaId
		});
	}
	wx.request({
		url: "http://127.0.0.1:8082/smdemo/admin/getareabyid",
		method: "GET",
		data: {
			areaId: options.areaId
		},
		success: (res) => {
			var area = res.data.area;
			if(area == undefined){
				var toastText = "获取数据失败" + res.data.errMsg;
				wx.showToast({
					title: toastText,
					icon: '',
					duration: 2000
				});
			}else{
				that.setData({
					areaName: area.areaName,
					priority: area.priority
				});
			}
		}
	});
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})