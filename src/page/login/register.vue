<template>
	<div class="login">
		<h2>注册</h2>
		<div>
			<input v-model="mobile" v-validate="'required|mobile'" data-vv-as="手机号" type="tel" name="mobile" required="required" placeholder="输入手机号" />
			<div>
				<input v-model="code" v-validate="'required|alpha_num|min:4|max:4'" data-vv-as="验证码" name="code" type="text" required="required" placeholder="输入验证码" />
				<a href="javascript:;" style="padding: 0;margin-top: 0;"><img :src="codeUrl" v-on:tap="getCode()"></a>
			</div>
			<input v-model="password" v-validate="'required|min:6|max:12'" data-vv-as="密码" name="password" type="password" required="required" placeholder="设置密码" />
			<input type="button" value="注册" v-on:tap="validate" />
		</div>
		<p>
			<a href="javascript:;"></a>
			<router-link to="/signin">去登录</router-link>
		</p>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				codeUrl: global.API + '/code',
				code: '',
				mobile: '',
				password: ''
			}
		},
		mounted(){
			
		},
		methods:{
			getCode(){
				let num = Math.random()*100;
				this.codeUrl = global.API + '/code?'+num;
			},
			validate(){
				this.$validator.validateAll({
	                mobile: this.mobile,
	                code: this.code,
	                password: this.password
	            }).then(() => {
				  	// success stuff
				  	mui.post( global.API + '/reg',{
					  	mobile: this.mobile,
		                code: this.code,
		                password: this.password
				  	},function(res){
					  	console.log(res);
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

<style lang="less">
@import "../../assets/css/login.less";
</style>