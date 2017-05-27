<template>
	<div class="mui-content mui-scroll-wrapper">
		<div class="mui-scroll">
	        <div class="banner"><img src="../../../assets/images/timg.jpg"></div>
	        <div class="d-box">
	        	<div class="my"><img src="../../../assets/images/default.jpg"></div>
	        	<div class="d-list">
	        		<dl>
	        			<dt><a href="#"><img src="../../../assets/images/default.jpg"></a></dt>
	        			<dd>
	        				<h2><a href="#">昵称</a></h2>
	        				<div>
	        					<p>进度返回更好地方的开发工具</p>
	        					<div>
	        						<img src="../../../../static/img/acfun/13.png">
	        					</div>
	        				</div>
	        				<p>2015-05-16 10:24</p>
	        			</dd>
	        		</dl>
	        		<dl>
	        			<dt><a href="#"><img src="../../../assets/images/default.jpg"></a></dt>
	        			<dd>
	        				<h2><a href="#">昵称</a></h2>
	        				<div>
	        					<p>进度返回更好地方的开发工具</p>
	        					<div>
	        						<img src="../../../../static/img/acfun/1.png">
	        						<img src="../../../../static/img/acfun/2.png">
	        					</div>
	        				</div>
	        				<p>2015-05-16 10:24</p>
	        			</dd>
	        		</dl>
	        		<dl>
	        			<dt><a href="#"><img src="../../../assets/images/default.jpg"></a></dt>
	        			<dd>
	        				<h2><a href="#">昵称</a></h2>
	        				<div>
	        					<div>
	        						<img src="../../../../static/img/acfun/1.png">
	        						<img src="../../../../static/img/acfun/2.png">
	        						<img src="../../../../static/img/acfun/1.png">
	        					</div>
	        				</div>
	        				<p>2015-05-16 10:24</p>
	        			</dd>
	        		</dl>
	        		<dl>
	        			<dt><a href="#"><img src="../../../assets/images/default.jpg"></a></dt>
	        			<dd>
	        				<h2><a href="#">昵称</a></h2>
	        				<div>
	        					<div>
	        						<img src="../../../../static/img/acfun/1.png">
	        						<img src="../../../../static/img/acfun/2.png">
	        						<img src="../../../../static/img/acfun/1.png">
	        						<img src="../../../../static/img/acfun/3.png">
	        					</div>
	        				</div>
	        				<p>2015-05-16 10:24</p>
	        			</dd>
	        		</dl>
	        	</div>
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
	.banner{
		overflow: hidden;
		img{
			display: block;
			width: 100%;
		}
	}
	.d-box{
		position: relative;
		&:after{
			content: " ";
			display: block;
			width: 0;
			height: 0;
			clear: both;
		}
		.my{
			position: absolute;
			width: 80px;
			height: 80px;
			top: -40px;
			right: 20px;
			border-radius: 50%;
			overflow: hidden;
			img{
				display: block;
				width: 100%;
			}
		}
		.d-list{
			padding: 70px 10px 50px;
			dl{
				overflow: hidden;
				dt{
					float: left;
					overflow: hidden;
					width: 38px;
					border-radius: 50%;
					border: #F1F1F1 1px solid;
					img{
						display: block;
						width: 100%;
					}
				}
				dd{
					padding-left: 50px;
					h2{
						line-height: 40px;
						font-size: 16px;
						a{
							color: #cd3d3d;
						}
					}
					>div{
						>p{
							line-height: 24px;
							color: #333;
						}
						>div{
							margin-bottom: 15px;
							overflow: hidden;
							img{
								display: block;
								float: left;
								margin-top: 10px;
								margin-right: 10px;
								width: 30%;
							}
						}
					}
					>p{
						margin-bottom: 25px;
						color: #999;
						line-height: 24px;
						>span{
							float: right;
							font-size: 12px;
							margin-left: 20px;
							i{
								font-size: 20px;
								vertical-align: middle;
							}
						}
					}
				}
			}
		}
	}
</style>