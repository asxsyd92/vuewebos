<template>
  <div>

    <vxe-grid ref="xGrid" v-bind="gridOptions" v-on="gridEvents" :column-config="{ isCurrent: true, isHover: true }"
      :row-config="{ isCurrent: true, isHover: true }">
      <!--将表单放在工具栏中-->
      <template #toolbar_buttons>
        <vxe-form :data="search" @submit="searchEvent">
          <vxe-form-item field="name">
            <template #default>
              <vxe-input v-model="search.name" type="text" placeholder="请输入名称"></vxe-input>
            </template>
          </vxe-form-item>
          <vxe-form-item>
            <template #default>
              <vxe-button type="a_submit" status="primary"  @click="searchEvent" content="查询"></vxe-button>
              <vxe-button type="a_add" @click="a_add" status="primary" content="新增"></vxe-button>
              <vxe-button type="a_reset" content="重置"></vxe-button>
            </template>
          </vxe-form-item>
        </vxe-form>
      </template>

      <template #operate="{ row }">
        <vxe-button icon="fa fa-eye" title="查看" circle @click="editRowEvent(row)"></vxe-button>
        <vxe-button icon="fa fa-trash" title="删除" circle @click="removeRowEvent(row)"></vxe-button>

        <vxe-button icon="fa fa-gear" title="设置" circle></vxe-button>
      </template>
    </vxe-grid>

  </div>
</template>

<script lang="ts">
import http from "../../../utils/http";
import { useRouter, useRoute, RouteMeta } from 'vue-router';
import { layer } from '@layui/layer-vue'
import { defineComponent, reactive, ref } from 'vue'
import { VXETable, VxeGridInstance, VxeGridListeners, VxeGridProps,VxeColumnPropTypes } from 'vxe-table'

export default defineComponent({
  setup() {
    const search = ref({
      name: ''
    });
    const xGrid = ref<VxeGridInstance>()
    const router = useRouter();
    const route = useRoute();
    
  
   const formatstatus :VxeColumnPropTypes.Formatter=({ cellValue}) => {
      if(cellValue==1){
        return "设计中";
      }
        if(cellValue==2){
        return "已安装";
      }
        if(cellValue==3){
        return "已卸载";
      }
        if(cellValue==4){
        return "已删除";
      }
         return "未知";
     }
    const gridOptions = reactive<VxeGridProps>({
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
      //(({ cellValue, row, column }) => string) | any[] | string
      columns: [
        // { type: 'seq', width: 60 },
        { type: 'checkbox', width: 50 },
        { field: 'name', title: '标题' },
        { field: 'status', title: '状态',formatter:formatstatus},
        { field: 'createdate', title: '发表时间', },
        { title: '操作', fixed: "right", width: 150, slots: { default: 'operate' } }
      ],
      data: [],
      
    })


    const findList = () => {
      gridOptions.loading = true;
      var page: any, limt: any;
      if (gridOptions.pagerConfig) {
        page = gridOptions.pagerConfig.currentPage;
        limt = gridOptions.pagerConfig.pageSize;
      }
      http.post("/api/workflow/WorkFlowList", { page: page, title:search.value.name,type: route.query.type, limit: limt }).then(res => {
        gridOptions.loading = false

        if (res.success) {
          gridOptions.data = res.data;

          if (gridOptions.pagerConfig) {
            gridOptions.pagerConfig.total = res.count
          }
        }
      });
    }

    const gridEvents: VxeGridListeners = {
      pageChange({ currentPage, pageSize }) {
        if (gridOptions.pagerConfig) {
          gridOptions.pagerConfig.currentPage = currentPage
          gridOptions.pagerConfig.pageSize = pageSize
        }
        findList()
      }
    }


    const editRowEvent = (row: any) => {
      var query = new Object() as any;
      query.id = row.id;
            query.tabname =encodeURIComponent(row.name);
 
      router.push({ path: "/oa/flow/design", query: query, params: { tabname: row.name } })

    }

    const saveRowEvent = async () => {
      const $grid = xGrid.value
      if ($grid) {
        await $grid.clearActived()
        gridOptions.loading = true
        // 模拟异步保存
        setTimeout(() => {
          gridOptions.loading = false
          VXETable.modal.message({ content: '保存成功！', status: 'success' })
        }, 300)
      }
    }

    const removeRowEvent = async (row: any) => {
      const type = await VXETable.modal.confirm('您确定要删除该数据?')
      const $grid = xGrid.value
      if ($grid) {
        if (type === 'confirm') {
          http.post("/api/workflow/Delinfo", { id: row.id }).then((res: any) => {
            if (res.success) {
              $grid.remove(row);
            } else {
              layer.msg(res.msg, { icon: 2, time: 1000 })
            }

          }).catch((res: any) => {
            layer.msg('网络错误', { icon: 2, time: 1000 })
          })

        }
      }
    }

    findList()
    const searchEvent = () => {
    findList();
    }

    const formData = reactive({
      name: ''
    });
    const a_add = () => {
      var query = new Object() as any;

      query.tabname =encodeURIComponent( "新增流程");
      router.push({ path: "/oa/flow/design", query: query})
    }
    return {
      xGrid,
      gridOptions,
      gridEvents,
      editRowEvent,
      saveRowEvent,
      removeRowEvent,
      formData,
      searchEvent,
      a_add,
      search ,
      formatstatus
    }
  }
})


</script>