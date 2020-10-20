import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    mode: 'hash',
    routes: [{
            path: "*",
            redirect: "/404"
        },
        {
            path: '/404',
            component: () =>
                import ('../components/404.vue'),

            meta: { title: "404页面" }
        },
        {
            path: '/',
            name: 'login',
            component: () =>
                import ('../components/login.vue'),

            meta: { title: "管理系统" }
        }, {
            path: '/login',
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
            meta: { title: '首页', requireAuth: true },
            children: [{
                    path: '/my',
                    name: 'my',
                    component: resolve =>
                        require(['../views/my/my.vue'], resolve),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/staff',
                    name: 'staff',
                    component: resolve =>
                        require(['../views/staff/staff.vue'], resolve),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/add',
                    name: 'add',
                    component: resolve =>
                        require(['../views/add/add.vue'], resolve),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/channel',
                    name: 'channel',
                    component: resolve =>
                        require(['../views/channel/channel.vue'], resolve),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/add_channel',
                    name: 'add_channel',
                    component: resolve =>
                        require(['../views/add_channel/add_channel.vue'], resolve),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/bank',
                    name: 'bank',
                    component: resolve =>
                        require(['../views/bank/bank.vue'], resolve),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/my_bank',
                    name: 'my_bank',
                    component: resolve =>
                        require(['../views/my_bank/my_bank.vue'], resolve),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/see',
                    name: 'see',
                    component: resolve =>
                        require(['../views/see/see.vue'], resolve),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/bank_list',
                    name: 'bank_list',
                    component: resolve =>
                        require(['../views/bank_list/bank_list.vue'], resolve),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/Inquiry',
                    name: 'Inquiry',
                    component: resolve =>
                        require(['../views/Inquiry/Inquiry.vue'], resolve),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/see_my',
                    name: 'see_my',
                    component: resolve =>
                        require(['../views/see_my/see_my.vue'], resolve),
                    meta: { requiresAuth: true }
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