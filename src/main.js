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
import  { fetchPost, fetchGet, fetDelect, fetchPostJson }  from  './http.js'


Vue.use(Vant);
Vue.use(Overlay);
Vue.use(ElementUI)
Vue.use(less)
Vue.prototype.fetchPost  =  fetchPost
Vue.prototype.fetchGet  =  fetchGet
Vue.prototype.fetchPostJson  =  fetchPostJson
Vue.prototype.fetDelect = fetDelect
    /* eslint-disable no-new */
    //  路由判断登录 根据路由配置文件的参数

new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})