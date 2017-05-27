<template>
	<div>
		<header class="mui-bar mui-bar-nav">
		    <a class="mui-icon mui-icon-arrowleft Hui-icon-left" v-on:tap="back()"></a>
         	<span class="mui-btn-link mui-pull-right Hui-bar-right">保存</span>
		    <h1 class="mui-title Hui-title">填写信息</h1>
		</header>
		<div style="padding-top: 60px;">
			<div style="margin: 0 10px;">
				<input type="text" placeholder="请输入">
			</div>
		</div>
	</div>
</template>

<script>
	export default {
	  	data () {
	      	return {
				
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
</style>