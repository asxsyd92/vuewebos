import {App, createApp } from 'vue'
import Layui from '@layui/layui-vue'
import '@layui/layui-vue/lib/index.css'
import './styles/index.css'
import Store from './store'
import Apps from './App.vue'
import Router from './router'
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
import { useAppStore } from './store/app'
import 'font-awesome/css/font-awesome.min.css'
import VueUeditorWrap from "vue-ueditor-wrap";
import print from "print-js";
import DataVVue3 from '@kjgl77/datav-vue3'
function useTable (app: App) {
    app.use(VXETable)

    // 给 vue 实例挂载内部对象，例如：
    // app.config.globalProperties.$XModal = VXETable.modal
    // app.config.globalProperties.$XPrint = VXETable.print
    // app.config.globalProperties.$XSaveFile = VXETable.saveFile
    // app.config.globalProperties.$XReadFile = VXETable.readFile
  }
createApp(Apps)
// .use(preview)
.use(Layui).use(VueUeditorWrap)
.use(Store)
.use(Router).use(DataVVue3)
.use(useTable)
.mount('#app');