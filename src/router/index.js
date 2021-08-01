
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/pages/login/login'
import App from '@/App'
import index  from '@/pages/index/index'
import home  from '@/pages/index/home'
import commontask from '@/pages/site/commontask'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',// 添加该字段，表示进入这个路由是需要登录的
       
      component: login
    },

    {

      path: '',

      component: App, // 原来的 App.vue
      children: [
    { 
      path: '/',
      name: 'index',
      component: index, requireAuth: true,  
     
    }, 
    { 
      path: '/index',
      name: 'index',
      component: index, requireAuth: true,  
      children:[ { 
        path: 'home',
        name: 'home',
        component: index, requireAuth: true,  
       
      },{ 
        path: 'commontask',
        name: 'commontask',
        component: commontask, requireAuth: true,  
       
      }, ]
    },    
  ]}
]})
