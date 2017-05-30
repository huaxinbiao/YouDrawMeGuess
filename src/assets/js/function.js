//合并json对象
export const mergeJsonObject = function (jsonbject1, jsonbject2) {
	var resultJsonObject={};
	for(var attr in jsonbject1){
		resultJsonObject[attr]=jsonbject1[attr];
	}
	for(var attr in jsonbject2){
		resultJsonObject[attr]=jsonbject2[attr];
	}
	return resultJsonObject;
};


//时间戳转日期
export const formatDateTime = function (inputTime) {
	var date = new Date(inputTime);  
    var y = date.getFullYear();  
    var m = date.getMonth() + 1;    
    m = m < 10 ? ('0' + m) : m;    
    var d = date.getDate();    
    d = d < 10 ? ('0' + d) : d;    
    var h = date.getHours();  
    h = h < 10 ? ('0' + h) : h;  
    var minute = date.getMinutes();  
    var second = date.getSeconds();  
    minute = minute < 10 ? ('0' + minute) : minute;    
    second = second < 10 ? ('0' + second) : second;   
    return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;    
};

//文件上传
export const UpLoad = function (dom, $, vm, callback = function(){}){
	var user = localStorage.getItem('user') ; //获取用户信息
	var token = null;
	if(user){
		token = JSON.parse(user).token //获取token
	}
	if ($(dom)[0].value.length) {
        var fileName = $(dom)[0].value;
        var extension = fileName.substring(fileName.lastIndexOf('.'), fileName.length).toLowerCase();
        if (extension == ".jpg" || extension == ".png") {
                var data = new FormData();
                data.append('avatar', $(dom)[0].files[0]);
                data.append('token', token);
                vm.$http.post(global.API + '/user/upload', data, {
                	async: false,
                    cache: false,
					credentials: true,
                    contentType: false, //不可缺参数
                    processData: false, //不可缺参数
				}).then((response) => {
					let res = response.data;
				  	if(res.code == 200){
				  		callback(res.data);
				  	}else{
						$.toast(res.msg);
				  	}
				}, (response) => {
					mui.toast('请求失败');
				});
        }else{
        	$.toast('图片类型不正确')
        }
    }
}
