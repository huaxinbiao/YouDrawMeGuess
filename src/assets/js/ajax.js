function ajax(vm, url, type="get", data, callback=function(){}){
	if(type == 'post'){
		
	}else{
  		vm.$http.get(global.API + url,{
			credentials: true
		},data).then((response) => {
			let res = response.data;
		  	if(res.code == 104){
				localStorage.clear();
		  		mui.toast('请重新登录');
  				vm.$router.push('/login');
		  	}else{
		  		callback(vm, res);
		  	}
		}, (response) => {
			mui.toast('请求失败');
		});
	}
}
export default ajax;