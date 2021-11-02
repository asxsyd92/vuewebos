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
                        path: '/formdesign/formdesign/:key',
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
                path: '/webinfo',
                meta: {title: '网站服务'},
                component: empty,
                 children: [
                    {
                        path: '/webinfo/list',
                        meta: {title: '信息服务'},
                        component: () => import('../views/webinfo/list.vue')
                    }
                ]
            }, 
            {
                path: '/users',
                meta: {title: '用户管理'},
                component: empty,
                 children: [
                    {
                        path: '/users/list',
                        meta: {title: '用户管理'},
                        component: () => import('../views/users/list.vue')
                    }
                ]
            }, 
               {
                path: '/sys',
                meta: {title: '系统设置'},
                component: empty,
                 children: [
                    {
                        path: '/sys/menu',
                        meta: {title: '菜单管理'},
                        component: () => import('../views/sys/menu.vue')
                    },    {
                        path: '/sys/dictionary',
                        meta: {title: '数据字典'},
                        component: () => import('../views/sys/dictionary.vue')
                    },    {
                        path: '/sys/role',
                        meta: {title: '数据字典'},
                        component: () => import('../views/sys/role.vue')
                    },    {
                        path: '/sys/log',
                        meta: {title: '日志管理'},
                        component: () => import('../views/sys/log.vue')
                    }
                ]
            },    {
                path: '/oa',
                meta: {title: '办公系统'},
                component: empty,
                 children: [
                    {
                        path: '/oa/wait',
                        meta: {title: '待办事项'},
                        component: () => import('../views/oa/wait.vue')
                    },  {
                        path: '/oa/completed',
                        meta: {title: '已办事项'},
                        component: () => import('../views/oa/completed.vue')
                    }
                ]
            },    {
                path: '/workflow',
                meta: {title: '流程设计'},
                component: empty,
                 children: [
                    {
                        path: '/workflow/list',
                        meta: {title: '流程列表'},
                        component: () => import('../views/workflow/list.vue')
                    },  {
                        path: '/workflow/designer',
                        meta: {title: '设计'},
                        component: () => import('../views/workflow/designer.vue')
                    }
                ]
            },
            
            {
                path: '/common/querylist',
                meta: {title: '公共列表'},
                component: () => import('../views/common/querylist.vue')
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
