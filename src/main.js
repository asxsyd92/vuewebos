import Vue from 'vue'
import App from './App'

import layui from 'layui-src'
import init from './assets/js/init.js';
import VueTaber from '@/components/tabs/index.js'
import tabs from '@/tabs.js'
import router from './router'
import { post, get,patch, put} from '@/utils/request'
import store from './store/index'
const vueTaber = new VueTaber({
    tabs,
    persist: false
})
//定义全局变量
Vue.prototype.$post = post;
Vue.prototype.$get = get;
Vue.prototype.$patch = patch;
Vue.prototype.$put = put;
Vue.prototype.layui = layui;
Vue.config.productionTip = false
Vue.prototype.host = 'http://asxsyd92.com';
vueTaber.beforeCreateEach((tab, next) => {
    if (tab.name === 'setting') {
        next('home')
    } else {
        next()
    }
})

Vue.use(VueTaber)

/* eslint-disable no-new */
new Vue({  
    el: '#app',  router,
    taber: vueTaber,
    store,
    template: '<App/>',
    components: {
        App
    }
})
