<template>
  <div id="app">
  	<transition :name="transitionName">
    	<router-view class="child-view"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
      return {
        transitionName: 'slide-left'
      }
	},
	mounted(){
	},
	methods:{
	},
	watch: {
    '$route' (to, from) {
      const toDepth = to.path.split('/').length;
      const fromDepth = from.path.split('/').length;
      if(toDepth < fromDepth){
					this.transitionName = 'slide-right';
      }else if(toDepth > fromDepth){
      		this.transitionName = 'slide-left';
      }else{
      		this.transitionName = 'slide-fade';
      }
      
      //监听离开房间页面
    	if(from.path == '/draw'){
    		this.socket.emit('leaveRoom');
    	}
    }
  }
}
</script>

<style lang="less">
@import './assets/css/Hui';
html,body{
		height: 100%;
}
#app {
	  font-family: 'Avenir', Helvetica, Arial, sans-serif;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	  overflow: hidden;
		width: 100%;
		height: 100%;
		background: #fff;
}
.child-view {
  	position: absolute;
	  top: 0;
	  left: 0;
	  width: 100%;
	  height: 100%;
	  -moz-box-sizing: border-box;
   			 box-sizing: border-box;
   	transition: all .6s cubic-bezier(.55,0,.1,1);
}
.slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(-80px, 0);
    transform: translate(-80px, 0);
}
.slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
}
/*同级页面动画*/
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
