<template>
	<div id="room" class="mui-content mui-scroll-wrapper">
		<div class="mui-scroll">
            <div class="Hui-roombar">
                <a href="javascript:;" v-on:tap="quickStart()">快速开始</a>
            </div>
            <div class="Hui-roomcon">
                <dl v-for="(item, index) in roomList" v-on:tap="goRoom(item._id, item.name)">
                	<dt>
                		<span v-for="(item1, index) in item.gameuserinfo"><img :src="item1&&item1.head?url+item1.head:head"></span>
                	</dt>
                	<dd>
                		<div>
                			<h3 class="ellipsis">{{item.name}}</h3>
                			<p>你个就是摆摆样子。。。</p>
                		</div>
                		<div>
                			<span>等待中 0/{{item.gamepeople}}</span>
                			<i>你画我猜</i>
                		</div>
                	</dd>
                </dl>
            </div>
        </div>
        <div class="createRoom" v-if="getCreateRoom">
        	<div class="mui-input-group" style="z-index: 999;">
				<div class="mui-input-row">
					<label>房间设置</label>
					<input type="text" v-model="name" placeholder="请输入房间名字" v-validate="'required|min:2|max:12'" data-vv-as="房间名字" name="name" required="required">
				</div>
				<div class="mui-input-row mui-radio mui-left">
					<label>2 人游戏房间</label>
					<input name="playersnumber" type="radio" value="2" v-model="playersnumber">
				</div>
				<div class="mui-input-row mui-radio mui-left">
					<label>4 人游戏房间</label>
					<input name="playersnumber" type="radio" value="4" v-model="playersnumber">
				</div>
				<div class="mui-input-row mui-radio mui-left">
					<label>6 人游戏房间</label>
					<input name="playersnumber" type="radio" value="6" v-model="playersnumber">
				</div>
				<div class="mui-input-row mui-radio mui-left">
					<label>8 人游戏房间</label>
					<input name="playersnumber" type="radio" value="8" v-model="playersnumber">
				</div>
				<div class="mui-input-row mui-radio mui-left">
					<label>10 人游戏房间</label>
					<input name="playersnumber" type="radio" value="10" v-model="playersnumber">
				</div>
				<div class="mui-button-row">
					<button type="button" class="mui-btn mui-btn-outlined" v-on:tap="cancelcreateRoom()">取消</button>&nbsp;&nbsp;
					<button type="button" class="mui-btn mui-btn-danger" v-on:tap="createRoom()">确认</button>
				</div>
			</div>
			<div class="mask-canvas-backdrop" v-on:tap="cancelcreateRoom()"></div>
        </div>
    </div>
</template>

<script>
import ajax from '@/assets/js/ajax';
	export default {
		data(){
			return {
				name: '', //新建房间名字
				head: require('../../../assets/images/default.jpg'),
				playersnumber: 4, //新建房间人数
				roomList: '', //房间列表
				complete: false, //防止多次提交
				url: global.API+'/'
			}
		},
		mounted(){
			var that = this;
	        this.getRoom();
	    	//主界面和侧滑菜单界面均支持区域滚动;
	        mui('.mui-scroll-wrapper').scroll({
	        	 indicators: false, //是否显示滚动条
				 deceleration:0.0005, //阻尼系数,系数越小滑动越灵敏
				 bounce: true, //是否启用回弹
	        });
        	mui('.mui-scroll-wrapper').on('tap','a' ,function(){location.href = this.getAttribute('href')});
	   	},
		methods:{
			getRoom(){
				var that = this;
				ajax(this, '/room/list', 'get', {}, function(vm, res){
				  	if(res.code == 200){
				  		that.roomList = res.data;
				  	}else{
				  		mui.toast(res.msg);
				  	}
				})
			},
			createRoom(){
				var that = this;
				if(this.name.length<2 || this.name.length>12){
					return mui.toast('房间名字长度为2至12个字');
				}
				if(this.complete){
					return;
				}
				this.complete = true;
			  	ajax(this, '/room/create', 'post', {
					name: that.name,
	                playersnumber: parseInt(that.playersnumber),
				}, function(vm, res){
				  	that.complete = false;
				  	if(res.code == 200){
				  		that.name = '';
				  		vm.$store.commit('setcreateroom', false);
					  	vm.$router.push({name: 'draw', params: {
					  		room_id: res.data.id,
					  		name: res.data.name
					  	}});
				  	}else{
				  		mui.toast(res.msg);
				  	}
				})
			},
			cancelcreateRoom(){
				this.$store.commit('setcreateroom', false);
			},
			goRoom(id, name){
				//console.log('进入房间')
				this.$router.push({name: 'draw', params: {
			  		room_id: id,
			  		name: name
			  	}});
			},
			quickStart(){
				//快速进入房间
				var that = this;
				if(this.complete){
					return;
				}
				this.complete = true;
				ajax(this, '/room/quick', 'get', {}, function(vm, res){
				  	that.complete = false;
				  	if(res.code == 200){
					  	//console.log('进入房间')
						vm.$router.push({name: 'draw', params: {
					  		room_id: res.data._id,
					  		name: res.data.name
					  	}});
				  	}else{
				  		mui.toast(res.msg);
				  	}
				})
			}
		},
	    computed: {
		    getCreateRoom() {
		    	return this.$store.getters.getcreateroom;
		    }
	    }
	}
</script>

<style>
</style>