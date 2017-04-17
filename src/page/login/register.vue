<template>
	<div class="login">
		<h2>注册</h2>
		<div>
			<input type="tel" required="required" placeholder="输入手机号" />
			<div>
				<input type="number" placeholder="输入验证码" />
				<a href="javascript:;" style="padding: 0;margin-top: 0;"><img src="http://localhost:3000/code"></a>
			</div>
			<input type="password" placeholder="设置密码" />
			<input type="button" value="注册" />
		</div>
		<p>
			<a href="javascript:;"></a>
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