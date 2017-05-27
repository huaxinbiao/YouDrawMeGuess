<template>
	<div>
		<header class="mui-bar mui-bar-nav">
		    <a class="mui-icon mui-icon-arrowleft Hui-icon-left" v-on:tap="back()"></a>
		    <h1 class="mui-title Hui-title">个人信息</h1>
		</header>
		<div class="info">
			<ul class="mui-table-view">
				<li class="mui-table-view-cell">
					<a id="head" class="mui-navigate-right">
						头像
						<span class="mui-pull-right head">
							<input type="file" accept="image/*" />
							<img class="head-img mui-action-preview" id="head-img1" :src="user && user.head ? user.head : head">
						</span>
					</a>
				</li>
				<li class="mui-table-view-cell">
					<router-link :to="{ name: 'SetInfo', params: {type: 'nick'}}" class="mui-navigate-right">昵称<span class="mui-pull-right">{{user?user.nick:'袖手旁观'}}</span></router-link>
				</li>
				<li class="mui-table-view-cell">
					<a class="mui-navigate-right">个性签名<span class="mui-pull-right">好</span></a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
	  	data () {
	      	return {
				user: this.$store.getters.getuser, //获取用户信息
				head: require('../../assets/images/default.jpg')
	      	}
		},
	  	methods:{
	  		back(){
				this.$router.go(-1);
	  		},
	  		ready(){
	  			//console.log(this.roomDetails)
	  		}
	  	},
	}
</script>

<style lang="less" scoped>
.info{
	padding-top: 54px;
	span.head{
		position: relative;
		padding-right: 15px;
		input{
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			opacity: 0;
		}
		img{
			width: 50px;
			height: 50px;
			display: block;
		}
	}
	.mui-table-view-cell:first-child{
		line-height: 50px;
	}
	.mui-table-view-cell{
		line-height: 30px;
		span{
			padding-right: 15px;
		}
	}
}
</style>