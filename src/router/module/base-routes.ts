import BaseLayout from '../../layouts/BaseLayout.vue';
import Login from '../../views/login/index.vue';


export default [
  {
    path: '/',
    redirect: '/workSpace'
  },
  {
    path: '/login',
    component: Login,
    meta: { title: '登录页面' },
  },
  {
    path: '/workspace',
    redirect: '/workspace/workbench',
    component: BaseLayout,
    meta: { title: '工作空间' },
    children: [
      {
        path: '/workspace/workbench',
        component: () => import('../../views/workSpace/workbench/index.vue'),
        meta: { title: '工作台', requireAuth: true },
      },
      {
        path: '/workspace/console',
        component: () => import('../../views/workSpace/console/index.vue'),
        meta: { title: '控制台', requireAuth: true },
      },
      {
        path: '/workspace/analysis',
        component: () => import('../../views/workSpace/analysis/index.vue'),
        meta: { title: '分析页', requireAuth: true },
      }
    ]
  }, {
    path: '/error',
    component: BaseLayout,
    meta: { title: '错误页面' },
    children: [
      {
        path: '/error/401',
        component: () => import('../../views/error/401.vue'),
        meta: { title: '401' },
      },
      {
        path: '/error/403',
        component: () => import('../../views/error/403.vue'),
        meta: { title: '403' },
      },
      {
        path: '/error/404',
        component: () => import('../../views/error/404.vue'),
        meta: { title: '404' },
      },
      {
        path: '/error/500',
        component: () => import('../../views/error/500.vue'),
        meta: { title: '500' },
      }
    ]
  }, {
    path: '/system',
    component: BaseLayout,
    meta: { title: '系统管理' },
    children: [
      {
        path: '/system/user',
        component: () => import('../../views/system/user/index.vue'),
        meta: { title: '用户管理', requireAuth: true },
      },
      {
        path: '/system/role',
        component: () => import('../../views/system/role/index.vue'),
        meta: { title: '角色管理', requireAuth: true },
      }
    ]
  }, {
    path: '/result',
    component: BaseLayout,
    meta: { title: '错误页面' },
    children: [
      {
        path: '/result/success',
        component: () => import('../../views/result/success.vue'),
        meta: { title: '成功页面', requireAuth: true },
      },
      {
        path: '/result/failure',
        component: () => import('../../views/result/failure.vue'),
        meta: { title: '失败页面', requireAuth: true },
      },
    ]
  }, {
    path: '/list',
    component: BaseLayout,
    meta: { title: '列表页面' },
    children: [
      {
        path: '/table/base',
        component: () => import('../../views/table/base.vue'),
        meta: { title: '查询列表', requireAuth: true },
      },
      {
        path: '/table/card',
        component: () => import('../../views/table/card.vue'),
        meta: { title: '卡片列表', requireAuth: true },
      },
      {
        path: '/table/text',
        component: () => import('../../views/table/text.vue'),
        meta: { title: '图文列表', requireAuth: true },
      }
    ]
  }, {
    path: '/form',
    component: BaseLayout,
    meta: { title: '表单页面' },
    children: [
      {
        path: '/form/base',
        component: () => import('../../views/form/base.vue'),
        meta: { title: '基础表单', requireAuth: true },
      },
      {
        path: '/form/step',
        component: () => import('../../views/form/step.vue'),
        meta: { title: '分步表单', requireAuth: true },
      },
      {
        path: '/form/intricate',
        component: () => import('../../views/form/intricate.vue'),
        meta: { title: '复杂表单', requireAuth: true },
      },
    ]
  }, {
    path: '/directive',
    component: BaseLayout,
    meta: { title: '内置指令' },
    children: [
      {
        path: '/directive/permission',
        component: () => import('../../views/directive/permission.vue'),
        meta: { title: '权限指令', requireAuth: true },
      },
    ]
  }, {
    path: '/formdesign',
    meta: { title: '表单管理' },
    component: BaseLayout,
    children: [
      {
        path: '/formdesign/list',
        meta: { title: '表单管理' },
        component: () => import('../../views/form/list.vue')
      }, {
        path: '/formdesign/index',
        meta: { title: '表单设计' },
        component: () => import('../../views/form/design/index.vue')
      }, {
        path: '/formdesign/submitfrom',
        meta: { title: '新增→编辑详情' },
        hidden: true,
        component: () => import('../../views/form/submitfrom.vue')
      },
    ],
  },
  {
    path: '/sys',
    component: BaseLayout,
    meta: { title: '系统管理' },
    children: [
      {
        path: '/sys/log',
        component: () => import('../../views/sys/log/log.vue'),
        meta: { title: '日志管理' },
      },
      {
        path: '/sys/dictionary',
        component: () => import('../../views/sys/dictionary.vue'),
        meta: { title: '数据字典' },
      }
      ,
      {
        path: '/sys/menu',
        component: () => import('../../views/sys/menu.vue'),
        meta: { title: '菜单管理' },
      }  ,
      {
        path: '/sys/appset',
        component: () => import('../../views/sys/appset.vue'),
        meta: { title: '应用设置' },
      }
      ,
      {
        path: '/sys/role',
        component: () => import('../../views/users/role.vue'),
        meta: { title: '角色管理' },
      }  
        ,
      {
        path: '/sys/webset',
        component: () => import('../../views/sys/webset.vue'),
        meta: { title: '网站设置' },
      }
      ,
      {
        path: '/sys/user',
        component: () => import('../../views/sys/user.vue'),
        meta: { title: '用户管理' },
      }
    ]
  }, {

    path: '/notice',
    component: BaseLayout,
    meta: { title: '网站管理' },
    children: [
      {
        path: '/notice/list',
        component: () => import('../../views/notice/list.vue'),
        meta: { title: '网站管理' },
      }
    ]
  },  {

    path: '/users',
    component: BaseLayout,
    meta: { title: '人事管理' },
    children: [
      {
        path: '/users/list',
        component: () => import('../../views/users/list.vue'),
        meta: { title: '人员管理' },
      },
      {
        path: '/users/department',
        component: () => import('../../views/users/department.vue'),
        meta: { title: '部门管理' },
      }
      ,
      {
        path: '/users/role',
        component: () => import('../../views/users/role.vue'),
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
        component: () => import('../../views/webinfo/list.vue'),
        meta: { title: '网站管理' },
      }
    ]
  }, {
    path: '/oa',
    component: BaseLayout,
    meta: { title: 'oa' },
    children: [
      {
        path: '/oa/wait',
        component: () => import('../../views/oa/wait.vue'),
        meta: { title: '待办事项' },
      },
      {
        path: '/oa/office',
        component: () => import('../../views/oa/office/word.vue'),
        meta: { title: '待办事项' },
      },
      {
        path: '/oa/button',
        component: () => import('../../views/oa/flow/flowbutton.vue'),
        meta: { title: '流程按钮' },
      },
      
      {
        path: '/oa/completed',
        component: () => import('../../views/oa/completed.vue'),
        meta: { title: '已办事项' },
      },
      {
        path: '/oa/workrun/index',
        component: () => import('../../views/oa/workrun/index.vue'),
        meta: { title: '处理' },
      },
      {
        path: '/oa/flow/list',
        meta: { title: '流程管理' },
        component: () => import('../../views/oa/flow/list.vue')
      }, {
        path: '/oa/flow/design',
        meta: { title: '流程设计' },
        component: () => import('../../views/oa/flow/design.vue')
      }
    ]

  }
]