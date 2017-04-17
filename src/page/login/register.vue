<template>
	<div class="login">
		<h2>注册</h2>
		<div>
			<input type="tel" required="required" placeholder="输入手机号" />
			<div>
				<input type="number" placeholder="输入验证码" />
				<a href="javascript:;">获取验证码</a>
			</div>
			<input type="password" placeholder="设置密码" />
			<input type="button" value="注册" />
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