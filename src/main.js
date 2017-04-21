// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import './assets/js/config'
import App from './App'
import router from './router'
import store from './store'
import VueResource from 'vue-resource';
import Socket from './assets/js/socket'

import zh_CN from 'vee-validate/dist/locale/zh_CN';
import VeeValidate from 'vee-validate';
//自定义规则
import Validator from './assets/js/customValidate';

//VeeValidate语言包切换,放自定义提示前
Validator.addLocale(zh_CN);

//自定义提示
import Dictionary from './assets/js/dictionaryValidate';
Validator.updateDictionary(Dictionary);


Vue.use(VeeValidate, {
  locale: 'zh_CN',
});

//ajax请求
Vue.use(VueResource);

Vue.config.productionTip = false


/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
//全局监听断线重连
Socket(vm);
