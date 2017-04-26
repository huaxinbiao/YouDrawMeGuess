<template>
	<div id="gameRoom">
		<header class="mui-bar mui-bar-nav">
		    <a class="mui-icon mui-icon-arrowleft Hui-icon-left" v-on:tap="back()"></a>
		    <h1 class="mui-title Hui-title"><p class="ellipsis">{{roomDetails.name}}</p><i class="ellipsis">你画我猜</i></h1>
		    <a class="Hui-icon-right mui-icon-extra mui-icon-extra-peoples Hui-icon"></a>
		</header>
		<nav class="mui-bar mui-bar-tab Hui-chat-bar" style="height:auto">
			<div class="sentNews">
				<a href="javascript:;"><i class="mui-icon mui-icon-mic"></i></a>
				<div contenteditable="true" id="contenteditable" v-on:input="oninput($event)" v-bind:class="{cur: sendState}"></div>
				<a href="javascript:;"><i class="Hui-icon Hui-icon-face"></i></a>
				<a href="javascript:;">
					<i v-if="!sendState" class="mui-icon mui-icon-plus"></i>
					<span v-else id="sendMsg" v-on:tap="sendMsg">发送</span>
				</a>
			</div>
			<div style="width:100%;height:200px;display:none"></div>
		</nav>
		<div class="gameRoom-canvas">
			<div class="canvas-bar"><span>1号正在画，请先围观~{{screenHeight}}</span><span>剩余时间：<i>60</i></span></div>
			<canvas id="gameCanvas" v-bind:width="screenWidth" v-bind:height="screenHeight" v-on:touchstart="touchStart($event)" v-on:touchmove="touchMove($event)" v-on:touchcancel="touchCancel($event)" v-on:touchend="touchEnd($event)" v-on:touchleave="touchEnd($event)"></canvas>
		</div>
		<div style="height: 32px;position: absolute;left: 0;width: 100%;" v-bind:style="{top:screenHeight+68+'px'}">
			<input type="color" value="#333333" list="colors">
			<datalist id="colors">
				<option>#ffffff</option>
				<option>#ff0000</option>
				<option>#ff7700</option>
			</datalist>
			<input type="range" name="points" min="1" max="10" />
		</div>
		<div id="chat-scroll" class="mui-content Hui-chat-scroll" v-bind:style="{top:screenHeight+100+'px', height: bodyHeight-screenHeight-150+'px'}">
			<div id="chat-list">
				<div class="one-msg" v-bind:class="{ left: item.source == 2, right: item.source == 1 }" v-for="item in userMsg">
					<div class="head-img"><img src="../../assets/images/default.jpg"></div>
					<div class="head-msg">
						<span>昵称</span>
						<p>{{item.content}}</p>
					</div>
				</div>
			</div>
	   	</div>
	</div>
</template>

<script>
import ajax from '@/assets/js/ajax';
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
	          	roomDetails: '' //房间详细信息
	      	}  
	    },
	  	mounted(){
			var that = this;
	    	this.canvasGo = new operatCanvas();
	    	this.bodyHeight =  document.body.clientHeight;
			this.screenWidth = document.body.clientWidth;
			this.screenHeight = this.screenWidth*(3/5);
			//第一次请求,返回消息，别人画好的
			this.socket.on('allMessages', function(messages){
				for(let i=0; i<messages.length; i++){
					that.canvasGo.drawCanvas(messages[i].parameter,messages[i].opt,messages[i].Start);
				}
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
	        //页面大小改变
	        window.onresize = function(){
	    		that.bodyHeight =  document.body.clientHeight;
	        	that.screenWidth = document.body.clientWidth;
				that.screenHeight = that.screenWidth*(3/5);
	        }
	        //回车发送
	        document.onkeydown=function(event){
             	var e = event || window.event || arguments.callee.caller.arguments[0];         
              	if(e && e.keyCode==13){ // enter 键
	                that.sendMsg();
             	}
         	};
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
		    sendMsg(){
		    	let that = this;
		    	//发送聊天消息
		    	let content = {
		    		content: this.content,
		    		source: 1 //自己发的
		    	}
		    	this.socket.emit('chatMessage', content, function(){
		    		that.content = '';
		    		let contenteditable = document.getElementById("contenteditable")
		    		contenteditable.innerHTML = '';
		    		that.sendState = false;
		    		that.userMsg.push(content);
		    	});
		    },
		    ChatList(message){
		    	this.userMsg.push(message);
		    },
		    send(message){
		    	//发送画图坐标消息
		    	this.socket.emit('createMessage',message);
		    },
		    touchStart(event){
		    	let that = this;
		    	this.canvasGo.handleStart(event,function(message){
		    		that.send(message);
		    	});
		    },
		    touchMove(event){
		    	let that = this;
		    	this.canvasGo.handleMove(event,function(message){
		    		that.send(message);
		    	});
		    },
		    touchCancel(event){
		    	this.canvasGo.handleCancel(event);
		    },
		    touchEnd(event){
		    	let that = this;
		    	this.canvasGo.handleEnd(event,function(message){
		    		that.send(message);
		    	});
		    },
		    oninput(e){
		    	this.content = this.delhtml(e.target.innerHTML);
		    	!!this.content ? this.sendState = true : this.sendState = false;
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
		    }
	  	},
	  	beforeRouteEnter (to, from, next) {
	  		if(!to.params.room_id){
	  			return next('/index')
	  		};
	  		next(function(vm){
		  		vm.roomId = to.params.room_id;
		  		vm.roomName = to.params.name;
		  		//传入房间id,进入房间
		  		vm.socket.emit('enterRoom', {room_id: vm.roomId}, function(res){
		  			if(res.code != 200){
		  				mui.toast(res.msg);
		  			}else{
		  				vm.roomDetails = res.data;
		  				vm.enterRoom(res.data);
		  			}
		  		});
	  		})
	  	},
	    watch:{
	　　　　 screenHeight:'updateMessage',	//当值变化时触发
	　　}
	}
	
//获取坐标点与颜色画笔类型
function operatCanvas(){
	var gameCanvas = document.getElementById("gameCanvas");
	var ctx=gameCanvas.getContext("2d");
	var touchAggregate = new Array();
	var that = this;
	var _default = {
		color: '#333', //画笔颜色
		lineWidth: 3,  //画笔大小
		lineCap: 'round', //绘制圆形的结束线帽 ,可选值:square
		lineJoin: 'round' //当两条线条交汇时，创建圆形边角
	};
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
    position: fixed;
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
				line-height: 12px;
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
</style>