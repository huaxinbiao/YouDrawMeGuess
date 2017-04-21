function Socket(vm){
	var socket = vm.$store.getters.getsocket
	//登录状态
	var Whether = true;
	//自动重连次数。
	var count = 0;
	
	//监听是否登录，0为未登录
	socket.on('nologin', function(data){
		if(data.login === 0){
			Whether = false;
		}
	});
	
	socket.on('disconnect', function(data){
		//是登录状态发起重连
		var timer;
		if(Whether && count<10){
			//10秒重连一次，重连成功清除定时器
			var reconnec = function(){
				count++;
				//console.log('发起重连',count);
				socket = io.connect(global.IO);
			  	socket.emit('reconnec', {count: count}, function(){
			  		//console.log('重连成功');
			  		clearInterval(timer); //连接成功清除定时器
			  		vm.$store.commit('setsocket', socket);
			  		Socket(vm);
			  	});
			};
			reconnec();
			timer = setInterval(reconnec, 10000);
		}else if(Whether && count>=10){
			clearInterval(timer); //超10次清除定时器
		}else{
			console.log('未登录，离线')
		}
	});
	
	socket.on('reconnecp', function(data){
		console.log(data);
	});
}

export default Socket;