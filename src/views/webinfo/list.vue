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
              <lay-button-group v-for="n in toolbarbuttons" :key="n">
                <lay-button :size="n.size" :type="n.status" border-style="dashed" @click="Events(n, null)">{{
                  n.name
                }}</lay-button>

              </lay-button-group>
              <!-- <vxe-button type="a_submit" status="primary" @click="searchEvent" content="查询"></vxe-button>
              <vxe-button type="a_add" @click="a_add" status="primary" content="新增"></vxe-button>
              <vxe-button type="a_reset" content="重置"></vxe-button>
              <vxe-button type="a_index" @click="a_index" content="更新首页"></vxe-button> -->
            </template>
          </vxe-form-item>
        </vxe-form>
      </template>

      <template #operate="{ row }">
        <span v-for="n in rowbuttons" :key="n">
          <vxe-button :icon="n.icon" :title="n.name" circle @click="Events(n, row)"></vxe-button>
        </span>
        <!-- <vxe-button icon="fa fa-eye" title="查看" circle @click="editRowEvent(row)"></vxe-button>
        <vxe-button icon="fa fa-trash" title="删除" circle @click="removeRowEvent(row)"></vxe-button>

        <vxe-button icon="fa fa-gear" title="百度推送"  @click="soeRowEvent(row)" circle></vxe-button> -->
      </template>
    </vxe-grid>

  </div>
</template>

<script lang="ts">
import http from '../../api/http';
import { useRouter, useRoute } from 'vue-router';
import utils from '../../utils/utils';
import { defineComponent, reactive, ref } from 'vue'
import { layer } from "@layui/layer-vue"
import { VXETable, VxeGridInstance, VxeGridListeners, VxeGridProps } from 'vxe-table'
import config from "../../config";
export default defineComponent({
  setup() {
    const search = ref({
      name: ''
    });
    const toolbarbuttons = ref([]) as any;
    const rowbuttons = ref([]) as any;
    const xGrid = ref<VxeGridInstance>()
    const router = useRouter();
    const route = useRoute();
    const area = ref(["50%", "50%"]);
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
        { field: 'sendername', title: '作者', },
        { field: 'addtime', title: '发表时间', },
        { title: '操作', fixed: "right", width: 150, slots: { default: 'operate' } }
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
      http.post("/api/tasks/WaitList", { type: route.query.zhuanti, title: search.value.name, page: page, limit: limt }).then(res => {
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
    utils.finbuuton(route.path, gridOptions).then((res: any) => {
      if (res.success) {
        area.value = res.area;
        toolbarbuttons.value = res.toolbarbuttons;
        rowbuttons.value = res.rowbuttons;
      }
    });



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



    const a_index = async () => {
      const type = await VXETable.modal.confirm('您确定要更新首页数据，搜索引擎将抓取最新数据?')
      const $grid = xGrid.value

      if (type === 'confirm') {

        http.post("/api/tasks/ArticlePush", { url: config.seourl }, "正在推送请稍等...").then((resp: any) => {

        }).catch((error: any) => {

        });
      }

    }
    const soeRowEvent = async (row: any) => {
      const type = await VXETable.modal.confirm('您确定要推送数据?')
      const $grid = xGrid.value
      if ($grid) {
        if (type === 'confirm') {
          var t = "newsdetail";
          if (route.query.zhuanti == "B82AB160-7C17-4124-94FE-892F8B390DB8") {
            t = "down";
          }
          http.post("/api/tasks/ArticlePush", { url: config.seourl + "/news/" + t + "?id=" + row.instanceid }, "正在推送请稍等...").then((resp: any) => {

          }).catch((error: any) => {

          });
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
    const a_add = (ent: any) => {
      var query = new Object() as any;
      query.fromid = ent.formid;
      query.instanceid = "";
      query.zhuanti = route.query.zhuanti;
      query.tabname = encodeURIComponent("新增" + route.query.tabname);
      router.push({ path: "/formdesign/submitfrom", query: query, params: { tabname: "新增" + route.query.tabname } })
    }
    const editRowEvent = (ent: any, row: any) => {
      var query = new Object() as any;
      query.fromid = row.formid;
      query.instanceid = row.instanceid;
      query.zhuanti = row.classid;
      query.tabname = encodeURIComponent(row.title);
      router.push({ path: "/formdesign/submitfrom", query: query, params: { tabname: row.title } })

    }
    const removeRowEvent = async (ent: any, row: any) => {
      const $grid = xGrid.value
      layer.confirm("您确定要删除该数据",
        {
          btn:
            [
              {
                text: '确认', callback: function (id: any) {
                  http.post(ent.api, { id: row.id }).then((res: any) => {
                    if (res.success) {
                      layer.close(id);
                      searchEvent();
                      layer.notifiy({ title: "温馨提示", content: res.msg })


                    } else {
                      layer.notifiy({ title: "温馨提示", content: res.msg })
                      layer.close(id);
                    }
                  }).catch((error: any) => {
                    layer.notifiy({ title: "温馨提示", content: "网络错误！" })
                    layer.close(id);
                  })

                }
              },
              { text: '取消', callback: function (id: any) { layer.close(id); } }
            ]
        })

    }
    const Events = (ent: any, row: any) => {
      try {

        switch (ent.events) {
          case "searchEvent": searchEvent();
            break;
          case "addEvent": a_add(ent);
            break;

          case "editEvent": editRowEvent(ent, row);
            break;
          case "deleteEvent": removeRowEvent(ent, row);
            break;
        }
      } catch (e) {
        layer.msg("按钮解析失败", { icon: 3, time: 1000 })
      }

    }
    return {
      xGrid,
      gridOptions,
      toolbarbuttons,
      rowbuttons,
      gridEvents,
      editRowEvent,
      saveRowEvent,
      removeRowEvent,
      formData,
      searchEvent,
      a_add,
      search,
      soeRowEvent,
      a_index,
      area
    }
  }
})


</script>