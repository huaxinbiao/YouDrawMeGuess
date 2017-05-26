<template>
	<div id="offCanvasContentScroll" class="mui-content mui-scroll-wrapper">
		<div class="mui-scroll">
	        <div>
	        <img src="">
	        </div>
	    </div>
	</div>
</template>

<script>
import ajax from '@/assets/js/ajax';
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
			
		}
	}
</script>

<style>
</style>