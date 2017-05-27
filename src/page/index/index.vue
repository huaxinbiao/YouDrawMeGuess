<template>
	<div id="offCanvasWrapper" class="mui-off-canvas-wrap mui-draggable mui-slide-in">
	    <!--侧滑菜单部分-->
	    <Hleft></Hleft>
	    <!--主界面部分-->
	    <div class="mui-inner-wrap">
	        <Hheader></Hheader>
	        <Hnav></Hnav>
	        <transition name="slide-fade">
	        	<router-view></router-view>
	        </transition>
	        <div class="mui-off-canvas-backdrop"></div>
	    </div>
	</div>
</template>

<script>
import Hheader from '../../components/header.vue';
import Hnav from '../../components/nav.vue';
import Hleft from '../../components/left.vue';
export default {
  	name: 'index',
  	data(){
  		return {
			
  		}
  	},
  	mounted(){
  		mui.init();
  	},
	methods:{
		
	},
	watch: {
	    '$route' (to, from) {
	    	//离开隐藏创建房间弹窗
	    	if(to.name == 'room'){
	    		this.$store.commit('setcreateroom', false);
	    	}
	    }
  	},
  	components:{ Hheader, Hnav, Hleft }
}
</script>

<style>
@import '../../assets/css/icons-extra.css';
.slide-fade-enter-active {
  	transition: all .3s ease;
  	-webkit-transition: all .3s ease;
  	-moz-transition: all .3s ease;
  	-ms-transition: all .3s ease;
  	-o-transition: all .3s ease;
}
.slide-fade-leave-active {
  	transition: all .5s ease;
  	-webkit-transition: all .5s ease;
  	-moz-transition: all .5s ease;
  	-ms-transition: all .5s ease;
  	-o-transition: all .5s ease;
}
.slide-fade-enter{
  	transform: translateX(20px);
  	-webkit-transform: translateX(20px);
  	-moz-transform: translateX(20px);
  	-ms-transform: translateX(20px);
  	-o-transform: translateX(20px);
    opacity: 0;
}
.slide-fade-leave-active {
	opacity: 0;
}
</style>