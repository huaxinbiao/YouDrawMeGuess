<template>
	<aside id="offCanvasSide" class="mui-off-canvas-left">
		<div id="offCanvasSideScroll" class="mui-scroll-wrapper">
			<div class="mui-scroll" style="height:100%;">
				<div class="content Hui-leftTop">
			        <div><img src="../assets/images/default.jpg"><span>袖手旁观</span></div>
			        <div><a href="javascript:;">签到</a></div>
				</div>
				<ul class="Hui-leftCon">
					<li>
						<a href="javascript:;"><i class="mui-icon mui-icon-image"></i>动态</a>
					</li>
					<li>
						<a href="javascript:;"><i class="mui-icon mui-icon-flag"></i>战绩</a>
					</li>
					<li>
						<a href="javascript:;"><i class="mui-icon mui-icon-info"></i>反馈</a>
					</li>
				</ul>
				<div class="Hui-leftBtn">
			        <a href="#">设置</a>
			        <a href="javascript:;" v-on:tap="outlogin">退出登录</a>
			    </div>
			</div>
		</div>
	</aside>
</template>

<script>
	export default{
		methods:{
			outlogin(){
		  		this.$http.get(global.API + '/outlogin',{
					credentials: true
				}).then((response) => {
					let res = response.data;
				  	/*if(res.code == 200){
				  		mui.toast('退出成功');
						localStorage.clear();
		  				this.$router.push('/login');
				  	}else{
				  		this.getCode();
				  		mui.toast(res.msg);
				  	}*/
				}, (response) => {
					mui.toast('请求失败');
				});
			}
		}
	}
</script>

<style>
</style>