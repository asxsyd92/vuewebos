<template>
    <lay-panel>
        <div class="layui-card " ref="workrunindex">
            <div class="layui-container">
    <lay-button-group>
      <lay-button type="default" size="sm" @click="validate">立即提交</lay-button>
    
    </lay-button-group>
                <!-- <div class="layui-input-block layui-footer">
                    <button type="submit" class="layui-btn layui-btn-normal layui-btn-sm"
                        @click="validate">立即提交</button>
                   <button type="reset" class="layui-btn layui-btn-primary layui-btn-sm"
                        @click="clearValidate">重置</button> 
                    <button type="button" class="layui-btn layui-btn-primary layui-btn-sm" @click="reset">关闭</button>
                </div> -->
                <lay-form :model="fromdata.field" ref="layFormRef" required>
                    <lay-line border-style="dashed" border-width="6px">
                        <div style="font-size:large"> {{ fromdata.form == undefined ? "" : fromdata.form.name }}</div>
                    </lay-line>
                    <div v-for="(item, index) in fromdata.data" :key="index">
                        <subform :data="item" :value="fromdata.field"></subform>
                    </div>
                </lay-form>
            </div>
            <div class="setheight"></div>
        </div>

        <lay-layer move="true" :btn="sendbtn" :closeBtn="false" :area="['40%', '50%']" :shadeClose="false"
            @submit="submit" title="发送" v-model="sedvisible">
            <lay-panel class="laymodle">
                <lay-select v-model="users" multiple :disabled="true">
                    <lay-select-option v-for="(item, index) in userslist" :key="index" :value="item.id"
                        :label="item.title">
                    </lay-select-option>
                </lay-select>
                <lay-card title="请选择处理人" v-if="nextstep.length > 0">
                    <vxe-table :tree-config="{ children: 'children' }" ref="selectuser" :data="userdata"
                        :column-config="{ isCurrent: true, isHover: true }"
                        :row-config="{ isCurrent: true, isHover: true }" @checkbox-change="selectChangeEvent">
                        <vxe-column type="checkbox" title="选择" width="150" tree-node></vxe-column>
                        <vxe-column field="name" title="姓名"></vxe-column>
                    </vxe-table>

                </lay-card>
                <lay-card v-if="nextstep.length > 0" title="请选择处理步骤">
                    <!-- <lay-checkbox name="like" skin="primary" v-model="stepselect" label="1">写作</lay-checkbox> -->
                    <div v-for="(item, index) in nextstep" :key="index">
                        <lay-radio v-model="stepselect" name="step" :label="item.id">{{ item.name }}</lay-radio>
                    </div>

                </lay-card>
            </lay-panel>
        </lay-layer>
    </lay-panel>
</template>

<script lang="ts">

import { ref, reactive, onMounted, getCurrentInstance, withDefaults, defineProps } from 'vue'
import { layer } from '@layui/layer-vue'
import { useRoute, useRouter } from "vue-router";
import { useAppStore } from "../../../store/app";
import http from "../../../utils/http";
import subform from '../../../components/formitem/subform.vue';
import HelpTabs from "../../../utils/HelpTabs"
import XEUtils, { values } from 'xe-utils'
import { VXETable, VxeTableInstance, VxeTableEvents } from 'vxe-table'

export default {
    components: { subform },
    setup() {
        const query = ref(new Object()) as any;
        const isflow = ref(false);
        const step = ref([]) as any;
        const currentdata = ref(new Object()) as any;
        const signature = ref(false);
        const userdata = ref([]);
        const nextstep = ref([]) as any;
        const commentlist = ref([]);
        const field = ref([]) as any;
        const rules = ref({});
        const userchecked = ref([]);
        const sedvisible = ref(false)
        const appStore = useAppStore();
        const router = useRouter();
        const route = useRoute();
        const stepselect = ref([]);
        const selectuser = ref<VxeTableInstance>();
        const fromdata = ref({ name: "" }) as any;
        const validateModel = ref({});
        const users = ref([]) as any;
        const userslist = ref([]) as any;

        const layFormRef = ref(null) as any;
        // 校验
        const validate = () => {
            layFormRef.value.validate((isValidate: any, model: any, errors: any) => {
                if (!isValidate) {
                    errors.forEach((item: any) => {
                        layer.msg(item.message, { icon: 2, time: 1000 })
                    });


                    return;
                }
                //如果没有下一个步骤直接完成流程
                if (nextstep.value.length > 0) {
                    // stepselect.value=[];
                    // users.value=[];
                    http.post("/api/organiz/GetOrganizeById", { id: "" }, "正在获取...").then(res => {
                        if (res.success) {
                            console.log(res.data);
                            userdata.value = res.data;
                            sedvisible.value = true;
                            userslistadd(res.data);
                        }

                    }).catch(res => {

                    });

                } else {


                    var opts = new Object() as any;
                    opts.type = "completed";
                    opts.steps = [];
                    http.post("/api/workflowtasks/sendTask", { table: fromdata.value.table, data: JSON.stringify(model), query: JSON.stringify(query.value), params1: JSON.stringify(opts) }, "正在处理...").then(resp => {

                        if (resp.success) {
                            layer.notifiy({
                                title: "温馨提示",
                                content: resp.msg
                            })
                            //  layer.msg(resp.msg, { icon: 1, time: 1000 });
                            HelpTabs.close(appStore, route.fullPath, router);
                        } else {
                            layer.msg(resp.msg, { icon: 2, time: 1000 });
                        }
                    }).catch(resp => {
                        layer.notifiy({
                            title: "温馨提示",
                            content: "网络错误"
                        })
                        // layer.msg("网络错误", { icon: 2, time: 1000 });
                    });



                }

            });
        }


        const userslistadd = (v: any) => {
            v.forEach((item: any) => {
                userslist.value.push(item);
                if (item.children.length > 0) {
                    userslistadd(item.children);
                    //userslist.value.push(item);
                }
            });
        }
        // 清除校验
        const sendbtn = [
            {
                text: "确认",
                callback: () => {

                    submit();
                },
            },
            {
                text: "取消",
                callback: () => {
                    sedvisible.value = false;
                },
            },
        ];

        // 重置表单
        const reset = () => {
            layFormRef.value.reset();

        }

        const submit = () => {

            layFormRef.value.validate((isValidate: any, model: any, errors: any) => {
                if (!isValidate) {
                    errors.forEach((item: any) => {
                        layer.msg(item.message, { icon: 2, time: 1000 })
                    });


                    return;
                }

                const $table = selectuser.value as any;
                const selectRow = $table.getCheckboxRecords()
                if (users.value.length == 0) {
                    layer.msg("请选择处理人", { icon: 2, time: 1000 });
                    return;
                }
                console.log(stepselect.value);
                if (stepselect.value.length == 0) {
                    layer.msg("请选择处理步骤", { icon: 2, time: 1000 });
                    return;
                }


                var opts = new Object() as any;
                opts.type = "submit";
                opts.steps = [];
                opts.steps.push({ id: stepselect.value, member: users.value.join(",") });

                http.post("/api/workflowtasks/sendTask", { table: fromdata.value.form.table, data: JSON.stringify(model), query: JSON.stringify(query.value), params1: JSON.stringify(opts) }, "正在处理...").then(resp => {

                    if (resp.success) {
                        layer.notifiy({
                            title: "温馨提示",
                            content: resp.msg
                        });

                        HelpTabs.close(appStore, route.fullPath, router);
                    } else {
                        layer.msg(resp.msg, { icon: 2, time: 1000 });
                    }
                }).catch(resp => {
                    layer.notifiy({
                        title: "温馨提示",
                        content: "网络错误"
                    });

                });
            })


        }

        //渲染表单
        const render = () => {

            query.value.flowid = route.query.flowid;
            query.value.instanceid = route.query.instanceid;
            query.value.taskid = route.query.taskid;
            query.value.stepid = route.query.stepid; //$("#stepid").val();
            query.value.groupid = route.query.groupid;
            if (query.value.flowid != null && query.value.flowid != undefined && query.value.flowid != "") {
                isflow.value = true;
            } else {
                query.value.formid = route.query.formid;
            }
            init();
        }

        const init = () => {
            if (isflow.value) {
                //初始化流程在初始化表单
                http.post(
                    "/api/workflowtasks/FlowInit", {
                    flowid: query.value.flowid,
                    stepid: query.value.stepid,
                    instanceid: query.value.instanceid
                },
                    "正在初始化流程"
                )
                    .then((res: any) => {
                        if (res.success) {
                            console.log(res);
                            currentdata.value = res.currentdata;
                            if (
                                currentdata.value.signatureType == 0 ||
                                currentdata.value.signatureType == "0"
                            ) {
                                signature.value = true;
                            }
                            var k = JSON.parse(res.formdata.designhtml);
                            fromdata.value = k;
                            nextstep.value = res.data;
                            if (k.field == null) {
                                var obj = new Object();
                                fromdata.value.data.forEach((key: any) => {
                                    for (let keys in key.data) {
                                        if (keys == "name") {
                                            //field.value = { [key.data[keys]]: "" };
                                            obj[key.data[keys]] = key.data['value'];
                                        }
                                    }
                                });
                                console.log(obj);
                                fromdata.value.field = obj;
                                console.log(fromdata.value.field);
                            }


                            console.log(field.value);
                            rules.value = k.rules;
                            console.log(rules.value);
                            console.log(fromdata.value);
                            if (res.data.length > 0) {
                                res.data.forEach((item: any) => {
                                    let o = new Object() as any;
                                    o.text = item.name;
                                    o.value = item.id;
                                    step.value.push(o);
                                });
                            }

                            console.log(step.value);

                            if (
                                isflow &&
                                query.value.instanceid != null &&
                                query.value.instanceid != undefined &&
                                query.value.instanceid != ""
                            ) {
                                getcomment();
                            }

                            // msgType.value = "top";
                            // message.value = res.msg;
                            // currentInstance.refs.popupMessage.open();

                            console.log("初始化成功");
                        } else {
                            layer.notifiy({
                                title: "温馨提示",
                                content: res.msg
                            });


                            //layer.msg(res.msg, { icon: 2, time: 1000 });
                            //HelpTabs.close(appStore,route.fullPath,router);
                            // msgType.value = "top";
                            // message.value = res.msg;
                            // currentInstance.refs.popupMessage.open();
                        }
                    })
                    .catch((resp: any) => { });
            } else {
                //getform();
            }
        };

        const getcomment = () => {
            http
                .post(
                    "/api/workflowtasks/getcomment", {
                    query: JSON.stringify(query.value)
                },
                    "请稍等"
                )
                .then((res: any) => {
                    if (res.success) {
                        commentlist.value = res.data;
                    }
                });
        };

        const selectChangeEvent: VxeTableEvents.CheckboxChange = ({ $table }) => {
            const records = $table.getCheckboxRecords();
            users.value = [];
            records.forEach((key: any) => {
                users.value.push(key.id);
            });
            console.info(`勾选${records.length}个树形节点`, users.value)
        }
        onMounted(() => {
            render();
        })
        return {
            validateModel,
            layFormRef,
            validate,
            // clearValidate,
            reset,
            subform,
            fromdata,
            getcomment,
            userdata,
            sedvisible,
            sendbtn,
            submit,
            userchecked,
            selectuser,
            nextstep, query,
            stepselect,
            selectChangeEvent,
            users,
            userslist


        }
    }
}
</script>
<style>


.global-content {
    height: calc(100% - 42px);
    position: relative;
    top: 45px;
    width: 99%;
    overflow-y: auto;
}

.global-content .layui-footer {
    z-index: 400;
    width: 100%;
    position: fixed;
    right: 0;
    top: 100px;
    height: 44px;
    line-height: 22px;
    background-color: #fff;
    text-align: center;
    padding: 10px 0;
}
</style>
