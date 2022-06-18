<template>
  <lay-menu v-model:selectedKey="selectKey" theme="light" v-model:openKeys="openKeys" :collapse="collapse"
    :tree="isTree" :level="appStore.level" :inverted="appStore.inverted">

    <lay-sub-menu v-for="(m, index) in menu" :key="index" :id="index">
    
       <template #icon  @click="zk">
          <lay-tooltip :content="m.title " >
        <lay-icon type="layui-icon-right"></lay-icon>
        </lay-tooltip>
      </template>
   
      <template #title> {{m.title}} </template>



      <lay-menu-item v-for="ms in m.children" :key="ms.id" :id="ms">
        
        <template #icon  @click="zk">
             <lay-tooltip :content="ms.title">
          <lay-icon type="layui-icon-right"  ></lay-icon>
          </lay-tooltip>
        </template>
    
        <template #title > {{ms.title}} </template>

      </lay-menu-item>
    </lay-sub-menu>
  </lay-menu>
</template>

<script lang="ts">
  import { ref, watch, onMounted } from "vue";
  import http from "../../utils/http";
  import { layer } from '@layui/layer-vue'

  export default {
    name: "GlobalMenu",

  };
</script>

<script lang="ts" setup>
  import { useRoute, useRouter } from "vue-router";

  import { useAppStore } from "../../store/app";

  const appStore = useAppStore();

  interface MenuProps {
    collapse: boolean;
  }

  const props = withDefaults(defineProps<MenuProps> (), {
    collapse: false,
  });

  const route = useRoute();
  const router = useRouter();
  const selectKey = ref();
  const openKeys = ref(["0"]);
  const isTree = ref(true);
  const menu = ref([]) as any;
const zk=()=>{
  var top=top as any;
  if(top.document.getElementsByClassName("layui-icon layui-icon-shrink-right").length>0){
    top.document.getElementsByClassName("layui-icon layui-icon-shrink-right")[0].click()
  }else{
     top.document.getElementsByClassName("layui-icon layui-icon-spread-left")[0].click()
  }
}
   const url=ref("");
  watch(route, (val) => {

    val.meta.title=val.query.tabname;
    selectKey.value = val;


  });
  watch(selectKey, (val:any) => {
    if(val.tag!=null&&val.tag!=undefined&&val.tab!=""){

    url.value="/"+val.tag;
    //params:{tabname:row.title}
     //router.push(url.value);
    router.push({ path: url.value, query: {tabname:val.title},params:{tabname:val.title} })
    }

  });

  const getmenu = function () {

    http.post('/api/users/GetAppList', {}).then(res => {
      console.log(res);
      if (res.success) {
        menu.value = res.data;

      } else {
        layer.msg(res.msg, { icon: 2, time: 1000 })

      }

    }).catch(res => {
      layer.msg(res, { icon: 2, time: 1000 })
    });

  }
  onMounted(() => {

    getmenu();
  })

</script>
<style>
.layui-nav-light .layui-nav-child{
    background-color:#eeeeee !important;
}
</style>