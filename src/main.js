// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import router from './router/router.config';
import fastclick from 'fastclick';
import './common/stylus/index.styl';
// body下的元素点击没有300ms的延迟
fastclick.attach(document.body);
/* eslint-disable no-new */
Vue.use(router);
new Vue({
  router,
  el: '#app',
  render: h => h(App)
});
