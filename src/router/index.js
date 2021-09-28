import Vue from 'vue'
import VueRouter from 'vue-router'
import custom from '../layout/default'
import empty from "../layout/empty";

Vue.use(VueRouter)

export const inRoutes = [
    {
        path: '/',
        name: 'layout',
        component: custom,
        children: [
            {
                path: '/',
                meta: {title: '首页'},
                component: () => import('../views/Home.vue')
            },
            {
                path: '/column',
                meta: {title: '一级栏目'},
                component: empty,
                children: [
                    {
                        path: '/column/about',
                        meta: {title: '关于我们'},
                        component: () => import('../views/About.vue')
                    },{
                        path: '/column/list',
                        meta: {title: '列表我们'},
                        component: () => import('../views/List.vue')
                    },{
                        path: '/column/new',
                        meta: {title: '新tab页面'},
                        hidden: true,
                        component: () => import('../views/New.vue')
                    },
                ],
            },
            {
                path: '/content',
                meta: {title: '联系我们'},
                component: () => import('../views/Content.vue')
            }
        ],
    },
]

export const outRoute = [
    {
        path: '/login',
        name: 'Login',
        meta: {noRequireAuth:true},
        component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
    }
];
const routes = [...inRoutes, ...outRoute]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
