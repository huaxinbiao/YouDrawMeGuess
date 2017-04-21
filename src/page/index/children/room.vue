<template>
	<div id="room" class="mui-content mui-scroll-wrapper">
		<div class="mui-scroll">
            <div class="Hui-roombar">
                <a href="javascript:;">快速开始</a>
            </div>
            <div class="Hui-roomcon">
                <dl>
                	<dt>
                		<span><img src="../../../assets/images/default.jpg"></span>
                		<span><img src="../../../assets/images/default.jpg"></span>
                		<span><img src="../../../assets/images/default.jpg"></span>
                		<span><img src="../../../assets/images/default.jpg"></span>
                		<span><img src="../../../assets/images/default.jpg"></span>
                		<span><img src="../../../assets/images/default.jpg"></span>
                		<span><img src="../../../assets/images/default.jpg"></span>
                		<span><img src="../../../assets/images/default.jpg"></span>
                		<span><img src="../../../assets/images/default.jpg"></span>
                	</dt>
                	<dd>
                		<div>
                			<h3 class="ellipsis">这是一个房间的名字</h3>
                			<p>你个就是摆摆样子。。。</p>
                		</div>
                		<div>
                			<span>等待中 0/10</span>
                			<i>你画我猜</i>
                		</div>
                	</dd>
                </dl>
                <dl>
                	<dt>
                		<span><img src="../../../assets/images/default.jpg"></span>
                		<span><img src="../../../assets/images/default.jpg"></span>
                		<span><img src="../../../assets/images/default.jpg"></span>
                		<span><img src="../../../assets/images/default.jpg"></span>
                		<span><img src="../../../assets/images/default.jpg"></span>
                		<span><img src="../../../assets/images/default.jpg"></span>
                		<span><img src="../../../assets/images/default.jpg"></span>
                		<span><img src="../../../assets/images/default.jpg"></span>
                		<span><img src="../../../assets/images/default.jpg"></span>
                	</dt>
                	<dd>
                		<div>
                			<h3 class="ellipsis">这是一个房间的名字</h3>
                			<p>你个就是摆摆样子。。。来个加长的.....</p>
                		</div>
                		<div>
                			<span>等待中 0/10</span>
                			<i>你画我猜</i>
                		</div>
                	</dd>
                </dl>
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
	        mui('.mui-scroll-wrapper').on('tap','a' ,function(){location.href = this.getAttribute('href')})
	   	},
		methods:{
		}
	}
</script>

<style>
</style>