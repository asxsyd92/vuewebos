
    <template>
      <lay-col md="24" :style="'display:' + data.data.display">
        <lay-form-item  :label="data.data.label"  :prop="data.data.name">
          <lay-select  v-model="selected" :items="items" :create="true" @create="createEvent" multiple>
          </lay-select>
          <lay-input style="display:none" v-model="value[data.data.name]" :placeholder="data.data.placeholder"></lay-input>
        </lay-form-item>
    </lay-col>

  <!-- <div :class="data.data.col" :style="'display:' + data.data.display">

    <lay-form-item :placeholder="data.data.placeholder" class="layui-form-item" :label="data.data.label" :required="data.data.required ">
      <lay-select @change="change" v-model="selected" :items="items" :create="true" @create="createEvent" multiple>
      </lay-select>
      <lay-input style="display:none" v-model="value[data.data.name]" :placeholder="data.data.placeholder"></lay-input>

    </lay-form-item> 

  </div>-->


</template>
<script lang="ts">
import Vue from "vue";
import { values } from 'xe-utils';
export default {
  name: "itemcheckbox",
};
</script>
<script lang="ts" setup>
import { ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import http from "../../../api/http";
import utils from "../../../utils/utils";

interface ItemcolorProps {
  data: any;
  value: any;
}
const props = withDefaults(defineProps<ItemcolorProps>(), {
  data: Object, value: Object
});

const data = ref(props.data);
const value = ref(props.value);
const route = useRoute();
// const change = (val: any) => {
//   if (selected.value.length > 0) {
//     value.value[data.value.data.name] = selected.value.join(",");
//   }


// }

const items = ref([]) as any;
const selected = ref([]) as any;
onMounted(() => {
  createEvent();
})
const createEvent = function () {

  http.post("/api/form/GetDictionaryByCode", { id: data.value.data.data }).then(res => {
    if (res.success) {
      console.log(res.data);
     items.value= utils.TreeTtoList(res.data,[]);
console.log(items.value);

      setTimeout(() => {

        selected.value = value.value[data.value.data.name].split(",")==''?[]:value.value[data.value.data.name].split(",");


      }, 100);
      //items.value=res.data;
      if (route.query.zhuanti != null && route.query.zhuanti != undefined && route.query.zhuanti != "") {
        if (route.query.zhuanti != null && route.query.zhuanti != "" && route.query.zhuanti != undefined)

          setTimeout(() => {
            let result = selected.value.some((ele: any) => ele === route.query.zhuanti) //true
            if (!result) {
              selected.value.push(route.query.zhuanti);
            }

          }, 100);

      }
    }
  });
}

const Arrayfrom=(array:any)=> {
                var arr = []; //一个新的数组存放去重后的结果
                for (var i = 0; i < array.length; i++) {
                    if (arr.indexOf(array[i]) == -1) { //indexof()方法判断在数组中的位置，若不存在，返回-1
                       if(array[i]!=''||array[i]!=undefined||array[i]!=null){
                        arr.push(array[i]);
                       }
                     
                    }
                }
                return arr;
            }

watch(selected, (val) => {
  selected.value=Arrayfrom(selected.value);
  value.value[data.value.data.name] = selected.value.join(",")==''?[]:selected.value.join(",");
});




</script>
