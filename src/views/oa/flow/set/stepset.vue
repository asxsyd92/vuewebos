<template>

    <div class="layui-container laymodle">
        <lay-tab type="brief" v-model="tabcurrent">
            <lay-tab-item title="基本信息" id="1">
                <lay-form ref="setpsetFormRef" :model="nodes" class="layui-form layui-form-pane">
                    <lay-col :md="12">
                        <lay-form-item label="步骤id：">
                            <lay-input v-model="nodes.id" disabled="disabled"></lay-input>
                        </lay-form-item>
                    </lay-col>
                    <lay-col :md="12">
                        <lay-form-item label="步骤名称：" prop="name">
                            <lay-input v-model="nodes.name"></lay-input>
                        </lay-form-item>
                    </lay-col>

                    <lay-col :md="12">
                        <lay-form-item label="工时" prop="workTime">
                            <lay-input v-model="nodes.worktime"></lay-input>
                        </lay-form-item>
                    </lay-col>

                    <lay-col :md="12">
                        <lay-form-item label="意见显示：" prop="opinionDisplay">
                            <lay-radio v-model="nodes.opinionDisplay" name="opinionDisplay" value="0" label="是">
                            </lay-radio>
                            <lay-radio v-model="nodes.opinionDisplay" name="opinionDisplay" value="1" label="否">
                            </lay-radio>
                        </lay-form-item>
                    </lay-col>

                    <lay-col :md="12">
                        <lay-form-item label="是否归档：" prop="countersignature">
                            <lay-radio v-model="nodes.archives" name="archives" value="0" label="是"></lay-radio>
                            <lay-radio v-model="nodes.archives" name="archives" value="1" label="否"></lay-radio>
                        </lay-form-item>
                    </lay-col>


                    <lay-col :md="12">
                        <lay-form-item label="表单">
                            <lay-select v-model="nodes.forms.id" :items="forms"></lay-select>
                        </lay-form-item>
                    </lay-col>

                    <lay-col :md="12">
                        <lay-form-item label="审签类型：" prop="signatureType">
                            <lay-radio v-model="nodes.signatureType" name="signatureType" value="0" label="无签批意见栏">
                            </lay-radio>
                            <lay-radio v-model="nodes.signatureType" name="signatureType" value="1" label="有签批意见-无须签章">
                            </lay-radio>
                            <lay-radio v-model="nodes.signatureType" name="signatureType" value="2" label="有签批意见-须签章">
                            </lay-radio>
                        </lay-form-item>
                    </lay-col>
                </lay-form>
            </lay-tab-item>
            <lay-tab-item title="策略" id="2">
                <!-- 策略               -->
                <lay-form :model="nodes" class="layui-form layui-form-pane">
                    <lay-col :md="12">
                        <lay-form-item label="流转类型:" prop="flowType">
                            <lay-radio v-model="nodes.behavior.flowType" name="flowType" value="0" label="单一分支流转">
                            </lay-radio>
                            <lay-radio v-model="nodes.behavior.flowType" name="flowType" value="1" label="系统控制">
                            </lay-radio>
                            <lay-radio v-model="nodes.behavior.flowType" name="flowType" value="2" label="多个分支流转">
                            </lay-radio>

                        </lay-form-item>
                    </lay-col>
                    <lay-col md="12">

                        <lay-form-item label="运行时选择:" prop="runSelect">
                            <lay-radio v-model="nodes.behavior.runSelect" name="runSelect" value="1" label="允许">
                            </lay-radio>
                            <lay-radio v-model="nodes.behavior.runSelect" name="runSelect" value="0" label="不允许">
                            </lay-radio>
                        </lay-form-item>
                    </lay-col>

                    <lay-col md="12">
                        <lay-form-item label="处理者类型:" prop="handlerType">
                            <lay-select v-model="nodes.behavior.handlerType">
                                <lay-select-option value="0" label="所有成员"></lay-select-option>
                                <lay-select-option value="1" label="部门"></lay-select-option>
                                <lay-select-option value="2" label="岗位"></lay-select-option>
                                <lay-select-option value="3" label="工作组"></lay-select-option>
                                <lay-select-option value="4" label="人员"></lay-select-option>
                                <lay-select-option value="5" label="发起者"></lay-select-option>
                                <lay-select-option value="6" label="前一步骤处理者"></lay-select-option>
                                <lay-select-option value="7" label="某一步骤处理者"></lay-select-option>
                                <lay-select-option value="8" label="字段值"></lay-select-option>
                                <lay-select-option value="9" label="发起者领导"></lay-select-option>
                                <lay-select-option value="10" label="发起者分管领导"> </lay-select-option>
                                <lay-select-option value="11" label="前一步处理者领导"></lay-select-option>
                                <lay-select-option value="12" label="前一步处理者分管领导"></lay-select-option>
                            </lay-select>

                        </lay-form-item>
                    </lay-col>
                    <lay-col md="12">

                        <lay-form-item label="选择范围:" prop="selectRange">
                            <lay-input v-model="nodes.behavior.selectRange"></lay-input>
                        </lay-form-item>
                    </lay-col>
                    <lay-col md="12">

                        <lay-form-item label="处理者步骤:" prop="handlerStep">
                            <lay-input v-model="nodes.behavior.handlerStep"></lay-input>
                        </lay-form-item>
                    </lay-col>
                    <lay-col md="12">

                        <lay-form-item label="值字段:" prop="valueField">
                            <lay-input v-model="nodes.behavior.valueField"></lay-input>
                        </lay-form-item>
                    </lay-col>
                    <lay-col md="12">

                        <lay-form-item label="默认处理者:" prop="defaultHandler">
                            <lay-input v-model="nodes.behavior.defaultHandler"></lay-input>
                        </lay-form-item>
                    </lay-col>
                    <lay-col md="12">
                        <lay-form-item label="退回策略:" prop="backModel">
                            <lay-radio v-model="nodes.behavior.backModel" name="backModel" value="0" label="不能退回">
                            </lay-radio>
                            <lay-radio v-model="nodes.behavior.backModel" name="backModel" value="1" label="根据处理策略退回">
                            </lay-radio>
                        </lay-form-item>
                    </lay-col>
                    <lay-col md="12">
                        <lay-form-item label="处理策略:" prop="hanlderModel">
                            <lay-radio v-model="nodes.behavior.hanlderModel" name="hanlderModel" value="0"
                                label="所有人必须同意">
                            </lay-radio>
                            <lay-radio v-model="nodes.behavior.hanlderModel" name="hanlderModel" value="1"
                                label="一人同意即可">
                            </lay-radio>
                            <lay-radio v-model="nodes.behavior.hanlderModel" name="hanlderModel" value="2"
                                label="依据人数比例">
                            </lay-radio>
                            <lay-radio v-model="nodes.behavior.hanlderModel" name="hanlderModel" value="3" label="独立处理">
                            </lay-radio>
                        </lay-form-item>
                    </lay-col>
                    <lay-col :md="12">
                        <lay-form-item label="退回类型:" prop="backType">
                            <lay-radio v-model="nodes.behavior.backType" name="backType" value="0" label="退回前一步">
                            </lay-radio>
                            <lay-radio v-model="nodes.behavior.backType" name="backType" value="1" label="退回第一步">
                            </lay-radio>
                            <lay-radio v-model="nodes.behavior.backType" name="backType" value="2" label="退回某一步">
                            </lay-radio>

                        </lay-form-item>
                    </lay-col>

                    <lay-col md="12">
                        <lay-form-item label="策略百分比:" prop="percentage">
                            <lay-input v-model="nodes.behavior.percentage"></lay-input>

                        </lay-form-item>
                    </lay-col>
                    <lay-col md="12">
                        <lay-form-item label="退回步骤:" prop="backStep">
                            <lay-input v-model="nodes.behavior.backStep"></lay-input>

                        </lay-form-item>
                    </lay-col>
                    <lay-col md="12">
                        <lay-form-item label="会签策略:" prop="countersignature">
                            <lay-radio v-model="nodes.behavior.countersignature" name="countersignature" value="0"
                                label="不会签">
                            </lay-radio>
                            <lay-radio v-model="nodes.behavior.countersignature" name="countersignature" value="1"
                                label="所有步骤同意">
                            </lay-radio>
                            <lay-radio v-model="nodes.behavior.countersignature" name="countersignature" value="2"
                                label="一个步骤同意即可">
                            </lay-radio>
                            <lay-radio v-model="nodes.behavior.countersignature" name="countersignature" value="3"
                                label="依据比例">
                            </lay-radio>
                        </lay-form-item>
                    </lay-col>
                    <lay-col :md="12">
                        <lay-form-item label="会签百分比:" prop="countersignaturePercentage">
                            <lay-input v-model="nodes.behavior.countersignaturePercentage"></lay-input>

                        </lay-form-item>
                    </lay-col>
                    <lay-col :md="12">
                        <lay-form-item label="抄送:" prop="copyFor">
                            <lay-input v-model="nodes.behavior.copyFor"></lay-input>

                        </lay-form-item>
                    </lay-col>
                </lay-form>
            </lay-tab-item>
            <lay-tab-item title="字段" id="3">
                <!-- 字段 -->

                <lay-button type="default" size="sm" @click="resetfield(nodes)">重置</lay-button>
                <lay-table :columns="fieldcolumns" :data-source="fieldSource">


                    <template v-slot:eoperator="{ data }">
                        <lay-switch v-model="data.status" onswitch-value="0" unswitch-value="1" onswitch-text="编辑"
                            unswitch-text="只读"></lay-switch>

                    </template>
                    <template v-slot:doperator="{ data }">
                        <lay-switch v-model="data.check" onswitch-value="0" unswitch-value="1" onswitch-text="不检查"
                            unswitch-text="检查"></lay-switch>
                    </template>
                </lay-table>

            </lay-tab-item>
            <lay-tab-item title="按钮" id="4">
                <lay-col md="24">
                    <lay-transfer v-model="btValue" :dataSource="btSource" :showSearch="true">
                        <template #leftTitle> 未选按钮 </template>
                        <template #rightTitle> 已选按钮 </template>
                    </lay-transfer>

                </lay-col>
            </lay-tab-item>
        </lay-tab>


    </div>
</template>
<script lang="ts">

export default {
    name: "stepset",

}
</script>
<script lang="ts" setup>
import http from "../../../../api/http";
import { layer } from '@layui/layer-vue';
import { ref } from "vue";
import flowutils from "../../../../utils/flowutils";
const setpsetFormRef = ref(null) as any;
interface IflowsetProps {
    nodes: any, flowjson: any
}
const props = withDefaults(defineProps<IflowsetProps>(), {
    nodes: Object, flowjson: Object
});
const btValue = ref([]) as any;
const btSource = ref([]);
const fieldcolumns = ref([{ title: "字段名称", width: "20%", key: "field" }, { title: "描述", width: "20%", key: "value" }, { title: "编辑", width: "10%", customSlot: "eoperator", key: "eoperator" }, { title: "只读", width: "10%", customSlot: "doperator", key: "doperator" }]);
const fieldSource = ref([]) as any;
const tabcurrent = ref("1");
const forms = ref([]);
const nodes = props.nodes;
const flowjson = props.flowjson;
const resetfield = (v: any) => {
    flowutils.resetfield(v, props.flowjson, fieldSource);
}

fieldSource.value = nodes.value.fieldStatus;
console.log(fieldSource.value);
if (nodes.value.buttons.length > 0) {
    nodes.value.buttons.forEach((item: any) => {

        btValue.value.push(item.id);
    });
}
const confirm = (layid: any, layers: any) => {
    setpsetFormRef.value!.validate((isValidate: any, model: any, errors: any) => {
        if (!isValidate) {
            return;
        }
        console.log(nodes.value.fieldStatus);
        nodes.value.fieldStatus = fieldSource.value;
        console.log(nodes.value);

        if (btValue.value.length > 0) {
            var s = new Array() as any;

            btValue.value.forEach((item: any) => {
                var sa = btSource.value.find((c: any) => c.id == item);
                if (sa != null) {
                    s.push(sa);
                }
            });
            nodes.value.buttons = s;
            btValue.value = [];
            layers.close(layid);
        }
    });
}
defineExpose({
    confirm
})
//加载按钮
flowutils.getbutton(btSource);
//加载表单
flowutils.addfom(forms);
</script>
