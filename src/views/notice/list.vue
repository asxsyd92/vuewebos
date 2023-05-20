<template>
  <lay-card>

    <template v-slot:body>
      <lay-row>
        <lay-col>
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
    </template>
  </lay-card>
</template>
<script lang="ts">
export default {
  name: "mianwait"
}
</script>
<script lang="ts" setup>
import { ref, nextTick } from "vue";
import { layer } from "@layui/layer-vue";
import http from 'webosutils/lib/http';
import { useRoute } from 'vue-router';
import { ReleaseIcon } from '@layui/icons-vue';
import { useRouter } from 'vue-router';
import listurils from '../../utils/listutils';
import popform from '../form/popform.vue';
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
    limits: [5]
  },
  columns: [
    // { key: 'checkbox', width: 50 },
    { type: 'checkbox', width: 50 },
        { key: 'title', title: '标题' },
        { key: 'username', title: '作者', },
        { key: 'addtime', title: '发表时间', },
    {
      title: "操作",

      fixed: "right",
      customSlot: "operator",
      key: "operator"
    }
  ],
  api: "",
  search: {
    type: route.query.zhuanti,
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
const change = (p: any) => {

  config.value.page.current = p.current;
  config.value.page.limit = p.limit;
  listurils.searchEvent(config);
}
const Callback=()=>{
  listurils.searchEvent(config);
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
<style scoped></style>

