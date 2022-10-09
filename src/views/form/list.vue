<template>
  <div>

    <vxe-grid ref="xGrid" v-bind="gridOptions" v-on="gridEvents" :column-config="{ isCurrent: true, isHover: true }"
      :row-config="{ isCurrent: true, isHover: true }">
      <!--将表单放在工具栏中-->
      <template #toolbar_buttons>
        <vxe-form :data="search" >
          <vxe-form-item field="name">
            <template #default>
              <vxe-input v-model="search.name" type="text" placeholder="请输入名称"></vxe-input>
            </template>
          </vxe-form-item>
          <vxe-form-item>
            <template #default>
              <vxe-button  status="primary" @click="searchEvent" content="查询"></vxe-button>
              <vxe-button  status="primary" @click="New" content="新增表单"></vxe-button>
              <vxe-button  content="重置"></vxe-button>
            </template>
          </vxe-form-item>
        </vxe-form>
      </template>

      <template #operate="{ row }">
        <vxe-button icon="fa fa-edit" title="编辑" circle @click="editRowEvent(row)"></vxe-button>
        <vxe-button icon="fa fa-trash-o" title="删除" circle @click="removeRowEvent(row)"></vxe-button>
<!-- 
        <vxe-button icon="fa fa-gear" title="设置" circle></vxe-button> -->
      </template>
    </vxe-grid>

  </div>
</template>

<script lang="ts">
import http from '../../api/http';
import { useRouter, useRoute, RouteMeta } from 'vue-router';
import { defineComponent, reactive, ref } from 'vue'
import { VXETable, VxeGridInstance, VxeGridListeners, VxeGridProps } from 'vxe-table'

export default defineComponent({
  setup() {
        const search = ref({
      name: ''
    })
    const xGrid = ref<VxeGridInstance>()
    const router = useRouter();
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
      columns: [
        // { type: 'seq', width: 60 },
        { type: 'checkbox', width: 50 },
        { field: 'title', title: '标题', },
        // { field: 'type', title: '类型',  },
        // { field: 'username', title: '操作人',  },
        { field: 'datetime', title: '发布时间', },
        // { field: 'contents', title: '详情', },
        { title: '操作', fixed: "right", width: 200, slots: { default: 'operate' } }
      ],
      data: []
    })


    const findList = () => {
      gridOptions.loading = true;
      var page: any, limt: any;
      if (gridOptions.pagerConfig) {
        page = gridOptions.pagerConfig.currentPage;
        limt = gridOptions.pagerConfig.pageSize;
      }
      http.post("/api/common/GetCommonList", { tab: "SysFormDesign", title: search.value.name, page: page, limit: limt }).then(res => {
        gridOptions.loading = false

        if (res.success) {

          gridOptions.data = res.data;

          if (gridOptions.pagerConfig) {
            gridOptions.pagerConfig.total = res.count
          }
        }
      }).catch(res => {
        gridOptions.loading = false
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


    const removeRowEvent = async (row: any) => {
      const type = await VXETable.modal.confirm('您确定要删除该数据?')
      const $grid = xGrid.value
      if ($grid) {
        if (type === 'confirm') {
          await $grid.remove(row)
        }
      }
    }
    const editRowEvent = async (row: any) => {
      var query = new Object() as any;
      query.fromid = row.id;
        query.tabname =encodeURIComponent( row.title);
   
      router.push({ path: "/formdesign/index", query: query, params: { tabname: "表单管理：" + row.title } })


    }
    findList()
    const searchEvent = () => {
      findList();
    }
    const New = () => {
      var query = new Object() as any;
            query.tabname =encodeURIComponent( "新增表单");

      router.push({ path: "/formdesign/index", query: query, params: { tabname: "新增表单" } })

    }

    return {
      xGrid,
      gridOptions,
      gridEvents,
      removeRowEvent,
      search,
      searchEvent,
      editRowEvent,
      New
    }
  }
})


</script>