<template>
  <lay-layout>
    <!--  -->

    <lay-body>

      <vxe-grid ref="roleGrid" v-bind="config" v-on="gridEvents" :column-config="{ isCurrent: true, isHover: true }"
        :row-config="{ isCurrent: true, isHover: true }">
        <!--将表单放在工具栏中-->
        <template #toolbar_buttons>
          <vxe-form :data="search">
            <vxe-form-item field="name">
              <template #default>
                <lay-input v-model="search.name" type="text" placeholder="请输入名称"  @keyup.enter="soso()"></lay-input>
       
              </template>
            </vxe-form-item>
            <vxe-form-item>
              <template #default>

                <lay-button-group v-for="n in listbutton.toolbarbuttons" :key="n">
                  <lay-button :size="n.size" :type="n.status" border-style="dashed" @click="Events(n, null)">{{
                    n.name
                  }}</lay-button>

                </lay-button-group>

              </template>
            </vxe-form-item>
          </vxe-form>
        </template>

        <template #operate="{ row }">
          <span v-for="n in listbutton.rowbuttons" :key="n">
            <vxe-button :icon="n.icon" :title="n.name" circle @click="Events(n, row)"></vxe-button>
          </span>
        </template>
      </vxe-grid>
    </lay-body>
  </lay-layout>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useRoute } from 'vue-router';
import popform from '../form/popform.vue';
import { layer } from "@layui/layer-vue"
import { VxeGridInstance, VxeGridListeners, VxeGridProps } from 'vxe-table'
import listurils from '../../utils/listutils';
const roleGrid = ref<VxeGridInstance>();
const route = useRoute();
const listbutton = ref({
  area: ['50%', '50%'],
  rowbuttons: [] as any,
  toolbarbuttons: [] as any,
});
const search = ref({
  name: '',
  type: "",
  api: ""
});

const config = reactive<VxeGridProps>({
  border: true,
  keepSource: true,
  showOverflow: true,

  loading: false,
  columnConfig: {
    resizable: true,
    isCurrent: true,
    isHover: true,
  },
  pagerConfig: {
    total: 0,
    currentPage: 1,
    pageSize: 10,
    pageSizes: [10, 20, 50, 100, 200, 500]
  },
  editConfig: {
    trigger: 'manual',
    mode: 'row',
    showStatus: true,
    icon: 'fa fa-file-text-o'
  },
  toolbarConfig: {
    export: true,
    print: true,
    custom: true,
    slots: {
      buttons: 'toolbar_buttons'
    }
  },
  columns:[
      // { type: 'seq', width: 60 },
      { type: 'checkbox', width: 50 },
      { field: 'id', title: '角色id' },
      { field: 'identifier', title: '角色标识', },
      { field: 'title', title: '角色名称', },

      { field: 'note', title: '备注', },


      { title: '操作', fixed: "right", width: 150, slots: { default: 'operate' } }
  ],
  data: []
});
listurils.getButton(route.path, config, listbutton).then((res: any) => {
  //加载完成后刷新列表

  if (res.success) {
    search.value.api = res.data.api;
            listurils.searchEvent(config, search,{ type: search.value.type, title: search.value.name, page: config.pagerConfig!.currentPage, limit: config.pagerConfig!.pageSize });
  } else {
    layer.notifiy({
      title: "Error",
      content: res.msg,
      icon: 2
    })
  }

});

//标段保存回调返回结果
const Callback = (res: any) => {
  if (res.success) {

            listurils.searchEvent(config, search,{ type: search.value.type, title: search.value.name, page: config.pagerConfig!.currentPage, limit: config.pagerConfig!.pageSize });
  } else {
    layer.notifiy({ title: "温馨提示", content: res.msg })
  }

}

const gridEvents: VxeGridListeners = {
  pageChange({ currentPage, pageSize }) {
    if (config.pagerConfig) {
      config.pagerConfig.currentPage = currentPage;
      config.pagerConfig.pageSize = pageSize;
              listurils.searchEvent(config, search,{ type: search.value.type, title: search.value.name, page: config.pagerConfig!.currentPage, limit: config.pagerConfig!.pageSize });
    }

  }
}
const soso=()=>{
  if (config.pagerConfig) {
          config.pagerConfig.currentPage = 1;
                  listurils.searchEvent(config, search,{ type: search.value.type, title: search.value.name, page: config.pagerConfig!.currentPage, limit: config.pagerConfig!.pageSize });
        }

}

const Events = (ent: any, row: any) => {
  try {

    switch (ent.events) {
      case "searchEvent":
        if (config.pagerConfig) {
          config.pagerConfig.currentPage = 1;
                  listurils.searchEvent(config, search,{ type: search.value.type, title: search.value.name, page: config.pagerConfig!.currentPage, limit: config.pagerConfig!.pageSize });
        }

        break;
      case "addEvent": listurils.addEvent(popform, ent, { fromid: ent.formid, instanceid: "", callback: Callback }, {});
        break;

      case "editEvent": listurils.editRowEvent(popform, ent, row, { fromid: ent.formid, instanceid: row.id, callback: Callback },  {});
        break;
      case "deleteEvent": listurils.removeRowEvent(ent, row, listurils.searchEvent, config, search,{ type: search.value.type, title: search.value.name, page: config.pagerConfig!.currentPage, limit: config.pagerConfig!.pageSize });
        break;
      case "cloneEvent": listurils.cloneRowEvent(popform, ent, row, { fromid: ent.formid, instanceid: row.id, callback: Callback }, { id: "" });
        break;

    }
  } catch (e) {
    layer.msg("按钮解析失败", { icon: 3, time: 1000 })
  }

}
</script>
