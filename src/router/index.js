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
                path: '/formdesign',
                meta: {title: '表单管理'},
                component: empty,
                children: [
                    {
                        path: '/formdesign/list',
                        meta: {title: '表单管理'},
                        component: () => import('../views/formdesign/list.vue')
                    },{
                        path: '/formdesign/formdesign',
                        meta: {title: '表单设计'},
                        component: () => import('../views/formdesign/formdesign.vue')
                    },{
                        path: '/formdesign/showfrom/:fromid/:key',
                        meta: {title: '表单显示'},
                        hidden: true,
                        component: () => import('../views/formdesign/showfrom.vue')
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
