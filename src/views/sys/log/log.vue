<template>
<div>
 
        <vxe-grid  ref="xGrid" v-bind="gridOptions" v-on="gridEvents"  
         
          :column-config="{isCurrent: true, isHover: true}"
          :row-config="{isCurrent: true, isHover: true}"
     >
            <!--将表单放在工具栏中-->
          <template #toolbar_buttons>
            <vxe-form :data="formData" @submit="searchEvent" >
              <vxe-form-item field="name">
                <template #default>
                  <vxe-input v-model="formData.name" type="text" placeholder="请输入名称"></vxe-input>
                </template>
              </vxe-form-item>
              <vxe-form-item>
                <template #default>
                  <vxe-button type="submit" status="primary" content="查询"></vxe-button>
                  <vxe-button type="reset" content="重置"></vxe-button>
                </template>
              </vxe-form-item>
            </vxe-form>
          </template>

       <template #operate="{ row }">
        
            <vxe-button icon="fa fa-trash" title="删除" circle @click="removeRowEvent(row)"></vxe-button>
            <vxe-button icon="fa fa-eye" title="查看" circle></vxe-button>
            <vxe-button icon="fa fa-gear" title="设置" circle></vxe-button>
          </template>
     </vxe-grid>
      
        </div>
</template>

<script lang="ts">
import http from "../../../utils/http";
import { defineComponent, reactive, ref } from 'vue'
        import { VXETable, VxeGridInstance, VxeGridListeners, VxeGridProps } from 'vxe-table'

        export default defineComponent({
          setup () {
            const xGrid = ref<VxeGridInstance>()

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
                { field: 'type', title: '类型',  },
                { field: 'username', title: '操作人',  },
                { field: 'writetime', title: '发生时间', },
                { field: 'contents', title: '详情', },
                { title: '操作',fixed:"right", width: 200, slots: { default: 'operate' } }
              ],
              data: []
            })

            const sexList1 = ref([
              { value: '1', label: '男' },
              { value: '0', label: '女' }
            ])

            const findList = () => {
              gridOptions.loading = true;
                    var page:any,limt:any;
                  if (gridOptions.pagerConfig) {
                  page=gridOptions.pagerConfig.currentPage ;
                 limt= gridOptions.pagerConfig.pageSize ;
                }
           http.post("/api/log/getLogList", { page:page, limit: limt }).then(res => {
            gridOptions.loading = false
   
            if (res.success) {
                 gridOptions.data=res.data;

                if (gridOptions.pagerConfig) {
                  gridOptions.pagerConfig.total =res.count
                  }
            }});

            }

            const gridEvents: VxeGridListeners = {
              pageChange ({ currentPage, pageSize }) {
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
              const $grid = xGrid.value
              if ($grid) {
                $grid.setActiveRow(row)
              }
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
                  await $grid.remove(row)
                }
              }
            }

            findList()
            const searchEvent = () => {
              const $grid = xGrid.value
              //$grid.commitProxy('query')
            }

            const formData = reactive({
              name: ''
            })
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
              searchEvent
            }
          }
        })
        

</script>