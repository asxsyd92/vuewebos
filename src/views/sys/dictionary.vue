<template>
<div>
    <!-- <lay-table :columns="options.cols" :dataSource="options.data" :page="options.page" @change="changepage">
        <template v-slot:operator="{ data }">
            <lay-button size="xs" @click="edit({ data })">修改</lay-button>
            <lay-button size="xs" type="primary" @click="detele({ data })">删除</lay-button>
        </template>
    </lay-table>
 <lay-layer title="新增编辑" move="true" shade="false" v-model="menuvisible">
     <lay-form :model="model" style="width:99%">
    <lay-form-item label="标题" prop="username">
      <lay-input v-model="model"></lay-input>
    </lay-form-item>
    <lay-form-item label="密码" prop="password">
      <lay-input v-model="model" type="password"></lay-input>
    </lay-form-item>
       <lay-form-item>
      <lay-button>提交</lay-button>
    </lay-form-item>
  </lay-form>  
  </lay-layer> -->
      <vxe-table
          show-overflow
          ref="xTable"
          :tree-config="{children:'children'}"
          :loading="options.loading"
          :data="options.data"
          :column-config="{isCurrent: true, isHover: true}"
          :row-config="{isCurrent: true, isHover: true}"
          
          >
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

       <vxe-column type="checkbox" width="60"></vxe-column>
          <vxe-column field="title" title="标题"  tree-node></vxe-column>
          <vxe-column field="tag" title="访问地址"></vxe-column>
          <vxe-column field="color" title="颜色"></vxe-column>
          <vxe-column field="icon" title="图标"></vxe-column>
          <vxe-column title="操作" width="500">
            <template #default="{ row }">
              <vxe-button type="text" status="primary">插入节点</vxe-button>
              <vxe-button type="text" status="primary" >顶部插入节点</vxe-button>
              <vxe-button type="text" status="primary">尾部插入子节点</vxe-button>
              <vxe-button type="text" status="primary" >删除节点</vxe-button>
              <!-- <vxe-button type="text" status="primary" @click="insertRow(row, 'current')">插入节点</vxe-button>
              <vxe-button type="text" status="primary" @click="insertRow(row, 'top')">顶部插入节点</vxe-button>
              <vxe-button type="text" status="primary" @click="insertRow(row, 'bottom')">尾部插入子节点</vxe-button>
              <vxe-button type="text" status="primary" @click="removeRow(row)">删除节点</vxe-button> -->
            </template>
          </vxe-column>
        </vxe-table>
          <vxe-pager
            perfect
             @page-change="pageChange"
            :current-page="options.page.current"
            :page-size="options.page.limit"
            :total="options.page.total"
            :page-sizes="[10, 20, 100, 200,500]"
            :layouts="['PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'Sizes', 'FullJump', 'Total']">
           
          </vxe-pager>
</div>
</template>

<script lang="ts" setup>
import { ref ,reactive} from 'vue';
import http from "../../utils/http";
 import { VxeTableInstance,VxeTableListeners } from 'vxe-table'
var model=new Object();
const menuvisible=ref(false);
const options =reactive( {
    loading:false,
    page: {
        total: 0,
        limit: 10,
        current: 1,
    },

    data: [],
}) as any;
 const changemenuvisible= function() {
        menuvisible.value = !menuvisible.value
    }
        const   pageChange= ({ currentPage, pageSize }:any)=> {
         
                if (options.page) {
                 options.page.current= currentPage
                 options.page.limit = pageSize
                }
                findList()
              }

const edit = function ({ data }: any) {
    changemenuvisible();
    console.log("编辑数据:" + JSON.stringify(data))
}
const detele = function ({ data }: any) {
    console.log("删除数据:" + JSON.stringify(data))
}


const findList = () => {

    var page: any, limt: any;

    page = options.page.current;
    limt = options.page.limit;
    options.loading = true;
    http.post("/api/users/getMenuList", { id:'00000000-0000-0000-0000-000000000000',page: page, limit: limt }, "请稍等...").then(res => {
             options.loading=false;

        if (res.success) {
            options.data = res.data;
            options.page.total = res.count

        }
    });

}

findList();
</script>