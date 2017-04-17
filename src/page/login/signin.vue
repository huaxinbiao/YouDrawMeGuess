<template>
	<div class="login">
		<h2>登录</h2>
		<div>
			<input type="tel" required="required" placeholder="输入手机号码" />
			<input type="password" placeholder="输入密码" />
			<input type="button" value="登陆" />
		</div>
		<p>
			<router-link to="/register">去注册</router-link>
			<router-link to="/signin">去登录</router-link>
		</p>
	</div>
</template>

<script>
	export default {
	}
</script>

<style lang="less">
@import "../../assets/css/login.less";
</style>