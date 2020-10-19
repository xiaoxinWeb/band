// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/base.css'
import './assets/css/animite.css'
import './assets/css/mediaBase.css'
import less from 'less'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vant from 'vant';
import { Overlay } from 'vant';
import 'babel-polyfill';
import 'vant/lib/index.css';
import { fetchPost, fetchGet, fetDelect, fetchPostJson } from './http.js'


Vue.use(Vant);
Vue.use(Overlay);
Vue.use(ElementUI)
Vue.use(less)
Vue.prototype.fetchPost = fetchPost
Vue.prototype.fetchGet = fetchGet
Vue.prototype.fetchPostJson = fetchPostJson
Vue.prototype.fetDelect = fetDelect
/* eslint-disable no-new */
//  路由判断登录 根据路由配置文件的参数
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    //这里判断用户是否登录，验证本地存储是否有token
    if (!localStorage.getItem("tokenlo")) { // 判断当前的token是否存在
      if (to.path == '/login') { //如果是登录页面路径，就直接next()
        next();
      } else { //不然就跳转到登录；
        next('/login');
      }
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})