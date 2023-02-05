
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
        <lay-form-item label="数据来源">
            <lay-select v-model="modle.type">
                <lay-select-option value="local" label="本地数据"></lay-select-option>
                <lay-select-option value="dic" label="字典数据"></lay-select-option>
                <lay-select-option value="api" label="接口数据"></lay-select-option>
            </lay-select>
        </lay-form-item>
        <lay-form-item label="数据源">
            <lay-textarea v-model="modle.data" placeholder="数据格式：数据项,值,是否选中true;数据项1,值1; 接口数据配置api"></lay-textarea>
            数据格式：本地数据填写：是,1,true;否,0;字典数据请填写字典类型code，接口数据请配置请求的api地址
        </lay-form-item>



        <lay-form-item label="文本框样式">
            <lay-radio v-model="modle.inputclass" label="layui-input">layui-input</lay-radio>
            <lay-radio v-model="modle.inputclass" label="layui-inline">layui-inline</lay-radio>
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
        <lay-form-item label="开启检索">
            <lay-radio v-model="modle.showSearch" value="true">是</lay-radio>
            <lay-radio v-model="modle.showSearch" value="false">否</lay-radio>

        </lay-form-item>
        <lay-form-item label="是否多选">
            <lay-radio v-model="modle.multiple" value="true">是</lay-radio>
            <lay-radio v-model="modle.multiple" value="false">否</lay-radio>

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

export default {
    name: "setselect",
    mounted() {

    }
};
</script>
<script lang="ts" setup>
import { ref, watch } from "vue";
interface IsetselectProps {
    data: any, setdata: Function
}
const props = withDefaults(defineProps<IsetselectProps>(), {
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
    data.value.data = modle.value;
    props.setdata(data.value, "save");

}
const delsubmit = () => {
    data.value.data = modle.value;
    props.setdata(data.value, "del");
}

watch(modle.value, (newValue, oldValue) => {

    modle.value.name = modle.value.id;
    modle.value.placeholder = "请选择" + modle.value.label;

});


</script>
   
   
   
