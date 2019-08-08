//list.js
//获取应用实例
const app = getApp()

Page({
	data: {
		list: [],
	},
	onLoad: function() {

	},
	onShow: function() {
		let that = this;
		wx.request({
			url: "http://192.168.8.102:8082/smdemo/admin/listarea",
			method: "GET",
			data: {},
			success: function(res) {
				console.log(res.data)
				var list = res.data.areaList
				if (list == null) {
					var toastText = "获取数据失败" + res.data.errMsg;
					wx.showToast({
						title: toastText,
						icon: '',
						duration: 2000
					});
				} else {
					that.setData({
						list: list
					});
				}
			}
		})
	},
	addArea: function() {
		wx.navigateTo({
			url: '../operation/operation',
		})
	},
	deleteArea: function(e) {
		var that = this;
		wx.showModal({
			title: '提示',
			content: "确定要删除[" + e.target.dataset.areaname + "]吗?",
			success: function(sm) {
				if (sm.confirm) {
					wx.request({
						url: "http://127.0.0.1:8082/smdemo/admin/removearea",
						data: {
							"areaId": e.target.dataset.areaid
						},
						method: "GET",
						success: function(res) {
							var result = res.data.success;
							var toastText = "删除成功";
							if (result != true) {
								toastText = "删除失败"
							} else {
								that.data.list.splice(e.target.dataset.index)
								that.setData({
									list: that.data.list
								});
							}
							wx.showToast({
								title: toastText,
								icon: '',
								duration: 2000
							});
						}
					});
				}
			}
		});
	}
})
