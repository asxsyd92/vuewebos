<template>
  <lay-card>
    <lay-row space="10">
      <lay-col md="6">
        <lay-tree :data="data" :showLine="showLine" @node-click="getdic"	>
        </lay-tree>

      </lay-col>
      <lay-col md="18">

          <lay-table :loading="config.loading" :columns="config.columns" :page="config.page" @change="change"
            :data-source="config.data" class="project-grids">

            <template #toolbar>
              <lay-input v-model="config.search.name" size="sm" placeholder="搜索" suffix-icon="layui-icon-search"
                style="width: 20%;"></lay-input>

              <lay-button-group v-for="n in listbutton.toolbarbuttons" :key="n">
                <lay-button :size="n.size" :type="n.status" border-style="dashed" @click="Events(n, null)"> {{ n.name
                }}</lay-button>
              </lay-button-group>
            </template>
            <template v-slot:operator="{ row }">
              <span v-for="n in listbutton.rowbuttons" :key="n">
                <lay-tooltip :content="n.name" position="bottom" :is-dark="true">
                  <button class="a-button type--button is--circle" circle @click="Events(n, row)">
                    <lay-icon :type="n.icon" :color="n.color">

                    </lay-icon>
                  </button>
                </lay-tooltip>

              </span>

            </template>
          </lay-table>
    

      </lay-col>

    </lay-row>
  </lay-card>
</template>

<script lang="ts" setup>
import http from 'webosutils/lib/http';
import { layer } from '@layui/layer-vue'
import { useRouter, useRoute } from 'vue-router';
import utils from '../../utils/utils';
import popform from '../form/popform.vue';
import listurils from '../../utils/listutils';
import { ref } from 'vue';
const showLine = ref(false);
const data = ref([]);
const router = useRouter();
const route = useRoute();
const listbutton = ref({
  rowbuttons: [] as any,
  toolbarbuttons: [] as any,
});
const size = ref("sm");
const config = ref({
  loading: true,
  data: [],
  page: {
    total: 0,
    limit: 10,
    current: 1,
    showRefresh: true,
    limits: [5,10,20,50,100,200]
  },
  columns: [
    // { key: 'checkbox', width: 50 },
    { key: 'title', title: '标题' },
    { key: 'id', title: 'id', },
    { key: 'code', title: '唯一标识', },
    { key: 'icon', title: '图标', },
    {
      title: "操作",

      fixed: "right",
      customSlot: "operator",
      key: "operator"
    }
  ],
  api: "",
  search: {
    id: "",
    name: ""
  }
});

listurils.getButton(route.query.appid, config, listbutton).then((res: any) => {
  //加载完成后刷新列表

  if (res.success) {
    config.value.api = res.data.api;
    if (listbutton.value.toolbarbuttons.length > 0) {
      size.value = listbutton.value.toolbarbuttons[0].size;
    }
    listurils.searchEvent(config);
  } else {
    layer.notifiy({
      title: "Error",
      content: res.msg,
      icon: 2
    })
  }

});
const getdic=(item:any)=>{
  config.value.search.id=item.id;
  listurils.searchEvent(config);
}

const change = (p: any) => {

config.value.page.current = p.current;
config.value.page.limit = p.limit;
listurils.searchEvent(config);
}
const findList = () => {

var page: any, limt: any;

page = config.value.page.current;
limt = config.value.page.limit;
config.value.loading = true;
http.post("/api/users/getMenuList", { id: '00000000-0000-0000-0000-000000000000', page: page, limit: limt }).then(res => {
  config.value.loading  = false;

  if (res.success) {
    data.value = res.data;
   // config.value.page.tota = res.count
  //  if(treeExpandRecords.value.length>0){
  //   setTimeout(()=>{
  //     const $table = xdTable.value as any;
  //   $table.setTreeExpand(treeExpandRecords.value,false);
  //   },1000);

  //  }
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


const Events = (ent: any, row: any) => {
  try {

    switch (ent.events) {
      case "editEvent":
        if (ent.ispopup == 0) {
          var query = new Object() as any;
          query.fromid = ent.formid;
          query.instanceid = row.instanceid;
          query.zhuanti = row.classid;
          query.tabname = encodeURIComponent(row.title);
          router.push({ path: "/formdesign/submitfrom", query: query, params: { tabname: row.title } })


        } else {
          listurils.editRowEvent(popform, ent, row, { fromid: ent.formid, instanceid: row.id, callback: Callback }, {});

        }
        break;
      case "searchEvent":
        if (config.value.page) {
          listurils.searchEvent(config);
        }

        break;
      case "deleteEvent": listurils.removeRowEvent(ent, row, listurils.searchEvent, config);
        break;
      case "addEvent":
        if (ent.ispopup == 0) {
          var query = new Object() as any;
          query.fromid = ent.formid;
          query.instanceid = "";
          query.zhuanti = route.query.zhuanti;
          query.tabname = encodeURIComponent(ent.title);
          router.push({ path: ent.api, query: query })

        } else {
          listurils.addEvent(popform, ent, { fromid: ent.formid, instanceid: "", callback: Callback }, {});

        }
        break;

      case "previewEvent": listurils.previewEvent(popform, ent, row);
        break;
    }
  } catch (e) {
    layer.msg("按钮解析失败", { icon: 3, time: 1000 })
  }

}
</script>