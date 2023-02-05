
<template>
    <lay-layout>
        <!--  -->
  
        <lay-body>
  
            <vxe-grid ref="xGrid" v-bind="gridOptions" v-on="gridEvents"
                :column-config="{ isCurrent: true, isHover: true }" :row-config="{ isCurrent: true, isHover: true }">
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
                                    <lay-button :size="n.size" :type="n.status" border-style="dashed" @click="Events(n,null)">{{n.name}}</lay-button>
  
                                  </lay-button-group>
  
                            </template>
                        </vxe-form-item>
                    </vxe-form>
                </template>
  
                <template #operate="{ row }">
                    <span v-for="n in rowbuttons" :key="n">
                        <vxe-button :icon="n.icon" :title="n.name" circle @click="Events(n,row)"></vxe-button>
                    </span>
               </template>
            </vxe-grid>
        </lay-body>
    </lay-layout>
  </template>
  <script lang="ts" setup>
  
  import http from '../../api/http';
  import { useRouter, useRoute } from 'vue-router';
  import popform from '../form/popform.vue';
  import { layer } from "@layui/layer-vue"
  import { reactive, ref,  h, resolveComponent } from 'vue'
  import { VXETable, VxeGridInstance, VxeGridListeners, VxeGridProps } from 'vxe-table'
  import utils from '../../utils/utils';
  const xGrid = ref<VxeGridInstance>()
  
  const formid = ref("");
  const instanceid = ref("");
  const toolbarbuttons=ref([]) as any;
  const rowbuttons=ref([]) as any;
  const _popform=ref(null) as any;
  const rolevisible=ref(false);
  const area=ref(['50%','40%']);
  const router = useRouter();
    const route = useRoute();
  const depOptions = reactive({
    loading: false,
    depData: []
  })
  //加载按钮
  // const finbuuton=()=>{
  //   depOptions.loading = true;
  
  
  // http.post("/api/common/getRoleBuutton", { pathname: route.path }).then(res => {
  //   depOptions.loading = false
  
  //   if (res.success) {
  //       if(res.data.length>0){
  //       area.value=[res.data[0].areax,res.data[0].areay]
  //   }

  //   toolbarbuttons.value=res.data.filter((item:any) => {  return item.type == 1 });
   
  
  //   console.log(area.value)
  //   rowbuttons.value=res.data.filter((item:any) =>{return item.type == 2});
  //                   }
  //               } );
  // }
  // finbuuton();
  utils.finbuuton(route.path,depOptions).then((res:any)=>{
        if(res.success){
          area.value=res.area;
          toolbarbuttons.value=res.toolbarbuttons;
          rowbuttons.value=res.rowbuttons;
        }
  });
  
  //信息
  const search = ref({
    name: '',
    type: ""
  });
  
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
        { type: 'checkbox', width: 50 },
{ field: 'sitename', title: '网站名称', titlePrefix: { message: '名称必须填写！' }, editRender: { name: 'input', attrs: { placeholder: '请输入名称' } } },
{ field: 'domainname', title: '域名', titlePrefix: { message: '名称必须填写！' }, editRender: { name: 'input', attrs: { placeholder: '请输入名称' } } },
{ field: 'creationtime', title: '创建时间' },
{
    field: 'isgrey',
    title: '是否灰色',
    sortable: true,
    filters: [
        { label: '是', value: '1' },
        { label: '否', value: '0' },

    ]
},
        { title: '操作', fixed: "right", width: 150, slots: { default: 'operate' } }
    ],
    data: []
  })
  //标段保存回调返回结果
  const Callback=(res:any)=>{
    if(res.success){
        rolevisible.value = false;
        findList();
    }else{
        layer.notifiy({  title:"温馨提示", content:res.msg })
    }
  
  }
  const findList = () => {
    gridOptions.loading = true;
    var page: any, limt: any;
    if (gridOptions.pagerConfig) {
        page = gridOptions.pagerConfig.currentPage;
        limt = gridOptions.pagerConfig.pageSize;
    }
    http.post("/api/siteconfig/getPageSiteConfig", { type: search.value.type, title: search.value.name, page: page, limit: limt }).then(res => {
        gridOptions.loading = false
  
        if (res.success) {
            gridOptions.data = res.data;
  
            if (gridOptions.pagerConfig) {
                gridOptions.pagerConfig.total = res.count
            }
        }
    });
  }
  
  
  
  const editRowEvent = (ent:any,row: any) => {
  
    utils.openform(ent.title,ent.animation,popform,{   fromid:ent.formid,instanceid:row.id,callback:Callback },area.value,new Object());
  
  
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
  
  const removeRowEvent = async (ent:any,row: any) => {
    const $grid = xGrid.value
    layer.confirm("您确定要删除该数据", 
    {btn:
        [
            {text:'确认', callback: function(id:any){
          http.post(ent.api,{id:row.id}).then((res:any)=>{
            if(res.success){
                layer.close(id);
                searchEvent();
                layer.notifiy({  title:"温馨提示", content:res.msg })
          
              
            }else{
                layer.notifiy({  title:"温馨提示", content:res.msg })
                layer.close(id);
            }
          }).catch((error:any)=>{
            layer.notifiy({  title:"温馨提示", content:"网络错误！" })
            layer.close(id);
          })
             
            }},
            {text:'取消', callback: function(id:any){layer.close(id);}}
        ]
    })
  
  }
  
  const a_index = async (row: any) => {
    search.value.type = row.row.id;
  
    findList();
  
  }
  
  findList()
  const searchEvent = () => {
    findList();
  }
  
  const formData = reactive({
    name: ''
  });
  
  const a_add = (ent:any) => {
    utils.openform(ent.title,ent.animation,popform,{   fromid:ent.formid,instanceid:"",callback:Callback },area.value,new Object());
  
  
  
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
  const Events=(ent:any,row:any)=>{
    try{
 
        switch(ent.events){
            case "searchEvent":searchEvent();
            break;
            case "addEvent":a_add(ent);
            break;
  
            case "editEvent":editRowEvent(ent,row);
            break;
            case "deleteEvent":removeRowEvent(ent,row);
            break;
        }
    }catch(e){
        layer.msg("按钮解析失败", { icon: 3, time: 1000 })
    }
  
  }
  </script>
  