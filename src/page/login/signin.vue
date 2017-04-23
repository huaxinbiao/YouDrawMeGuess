<template>
	<div class="login">
		<h2>登录</h2>
		<div>
			<input v-model="mobile" v-validate="'required|mobile'" data-vv-as="手机号" type="tel" name="mobile" required="required" placeholder="输入手机号码" />
			<input v-model="password" v-validate="'required|min:6|max:12'" data-vv-as="密码" name="password" type="password" required="required" placeholder="输入密码" />
			<input type="button" value="登陆" v-on:tap="validate" />
		</div>
		<p>
			<a href="javascript:;"></a>
			<router-link to="/register">去注册</router-link>
		</p>
	</div>
</template>

<script>
import ajax from '@/assets/js/ajax';
	export default {
		data(){
			return {
				mobile: '',
				password: ''
			}
		},
		mounted(){
			
		},
		methods:{
			validate(){
				var that = this;
				this.$validator.validateAll({
	                mobile: this.mobile,
	                password: this.password
	            }).then(() => {
				  	// success stuff
					ajax(this, '/login', 'post', {
						mobile: this.mobile,
		                password: this.password
					}, function(vm, res){
					  	if(res.code == 200){
					  		mui.toast('登录成功');
					  		localStorage.setItem('user', JSON.stringify(res.data));
					  		that.socket.connect(global.IO);
					  		vm.$router.push('/index');
					  	}else{
					  		mui.toast('账户或密码错误');
					  	}
					})
				}).catch(() => {
				  	// validation failed stuff
				  	//console.log(this.errors.all())
				  	//console.log(this.errors.all())
				  	mui.toast(this.errors.all()[0])
				});;
			}
		}
	}
</script>

<style scoped lang="less">
@import "../../assets/css/login.less";
</style>