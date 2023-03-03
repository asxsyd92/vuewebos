<template>
  <div>

    <vxe-table show-overflow ref="xTable" :tree-config="{ children: 'children' }" :loading="options.loading"
      :data="options.data" :column-config="{ isCurrent: true, isHover: true }"
      :row-config="{ isCurrent: true, isHover: true }">
      <!--将表单放在工具栏中-->
      <template #toolbar_buttons>

      </template>
      <vxe-column type="checkbox" width="60"></vxe-column>
      <vxe-column field="title" title="标题" tree-node></vxe-column>
      <vxe-column field="tag" title="访问地址"></vxe-column>
      <vxe-column field="color" title="颜色"></vxe-column>
      <vxe-column field="icon" title="图标"></vxe-column>
      <vxe-column title="操作">
        <template #default="{ row }">
          <span v-for="n in listbutton.rowbuttons" :key="n">
            <vxe-button :icon="n.icon" :title="n.name" circle @click="Events(n,row)"></vxe-button>
        </span>
        </template>
      </vxe-column>
    </vxe-table>
    <vxe-pager perfect @page-change="pageChange" :current-page="options.page.current" :page-size="options.page.limit"
      :total="options.page.total" :page-sizes="[10, 20, 100, 200, 500]"
      :layouts="['PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'Sizes', 'FullJump', 'Total']">

    </vxe-pager>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import http from '../../api/http';
import { layer } from '@layui/layer-vue'
import { useRouter, useRoute } from 'vue-router';
import utils from '../../utils/utils';
import { VxeTableInstance, VxeTableListeners, VXETable } from 'vxe-table'
import popform from '../form/popform.vue';
import listurils from '../../utils/listutils';
const xGrid = ref<VxeTableInstance>();
  const parentlist = ref([]) as any;
const router = useRouter();
    const route = useRoute();
  const area=ref(['50%','40%']);
const options = reactive({
  loading: false,
  page: {
    total: 0,
    limit: 10,
    current: 1,
  },

  data: [],
}) as any;
const listbutton = ref({
  rowbuttons: [] as any,
  toolbarbuttons: [] as any,
});
const search = ref({
  name: '',
  type: "",
  api: ""
});

//
listurils.getButton(route.query.appid, options, listbutton).then((res: any) => {
  //加载完成后刷新列表

  if (res.success) {
  //  search.value.api = res.data.api;


    listurils.searchEvent(options, search, {  page: options.pagerConfig!.currentPage, limit: options.pagerConfig!.pageSize });
  } else {
    layer.notifiy({
      title: "Error",
      content: res.msg,
      icon: 2
    })
  }

});
const pageChange = ({ currentPage, pageSize }: any) => {

  if (options.page) {
    options.page.current = currentPage
    options.page.limit = pageSize
  }
  findList()
}


const findList = () => {

var page: any, limt: any;

page = options.page.current;
limt = options.page.limit;
options.loading = true;
http.post("/api/users/getMenuList", { id: '00000000-0000-0000-0000-000000000000', page: page, limit: limt }).then(res => {
  options.loading = false;

  if (res.success) {

    options.data = res.data;
    parentlist.value = utils.TreeTtoList(res.data, []);
    parentlist.value.push({ label: "根目录", value: '00000000-0000-0000-0000-000000000000' });
    
    parentlist.value.forEach((item: any) => {
      var o = new Object() as any;
      o.label = item.title;
      o.value = item.id;
      parentlist.value.push(o);
    });
    options.page.total = res.count;

  }
});

}

findList();
  //标段保存回调返回结果
  const Callback=(res:any)=>{
    if(res.success){

        findList();
    }else{
        layer.notifiy({  title:"温馨提示", content:res.msg })
    }
  
  }
const a_add = (ent:any,row: any) => {
    utils.openform(ent.title,ent.animation,popform,{   fromid:ent.formid,instanceid:"",callback:Callback },area.value,{parentid:row.id});

  }
  const editRowEvent = (ent:any,row: any) => {
  
  utils.openform(ent.title,ent.animation,popform,{   fromid:ent.formid,instanceid:row.id,callback:Callback },area.value,{parentid:row.parentid});


}
const removeRowEvent = async (ent:any,row: any) => {
    const $grid = xGrid.value
    layer.confirm("您确定要删除该数据", 
    {btn:
        [
            {text:'确认', callback: function(id:any){
          http.post(ent.api,{data: JSON.stringify(row)}).then((res:any)=>{
            if(res.success){
                layer.close(id);
                findList();
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
const Events=(ent:any,row:any)=>{
    try{
 
        switch(ent.events){
            case "searchEvent":findList();
            break;
            case "addEvent":a_add(ent,row);
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