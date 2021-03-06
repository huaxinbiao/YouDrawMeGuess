import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/index/index'
import Home from '@/page/index/children/home'
import Room from '@/page/index/children/room'
import News from '@/page/index/children/news'
import Friends from '@/page/index/children/friends'
import Draw from '@/page/game/draw'
import RoomSet from '@/page/game/roomset'
import Login from '@/page/login/index'
import Signin from '@/page/login/signin'
import Register from '@/page/login/register'
import UserInfo from '@/page/user/userinfo'
import SetInfo from '@/page/user/setinfo'

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      redirect: '/index/home'
    },
    //地址为空时跳转home页面
    {
        path: '',
        redirect: '/index/home'
    },
    {
        path: '/index',
      	component: Index,
      	redirect: '/index/home',
	      children: [
	        {
	          // 主页
	          path: 'home',
	          name: 'home',
	          component: Home
	        },
	        {
	          // 房间
	          path: 'room',
	          name: 'room',
	          component: Room
	        },
	        {
	          // 消息
	          path: 'news',
	          name: 'news',
	          component: News
	        },
	        {
	          // 朋友圈
	          path: 'friends',
	          name: 'friends',
	          component: Friends
	        }
	      ]
    },
    {
    		path: '/draw',
    		name: 'draw',
        component: Draw
    },
    {
    		path: '/roomset',
    		name: 'RoomSet',
        component: RoomSet
    },
    {
    		path: '/login',
    		name: 'Login',
        component: Login
    },
    {
	      // 登录
	      path: '/signin',
    		name: 'Signin',
	      component: Signin
    },
    {
	      // 注册
	      path: '/register',
    		name: 'Register',
	      component: Register
    },
    {
	      // 用户信息
	      path: '/userinfo',
    		name: 'UserInfo',
	      component: UserInfo
    },
  	{
  		// 填写信息
	      path: '/setinfo',
    		name: 'SetInfo',
	      component: SetInfo
  	}
  ]
})
router.beforeEach((to, from, next) => {
	  // 导航钩子，全局钩子
	  var user = localStorage.getItem('user'); //获取登录信息
	  if(!user){
	  		//未登录跳转登录
			  if(to.name != 'Login' && to.name != 'Signin' && to.name != 'Register'){
				  	!!user ? next() : next('/login'); 
			  }else{
			  		next();
			  }
	  }else{
			  if(to.name == 'Login' || to.name == 'Signin' || to.name == 'Register'){
				  	!!user ? next('/index') : next();
			  }else{
			  		next();
			  }
	  }
})


export default router;