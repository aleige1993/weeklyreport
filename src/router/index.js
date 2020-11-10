import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [{
        path: '/',
        name: 'login',
        redirect: '/layout',
        component: () =>
            import ('@/views/login')
    },
    {
        path: '/layout',
        name: 'layout',
        redirect: '/layout/historyPort',
        component: () =>
            import ('@/views/index'),
        children: [{
                path: 'historyPort',
                name: 'historyPort',
                meta: { title: '历史周报' },
                component: () =>
                    import ('@/views/weekport/historyPort')
            },
            {
                path: 'weekReview',
                name: 'weekReview',
                meta: { title: '团队周报批复', hd: 'soso' },
                component: () =>
                    import ('@/views/weekport/weekReview')
            },
            {
                path: 'weeksoso',
                name: 'weeksoso',
                meta: { title: '团队周报批复 - 搜索' },
                component: () =>
                    import ('@/views/weekport/weeksoso')
            },
            {
                path: 'weekfill',
                name: 'weekfill',
                meta: { title: '填写周报' },
                component: () =>
                    import ('@/views/weekport/weekFill')
            },
            {
                path: 'weekCheck',
                name: 'weekCheck',
                meta: { title: '查看周报' },
                component: () =>
                    import ('@/views/weekport/weekCheck')
            },
            {
                path: 'portDetail',
                name: 'portDetail',
                meta: { title: '工作总结 - 填写' },
                component: () =>
                    import ('@/views/weekport/portDetail')
            },
            {
                path: 'portDetail2',
                name: 'portDetail2',
                meta: { title: '存在问题' },
                component: () =>
                    import ('@/views/weekport/portDetail2')
            },
            {
                path: 'portDetail3',
                name: 'portDetail3',
                meta: { title: '下周计划 -填写' },
                component: () =>
                    import ('@/views/weekport/portDetail3')
            }
        ]
    },
    // {
    //     path: '/agreement', name: 'agreement', component: resolve => { require(['@/pages/page-agreement'], resolve)},
    //     children: [
    //       // 注册
    //       { path: 'register', name: 'agreementRegister', meta: {title: '注册协议'}, component: resolve => { require(['@/pages/page-agreement/register'], resolve)} },
    //       // 征信授权书
    //       { path: 'protocol', name: 'agreementProtocol', meta: {title: '征信授权协议'}, component: resolve => { require(['@/pages/page-agreement/protocol'], resolve)} },
    //       // 支付
    //       { path: 'payment', name: 'agreementPayment', meta: {title: '支付协议'}, component: resolve => { require(['@/pages/page-agreement/payment'], resolve)} }
    //     ]
    //   },
    // {
    //   path: '/about',
    //   name: 'About',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    // }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router