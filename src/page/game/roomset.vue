<template>
	<div>
		<header class="mui-bar mui-bar-nav">
		    <a class="mui-icon mui-icon-arrowleft Hui-icon-left" v-on:tap="back()"></a>
		    <h1 class="mui-title Hui-title">房间信息</h1>
		</header>
		<div class="user-list">
			<a href="#"><img src="../../assets/images/default.jpg"></a>
			<a href="#"><img src="../../assets/images/default.jpg"></a>
			<a href="#"><img src="../../assets/images/default.jpg"></a>
			<a href="#"><img src="../../assets/images/default.jpg"></a>
			<a href="#"><img src="../../assets/images/default.jpg"></a>
			<a href="#"><img src="../../assets/images/default.jpg"></a>
			<a href="#"><img src="../../assets/images/default.jpg"></a>
			<a href="#"><img src="../../assets/images/default.jpg"></a>
			<a href="#"><img src="../../assets/images/default.jpg"></a>
			<a href="#"><img src="../../assets/images/default.jpg"></a>
			<a href="#"><img src="../../assets/images/default.jpg"></a>
			<a href="#"><img src="../../assets/images/default.jpg"></a>
			<a href="#"><img src="../../assets/images/default.jpg"></a>
			<a href="#"><img src="../../assets/images/default.jpg"></a>
			<a href="#"><img src="../../assets/images/default.jpg"></a>
		</div>
		<div class="set">
			<ul class="mui-table-view">
				<li class="mui-table-view-cell">
					<span>房间名称</span>
					<p class="mui-badge" style="background: none;font-size: 14px;">{{roomName}}</p>
				</li>
				<li class="mui-table-view-cell">
					<span>房主</span>
					<p class="mui-badge"><a href="#" style="color: #cd3d3d;padding: 3px 5px;">昵称</a></p>
				</li>
				<li class="mui-table-view-cell">
					<span>创建时间</span>
					<p class="mui-badge" style="background: none;font-size: 14px;">{{getTime(roomDetails.time)}}</p>
				</li>
				<li class="mui-table-view-cell">
					<span>设为私有房间</span>
					<div class="mui-switch mui-switch-red">
						<div class="mui-switch-handle"></div>
					</div>
				</li>
				<li class="mui-table-view-cell">
					<span>房间人数</span>
					<p class="mui-badge" style="background: none;font-size: 14px;">15/{{roomDetails.watchpeople}}</p>
				</li>
				<li class="mui-table-view-cell">
					<a class="mui-navigate-right">
						游戏人数
					</a>
					<p class="mui-badge" style="background: none;font-size: 14px;padding-right: 15px;">{{roomDetails.gamepeople}}人</p>
				</li>
			</ul>
			<button type="button" class="mui-btn mui-btn-danger">退出房间</button>
		</div>
	</div>
</template>

<script>
import ajax from '@/assets/js/ajax';
import { formatDateTime } from '@/assets/js/function';
export default{
    data(){
      	return {
      		roomId: null,
      		roomName: null,
      		roomDetails: {}
      	}
    },
  	mounted(){
		mui('.mui-switch')['switch']();
  	},
  	methods:{
  		back(){
			this.$router.go(-1);
  		},
  		getTime(time){
  			if(time){
	  			time = parseInt(time);
  				return formatDateTime(time);
  			}
  		},
  		ready(){
  			//console.log(this.roomDetails)
  		}
  	},
  	beforeRouteEnter (to, from, next) {
  		if(!to.params.roomId){
  			return next('/index');
  		};
  		next(function(vm){
	  		vm.roomId = to.params.roomId;
	  		vm.roomName = to.params.roomName;
	  		vm.roomDetails = to.params.roomDetails;
	  		vm.$store.commit('setroomset', {
	  			roomId: to.params.roomId,
	  			roomName: to.params.roomName
	  		})
	  		vm.ready();
  		})
  	}
}
</script>

<style lang="less" scoped>
.user-list{
	overflow: hidden;
	padding: 55px 5px 5px 5px;
	background: #F1F1F1;
	a{
		display: block;
		float: left;
		width: 20%;
		box-sizing: border-box;
		padding: 5px;
		img{
			width: 100%;
			display: block;
			border: #ddd 1px solid;
			border-radius: 3px;
		}
	}
}
.mui-switch-red.mui-active {
    border: 2px solid #cd3d3d;
    background-color: #cd3d3d;
}
.set{
	overflow: hidden;
	li.mui-table-view-cell{
		line-height: 30px;
	}
	>button{
		display: block;
		margin: 30px auto;
		width: 78%;
		height: 38px;
	}
	.mui-switch:before{
		line-height: 22px;
	}
}
</style>