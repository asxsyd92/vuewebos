<template>
<div>

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
  
          </template>

       <vxe-column type="checkbox" width="60"></vxe-column>
          <vxe-column field="title" title="标题"  tree-node></vxe-column>
          <vxe-column field="tag" title="访问地址"></vxe-column>
          <vxe-column field="color" title="颜色"></vxe-column>
          <vxe-column field="icon" title="图标"></vxe-column>
          <vxe-column title="操作" >
            <template #default="{ row }">
              <vxe-button icon="fa fa fa-pencil fa-fw" title="查看" circle @click="editRowEvent(row)"></vxe-button>
               <vxe-button icon="fa fa-plus-square-o" title="添加" circle @click="addRowEvent(row)"></vxe-button>
              <vxe-button icon="fa fa-trash" title="删除" circle @click="removeRowEvent(row)"></vxe-button>
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


         
        <lay-layer move="true" :btn="menubtn" :closeBtn="false" :area="['50%', '80%']" :shadeClose="false"
            @submit="submit" title="新增→修改" v-model="menuvisible">
            <div class="laymodle">
             <lay-form :model="menumodel">
             <lay-form-item label="标题" prop="title">
             <lay-input v-model="menumodel.title"></lay-input>
             </lay-form-item>
              <lay-form-item label="路径" prop="tag">
             <lay-input v-model="menumodel.tag"></lay-input>
             </lay-form-item>
              <lay-form-item label="id" prop="id" style="display:none">
             <lay-input v-model="menumodel.id"></lay-input>
             </lay-form-item>
             <lay-form-item label="parentid" prop="parentid" style="display:none">
             <lay-input v-model="menumodel.parentid"></lay-input>
             </lay-form-item>
              <lay-form-item label="参数" prop="params" >
             <lay-textarea  v-model="menumodel.parentid"></lay-textarea>
             </lay-form-item>
              <lay-form-item label="图标" prop="icon">
             <lay-input v-model="menumodel.icon"></lay-input>
             </lay-form-item>
                  <lay-form-item label="颜色" prop="color">
             <lay-input v-model="menumodel.color"></lay-input>
             </lay-form-item>
             </lay-form>


            </div>
        </lay-layer> 
</div>
</template>

<script lang="ts" setup>
import { ref ,reactive} from 'vue';
import http from "../../utils/http";
 import { VxeTableInstance,VxeTableListeners } from 'vxe-table'
var menumodel=ref({
  title:"",
  tag:"",
  id:"",
  icon:"",
  color:"",
  params:"",
  roleid:"",
  extend:"",
parentid:''
}) as any;
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

const removeRowEvent=(row: any)=>{

}
const addRowEvent=(row: any)=>{
  console.log(row);
  menumodel.value.roleid=row.roleid;
  menumodel.value.parentid=row.parentid;
  menuvisible.value=true;
}
const editRowEvent=(row: any)=>{
  menumodel.value.title=row.title;
   menumodel.value.tag=row.tag;
   menumodel.value.id=row.id;
    menumodel.value.icon=row.icon;
    menumodel.value.color=row.color;
    menumodel.value.params=row.params;
    menumodel.value.roleid=row.roleid;
    menumodel.value.parentid=row.parentid;
    menuvisible.value=true;
}
const submit=()=>{

}

        const menubtn = [
            {
                text: "确认",
                callback: (e) => {
                    //submit();
                },
            },
            {
                text: "取消",
                callback: () => {
                    menuvisible.value = false;
                },
            },
        ];

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