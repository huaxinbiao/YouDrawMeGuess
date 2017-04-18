// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './assets/js/config'

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

Vue.config.productionTip = false

//连接socket
Vue.prototype.socket = io.connect('http://localhost:3000/');

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
