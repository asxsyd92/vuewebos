<template>
  <lay-card>
    <template v-slot:title>
      待办事项
    </template>
    <template v-slot:extra>
      更多》
    </template>
    <template v-slot:body>
      <lay-row>
        <lay-col>
          <lay-table  :loading="loading" :columns="waitcolumns" :page="page" @change="change" :data-source="mianwait" class="project-grids">

            <template v-slot:operator="{ row }">
              <!-- <lay-button size="xs">处理</lay-button>
              layui-icon-release -->
              <ReleaseIcon @click="editRowEvent(row)"></ReleaseIcon>
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
import {  ReleaseIcon } from '@layui/icons-vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const loading = ref(false);
const page = ref({
  total: 0,
  limit: 5,
  current: 1,
  showRefresh: true,
});
const change = (p: any) => {
  layer.msg("current:" + p.current + " limit:" + p.limit);
  page.value.current = p.current;
  page.value.limit = p.limit;
  findList();
}

const waitcolumns = ref([

  {
    title: "标题",

    key: "title"
  }, {
    title: "发送人",
    slot: "password",
    key: "sendername"
  }, {
    title: "步骤",
    key: "stepname"
  }, {
    title: "操作",

    fixed: "right",
    customSlot: "operator",
    key: "operator"
  }
]);

const mianwait = ref([])
nextTick(() => {
  var chartDom = document.getElementById('main');
  // @ts-ignore
  var myChart = echarts.init(chartDom);
  var option;

  option = {
    legend: {
      data: ['Allocated Budget', 'Actual Spending']
    },
    radar: {
      indicator: [
        { name: '进攻', max: 6500 },
        { name: '技巧', max: 16000 },
        { name: '力量', max: 30000 },
        { name: '速度', max: 38000 },
        { name: '体能', max: 52000 },
        { name: '防守', max: 25000 }
      ]
    },
    series: [
      {
        name: 'Budget vs spending',
        type: 'radar',
        data: [
          {
            value: [4200, 3000, 20000, 35000, 50000, 18000],
          },
          {
            value: [5000, 14000, 28000, 26000, 42000, 21000],
          }
        ]
      }
    ]
  };

  option && myChart.setOption(option);
})
const editRowEvent = (row: any) => {

console.log(row);
var query = new Object() as any;
query.instanceid = row.instanceid;
query.taskid = row.id;
query.groupid = row.groupid;
query.flowid = row.flowid;
query.stepid = row.stepid;
query.tabname =encodeURIComponent(row.title);

router.push({ path: "/oa/workrun/index", query: query })

}
const findList = () => {
  loading.value = true;
  http.post("/api/workflowtasks/WaitList", { page: page.value.current, limit: page.value.limit }).then((res: any) => {
    loading.value = false;
    if (res.success) {
      //  layer.close(id);
      //findList();
      mianwait.value = res.data;
      page.value.total = res.count;
      layer.notifiy({ title: "温馨提示", content: res.msg })


    } else {
      layer.notifiy({ title: "温馨提示", content: res.msg })
      // layer.close(id);
    }
  }).catch((error: any) => {
    layer.notifiy({ title: "温馨提示", content: "网络错误！" })
    //layer.close(id);
  })
}

findList();
</script>
<style scoped>
.project-grids {
  width: 99%;
}
</style>

