import { createRouter, createWebHistory } from "vue-router"
import Home from "./pages/index/home";
import Index from "./pages/index"

// 由router控路由 home组件是一个基本组件  index是main主题内容
const routerHistory = createWebHistory()
export default createRouter({
    history: routerHistory,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            redirect: '/index.html',
            children: [
                {
                    path: "/index.html",
                    name: "index",
                    component: Index
                }, {
                    path: '/search',
                    props: route => ({query: route.query}),
                    name: 'search',
                    component: () => import('./pages/index/search.vue')
                }, {
                    path: '/product/:id',
                    name: 'product',
                    component: () => import('./pages/index/product.vue')
                }, {
                    path: '/brand/:id',
                    name: 'brand',
                    component: () => import('./pages/index/brand.vue')
                }, {
                    path: '/activity/:id',
                    name: 'activity',
                    component: () => import('./pages/index/activity.vue')
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('./pages/login.vue')
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('./pages/register.vue')
        },
        {
            path: '/user',
            name: 'user',
            component: () => import('./pages/user/index'),
            redirect: '/orderList',
            children: [
                {
                    path: "/orderList",
                    name: "order",
                    component: () => import('./pages/user/order.vue')
                }, {
                    path: '/profile',
                    name: 'profile',
                    component: () => import('./pages/user/profile.vue')
                }, {
                    path: '/address',
                    name: 'address',
                    component: () => import('./pages/user/address.vue')
                }, {
                    path: '/message',
                    name: 'message',
                    component: () => import('./pages/user/message.vue')
                },
                {
                    path: '/orderDetail',
                    name: 'orderDetail',
                    component: () => import('./pages/user/OrderDetail.vue')
                },
                {
                    path: '/rate',
                    name: 'rate',
                    component: () => import('./pages/user/rate.vue')
                },
                {
                    path: '/service',
                    name: 'service',
                    component: () => import('./pages/user/service.vue')
                },
                {
                    path: '/collect',
                    name: 'collect',
                    component: () => import('./pages/user/collect.vue')
                },
                {
                    path: '/history',
                    name: 'history',
                    component: () => import('./pages/user/history.vue')
                },
                {
                    path: '/sign',
                    name: 'sign',
                    component: () => import('./pages/user/sign.vue')
                }
            ]
        },
        {
            path: '/my',
            name: 'my',
            component: () => import('./pages/my/index'),
            redirect: '/cart',
            children: [
                {
                    path: "/cart",
                    name: "cart",
                    component: () => import('./pages/my/cart.vue')
                }, {
                    path: '/confirm',
                    name: 'confirm',
                    component: () => import('./pages/my/confirm.vue')
                }, {
                    path: '/pay',
                    name: 'pay',
                    component: () => import('./pages/my/pay.vue')
                }
            ]
        },
        {
            path: '/question',
            name: 'question',
            component: () => import('./pages/question/question.vue'),
            redirect: '/security',
            children: [
                {
                    path: "/security",
                    name: "security",
                    component: () => import('./pages/question/security.vue')
                }, {
                    path: '/guide',
                    name: 'guide',
                    component: () => import('./pages/question/guide')
                }, {
                    path: '/service',
                    name: 'service',
                    component: () => import('./pages/question/service.vue')
                }, {
                    path: '/express',
                    name: 'express',
                    component: () => import('./pages/question/express.vue')
                }, {
                    path: '/about',
                    name: 'about',
                    component: () => import('./pages/question/about.vue')
                }

            ]
        },
    ]
})
