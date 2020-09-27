import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    routes: [{
            path: '/',
            name: 'login',
            component: () =>
                import ('../components/login.vue'),
            meta: { title: "管理系统" }
        },
        {
            path: '/home',
            name: 'home',
            component: resolve =>
                require(['../components/home.vue'], resolve),
            meta: { title: '首页' },
            children: [{
                    path: '/my',
                    name: 'my',
                    component: resolve =>
                        require(['../views/my/my.vue'], resolve),
                    meta: { title: "我的银行" }
                },
                {
                    path: '/staff',
                    name: 'staff',
                    component: resolve =>
                        require(['../views/staff/staff.vue'], resolve),
                    meta: { title: "添加页面" }
                },
                {
                    path: '/add',
                    name: 'add',
                    component: resolve =>
                        require(['../views/add/add.vue'], resolve),
                    meta: { title: "添加页面" }
                },
                {
                    path: '/channel',
                    name: 'channel',
                    component: resolve =>
                        require(['../views/channel/channel.vue'], resolve),
                    meta: { title: "渠道" }
                },

            ]
        }
    ]
})
router.beforeEach((to, from, next) => {
    window.document.title = to.meta.title == undefined ? '后台管理系统' : to.meta.title;
    next();
})
export default router