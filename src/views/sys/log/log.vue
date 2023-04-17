<template>
  <lay-layout>
    <!--  -->

    <lay-body>

      <vxe-grid ref="xGrid" v-bind="config" v-on="gridEvents" :column-config="{ isCurrent: true, isHover: true }"
        :row-config="{ isCurrent: true, isHover: true }">
        <!--将表单放在工具栏中-->
        <template #toolbar_buttons>
          <vxe-form :data="search">
            <vxe-form-item field="name">
              <template #default>
                <lay-input v-model="search.name" type="text" placeholder="请输入名称" @keyup.enter="soso()"></lay-input>

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
import popform from '../../form/popform.vue';
import { layer } from "@layui/layer-vue"
import { VxeGridInstance, VxeGridListeners, VxeGridProps } from 'vxe-table'
import listurils from '../../../utils/listutils';
const xGrid = ref<VxeGridInstance>();
const route = useRoute();
const listbutton = ref({
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
  columns: [
    // { type: 'seq', width: 60 },
    { type: 'checkbox', width: 50 },
    { field: 'title', title: '标题', },
    { field: 'type', title: '类型', },
    { field: 'username', title: '操作人', },
    { field: 'writetime', title: '发生时间', },
    { field: 'ipaddress', title: "IP地址" },
    { field: 'pro', title: "归属省份" },
    { field: 'city', title: "归属市份" },
    { field: 'addr', title: "详细地址" },
    { field: 'citycode', title: "城市编号" },
    { field: 'contents', title: '详情', },
    { title: '操作', fixed: "right", width: 200, slots: { default: 'operate' } }
  ],
  data: []
});
listurils.getButton(route.query.appid, config, listbutton).then((res: any) => {
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
const soso = () => {
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
      case "deleteEvent": listurils.removeRowEvent(ent, row, listurils.searchEvent, config, search);
        break;

      case "previewEvent": listurils.previewEvent(popform, ent, row);
        break;
    }
  } catch (e) {
    layer.msg("按钮解析失败", { icon: 3, time: 1000 })
  }

}
</script>

<!-- 
<template>
  <lay-layout>
    <lay-card>
      <lay-table id="id" :columns="config.columns" 
    
      :expand-index="1" :data-source="config.data" :checkbox="checkbox5"
        :page="config.page" :resize="true" :autoColsWidth="true" @row="rowClick5" @change="change">
        <template v-slot:toolbar>
          <lay-button size="sm" type="primary">新增</lay-button>
          <lay-button size="sm">删除</lay-button>
        </template>
        <template v-slot:name="{ row, column, rowIndex, columnIndex }"> {{ row.name }} </template>
       
        <template v-slot:operator="{ row }">
          <lay-button size="xs">修改</lay-button>
          <lay-button size="xs" type="primary">删除</lay-button>
        </template>
      </lay-table>
    </lay-card>
  </lay-layout>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import popform from '../../form/popform.vue';
import { layer } from "@layui/layer-vue"
import { useRoute } from 'vue-router';
import listurils from '../../../utils/listutils';
import http from 'webosutils/lib/http';
const checkbox5 = ref(true);
const route = useRoute();
// const defaultToolbar5 = ref(['export', 'print', 'filter'])
// const maxHeight5 = ref('500px');
const config = ref(
  {
    page: {
      total: 0,
      limit: 10,
      current: 1,
      limits: [10, 50, 100, 200],
      showRefresh: true
    },
    columns: [{ type: 'checkbox', width: 50 },
    { key: 'title', title: '标题', },
    { key: 'type', title: '类型', },
    { key: 'username', title: '操作人', },
    { key: 'writetime', title: '发生时间', },
    { key: 'ipaddress', title: "IP地址" },
    { key: 'pro', title: "归属省份" },
    { key: 'city', title: "归属市份" },
    { key: 'addr', title: "详细地址" },
    { key: 'citycode', title: "城市编号" },
    { key: 'contents', title: '详情', },
    {
      title: "操作",
      width: "150px",
      fixed: "right",
      customSlot: "operator",
      key: "operator"
    }],
    data: [],
    search: {
      name: '',
      type: "",
      api: ""
    }
  }
);
const listbutton = ref({
  rowbuttons: [],
  toolbarbuttons: [],
}) as any;
listurils.getButton(route.query.appid, config, listbutton).then((res: any) => {
  //加载完成后刷新列表

  if (res.success) {
    config.value.search.api = res.data.api;
    searchEvent();
  } else {
    layer.notifiy({
      title: "Error",
      content: res.msg,
      icon: 2
    })
  }

});

const change = (p: any) => {
  config.value.page.current = p.current;
  config.value.page.limit = p.limit;
  searchEvent();
}
const rowClick5 = (data: any) => {
  console.log(JSON.stringify(data))
}
const searchEvent = () => {
  listurils.getList(config.value, config.value.search.api, { type: config.value.search.type, title: config.value.search.name, page: config.value.page.current, limit: config.value.page.limit });

}
const rowDoubleClick5 = (data: any) => {
  console.log(JSON.stringify(data))
}





</script> -->