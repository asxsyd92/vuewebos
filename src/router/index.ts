import BaseLayout from '../layouts/BaseLayout.vue';

import { createRouter, createWebHashHistory,createWebHistory } from 'vue-router'

export const inRoutes =[
  {
    path: '/',
    redirect: '/console',
    component: BaseLayout,
    meta: { title: '工作空间' },
    children: [
      {
        path: '/analysis',
        component: () => import('../views/Analysis/index.vue'),
        meta: { title: '分析页' },
      },
      {
        path: '/console',
        component: () => import('../views/Console/index.vue'),
        meta: { title: '控制台' },
      }
    ]
  },
  {
    path: '/error',
    component: BaseLayout,
    meta: { title: '错误页面' },
    children: [
      {
        path: '/error/401',
        component: () => import('../views/Error/401.vue'),
        meta: { title: '401' },
      },
      {
        path: '/error/403',
        component: () => import('../views/Error/403.vue'),
        meta: { title: '403' },
      },
      {
        path: '/error/404',
        component: () => import('../views/Error/404.vue'),
        meta: { title: '404' },
      },
      {
        path: '/error/500',
        component: () => import('../views/Error/500.vue'),
        meta: { title: '500' },
      }
    ]
  }, {
    path: '/formdesign',
    meta: { title: '表单管理' },
    component: BaseLayout,
    children: [
        {
            path: '/formdesign/list',
            meta: { title: '表单管理' },
            component: () => import('../views/form/list.vue')
        }, {
            path: '/formdesign/index',
            meta: { title: '表单设计' },
            component: () => import('../views/form/design/index.vue')
        }, {
            path: '/formdesign/submitfrom',
            meta: { title: '新增→编辑详情' },
            hidden: true,
            component: () => import('../views/form/submitfrom.vue')
        },
    ],
},{
    path: '/sys',
    component: BaseLayout,
    meta: { title: '系统管理' },
    children: [
      {
        path: '/sys/log',
        component: () => import('../views/sys/log/log.vue'),
        meta: { title: '日志管理' },
      },
      {
        path: '/sys/dictionary',
        component: () => import('../views/sys/dictionary.vue'),
        meta: { title: '数据字典' },
      }
      ,
      {
        path: '/sys/menu',
        component: () => import('../views/sys/menu.vue'),
        meta: { title: '菜单管理' },
      }
      ,
      {
        path: '/sys/role',
        component: () => import('../views/sys/role.vue'),
        meta: { title: '角色管理' },
      }
    ]
  },{
    
    path: '/webinfo',
    component: BaseLayout,
    meta: { title: '网站管理' },
    children: [
      {
        path: '/webinfo/list',
        component: () => import('../views/webinfo/list.vue'),
        meta: { title: '网站管理' },
      }
    ]
  },{  
      path: '/oa',
  component: BaseLayout,
  meta: { title: 'oa' },
  children: [
    {
      path: '/oa/wait',
      component: () => import('../views/oa/wait.vue'),
      meta: { title: '待办事项' },
    },
    {
      path: '/oa/completed',
      component: () => import('../views/oa/completed.vue'),
      meta: { title: '已办事项' },
    },
    {
      path: '/oa/workrun/index',
      component: () => import('../views/oa/workrun/index.vue'),
      meta: { title: '处理' },
    },
  ]

  },{
    path: '/result',
    component: BaseLayout,
    meta: { title: '错误页面' },
    children: [
      {
        path: '/result/success',
        component: () => import('../views/Result/success.vue'),
        meta: { title: '成功页面' },
      },
      {
        path: '/result/failure',
        component: () => import('../views/Result/failure.vue'),
        meta: { title: '失败页面' },
      },
    ]
  }
]

export const outRoute = [
  {
      path: '/login',
      name: 'Login',
      meta: { noRequireAuth: true },
      component: () => import( '../views/login/login.vue')
  }
];

const routes = [...inRoutes, ...outRoute]



const router = createRouter({
  // 使用 hash 模式构建路由（ url中带 # 号的那种)
  //history: createWebHashHistory(),
  // 使用 history 模式构建路由 （ url 中没有 # 号，但生产环境需要特殊配置）
  history:createWebHistory(),
  routes
})

export default router