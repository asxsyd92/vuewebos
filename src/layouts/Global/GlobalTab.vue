<template>
  <lay-tab
    v-if="appStore.tab"
    :modelValue="route.fullPath"
    @change="change"
    :allowClose="allowClose"
    @close="close"
  >
    <div :key="tab" v-for="tab in appStore.tabs">
      <lay-tab-item
        :id="tab.id"
        :title="tab.title"
        :closable="tab.closable"
      ></lay-tab-item>
    </div>
  </lay-tab>
</template>

<script lang="ts">
export default {
    name: "GlobalTab"
}
</script>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAppStore } from "../../store/app";
const router = useRouter();
const route = useRoute();
const appStore = useAppStore();
const allowClose = ref(true);

const change = function (id: string) {
  router.push(id);
};

const close = function (path: string) {

  appStore.tabs = appStore.tabs.filter((ele:any) => ele.id != path);
  var i=appStore.tabs.length-1 
  if(i>0){
    var id=appStore.tabs[i].id;
     router.push(id); 
  }

};
    // 路由刷新
    const refresh = function () {
      appStore.routerAlive = false;
      setTimeout(function () {
        appStore.routerAlive = true;
      }, 500);
    };

watch(route, function () {
  let bool = false;
  appStore.tabs.forEach((tab:any) => {
    if (tab.id === route.fullPath) {
      bool = true;
    }
  });
  if (!bool) {
    // @ts-ignore
    appStore.tabs.push({ id: route.fullPath, title: route.meta.title });
       refresh();
  }else{
       refresh();
  }
});
</script>
