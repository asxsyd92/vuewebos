<template>

    <div class="layui-container laymodle">
        <!-- :required="true" -->
        <lay-form ref="flowsetFormRef" :model="flowjson">
            <lay-col :md="12">
                <lay-form-item label="流程id：" prop="id">
                    <lay-input placeholder="流程id：" disabled="disabled" v-model="flowjson.id"></lay-input>
                </lay-form-item>
            </lay-col>
            <lay-col :md="12">
                <lay-form-item label="流程名称：" prop="name">
                    <lay-input placeholder="流程id：" v-model="flowjson.name"></lay-input>
                </lay-form-item>
            </lay-col>
            <lay-col :md="12">
                <lay-form-item label="完成后移出:" prop="removeCompleted">
                    <lay-input placeholder="流程id：" v-model="flowjson.removeCompleted"></lay-input>
                </lay-form-item>
            </lay-col>
            <lay-col :md="24">
                <lay-form-item label="是否开启调试:" prop="debug">
                    <lay-radio v-model="flowjson.debug" name="debug" value="0" label="关闭">
                    </lay-radio>
                    <lay-radio v-model="flowjson.debug" name="debug" value="1" label="有调试窗口">
                    </lay-radio>
                    <lay-radio v-model="flowjson.debug" name="debug" value="2" label="无调试窗口">
                    </lay-radio>
                </lay-form-item>
            </lay-col>

            <lay-col :md="12">
                <lay-form-item label="调试人员:" prop="debugUsers">
                    <lay-tree-select v-model="debugUsers" :allow-clear="true" placeholder="请选择处理人" :data="userdata"
                        multiple></lay-tree-select>
                    <!-- <lay-input v-model="flowjson.debugUsers"></lay-input> -->
                </lay-form-item>

            </lay-col>

            <lay-col :md="12">
                <lay-form-item label="实例管理人:" prop="instanceManager">

                    <lay-tree-select v-model="instanceManager" :allow-clear="true" placeholder="请选择处理人" :data="userdata"
                        multiple></lay-tree-select>

                </lay-form-item>
            </lay-col>
            <lay-col :md="12">
                <lay-form-item label="分类:" prop="type">
                    <lay-tree-select v-model="type" :allow-clear="true" placeholder="请选择分类"
                        :data="dicdata"></lay-tree-select>
                    <!-- <lay-input v-model="flowjson.type"></lay-input> -->
                </lay-form-item>
            </lay-col>
            <lay-col :md="12">
                <lay-form-item label="备注:" prop="note">
                    <lay-input v-model="flowjson.note"></lay-input>
                </lay-form-item>
            </lay-col>
            <lay-col :md="12">
                <lay-form-item label="管理人：" prop="manager">
                    <lay-tree-select v-model="manager" :allow-clear="true" placeholder="请选择处理人" :data="userdata"
                        multiple></lay-tree-select>
                    <!-- <lay-input v-model="flowjson.manager"></lay-input> -->
                </lay-form-item>
            </lay-col>
            <!-- <lay-col :md="12">
                <lay-form-item label="表：" prop="table">
                    <lay-input v-model="flowjson.titleField.table"></lay-input>
                </lay-form-item>
            </lay-col>
            <lay-col :md="12">
                <lay-form-item label="完成标识：" prop="link">
                    <lay-input v-model="flowjson.titleField.field"></lay-input>
                </lay-form-item>
            </lay-col> -->
            <lay-col :md="12">
                <lay-form-item label="标识字段：" prop="field">
                    <lay-input v-model="flowjson.titleField.field"></lay-input>
                </lay-form-item>
            </lay-col>

            <!-- <div class="layui-col-md12">
                  <lay-form-item label="连接：" prop="link">
                    <lay-input v-model="flowjson.titleField.link"></lay-input>
                  </lay-form-item>
      
                </div> -->

            <div class="layui-col-md12">
                <lay-form-item label="主键：" prop="primaryKey">
                    <lay-input v-model="flowjson.databases.primaryKey"></lay-input>
                </lay-form-item>

            </div>
            <div class="layui-col-md12">
                <lay-form-item label="表：" prop="table">
                    <lay-input v-model="flowjson.databases.table"></lay-input>
                </lay-form-item>

            </div>

        </lay-form>


    </div>

</template>
<script lang="ts">

export default {
    name: "flowset",

}
</script>
<script lang="ts" setup>
import http from "../../../../api/http";
import utils from "../../../../utils/utils";
import { layer } from '@layui/layer-vue';
import flowutils from "../../../../utils/flowutils";
import { ref } from "vue";
const flowsetFormRef = ref(null) as any;
interface IflowsetProps {
    flowjson: any
}
const props = withDefaults(defineProps<IflowsetProps>(), {
    flowjson: Object
});

const flowjson = props.flowjson;

const userdata = ref([]);
const dicdata = ref([]);

const instanceManager = ref([]);

const debugUsers = ref([]);

const manager = ref([]);


const type = ref([]);


const confirm = (layid: any, layers: any) => {
    flowsetFormRef.value!.validate((isValidate: any, model: any, errors: any) => {
        if (!isValidate) {
            return;
        }
        model.manager = manager.value.join(",");
        model.debugUsers = debugUsers.value.join(",");
        model.instanceManager = instanceManager.value.join(",");
        model.type = type.value;

        layers.close(layid);
    });

}
defineExpose({
    confirm
})

utils.getOrg("").then((res: any) => {
    userdata.value = res;
    debugger
    instanceManager.value = flowjson.value.instanceManager == null ? [] : flowjson.value.instanceManager.split(",");
    debugUsers.value = flowjson.value.debugUsers == null ? [] : flowjson.value.debugUsers.split(",");
    manager.value = flowjson.value.manager == null ? [] : flowjson.value.manager.split(",");
});
utils.GetDictionaryByCode("FlowTypes").then((res: any) => {
    dicdata.value = res;
    type.value = flowjson.value.type == null ? [] : flowjson.value.type;
});
</script>
