<template>
  <div>
    <lay-form-item label="表单名称">
      <lay-input v-model="modle.name"></lay-input>
    </lay-form-item>
    <!-- <lay-form-item label="表单样式">
      <lay-input v-model="modle.style"></lay-input>
    </lay-form-item> -->
    <lay-form-item label="表">
      <lay-input v-model="modle.table"></lay-input>
    </lay-form-item>
    <lay-form-item label="请求地址">
      <lay-input v-model="modle.url"></lay-input>
         挂载流程时此配置不生效！
    </lay-form-item>

    <lay-form-item label="表单样式">
      <lay-select v-model="modle.style">
        <lay-select-option value="layui-form layui-form-pane" label="方框风格的表单"></lay-select-option>
        <lay-select-option value="layui-form" label="普通表单"> </lay-select-option>
       </lay-select>
    </lay-form-item>

    <div class="layui-form-item">
      <div class="layui-input-block">
        <button type="submit" class="layui-btn layui-btn-normal layui-btn-sm" @click="setsubmit">保存</button>
      </div>
    </div>
  <div class="setheight"></div>
  </div>
</template>

<script lang="ts">

import { values, keys } from 'xe-utils';
import { functionDeclaration } from '@babel/types';
export default {
  name: "setinput",
  mounted() {

  }
};
</script>
<script lang="ts" setup>
import { ref,watch } from "vue";
interface IsetinputProps {
  data: any, setdata: Function
}
const props = withDefaults(defineProps<IsetinputProps>(), {
  data: Object, setdata: Function
});
const data = ref(props.data);

const modle = ref({}) as any;

//data.value.data.forEach((key:any) => {
modle.value=data.value;
console.log(modle.value);
const setsubmit = () => {
  data.value = modle.value;


  props.setdata(data.value);

}
const delsubmit = () => {

}



</script>
