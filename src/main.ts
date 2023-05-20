import { createApp,App } from 'vue'
import Router from './router'
import Store from './store'
import Apps from './App.vue'
import '@layui/layui-vue/lib/index.css'
import { permission } from "./directives/permission";
import './mockjs'
import 'font-awesome/css/font-awesome.min.css'
// import { createPinia } from 'pinia'
import Layuid from '@layui/layui-vue'
import VueUeditorWrap from "vue-ueditor-wrap";
import print from "print-js";
// import DataVVue3 from '@kjgl77/datav-vue3'
//function useTable (app: App)
 {
    
    localStorage.httpversion=location.origin+"/v1";
    localStorage.seourl=location.origin,
    localStorage.onlyoffice="http://service.asxsyd92.com:8090/web-apps/apps/api/documents/api.js",
    localStorage.documenturl="http://asxsyd92.com",//默认配置的文档下载地址适用组件
    localStorage.documentcallbackUrl=location.origin+"/v1" ,//http+域名+接口版本
    localStorage.docplugins="http://service.asxsyd92.com:8090" //
  }
const app = createApp(Apps);
// const pinia = createPinia()
app.use(Store);
app.use(Router);
app.use(VueUeditorWrap);
// app.use(DataVVue3);
//.use(useTable);
app.use(Layuid);
// app.use(pinia)
app.directive("permission",permission);
app.mount('#app');
