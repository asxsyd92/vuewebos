
    <template>


<div  :class="data.data.col"  :style="'display:'+data.data.display">

    <lay-form-item :placeholder="data.data.placeholder" class="layui-form-item" :label="data.data.label" :prop="data.data.name">
  <lay-select v-model="selected" :items="items" :create="true"  @create="createEvent" multiple>
  </lay-select>
    </lay-form-item>

</div>


</template>
<script lang="ts">
import Vue from "vue";
export default {
  name: "itemcheckbox",
};
</script>
<script lang="ts" setup>
import { ref,reactive,onMounted   } from "vue";
  import { useRoute } from "vue-router";
    import http from "../../../utils/http";
    interface ItemcolorProps {
  data: any;
  value:any;
}
const props = withDefaults(defineProps<ItemcolorProps>(), {
  data:Object, value:Object
});

const data = ref(props.data);
const value = ref(props.value);
 const route = useRoute();
 const items=ref([ ]);
  const selected = ref([]) as any;
    onMounted(() => {
        createEvent();
      })
   const createEvent = function () {
  
                http.post("/api/form/GetDictionaryByCode", { id:  data.value.data.data }, "请稍等").then(res => {


          if (res.success) {
            items.value=res.data;
            if(route.query.zhuanti!=null&&route.query.zhuanti!=undefined&&route.query.zhuanti!=""){
               selected.value.push(route.query.zhuanti as never); 
            }
          }});
    }
//     interface Data {
//     [key:string]:null
// }
// export default {
  
//     name: "itemnput",

//   props: {  //指定接收的值，必须指定类型
//     data: {
//       type:Object
//     },
//     value:{
//          type:Object
//     }
//   }, setup(props:Data) {
//          const {data,value} = toRefs(props) as any;
   
//     const selected = ref([]) as any;
//      const route = useRoute();
//     const items=ref([ ]);

    
//     onMounted(() => {
//         createEvent();
//       })
//    const createEvent = function () {
  
//                 http.post("/api/form/GetDictionaryByCode", { id:  data.value.data.data }, "请稍等").then(res => {


//           if (res.success) {
//             items.value=res.data;
//             if(route.query.zhuanti!=null&&route.query.zhuanti!=undefined&&route.query.zhuanti!=""){
//                selected.value.push(route.query.zhuanti as never); 
//             }
//           }});
//     }
//     return {
//       selected,items,createEvent,data,value
//     }
//   }
// }


  


</script>
