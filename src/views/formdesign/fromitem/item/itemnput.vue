<template>
<div>

<div v-if="data.type=='input'" :class="data.data.col"  :style="'display:'+data.data.display">
<div v-if="data.data.type=='number'">
    <lay-form-item :placeholder="data.data.placeholder" class="layui-form-item" :label="data.data.label" :prop="data.data.name">
 
  <lay-input-number v-model="value[data.data.name]" ></lay-input-number>
    </lay-form-item>

</div>
<div v-else-if="data.data.type=='date'">
    <lay-form-item :placeholder="data.data.placeholder" class="layui-form-item" :label="data.data.label" :prop="data.data.name">
 
       <lay-date-picker v-model="value[data.data.name]"></lay-date-picker>
    </lay-form-item>
</div>
<div v-else>
    <lay-form-item :placeholder="data.data.placeholder" class="layui-form-item" :label="data.data.label" :prop="data.data.name">
 
  <lay-input v-model="value[data.data.name]" ></lay-input>
    </lay-form-item>
</div>
</div>
<div v-if="data.type=='textarea'" :class="data.data.col"  :style="'display:'+data.data.display">
  <lay-form-item :placeholder="data.data.placeholder" class="layui-form-item"  :label="data.data.label" :prop="data.data.name">
      <lay-textarea v-model="value[data.data.name]" ></lay-textarea>
    </lay-form-item></div>
</div>

</template>
<script lang="ts">
import Vue from "vue";
export default {
  name: "itemnput",
};
</script>
<script lang="ts" setup>
import { ref,reactive   } from "vue";
interface ItemnputProps {
  data: any;
  value:any;
}
const props = withDefaults(defineProps<ItemnputProps>(), {
  data:Object, value:Object
});

const data = ref(props.data);
const value = ref(props.value);
// interface Data {
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
//   },
//   setup(props:Data) {
//          const {data,value} = toRefs(props) as any;
// return {
//   data,
//   value
// }
//          }


// }

</script>
