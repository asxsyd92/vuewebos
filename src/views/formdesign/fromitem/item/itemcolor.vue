
    <template>


    <div  :class="data.data.col"  :style="'display:'+data.data.display">

    <lay-form-item :placeholder="data.data.placeholder" class="layui-form-item" :label="data.data.label" :prop="data.data.name">

    <lay-color-picker v-model="color"  eyeDropper simple></lay-color-picker>
    </lay-form-item>

    </div>


</template>
<script lang="ts">
import Vue from "vue";
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
 const color = ref("#009688");
const props = withDefaults(defineProps<ItemcolorProps>(), {
  data:Object, value:Object
});

const data = ref(props.data);
const value = ref(props.value);
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
