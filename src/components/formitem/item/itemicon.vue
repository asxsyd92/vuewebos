    <!--  -->
    <template>



      <lay-col :md="data.data.col" style="margin-bottom: 20px;"  :style="'display:'+data.data.display">

    <lay-form-item :placeholder="data.data.placeholder" class="layui-form-item" :label="data.data.label" :prop="data.data.name" :required="data.data.required ">
<lay-icon-picker v-model="value[data.data.name]" type="layui-icon-face-smile" page showSearch></lay-icon-picker>

    </lay-form-item>

</lay-col>


</template>
<script lang="ts" >
import Vue from "vue";
export default {
  name: "itemicon",
};
</script>
<script lang="ts" setup>
import { ref,reactive ,toRefs   } from "vue";
interface ItemcolorProps {
  data: any;
  value:any;
}
const props = withDefaults(defineProps<ItemcolorProps>(), {
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
//   },setup(props:Data) {
//          const {data,value} = toRefs(props) as any;
//          return{
//           data,value
//          }
//          }
// }


  


</script>
