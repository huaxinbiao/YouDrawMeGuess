<template>
	<div>
		<header class="mui-bar mui-bar-nav">
		    <a class="mui-icon mui-icon-arrowleft Hui-icon-left" v-on:tap="back()"></a>
         	<span class="mui-btn-link mui-pull-right Hui-bar-right" v-on:tap="hold()">保存</span>
		    <h1 class="mui-title Hui-title">填写信息</h1>
		</header>
		<div style="padding-top: 60px;">
			<div style="margin: 0 10px;">
				<input v-model="value" v-validate="'required|min:1|max:20'" data-vv-as="内容" name="value" type="text" placeholder="请输入">
			</div>
		</div>
	</div>
</template>

<script>
import ajax from '@/assets/js/ajax';
	export default {
	  	data () {
	      	return {
				type: null,
				value: ''
	      	}
		},
	  	methods:{
	  		back(){
				this.$router.go(-1);
	  		},
	  		hold(){
	  			this.$validator.validateAll({
	                value: this.value
	            }).then(() => {
					ajax(this, '/user/setinfo', 'post', {
						value: this.value,
		                type: this.type
					}, function(vm, res){
					  	if(res.code == 200){
					  		mui.toast('修改成功');
	    					vm.$store.commit('setuser', res.data);
					  		vm.$router.go(-1);
					  	}else{
					  		mui.toast(res.msg);
					  	}
					})
				}).catch(() => {
				  	// validation failed stuff
				  	//console.log(this.errors.all())
				  	//console.log(this.errors.all())
				  	mui.toast(this.errors.all()[0])
				});
	  		}
	  	},
	  	beforeRouteEnter (to, from, next) {
	  		if(!to.params.type){
	  			return next('/index')
	  		};
	  		next(function(vm){
		  		vm.type = to.params.type;
	  		})
	  	}
	}
</script>

<style lang="less" scoped>
</style>