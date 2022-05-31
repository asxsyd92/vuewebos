<template>
      <vxe-table
          show-overflow
          ref="xTable"
          :tree-config="{transform: true}"
       
          :data="demo1.tableData"
          :column-config="{isCurrent: true, isHover: true}"
          :row-config="{isCurrent: true, isHover: true}">
                   <!--将表单放在工具栏中-->
          <template #toolbar_buttons>
            <!-- <vxe-form :data="formData" @submit="searchEvent" @reset="resetEvent">
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
            </vxe-form> -->
          </template>

          <vxe-column type="seq" width="200" tree-node></vxe-column>
          <vxe-column field="name" title="Name"></vxe-column>
          <vxe-column field="size" title="Size"></vxe-column>
          <vxe-column field="type" title="Type"></vxe-column>
          <vxe-column field="date" title="Date"></vxe-column>
        </vxe-table>
</template>
<script lang="ts">

        import { defineComponent, reactive, ref } from 'vue'
        import { VxeTableInstance } from 'vxe-table'

        export default defineComponent({
          setup () {
            const xTable = ref({} as VxeTableInstance)

            const demo1 = reactive({
              tableData: [
                { id: 110000, parentId: null, name: 'vxe-table test abc1', type: 'mp3', size: 1024, date: '2020-08-01' },
                { id: 111000, parentId: 110000, name: 'vxe-table test abc2', type: 'html', size: 600, date: '2021-04-01' },
          
              ]
            })

            return {
              demo1,
              xTable
            }
          }
        });
        
</script>