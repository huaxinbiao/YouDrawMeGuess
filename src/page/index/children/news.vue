<template>
	<div class="mui-content mui-scroll-wrapper">
		<div class="mui-scroll">
	        <div id="news-list">
	        	<dl>
	        		<dt>
                		<img src="../../../assets/images/default.jpg">
                	</dt>
                	<dd>
                		<h3 class="ellipsis">你是谁<span>2017-05-24</span></h3>
                		<p class="ellipsis">最后消息你个就是摆摆样子。。。</p>
                	</dd>
	        	</dl>
	        	<dl>
	        		<dt>
                		<img src="../../../assets/images/default.jpg">
                	</dt>
                	<dd>
                		<h3 class="ellipsis">你是谁<span>2017-05-24 09:18</span></h3>
                		<p class="ellipsis">最后消息你个就是摆摆样子。。。</p>
                	</dd>
	        	</dl>
	        	<dl>
	        		<dt>
                		<img src="../../../assets/images/default.jpg">
                	</dt>
                	<dd>
                		<h3 class="ellipsis">你是谁<span>09:18</span></h3>
                		<p class="ellipsis">最后消息你个就是摆摆样子。。。</p>
                	</dd>
	        	</dl>
	        	<dl>
	        		<dt>
                		<img src="../../../assets/images/default.jpg">
                	</dt>
                	<dd>
                		<h3 class="ellipsis">你是谁<span>09:18</span></h3>
                		<p class="ellipsis">最后消息你个就是摆摆样子。。。</p>
                	</dd>
	        	</dl>
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
	    	//主界面和侧滑菜单界面均支持区域滚动;
	        mui('.mui-scroll-wrapper').scroll({
	        	 indicators: false, //是否显示滚动条
				 deceleration:0.0005, //阻尼系数,系数越小滑动越灵敏
				 bounce: true, //是否启用回弹
	        });
        	mui('.mui-scroll-wrapper').on('tap','a' ,function(){location.href = this.getAttribute('href')});
	   	},
		methods:{
			
		}
	}
</script>

<style lang="less" scoped>
	#news-list{
		overflow: hidden;
		dl{
			border-bottom: #E8E8E8 1px solid;
			overflow: hidden;
			dt{
				float: left;
				width: 60px;
				height: 60px;
				margin: 10px;
				img{
					display: block;
					width: 100%;
					border-radius: 5px;
				}
			}
			dd{
				padding-left: 80px;
				padding-right: 10px;
				>h3{
					font-size: 16px;
					line-height: 32px;
					padding-right: 60px;
					margin-top: 10px;
					position: relative;
					>span{
						display: block;
						position: absolute;
						top: 0;
						right: 0;
						font-size: 12px;
					}
				}
				>p{
					font-size: 12px;
					color: #666;
					line-height: 28px;
				}
			}
		}
	}
</style>