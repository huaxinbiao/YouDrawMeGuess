<template>
	<div id="gameRoom">
		<header class="mui-bar mui-bar-nav">
		    <a class="mui-icon mui-icon-arrowleft Hui-icon-left" v-on:tap="back()"></a>
		    <h1 class="mui-title Hui-title"><p class="ellipsis">{{roomDetails.name}}</p><i class="ellipsis">{{myvocable?'词语：'+myvocable[0]:''}}{{prompt?'提示：'+prompt:''}}{{myvocable || prompt ? '' : '你画我猜'}}（{{roomDetails.gamepeople}}人房）</i></h1>
		    <router-link :to="{ name: 'RoomSet', params: { roomId: roomId, roomName: roomName, roomDetails:roomDetails }}" class="Hui-icon-right mui-icon-extra mui-icon-extra-peoples Hui-icon"></router-link>
		</header>
		<nav class="mui-bar mui-bar-tab Hui-chat-bar" style="height:auto" v-bind:class="{absolute: isIOS}">
			<div class="sentNews">
				<a href="javascript:;"><i class="mui-icon mui-icon-mic"></i></a>
				<div contenteditable="true" id="contenteditable" v-on:focus="focus($event)" v-on:input="oninput($event)" v-bind:class="{cur: sendState}" style="-webkit-user-select: auto;-webkit-user-modify: read-write-plaintext-only"></div>
				<a href="javascript:;" v-on:tap="expression?expression=false:expression=true"><i class="Hui-icon Hui-icon-face"></i></a>
				<a href="javascript:;">
					<i v-if="!sendState" class="mui-icon mui-icon-plus"></i>
					<span v-else id="sendMsg" v-on:tap="sendMsg">发送</span>
				</a>
			</div>
			<div class="expression" v-show="expression">
				 <div class="swiper-container">
			        <div class="swiper-wrapper">
			            <div class="swiper-slide" v-for="i in 2">
			            	<img v-on:tap="sendBiao('../../../static/img/'+biaoqing[i-1][0]+'/'+n+biaoqing[i-1][1], i)" :src="'../../../static/img/'+biaoqing[i-1][0]+'/'+n+biaoqing[i-1][1]" v-for="n in biaoqingw[i-1]">
			            </div>
			        </div>
			        <!-- Add Pagination -->
			        <div class="swiper-pagination"></div>
			    </div>
			</div>
		</nav>
		<div class="gameRoom-canvas">
			<div class="canvas-bar"><span>{{countDown.number == gameP? '到你了，画起来。。。' : countDown.number + '号正在画，您是' + gameT + '~请先围观~'}}</span><span>剩余时间：<i>{{countDown.count}}</i></span></div>
			<canvas id="gameCanvas" v-bind:width="screenWidth" v-bind:height="screenHeight" v-on:touchstart="touchStart($event)" v-on:touchmove="touchMove($event)" v-on:touchcancel="touchCancel($event)" v-on:touchend="touchEnd($event)" v-on:touchleave="touchEnd($event)"></canvas>
		</div>
		<div style="height: 32px;position: absolute;left: 0;width: 100%;" v-bind:style="{top:screenHeight+68+'px'}">
			<div class="colorLump">
				<span v-on:tap="modify('color', '#000')" style="background: #000;"></span>
				<span v-on:tap="modify('color', '#cd3d3d')" style="background: #cd3d3d;"></span>
				<span v-on:tap="modify('color', '#FFFF00')" style="background: #FFFF00;"></span>
				<span v-on:tap="modify('color', '#7FFF00')" style="background: #7FFF00;"></span>
			</div>
			<div class="penSize">
				<span v-on:tap="modify('size', '2')"></span>
				<span v-on:tap="modify('size', '3')" style="width: 13px;height: 13px;"></span>
				<span v-on:tap="modify('size', '5')" style="width: 16px;height: 16px;"></span>
			</div>
			<div class="reset" v-on:tap="modify('reset')"><img src="../../assets/images/reset.png"></div>
		</div>
		<div id="online-list" v-bind:style="{height:screenHeight+56+'px'}" v-if="!ingame">
			<div>
				<div v-for="item in online"><img src="../../assets/images/default.jpg"><span v-if="item.ready">已准备</span></div>
			</div>
			<a href="javascript:;" v-on:tap="readygame">{{gameready?'取消准备':'准备'}}</a>
		</div>
		<div id="chat-scroll" class="mui-content Hui-chat-scroll" v-bind:style="{top:screenHeight+100+'px', height: bodyHeight-screenHeight-150+'px'}" v-on:tap="expression?expression=false:''">
			<div id="chat-list">
				<div class="one-msg" v-bind:class="{ left: item.id != user.id, right: item.id == user.id }" v-for="item in userMsg">
					<div class="head-img"><img :src="item.user && item.user.head ? item.user.head : head"></div>
					<div class="head-msg">
						<span v-if="item.id != user.id">{{item.nick}}</span>
						<p  v-html="item.content"></p>
					</div>
				</div>
			</div>
	   	</div>
	   	<div id="vocable" v-if="vocable && !myvocable && ingame">
	   		<h3>选择词语{{myvocable}}</h3>
	   		<div>
	   			<span v-for="(item, index) in vocable" v-on:tap="optVocable(item)">{{item[0]}}</span>
	   		</div>
	   	</div>
	</div>
</template>

<script>
import ajax from '@/assets/js/ajax';
import swiper from '../../../static/swiper/swiper-3.4.2.min.js';
	export default{
	    data(){
	      	return {
	      		bodyHeight: '', //body高度
	          	screenHeight: '', //画布高
	          	screenWidth: '', //屏幕宽、画布宽
	          	canvasGo: null, 
	          	messages: [], //坐标消息保存
	          	dom: false, //dom更新状态
	          	sendState: false, //输入状态
	          	content: '', //发送的消息
	          	userMsg: [], //储存用户消息
	          	roomId: null, //房间id
	          	roomName: null, //房间名字
	          	roomDetails: '', //房间详细信息
	          	online: [], //在线人数
	          	gameready: false,
	          	ingame: false,  //游戏是否开始
	          	countDown: {
	          		count: 90,
	          		number: null
	          	},  //倒计时
	          	socketId: null,  //socket.id
	          	gameP: null,  
	          	gameT: '吃瓜群众',  //自己是几号
	          	vocable: '', //词语
	          	myvocable: null, //选择的词语
	          	prompt: null, //提示
	          	contenteditable: null,
	          	isIOS: false, //是否为ios
	          	chatScroll: null,
				user: this.$store.getters.getuser, //获取用户信息
				head: require('../../assets/images/default.jpg'), //默认头像
				biaoqing: [['tieba', '.jpg'], ['acfun', '.png']], //表情路径
				biaoqingw: [50, 54], //表情文件
				expression: false //表情显示
	      	}
	    },
	  	mounted(){
			var that = this;
	        //页面大小改变
	        window.onresize = function(){
	        	that.screenWidth = document.body.clientWidth;
				that.screenHeight = that.screenWidth*(3/5);
	        }
	        //回车发送
	        /*document.onkeydown=function(event){
             	var e = event || window.event || arguments.callee.caller.arguments[0];         
              	if(e && e.keyCode==13){ // enter 键
	                that.sendMsg();
             	}
         	};*/
      		this.contenteditable = document.getElementById("contenteditable");
    		this.contenteditable.innerHTML = '';
         	this.ready();
         	
     	    var u = navigator.userAgent;
		    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
		    this.isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
		    
		    this.chatScroll = document.getElementById("chat-scroll");
	  	},
	  	methods:{
	  		back(){
	  			this.$router.go(-1);
	  		},
			updateMessage() {
			    this.$nextTick(function () {//当值变化dom更新完成
	    			this.dom = true;
	    			if(this.messages.length>0){
	    				for(let i=0; i<this.messages.length; i++){
	    					this.canvasGo.drawCanvas(messages[i].parameter,messages[i].opt,messages[i].Start);
	    				}
	    			}
	    			
			    })
		    },
		    Scroll(){
		    	this.$nextTick(function () {//当值变化dom更新完成
					this.chatScroll.scrollTop =  this.chatScroll.scrollHeight + this.chatScroll.offsetHeight;
			    })
		    },
		    expressionBock(){
			    this.$nextTick(function () {//当值变化dom更新完成
			    	var swiper = new Swiper('.swiper-container', {
				        pagination: '.swiper-pagination',
				        paginationClickable: true
				    });
			    })
		    },
		    sendMsg(){
		    	let that = this;
		    	if(!this.content){
		    		return false;
		    	}
		    	//发送聊天消息
		    	let content = {
		    		id: this.user.id,
		    		content: this.content,
		    		nick: this.user.nick,
		    		head: this.user.head
		    	}
		    	
		    	this.socket.emit('chatMessage', content, function(z){
		    		if(z){
			    		that.content = '';
			    		that.contenteditable.innerHTML = '';
			    		that.sendState = false;
			    		that.userMsg.push(content);
		    		}else{
		    			mui.toast('发送失败')
		    		}
		    	});
		    },
		    sendBiao(src, i){
		    	var that = this;
		    	if(i==1){
		    		this.content+='<img src="'+src+'">';
		    		this.contenteditable.innerHTML = this.content;
		    		this.sendState = true;
		    	}else{
			    	let content = {
			    		id: this.user.id,
			    		content: '<img src="'+src+'">',
			    		nick: this.user.nick,
			    		head: this.user.head
			    	}
			    	this.socket.emit('chatMessage', content, function(z){
			    		that.expression = false;
			    		if(z){
				    		that.userMsg.push(content);
			    		}else{
			    			mui.toast('发送失败')
			    		}
			    	});
		    	}
		    },
		    ChatList(message){
		    	this.userMsg.push(message);
		    },
		    send(message){
		    	//发送画图坐标消息
		    	this.socket.emit('createMessage',message);
		    },
		    touchStart(event){
		    	if(this.countDown.number != this.gameP || !this.myvocable){
		    		return false;
		    	}
		    	let that = this;
		    	this.canvasGo.handleStart(event,function(message){
		    		that.send(message);
		    	});
		    },
		    touchMove(event){
		    	if(this.countDown.number != this.gameP || !this.myvocable){
		    		return false;
		    	}
		    	let that = this;
		    	this.canvasGo.handleMove(event,function(message){
		    		that.send(message);
		    	});
		    },
		    touchCancel(event){
		    	if(this.countDown.number != this.gameP || !this.myvocable){
		    		return false;
		    	}
		    	this.canvasGo.handleCancel(event);
		    },
		    touchEnd(event){
		    	if(this.countDown.number != this.gameP || !this.myvocable){
		    		return false;
		    	}
		    	let that = this;
		    	this.canvasGo.handleEnd(event,function(message){
		    		that.send(message);
		    	});
		    },
		    focus(e){
			    this.expression = false;
		    	var interval = setInterval(function() {
				    document.body.scrollTop = document.body.scrollHeight
				}, 520)
		    },
		    oninput(e){
		    	if(e.target.innerText){
			    	this.content = this.delhtml(e.target.innerHTML);
			    	!!this.content ? this.sendState = true : this.sendState = false;
		    	}else{
		    		this.sendState = false;
		    	}
		    },
		    delhtml(val){
		    	//删除除img外的所有html标签
		    	let  re = /<(?!(\/?img|br))[^>]+>/ig;//要保留其他标签修改这里
			    val = val.replace(re,"");
			    return val;
		    },
		    enterRoom(res){
				//第一次请求数据
				this.socket.emit('getAllMessages');
		    },
		    optVocable(vocable){
		    	this.myvocable = vocable;
         		this.socket.emit('setVocable', vocable);
		    },
		    modify(type, i){
		    	if(this.countDown.number != this.gameP || !this.myvocable){
		    		return false;
		    	}
		    	switch (type){
		    		case 'color':
		    			this.canvasGo.modify('color', i);
		    			break;
		    		case 'size':
		    			this.canvasGo.modify('lineWidth', i);
		    			break;
		    		case 'reset':
		    			//开始下一位，清除画布
						let gameCanvas = document.getElementById("gameCanvas");
						let ctx = gameCanvas.getContext("2d");
						this.socket.emit('resetCanvas')
						ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
		    			break;
		    		default:
		    			break;
		    	}
		    },
		    ready(){
				var that = this;
				this.only = false;
		    	this.canvasGo = new operatCanvas();
		    	this.bodyHeight =  document.body.clientHeight;
				this.screenWidth = document.body.clientWidth;
				this.screenHeight = this.screenWidth*(3/5);
			    
				//清除监听
	         	this.socket.off('allMessages');
	         	this.socket.off('messageAdded');
	         	this.socket.off('userMessage');
	         	this.socket.off('onlineNum');
	         	this.socket.off('startGame');
	         	this.socket.off('startDraw');
	         	this.socket.off('endGame');
	         	this.socket.off('nextBit');
	         	this.socket.off('Vocable');
	         	this.socket.off('vocablePrompt');
	         	this.socket.off('resetCanvas');
	         	
	         	//第一次请求,返回消息，别人画好的
				this.socket.on('allMessages', function(messages){
					//选择词语离开后又进入获取词语
					if(messages.vocable){
						that.myvocable = messages.vocable;
					};
					
					for(let i=0; i<messages.draw.length; i++){
						that.canvasGo.drawCanvas(messages.draw[i].parameter,messages.draw[i].opt,messages.draw[i].Start);
					}
					
					//返回的聊天消息记录
					that.userMsg = messages.chatMessage;
		        });
		        //接收消息
		        this.socket.on('messageAdded', function(message){
		            if(that.dom){
		            	that.canvasGo.drawCanvas(message.parameter,message.opt,message.Start);
		            }else{
		            	that.messages.push(message);
		            }
		        });
		        this.socket.on('userMessage', function(message){
		            that.ChatList(message);
		        });
	         	//用户上线列表
	         	this.socket.on('onlineNum', function(message){
	         		that.online = message;
	         	})
	         	//开始游戏
	         	this.socket.on('startGame', function(message){
	         		mui.toast('游戏开始');
	         		that.ingame = true;
	         		for(let key in message.gameNum){
	         			if(message.gameNum[key].socketId == that.socketId){
	         				that.gameP = parseInt(key)+1;
	         				that.gameT = that.gameP + '号'
	         			}
	         		}
	         	})
	         	//开始画画
         		//清除画布
         		this.socket.on('nextBit', function(message){
         			//开始下一位，清除画布
					let gameCanvas = document.getElementById("gameCanvas");
					let ctx = gameCanvas.getContext("2d");
					ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
					if(message.no){
						mui.toast(message.count + '号放弃了，开始下一位！');
					}
         		})
	         	//游戏结束
	         	this.socket.on('endGame', function(){
	         		mui.toast('游戏结束');
	         		that.ingame = false;
	         		that.gameready = false;
         			//开始下一位，清除画布
					let gameCanvas = document.getElementById("gameCanvas");
					let ctx = gameCanvas.getContext("2d");
					ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
					that.myvocable = null;
		    		that.prompt = null;
	         	})
	         	//倒计时
	         	this.socket.on('countDown', function(message){
	         		that.countDown = message;
		    		
	         		if(that.countDown.number != that.gameP && !!that.myvocable && !!that.gameP){
			    		that.vocable = '';
						that.myvocable = null;
			    	}
			    	if(that.countDown.number == that.gameP && !!that.prompt && !!that.gameP){
			    		that.prompt = null;
			    	};
			    	if(that.countDown.count == 75 && that.countDown.number == that.gameP && !that.myvocable && !!that.vocable){
			    		//20秒未选择自动选择第一个
						that.myvocable = that.vocable[0];
         				that.socket.emit('setVocable', that.vocable[0]);
	         		}
	         	})
	         	//选择词语
	         	this.socket.on('Vocable', function(message){
	         		that.vocable = message.vocable;
	         	})
	         	//词语提示
	         	this.socket.on('vocablePrompt', function(message){
	         		if(that.countDown.number != that.gameP){
	         			that.prompt = message.prompt;
	         		}
	         	})
	         	//清除画布
	         	this.socket.on('resetCanvas', function(){
	         		let gameCanvas = document.getElementById("gameCanvas");
					let ctx = gameCanvas.getContext("2d");
					ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
	         	})
		    },
		    readygame(){
		    	var that = this;
		    	this.gameready = this.gameready ? false : true;
		    	this.socket.emit('readygame', {
		    		room_id: this.roomId,
		    		ready: this.gameready
		    	})
		    }
	  	},
	  	beforeRouteEnter (to, from, next) {
	  		next(function(vm){
	  			//从房间信息页返回来
  				var roomInfo = vm.$store.getters.getroomset;
	  			//房间id不存在
		  		if(!to.params.room_id && !roomInfo){
	  				return vm.$router.push('index')
		  		};
		  		vm.roomId = roomInfo ? roomInfo.roomId : to.params.room_id;
		  		vm.roomName = roomInfo ? roomInfo.roomName : to.params.name;
		  		//传入房间id,进入房间
		  		vm.socket.emit('enterRoom', {room_id: vm.roomId}, function(res){
		  			console.log(res.data.room)
		  			if(res.code == 200){
		  				//游戏未开始
		  				vm.roomDetails = res.data.room;
		  				vm.enterRoom(res.data.room);
		  				vm.socketId = res.data.id;
		  			}else if(res.code == 201){
		  				//游戏已经开始
		  				vm.ingame = true;
		  				vm.roomDetails = res.data.room;
		  				vm.socketId = res.data.id;
		  				vm.enterRoom(res.data.room);
		  				let toast = true;
		  				for(let key in res.data.gameNum){
		         			if(res.data.gameNum[key].socketId == vm.socketId){
		         				vm.gameP = parseInt(key)+1;
		         				vm.gameT = vm.gameP + '号';
		         				toast = false;
		         			}
		         		}
		  				if(toast){
		  					mui.toast(res.msg);
		  				}
		  			}else{
		  				mui.toast(res.msg);
		  			}
		  		});
	  		})
	  	},
	    watch:{
	　　　　 screenHeight:'updateMessage',	//当值变化时触发
			userMsg: 'Scroll',
			expression: 'expressionBock'
	　　},
	    beforeDestroy(){
	    	//销毁前调用
         	this.socket.off('allMessages');
         	this.socket.off('messageAdded');
         	this.socket.off('userMessage');
         	this.socket.off('onlineNum');
         	this.socket.off('startGame');
         	this.socket.off('startDraw');
         	this.socket.off('endGame');
         	this.socket.off('nextBit');
         	this.socket.off('Vocable');
         	this.socket.off('vocablePrompt');
         	this.socket.off('resetCanvas');
	    }
	}
	
//获取坐标点与颜色画笔类型
function operatCanvas(){
	var gameCanvas = document.getElementById("gameCanvas");
	var ctx=gameCanvas.getContext("2d");
	var touchAggregate = new Array();
	var that = this;
	var _default = {
		color: '#000', //画笔颜色
		lineWidth: 3,  //画笔大小
		lineCap: 'round', //绘制圆形的结束线帽 ,可选值:square
		lineJoin: 'round' //当两条线条交汇时，创建圆形边角
	};
	//改变默认值
	this.modify = function(type, i){
		_default[type] = i;
	}
	var ongoingTouchIndexById = function(idToFind){
		for (let i=0; i<touchAggregate.length; i++) {
	        let id = touchAggregate[i].identifier;
	        
	        if (id == idToFind) {
	          return i;
	        }
	    }
	    return -1;    // not found
	}
	this.handleStart = function(event,callback){
		event.preventDefault();
	    var touches = event.changedTouches;//获取正在发生此事件的
	    var Start = true;
	    for(let i=0; i<touches.length; i++){
	    	touchAggregate.push(touches[i]);
	    	let opt = {
	    		x:touches[i].pageX,
	    		y:touches[i].pageY
	    	} 
	    	that.drawCanvas(_default,opt,Start);
			that.back(_default,opt,Start,callback);
	    }
	};
	this.handleMove = function(event,callback){
		event.preventDefault();
	    var touches = event.changedTouches;//获取正在发生此事件的
	    for(let i=0; i<touches.length; i++){
	    	let idx = ongoingTouchIndexById(touches[i].identifier);
	    	let opt = {
	    		x:touches[i].pageX,
	    		y:touches[i].pageY,
	    		sx:touchAggregate[idx].pageX,
	    		sy:touchAggregate[idx].pageY
	    	}
	    	that.drawCanvas(_default,opt);
			touchAggregate.splice(idx, 1, touches[i]);
			that.back(_default,opt,false,callback);
	    }
	};
	this.handleEnd = function(event,callback){
		event.preventDefault();
	    var touches = event.changedTouches;
	    for (let i=0; i<touches.length; i++) {
		    let idx = ongoingTouchIndexById(touches[i].identifier);
	    	let opt = {
	    		x:touches[i].pageX,
	    		y:touches[i].pageY,
	    		sx:touchAggregate[idx].pageX,
	    		sy:touchAggregate[idx].pageY
	    	}
	    	that.drawCanvas(_default,opt);
		    touchAggregate.splice(i, 1);  // remove it; we're done
			that.back(_default,opt,false,callback);
		}
	};
	
	this.handleCancel = function(event) {
      	evt.preventDefault();
      	var touches = evt.changedTouches;
      
      	for (let i=0; i<touches.length; i++) {
        	touchAggregate.splice(i, 1);  // remove it; we're done
      	}
    }
	this.drawCanvas = function(_default,opt,Start){
		ctx.lineWidth = _default.lineWidth;
		ctx.strokeStyle = _default.color;
		ctx.lineCap = _default.lineCap;
		ctx.lineJoin = _default.lineJoin;
		if(Start){
		    ctx.beginPath();
		    ctx.moveTo(opt.x-1, opt.y-69);
		    ctx.lineTo(opt.x, opt.y-68);
		    ctx.closePath();
		    ctx.stroke();
		}else{
		    ctx.beginPath();
		    ctx.moveTo(opt.sx, opt.sy-68);
		    ctx.lineTo(opt.x, opt.y-68);
		    ctx.closePath();
		    ctx.stroke();
		}
	}
	this.back = function(_default,opt,Start,callback){
		var message = {
			parameter: _default,
			opt: opt,
			Start: Start
		};
		callback(message);
	}
}
</script>

<style lang="less" scoped>
@import "../../../static/swiper/swiper-3.4.2.min.css";
@bg-default:#cd3d3d;
@color-default:#cd3d3d;
@text-color:#f67575;
.gameRoom-canvas{
    position: absolute;
    top: 44px;
    left: 0;
    width: 100%;
    background: #fff;
    z-index: 99;
    .canvas-bar{
        color: #fff;
        background: #999;
        font-size: 12px;
        padding: 2px 10px;
        line-height: 20px;
        overflow: hidden;
        >span:last-child{
            float: right;
            color: #f5ef3c;
        }
    }
    #gameCanvas{
        background: #fff;
        display: block;
    }
}
#app{
	.mui-bar{
		position: absolute;
	}
	.mui-bar.mui-bar-nav{
	    box-shadow: none;
	    .Hui-icon-left{
	        font-size: 34px;
	        padding: 5px 0;
	        margin: 0;
	        position: absolute;
	        top: 0;
	        left: 0;
	    }
	    .Hui-icon-right{
	        display: block;
	        color: #fff;
	        position: absolute;
	        top: 0;
	        right: 10px;
	        padding: 5px 0;
	        font-size: 26px;
	        line-height: 34px;
	    }
	    .Hui-title{
	        line-height: 20px;
	        >p{
	            font-size: 16px;
	            line-height: 22px;
	            padding-top: 5px;
	            color: #fff;
	        }
	        >i{
	            display: block;
	            font-size: 12px;
	            font-weight: 400;
	            line-height: 14px;
	        }
	    }
	}
	.Hui-chat-bar{
		position: fixed;
	    background: #fffcfc;
	    border: none;
	    box-shadow: none;
	    border-top: #E8E8E8 1px solid;
	    box-sizing: content-box;
	    z-index: 9998;
	    .mui-icon{
	        color: #666;
	    }
	    i.Hui-icon-face{
	        background: url(../../assets/images/icon2.png) no-repeat center;
	        background-size: 100%;
	    }
	}
	.absolute{
		position: absolute !important;
	}
}
.sentNews{
    display: flex;
    overflow: hidden;
    align-items:flex-end;
    min-height: 50px;
    max-height: 90px;
    >div{
        flex-grow: 1;
        line-height: 18px;
        padding: 8px 3px 2px 3px;
        font-size: 14px;
        word-break:break-all;
        word-wrap:break-word;
        margin-bottom: 12px;
        border-bottom: #ddd 1px solid;
        max-height: 70px;
        margin-top: 10px;
        overflow-x: hidden;
        overflow-y: auto;
    }
    >div.cur{
    	border-bottom: #cd3d3d 1px solid;
    }
    >a{
        padding: 0 5px;
        height: 50px;
        flex-grow: 0;
        flex-shrink: 0;
        >i.mui-icon{
            font-size: 22px;
            padding-top: 16px;
            padding-bottom: 5px;
            vertical-align: bottom;
        }
        >i.Hui-icon{
            width: 20px;
            height: 20px;
            background-size: 20px;
            margin-top: 16px;
        }
	    i.mui-icon-plus{
    	    width: 25px;
			text-align: right;
			font-weight: 700;
			font-size: 23px;
			padding-top: 14px;
	    }
        #sendMsg{
        	display: block;
        	text-align: center;
        	font-size: 12px;
        	line-height: 22px;
            width: 35px;
            border: #cd3d3d 1px solid;
            color: #cd3d3d;
            border-radius: 3px;
            margin-top: 14px;
            margin-left: 5px;
        }
    }
    >a:nth-of-type(2){
        padding-right: 0;
    }
    >a:last-child{
        padding-right: 10px;
    }
}
#chat-scroll{
    background: #F5F5F5;
}
.Hui-chat-scroll{
    position: absolute !important;
    top: 400px;
    bottom: 61px;
    padding: 0 !important;
    z-index: 10;
    left: 0;
    width: 100%;
    overflow-x: hidden;
    overflow-y: auto;
}
#chat-list{
	padding: 16px 10px 6px;
	.one-msg{
		margin-bottom: 10px;
		overflow: hidden;
		.head-img{
			width: 38px;
			height: 38px;
			img{
				display: block;
				width: 38px;
				height: 38px;
			}
		}
		.head-msg{
			span{
				display: block;
				font-size: 12px;
				line-height: 14px;
				margin-bottom: 5px;
				color: #666;
			}
			p{
				font-size: 14px;
				background: #fff;
				display: inline-block;
				padding: 8px 10px;
				line-height: 18px;
				border-radius: 3px;
				max-width: 68%;
				color: #333;
				position: relative;
			}
		}
	}
	.one-msg.left{
		.head-img{
			float: left;
		}
		.head-msg{
			padding-left: 48px;
			p:after{
				content: " ";
				display: block;
				position: absolute;
				top: 11px;
				left: -6px;
				width: 0;
			    height: 0;
			    border-top: 5px solid transparent;
			    border-right: 7px solid #fff;
			    border-bottom: 5px solid transparent;
			}
		}
	}
	.one-msg.right{
		text-align: right;
		.head-img{
			float: right;
		}
		.head-msg{
			padding-right: 48px;
			p:after{
				content: " ";
				display: block;
				position: absolute;
				top: 11px;
				right: -7px;
				width: 0;
			    height: 0;
			    border-top: 5px solid transparent;
			    border-left: 7px solid #fff;
			    border-bottom: 5px solid transparent;
			}
		}
	}
}
#online-list{
    position: absolute;
    top: 44px;
    left: 0;
    width: 100%;
    background: #fff;
    z-index: 100;
    height: 50%;
    >div{
	    overflow-y: auto;
	    overflow-x: hidden;
	    position: absolute;
	    top: 0;
	    left: 0;
	    height: 80%;
	    width: 100%;
	    box-sizing: border-box;
	    >div{
	    	width: 20%;
	    	float: left;
	    	padding: 8px;
	    	position: relative;
	    	img{
	    		display: block;
	    		width: 100%;
	    		border: #f1f1f1 1px solid;
	    	}
	    	span{
	    		position: absolute;
	    		bottom: 10px;
	    		right: 0;
	    		display: block;
	    		font-size: 12px;
	    		line-height: 18px;
	    		height: 18px;
	    		overflow: hidden;
	    		text-align: center;
	    		color: #cd3d3d;
	    		width: 100%;
	    		text-align: center;
	    	}
	    }
    }
    >a{
    	display: block;
    	background: #cd3d3d;
	    position: absolute;
    	color: #fff;
    	bottom: 5%;
    	width: 30%;
    	line-height: 32px;
    	border-radius: 5px;
    	left: 35%;
    	text-align: center;
    	font-size: 16px;
    }
}
#vocable{
	position: fixed;
	z-index: 999;
	background: #fff;
	top: 50%;
	left: 10%;
	width: 80%;
	height: 180px;
	border: #cd3d3d 1px solid;
	border-radius: 5px;
	margin-top: -90px;
	>h3{
		font-size: 16px;
		text-align: center;
		line-height: 70px;
		color: #cd3d3d;
	}
	span{
		display: block;
		width: 44%;
		float: left;
		margin-left: 4%;
		margin-bottom: 20px;
		text-align: center;
		line-height: 30px;
		height: 30px;
		overflow: hidden;
		border: #F1F1F1 1px solid;
		color: #cd3d3d;
		&:hover{
			border: #cd3d3d 1px solid;
		}
	}
}
.colorLump{
	display: inline-block;
	margin-left: 15px;
	>span{
		display: inline-block;
		width: 24px;
		height: 24px;
		border-radius: 3px;
		margin-right: 5px;
	}
}
.penSize{
	display: inline-block;
	margin-left: 35px;
    vertical-align: top;
    margin-top: 3px;
	>span{
		display: inline-block;
		width: 10px;
		height: 10px;
		background: #666;
		border-radius: 50%;
		margin-right: 8px;
		vertical-align: middle;
	}
}
.reset{
	display: inline-block;
	float: right;
	width: 20px;
	margin: 6px 12px 6px 6px;
	img{
		width: 100%;
	}
}
.expression{
	background: #fff;
	width: 100%;
	height: 200px;
	overflow-x: hidden;
	overflow-y: auto;
	.swiper-container {
	    width: 100%;
	    height: 100%;
	    .swiper-slide{
	    	overflow-x: hidden;
	    	overflow-y: auto;
	    	img{
	    		display: block;
	    		margin: 10px 0 0 6px;
	    		float: left;
	    	}
	    }
	    .swiper-slide:last-child{
	    	img{
	    		width: 17%;
	    		margin: 15px 0 0 2.5%;
	    	}
	    }
	}
}
</style>