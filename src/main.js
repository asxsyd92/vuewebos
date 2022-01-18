import Vue from 'vue'
import App from './App.vue'
 import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import router from './router'
import store from './store'
import { post, get,patch, put} from '@/utils/request'
 Vue.use(Antd);


Vue.config.productionTip = false;
import panes from "@/layout/panes";
import init from './assets/js/init.js';

import 'layui-src/src/css/layui.css'; 
import 'layui-src/src/css/modules/layer/default/layer.css'; 
/* @import 'layui-src/src/css/modules/laydate/default/font.css';   */
import 'layui-src/src/css/modules/laydate/default/laydate.css'; 
import layui from 'layui-src';
import DTree from '@/assets/js/dtree.js';

import iconPicker from '@/assets/js/iconPicker.js';
import './assets/css/webos/xadmin.css';
import './assets/css/webos/theme5.css';
import 'font-awesome/css/font-awesome.css';
import 'animate.css/animate.min.css';

//定义全局变量
Vue.prototype.$post = post;
Vue.prototype.$get = get;
Vue.prototype.$patch = patch;
Vue.prototype.$put = put;
Vue.prototype.layui = layui;
Vue.config.productionTip = false
Vue.prototype.host = '';


export function claostabs(m) {
  console.log("关闭");
  var e=window.location.pathname;
  let panes = m.$options.parent.$parent.panes;
  let activeKey = m.$options.parent.$parent.activeKey;
  let index = panes.findIndex((item) => { return item.path == e });
    
  panes.splice(index, 1);
  m.$options.parent.$parent.panes = panes;
  if (e == activeKey) {
      m.$options.parent.$parent.activeKey = panes[index - 1].path
  }
}
Vue.prototype.$claostabs = claostabs;
router.beforeEach((to, from, next) => {
    console.log(to.fullPath)
    if(to.meta && !to.meta.noRequireAuth){
      if (localStorage.getItem('isLogin')) {
        next()
      } else {
        next({path:'/login'})
      }
    }else {
      next();
    }
    document.title = to.meta ? to.meta.title : '';
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
