import { createApp,App } from 'vue'
import Router from './router'
import Store from './store'
import Apps from './App.vue'
import '@layui/layui-vue/lib/index.css'
import { permission } from "./directives/permission";
import './mockjs'
import 'xe-utils'
import 'font-awesome/css/font-awesome.min.css'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

import VueUeditorWrap from "vue-ueditor-wrap";
import print from "print-js";
// import DataVVue3 from '@kjgl77/datav-vue3'
function useTable (app: App) {
    app.use(VXETable)

    // 给 vue 实例挂载内部对象，例如：
    // app.config.globalProperties.$XModal = VXETable.modal
    // app.config.globalProperties.$XPrint = VXETable.print
    // app.config.globalProperties.$XSaveFile = VXETable.saveFile
    // app.config.globalProperties.$XReadFile = VXETable.readFile
  }
const app = createApp(Apps);

app.use(Store);
app.use(Router);
app.use(VueUeditorWrap);
// app.use(DataVVue3);
app.use(useTable);
app.directive("permission",permission);
app.mount('#app');
