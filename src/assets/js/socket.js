function Socket(vm){
	var html = `<div id="reconnection">
	    <div class="reconnection">
	    	<div class="spinner">
				  <div class="cube1"></div>
				  <div class="cube2"></div>
				</div>
				<p>连接中断，正在尝试自动连接...</p>
	    </div>
		<div class="mask-canvas-backdrop"></div>
    <div>`;
	var els = document.getElementsByTagName('body')[0];
	var socket = vm.socket;
	//登录状态
	var Whether = true;
	//自动重连次数。
	var count = 0;
	//定时器
	var timer = null;
	//监听是否登录，0为未登录
	socket.on('nologin', function(data){
		console.log('连接成功');
		if(data.login === 0){
			Whether = false;
		}
	});
	socket.on('disconnect', function(data){
		console.log('断开连接');
		clearInterval(timer);
		//是登录状态发起重连
		if(Whether && count<10){
			var reconnection = document.getElementById('reconnection');
			var initiative = vm.$store.getters.getinitiative; //是否主动短信
			if(!reconnection && initiative != 1){
				els.appendChild(parseDom(html)[0]);//断开连接重连动画
			}
			//10秒重连一次，重连成功清除定时器
			var reconnec = function(){
				count++;
				console.log('发起重连',count);
				socket.connect(global.IO);
			  	if(count>=10){
					var reconnection = document.getElementById('reconnection');
					if(reconnection){
						reconnection.parentNode.removeChild(reconnection);
					}
					mui.toast('重连失败')
			  		clearInterval(timer);
			  	}
			};
			vm.$router.push('/index/home');
			reconnec();
			timer = setInterval(reconnec, 10000);
		}else{
			console.log('未登录，离线')
		}
	});
	
	socket.on('reconnecp', function(data){
		var reconnection = document.getElementById('reconnection');
		if(reconnection){
			reconnection.parentNode.removeChild(reconnection);
		}
		Whether = true;
  		console.log('连接成功');
  		count = 0;
  		clearInterval(timer); //连接成功清除定时器
	});
}


function parseDom(arg) {

　　 var objE = document.createElement("div");

　　 objE.innerHTML = arg;

　　 return objE.childNodes;

};
export default Socket;