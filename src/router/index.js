import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    mode: 'hash',
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
                {
                    path: '/add_channel',
                    name: 'add_channel',
                    component: resolve =>
                        require(['../views/add_channel/add_channel.vue'], resolve),
                    meta: { title: "添加渠道" }
                },
                {
                    path: '/bank',
                    name: 'bank',
                    component: resolve =>
                        require(['../views/bank/bank.vue'], resolve),
                    meta: { title: "添加银行" }
                },
                {
                    path: '/my_bank',
                    name: 'my_bank',
                    component: resolve =>
                        require(['../views/my_bank/my_bank.vue'], resolve),
                    meta: { title: "添加银行" }
                },
                {
                    path: '/see',
                    name: 'see',
                    component: resolve =>
                        require(['../views/see/see.vue'], resolve),
                    meta: { title: "查看" }
                },
                {
                    path: '/bank_list',
                    name: 'bank_list',
                    component: resolve =>
                        require(['../views/bank_list/bank_list.vue'], resolve),
                    meta: { title: "银行列表" }
                },
                {
                    path: '/Inquiry',
                    name: 'Inquiry',
                    component: resolve =>
                        require(['../views/Inquiry/Inquiry.vue'], resolve),
                    meta: { title: "询单" }
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