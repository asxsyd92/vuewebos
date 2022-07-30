
    <template>


    <div  :class="data.data.col"  :style="'display:'+data.data.display">

    <lay-form-item :placeholder="data.data.placeholder" class="layui-form-item" :label="data.data.label" :prop="data.data.name" :required="data.data.required ">

    <lay-color-picker v-model="value[data.data.name]"  eyeDropper simple></lay-color-picker>
    </lay-form-item>

    </div>


</template>
<script lang="ts">
import Vue from "vue";
import { indexOf } from 'xe-utils';
export default {
  name: "itemcolor",
};
</script>
<script lang="ts" setup>
import { ref,reactive    } from "vue";
interface ItemcolorProps {
  data: any;
  value:any;
}

const props = withDefaults(defineProps<ItemcolorProps>(), {
  data:Object, value:Object
});

const data = ref(props.data);
const value = ref(props.value);
if(value.value[data.value.data.name]==null||value.value[data.value.data.name]==""){
 value.value[data.value.data.name]="#fff";
}else if(value.value[data.value.data.name].indexOf("rgb")>-1){
   value.value[data.value.data.name]="#fff";
}

// export default {
  
//     name: "itemnput",

//   props: {  //指定接收的值，必须指定类型
//     data: {
//       type:Object
//     },
//     value:{
//          type:Object
//     }
//   }
  
// }


  


</script>
