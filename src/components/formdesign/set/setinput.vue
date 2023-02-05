<template>
  <div>
    <lay-form-item label="名称">
      <lay-input v-model="modle.label"></lay-input>
    </lay-form-item>
    <lay-form-item label="id">
      <lay-input v-model="modle.id"></lay-input>
    </lay-form-item>
    <lay-form-item label="name">
      <lay-input v-model="modle.name"></lay-input>
    </lay-form-item>
    <lay-form-item label="提示">
      <lay-input v-model="modle.placeholder"></lay-input>
    </lay-form-item>

    <lay-form-item label="值">
      <lay-select v-model="modle.value">
        <lay-select-option value="" label="空值"></lay-select-option>
                <lay-select-option value="0" label="数字"></lay-select-option>
        <lay-select-option value="@_SYS_GETUSERID" label="获取当前用户id"> </lay-select-option>
        <lay-select-option value="@_SYS_GETUSERNAME" label="获取当前用户名"></lay-select-option>
        <lay-select-option value="@_SYS_GETUSERNICKNAME" label="获取当前用户昵称"></lay-select-option>
        <lay-select-option value="@_SYS_ORGID" label="获取当前组织id"></lay-select-option>
        <lay-select-option value="@_SYS_ORGNAME" label="获取当前组织"></lay-select-option>
        <lay-select-option value="@_SYS_DATETIME" label="获取当前时间"></lay-select-option>
        <lay-select-option value="00000000-0000-0000-0000-000000000000" label="获取空Guid"></lay-select-option>
        <lay-select-option value="@_SYS_GW" label="获取当前岗位名称"></lay-select-option>
      </lay-select>
    </lay-form-item>
    <lay-form-item label="类型">
      <lay-select v-model="modle.type">
        <lay-select-option value="text" label="text"></lay-select-option>
        <lay-select-option value="password" label="password"> </lay-select-option>
        <lay-select-option value="datetime" label="datetime"></lay-select-option>
        <lay-select-option value="date" label="date"></lay-select-option>
        <lay-select-option value="number" label="number"></lay-select-option>
        <lay-select-option value="textarea" label="textarea"></lay-select-option>
        <lay-select-option value="idcard" label="idcard"></lay-select-option>
      </lay-select>
    </lay-form-item>
    <lay-form-item label="显示样式">
      <lay-select v-model="modle.col">
        <lay-select-option value="1" label="1"></lay-select-option>
        <lay-select-option value="2" label="2"></lay-select-option>
        <lay-select-option value="3" label="3"></lay-select-option>
        <lay-select-option value="4" label="4"></lay-select-option>
        <lay-select-option value="5" label="5"></lay-select-option>
        <lay-select-option value="6" label="6"></lay-select-option>
        <lay-select-option value="7" label="7"></lay-select-option>
        <lay-select-option value="8" label="8"></lay-select-option>
        <lay-select-option value="9" label="9"></lay-select-option>
        <lay-select-option value="10" label="10"></lay-select-option>
        <lay-select-option value="11" label="11"></lay-select-option>
        <lay-select-option value="12" label="12"></lay-select-option>
        <lay-select-option value="13" label="13"></lay-select-option>
        <lay-select-option value="14" label="14"></lay-select-option>
        <lay-select-option value="15" label="15"></lay-select-option>
        <lay-select-option value="16" label="16"></lay-select-option>
        <lay-select-option value="17" label="17"></lay-select-option>
        <lay-select-option value="18" label="18"></lay-select-option>
        <lay-select-option value="19" label="19"></lay-select-option>
        <lay-select-option value="20" label="20"></lay-select-option>
        <lay-select-option value="21" label="21"></lay-select-option>
        <lay-select-option value="22" label="22"></lay-select-option>
        <lay-select-option value="23" label="23"></lay-select-option>
        <lay-select-option value="24" label="24"></lay-select-option>
      </lay-select>
    </lay-form-item>

    <lay-form-item label="文本框样式">
      <lay-radio v-model="modle.inputclass" value="layui-input">layui-input</lay-radio>
      <lay-radio v-model="modle.inputclass" value="layui-inline">layui-inline</lay-radio>

    </lay-form-item>
    <lay-form-item label="文本显示">
      <lay-radio v-model="modle.showtext" value="true">是</lay-radio>
      <lay-radio v-model="modle.showtext" value="false">否</lay-radio>

    </lay-form-item>

    <lay-form-item label="是否隐藏">
      <lay-radio v-model="modle.display" value="none">是</lay-radio>
      <lay-radio v-model="modle.display" value="block">否</lay-radio>

    </lay-form-item>
    <lay-form-item label="是否必填">
      <lay-radio v-model="modle.required" value="true">是</lay-radio>
      <lay-radio v-model="modle.required" value="false">否</lay-radio>

    </lay-form-item>
    <lay-form-item label="是否编辑">
      <lay-radio v-model="modle.disabled" value="disabled">是</lay-radio>
      <lay-radio v-model="modle.disabled" value="block">否</lay-radio>

    </lay-form-item>
    <div class="layui-form-item">
      <div class="layui-input-block">
        <button type="submit" class="layui-btn layui-btn-normal layui-btn-sm" @click="setsubmit">保存</button>

        <button type="submit" class="layui-btn layui-btn-danger layui-btn-sm" @click="delsubmit">移除</button>


      </div>
    </div>
    <div class="setheight"></div>
  </div>
</template>

<script lang="ts">

import { values, keys, debounce } from 'xe-utils';
import { functionDeclaration } from '@babel/types';
export default {
  name: "setinput",
  mounted() {

  }
};
</script>
<script lang="ts" setup>
import { ref, watch } from "vue";
interface IsetinputProps {
  data: any, setdata: Function
}
const props = withDefaults(defineProps<IsetinputProps>(), {
  data: Object, setdata: Function
});
;
const data = ref(props.data);

const modle = ref({}) as any;
//data.value.data.forEach((key:any) => {
for (let keys in data.value.data) {
  modle.value[keys] = data.value.data[keys];



};
console.log(modle.value);
const setsubmit = () => {
  data.value.data = modle.value;
  props.setdata(data.value, "save");
}
const delsubmit = () => {
  data.value.data = modle.value;



  props.setdata(data.value, "del");
}

watch(modle.value, (newValue, oldValue) => {

  modle.value.name = modle.value.id;
  modle.value.placeholder = "请输入" + modle.value.label;

});


</script>
