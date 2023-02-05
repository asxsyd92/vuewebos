
<template>
  <lay-col style="margin-bottom: 20px;" :md="data.data.col" :style="'display:' + data.data.display">
    <lay-form-item :label="data.data.label" :prop="data.data.name" :required="required">
        <lay-select @change="change" v-model="selected" :items="items" :create="true" @create="createEvent"
          :multiple="multiple" :showSearch="showSearch">
        </lay-select>
      <lay-input v-model="value[data.data.name]" :placeholder="data.data.placeholder"></lay-input>
    </lay-form-item>
  </lay-col>




</template>
<script lang="ts">
import Vue from "vue";
import { values } from 'xe-utils';
import { treeToList } from '../../../library/treeUtil';
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
const items = ref([]) as any;
const selected = ref([]) as any;
const data = ref(props.data);
const value = ref(props.value);
const route = useRoute();
const required = ref(true);
const showSearch = ref(false);
const multiple = ref(false);
if (data.value.data.required == "true") {
  required.value = true;
} else {
  required.value = false;
}
if (data.value.data.showSearch == "true") {
  showSearch.value = true;
} else {
  showSearch.value = false;
}
if (data.value.data.multiple == "true") {
  multiple.value = true;
} else {
  multiple.value = false;
}
const change = (val: any) => {

  if (multiple.value) {
    selected.value = Arrayfrom(selected.value);
    if (selected.value != "") {
      value.value[data.value.data.name] = selected.value.sort().join(",");
    }
 
  }  
   else {
      value.value[data.value.data.name] =selected.value;
    }



}



const createEvent = function () {
  //字典数据
  if (data.value.data.type == "dic") {
    http.post("/api/form/GetDictionaryByCode", { id: data.value.data.data }).then(res => {
      if (res.success) {
        console.log(res.data);
        items.value = treeToList(res.data);

        if (route.query.zhuanti != null && route.query.zhuanti != undefined && route.query.zhuanti != "") {


          setTimeout(() => {
            let result = selected.value.some((ele: any) => ele === route.query.zhuanti) //true
            if (!result) {
              var k = route.query.zhuanti as any;
              if (multiple.value) {
                selected.value = k.split(",");
              //赋值默认选择
              value.value[data.value.data.name] = selected.value.join(",");
              }else{
                selected.value = k;
              //赋值默认选择
              value.value[data.value.data.name] = selected.value;
              }
             
            }

          }, 100);

        } else {
          if (value.value[data.value.data.name] != "") {
            if (multiple.value) {
              selected.value = value.value[data.value.data.name].split(",");
            }else{
              selected.value = value.value[data.value.data.name];
            }
          
          }



        }
      }
    });
  }
  if (data.value.data.type == "local") {

  }
  if (data.value.data.type == "api") {
    http.post(data.value.data.data, {}).then(resp => {
      if (resp.success) {
        items.value = resp.data;
        if (value.value[data.value.data.name] != "") {
          if (multiple.value) {
            selected.value = value.value[data.value.data.name].split(",");
          }else{
            selected.value = value.value[data.value.data.name];
          }
       
        }
        //  showtext.value=radio.value.filter((ele:any) => ele.value == value.value[data.value.data.name]);
      }
    }).catch(resp => {


    })
  }
}

const Arrayfrom = (array: any) => {
  var arr = []; //一个新的数组存放去重后的结果
  for (var i = 0; i < array.length; i++) {
    if (arr.indexOf(array[i]) == -1) { //indexof()方法判断在数组中的位置，若不存在，返回-1
      if (array[i] != '' || array[i] != undefined || array[i] != null) {
        arr.push(array[i]);
      }

    }
  }
  return arr.sort();
}

// watch(selected, (val) => {`
//   selected.value = Arrayfrom(selected.value);
//   if( selected.value!="")
//   value.value[data.value.data.name] =  selected.value.join(",");
// });



onMounted(() => {
  createEvent();
})
</script>
