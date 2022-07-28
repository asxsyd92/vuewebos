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
import http from "../../utils/http";
import { useRouter, useRoute, RouteMeta } from 'vue-router';
import { layer } from '@layui/layer-vue'
import { defineComponent, reactive, ref } from 'vue'
import { VXETable, VxeGridInstance, VxeGridListeners, VxeGridProps } from 'vxe-table'

export default defineComponent({
  setup() {
    const search = ref({
      name: ''
    });
    const xGrid = ref<VxeGridInstance>()
    const router = useRouter();
    const route = useRoute();
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
        { field: 'title', title: '标题' },
        { field: 'username', title: '作者', },
        { field: 'addtime', title: '发表时间', },
        { title: '操作', fixed: "right", width: 150, slots: { default: 'operate' } }
      ],
      data: []
    })

    const sexList1 = ref([
      { value: '1', label: '男' },
      { value: '0', label: '女' }
    ])

    const findList = () => {
      gridOptions.loading = true;
      var page: any, limt: any;
      if (gridOptions.pagerConfig) {
        page = gridOptions.pagerConfig.currentPage;
        limt = gridOptions.pagerConfig.pageSize;
      }
      http.post("/api/notice/GetNotecePage", { page: page, title:search.value.name,type: route.query.type, limit: limt }).then(res => {
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

    const formatSex = (value: any) => {
      if (value === '1') {
        return '男'
      }
      if (value === '0') {
        return '女'
      }
      return ''
    }

    const editRowEvent = (row: any) => {

      console.log(row);
      var query = new Object() as any;
      query.fromid = route.query.fromid;
      query.instanceid = row.id;
    query.tabname =encodeURIComponent( row.title);

      router.push({ path: "/formdesign/submitfrom", query: query, params: { tabname: row.title } })

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
          http.post("/api/notice/DelNotice", { id: row.id }).then((res: any) => {
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
      query.fromid = route.query.fromid;
      query.instanceid = route.query.instanceid;
      query.zhuanti = route.query.classid;
       query.tabname =encodeURIComponent("新增"+route.query.tabname);
     
      router.push({ path: "/formdesign/submitfrom", query: query, params: { tabname: "新增" + route.query.tabname } })
    }
    return {
      xGrid,
      sexList1,
      gridOptions,
      formatSex,
      gridEvents,
      editRowEvent,
      saveRowEvent,
      removeRowEvent,
      formData,
      searchEvent,
      a_add,
      search 
    }
  }
})


</script>