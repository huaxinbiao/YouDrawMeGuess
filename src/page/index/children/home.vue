<template>
	<div class="mui-content mui-scroll-wrapper">
		<div class="mui-scroll">
	        <div class="Hui-indexbar">
	            <div><img :src="user && user.head ? user.head : head"></div>
	            <div>
	                <h2>{{user?user.nick:'袖手旁观'}}</h2>
	                <p>昵称是随机产生的。。。</p>
	                <span>积分：1000</span>
	            </div>
	        </div>
	        <div class="Hui-indexcon">
	            <div>
	                <div><img src="../../../assets/images/icon1.png"></div>
	                <div>
	                    <h3>你画我猜</h3>
	                    <span>涂鸦猜谜才艺展示</span>
	                </div>
	                <div><a href="javascript:;" v-on:tap="quickStart()">开始</a></div>
	            </div>
	            <!--<div>
	                <div><img src="../../../assets/images/icon1.png"></div>
	                <div>
	                    <h3>你画我猜</h3>
	                    <span>涂鸦猜谜才艺展示</span>
	                </div>
	                <div><a href="javascript:;" v-on:tap="disconnect">断开连接</a></div>
	            </div>-->
	        </div>
	    </div>
	</div>
</template>

<script>
import ajax from '@/assets/js/ajax';
	export default {
		data(){
			return {
				user: this.$store.getters.getuser, //获取用户信息
				head: require('../../../assets/images/default.jpg'),
				complete: false
			}
		},
		mounted(){
	    	//主界面和侧滑菜单界面均支持区域滚动;
	        mui('.mui-scroll-wrapper').scroll({
	        	 indicators: false, //是否显示滚动条
				 deceleration:0.0005, //阻尼系数,系数越小滑动越灵敏
				 bounce: true, //是否启用回弹
	        });
        	mui('.mui-scroll-wrapper').on('tap','a' ,function(){location.href = this.getAttribute('href')});
	   	},
		methods:{
			disconnect(){
				this.socket.disconnect();
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
		}
	}
</script>

<style>
</style>