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
        <lay-select-option value="layui-col-md1" label="layui-col-md1"></lay-select-option>
        <lay-select-option value="layui-col-md2" label="layui-col-md2"></lay-select-option>
        <lay-select-option value="layui-col-md3" label="layui-col-md3"></lay-select-option>
        <lay-select-option value="layui-col-md4" label="layui-col-md4"></lay-select-option>
        <lay-select-option value="layui-col-md5" label="layui-col-md5"></lay-select-option>
        <lay-select-option value="layui-col-md6" label="layui-col-md6"></lay-select-option>
        <lay-select-option value="layui-col-md7" label="layui-col-md7"></lay-select-option>
        <lay-select-option value="layui-col-md8" label="layui-col-md8"></lay-select-option>
        <lay-select-option value="layui-col-md9" label="layui-col-md9"></lay-select-option>
        <lay-select-option value="layui-col-md10" label="layui-col-md10"></lay-select-option>
        <lay-select-option value="layui-col-md11" label="layui-col-md11"></lay-select-option>
        <lay-select-option value="layui-col-md12" label="layui-col-md12"></lay-select-option>
      </lay-select>
    </lay-form-item>

    <lay-form-item label="文本框样式">
      <lay-radio v-model="modle.inputclass" label="layui-input">layui-input</lay-radio>
      <lay-radio v-model="modle.inputclass" label="layui-inline">layui-inline</lay-radio>

    </lay-form-item>
    <lay-form-item label="文本显示">
      <lay-radio v-model="modle.showtext" label="true">是</lay-radio>
      <lay-radio v-model="modle.showtext" label="false">否</lay-radio>

    </lay-form-item>

    <lay-form-item label="是否隐藏">
      <lay-radio v-model="modle.display" label="true">是</lay-radio>
      <lay-radio v-model="modle.display" label="false">否</lay-radio>

    </lay-form-item>
    <lay-form-item label="是否必填">
      <lay-radio v-model="modle.required" label="true">是</lay-radio>
      <lay-radio v-model="modle.required" label="false">否</lay-radio>

    </lay-form-item>
    <lay-form-item label="是否编辑">
      <lay-radio v-model="modle.disabled" label="true">是</lay-radio>
      <lay-radio v-model="modle.disabled" label="false">否</lay-radio>

    </lay-form-item>
    <div class="layui-form-item">
      <div class="layui-input-block">
        <button type="submit" class="layui-btn layui-btn-normal layui-btn-sm" @click="setsubmit">保存</button>

        <button type="submit" class="layui-btn layui-btn-danger layui-btn-sm" @click="delsubmit">移除</button>


      </div>
    </div>
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
import { ref, getCurrentInstance } from "vue";
interface IsetinputProps {
  data: any, setdata: Function
}
const props = withDefaults(defineProps<IsetinputProps>(), {
  data: Object, setdata: Function
});
const data = ref(props.data);

const modle = ref({}) as any;
//data.value.data.forEach((key:any) => {
for (let keys in data.value.data) {
  modle.value[keys] = data.value.data[keys];



};
console.log(modle.value);
const setsubmit = () => {
  debugger;

  data.value.data = modle.value;

    for (let key in data.value.data) {
      if (key == "name") {
        if (modle.value.required == true || modle.value.required == "true") {
          var m = new Object();
          var e = [{ required: true, errorMessage: modle.value.placeholder }];
          m[data.value.data.name] = { rules: e }
          data.value.rules=[];
          data.value.rules.push(m);
        }

      }

    }


  props.setdata(data.value);

}
const delsubmit = () => {

}
</script>