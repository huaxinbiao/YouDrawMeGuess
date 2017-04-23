<template>
	<div id="offCanvasContentScroll" class="mui-content mui-scroll-wrapper">
		<div class="mui-scroll">
	        <div class="Hui-indexbar">
	            <div><img src="../../../assets/images/default.jpg"></div>
	            <div>
	                <h2>袖手旁观</h2>
	                <p>我就试试介绍能有多长。。。</p>
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
	                <div><router-link to="/draw">开始</router-link></div>
	            </div>
	            <div>
	                <div><img src="../../../assets/images/icon1.png"></div>
	                <div>
	                    <h3>你画我猜</h3>
	                    <span>涂鸦猜谜才艺展示</span>
	                </div>
	                <div><a href="javascript:;" v-on:tap="disconnect">断开连接</a></div>
	            </div>
	        </div>
	    </div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				
			}
		},
		mounted(){
	    	//主界面和侧滑菜单界面均支持区域滚动；
	        mui('#offCanvasContentScroll').scroll({
	        	 indicators: false, //是否显示滚动条
				 deceleration:0.0005, //阻尼系数,系数越小滑动越灵敏
				 bounce: false, //是否启用回弹
	        });
	        mui('.mui-scroll-wrapper').on('tap','a' ,function(){location.href = this.getAttribute('href')});
	   	},
		methods:{
			disconnect(){
				console.log('data')
				this.socket.disconnect();
			}
		}
	}
</script>

<style>
</style>