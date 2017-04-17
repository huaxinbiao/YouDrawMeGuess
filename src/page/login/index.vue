<template>
	<div id="Login">
		<div class="login-reg">
			<div>
				<router-link to="/signin">登录</router-link>
				<router-link to="/register">注册</router-link>
			</div>
		</div>
    </div>
</template>

<script>
	export default {
	  	data () {
	      	return {
		        transitionName: 'slide-left'
	      	}
		},
		watch: {
		    '$route' (to, from) {
		      const toDepth = to.path.split('/').length
		      const fromDepth = from.path.split('/').length
		      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
		    }
	  	}
	}
</script>

<style lang="less">
@import "../../assets/css/login.less";
</style>