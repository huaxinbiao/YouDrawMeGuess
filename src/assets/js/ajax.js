function ajax(vm, url, type="get", data={}, callback=function(){}){
	var user = localStorage.getItem('user') ; //获取用户信息
	if(user){
		let token = JSON.parse(user).token //获取token
		data.token = token;
	}
	if(type == 'post'){
		vm.$http.post(global.API + url, data, {
			credentials: true
		}).then((response) => {
			let res = response.data;
		  	if(res.code == 104){
				localStorage.clear();
		  		mui.toast('请重新登录');
  				vm.$router.push('/login'); //跳到登录
				vm.$store.commit('setinitiative', 1);
				vm.socket.disconnect(); //关闭连接
		  	}else{
		  		callback(vm, res);
		  	}
		}, (response) => {
			mui.toast('请求失败');
		});
	}else{
  		vm.$http.get(global.API + url, {
			credentials: true,
			params: data
		}).then((response) => {
			let res = response.data;
		  	if(res.code == 104){
				localStorage.clear();
		  		mui.toast('请重新登录');
				vm.$store.commit('setinitiative', 1);
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