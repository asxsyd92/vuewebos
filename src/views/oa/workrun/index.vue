<template>


    <div style="height: 100%; width: 100%" ref="workrunindex">
        <div style="height: calc(100% - 60px); width: 100%; overflow-y: auto;overflow-x: hidden;">
            <lay-card style="">
                <h1 class="title">{{ fromdata.form == undefined ? "" : fromdata.form.name }}</h1>
            </lay-card>

            <lay-container :fluid="true" style="padding: 10px; padding-top: 0px; position: relative">
                <lay-col md="24">
                    <lay-card>
                        <lay-form :model="fromdata.field" ref="layFormRef">

                            <div v-for="(item, index) in fromdata.data" :key="index">
                                <subform :data="item" :value="fromdata.field"></subform>
                            </div>

                        </lay-form>
                        <lay-line></lay-line>

                    </lay-card>
                </lay-col>
                <lay-col md="24">
                    <lay-card v-if="signature" title="历史意见">
                        <lay-timeline>
                            <div v-for="(item, index) in commentlist" :key="index">
                                <lay-timeline-item :title="getmoment(item.completedtime1)">
                                    <p>
                                        {{ '【' + item.stepname + '】:'  }}
                                    </p>
                                     <div classs="article-detail-content w-e-text"  >
                                    <div v-html="item.comment"></div>
                                    </div>
                                </lay-timeline-item>
                            </div>
                        </lay-timeline>
                    </lay-card>

                </lay-col>








            </lay-container>

        </div>
        <div class="footer">
            <div class="footer-button">
                <lay-button-group>
                    <lay-button v-for="n in flowevent" :key="n" :class="n.style" :prefix-icon="n.ico"
                        @click="Events(n)">{{ n.title }}
                    </lay-button>
                </lay-button-group>
            </div>
        </div>

    </div>
</template>

<script lang="ts" setup>

import { ref, onMounted, h } from 'vue'
import { layer } from '@layui/layer-vue'
import { useRoute, useRouter } from "vue-router";
import { useAppStore } from "../../../store/app";
import http from 'webosutils/lib/http';
import subform from 'webos-form-design/src/components/formitem/subform.vue';
// import subform from '../../../components/formitem/subform.vue';
import HelpTabs from "../../../utils/HelpTabs"
import flowutils from '../../../utils/flowutils';
import utils from '../../../utils/utils'
import moment from 'moment'
import oasend from './oasend.vue';
import oaback from './oaback.vue';
const query = ref(new Object()) as any;
const isflow = ref(false);
const step = ref([]) as any;
const currentdata = ref(new Object()) as any;
const signature = ref(false);
const userdata = ref([]);
const nextstep = ref([]) as any;
const commentlist = ref([]) as any;
const field = ref([]) as any;
const rules = ref({});
const userchecked = ref([]);
const sedvisible = ref(false)
const appStore = useAppStore();
const router = useRouter();
const route = useRoute();
const stepselect = ref([]);

const fromdata = ref({ name: "" }) as any;
const users = ref([]) as any;
const userslist = ref([]) as any;
const comment = ref('') as any;
const layFormRef = ref(null) as any;
const flowevent = ref([]) as any;
const Events = (ent: any) => {
    switch (ent.id) {
        case "flowsend": flowsend("submit", "发送"); break;
        case "flowback": flowsend("back", "退回"); break;
        case "flowcompleted": flowsend("completed", "完成"); break;
        case "flowsave": flowsend("save", "保存"); break;
        // case "closetab":flowsend();break;
        // case "reload":flowsend();break;
        // case "showprocess":flowsend();break;
        // case "flowredirect":flowsend();break;
        // case "formprint":flowsend();break;
        // case "showflowdesign":flowsend();break;
        // case "showsubflow":flowsend();break;
        // case "showmainflowform":flowsend();break;
        // case "flowsaveIframe":flowsend();break;
    }
}
// 校验
const flowsend = (type: string, snedtitle: string) => {

    layFormRef.value.validate((isValidate: any, model: any, errors: any) => {
        if (!isValidate) {
            errors.forEach((item: any) => {
                layer.notifiy({
                    title: "温馨提示",
                    content: item.message
                })

            });


            return;
        }
        switch (type) {
            case "completed": CompleteTask(type, model); break;
            case "submit": Submit(snedtitle, type, model); break;
            case "save": Save(type, model); break;
            case "back": Back(snedtitle, type, model); break;
        }


    });
}
/**
 *完成任务 
 **/
const CompleteTask = (type: any, model: any) => {
    var opts = new Object() as any;
    opts.type = type;
    opts.steps = [];
    query.value.comment = comment.value;
    http.post("/api/workflowtasks/sendTask", { table: fromdata.value.form.table, data: JSON.stringify(model), query: JSON.stringify(query.value), params1: JSON.stringify(opts) }, "正在处理...").then(resp => {

        if (resp.success) {
            layer.notifiy({
                title: "温馨提示",
                content: resp.msg
            })
            //  layer.msg(resp.msg, { icon: 1, time: 1000 });
            HelpTabs.close(appStore, route.fullPath, router);
        } else {
            layer.notifiy({
                title: "温馨提示",
                content: resp.msg
            })

        }
    }).catch(resp => {
        layer.notifiy({
            title: "温馨提示",
            content: "网络错误"
        })
        // layer.msg("网络错误", { icon: 2, time: 1000 });
    });
}
/**
 * 提交
 * **/
const Submit = (snedtitle: string, type: string, model: any) => {
    //如果没有下一个步骤直接完成流程
    if (nextstep.value.length > 0) {
        var sen = h(oasend, { nextstep: nextstep.value, users: [], data: model, callback: uCallback }) as any;
        layer.open({
            title: snedtitle,
            area: ["60%", "60%"],
            content: sen,
            shade: true,
            anim: 4,
            shadeClose: false,
            btn: [
                {
                    text: "确认",
                    callback: (resp: any) => {

                        sen.component.exposed.confirm(fromdata.value.form.table, query, type, resp, layer);
                    },
                },
                {
                    text: "取消",
                    callback: (resp: any) => {
                        layer.close(resp);
                    },
                },
            ]
        })
    } else {
        CompleteTask("completed", model);
    }
}
const Back = (snedtitle: string, type: string, model: any) => {
    //获取可退后得步骤
    if (query.value.stepid == null) {
        layer.notifiy({
            title: "Error",
            content: "第一个步骤不能退回！",
            icon: 2
        });
    } else {
        var sen = h(oaback, { query:query, type: currentdata.value.behavior.backModel,data: model, callback: uCallback }) as any;
        layer.open({
            title: snedtitle,
            area: ["60%", "60%"],
            content: sen,
            shade: true,
            anim: 4,
            shadeClose: false,
            btn: [
                {
                    text: "确认",
                    callback: (resp: any) => {

                        sen.component.exposed.confirm(fromdata.value.form.table, query, type, resp, layer);
                    },
                },
                {
                    text: "取消",
                    callback: (resp: any) => {
                        layer.close(resp);
                    },
                },
            ]
        })
        // http.post("/api/workflowtasks/getBackStepList", { query: JSON.stringify(query.value), type: currentdata.value.behavior.backModel }, "请稍等").then((res: any) => {
        //     if (res.success) {
        //         layer.notifiy({
        //             title: "Success",
        //             content: res.msg,
        //             icon: 1
        //         });

        //         var opts = new Object() as any;
        //         opts.type = "back";
        //         opts.steps = [];
        //         opts.steps.push({ id: res.data.map((c: any) => c.id).join(","), member: "" });
        //         debugger
        //         query.value.comment = comment.value;
        //         http.post("/api/workflowtasks/sendTask", { table: fromdata.value.form.table, data: JSON.stringify(data), query: JSON.stringify(query.value), params1: JSON.stringify(opts) }, "正在处理...").then(resp => {

        //             if (resp.success) {
        //                 layer.notifiy({
        //                     title: "温馨提示",
        //                     content: resp.msg
        //                 });
        //                 HelpTabs.close(appStore, route.fullPath, router);
        //             } else {
        //                 layer.notifiy({
        //                     title: "温馨提示",
        //                     content: resp.msg
        //                 });

        //             }
        //         }).catch(resp => {
        //             layer.notifiy({
        //                 title: "温馨提示",
        //                 content: "网络错误"
        //             });

        //         });


        //     } else {
        //         layer.notifiy({
        //             title: "Error",
        //             content: res.msg,
        //             icon: 2
        //         });
        //     }
        // }).catch((resp: any) => {
        //     layer.notifiy({
        //         title: "Error",
        //         content: "网络错误！",
        //         icon: 2
        //     });

        // });
    }
}
const Save = (type: any, model: any) => {
    var opts = new Object() as any;
    opts.type = type;
    opts.steps = [];
    query.value.comment = comment.value;
    http.post("/api/workflowtasks/sendTask", { table: fromdata.value.form.table, data: JSON.stringify(model), query: JSON.stringify(query.value), params1: JSON.stringify(opts) }, "正在处理...").then(resp => {

        if (resp.success) {
            layer.notifiy({
                title: "温馨提示",
                content: resp.msg
            })
            query.value.flowid = resp.data.flowid;
            query.value.instanceid = resp.data.instanceid;
            query.value.taskid = resp.data.id;
            query.value.stepid = resp.data.stepid; //$("#stepid").val();
            query.value.groupid = resp.data.groupid;
            model.id=resp.data.instanceid;
        } else {
            layer.notifiy({
                title: "温馨提示",
                content: resp.msg
            })

        }
    }).catch(resp => {
        layer.notifiy({
            title: "温馨提示",
            content: "网络错误"
        })
        // layer.msg("网络错误", { icon: 2, time: 1000 });
    });
}
const uCallback = (res: any) => {
    if (res.success) {

        HelpTabs.close(appStore, route.fullPath, router);
    } else {
        layer.notifiy({ title: "温馨提示", content: res.msg })
    }

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

                    currentdata.value = res.currentdata;
                    if (
                        currentdata.value.signatureType == 1 ||
                        currentdata.value.signatureType == "1"
                    ) {
                        signature.value = true;
                    }
                    var k = JSON.parse(res.formdata.designhtml);
                    fromdata.value = k;
                    nextstep.value = res.data;
                    debugger
                    query.value.titleField = fromdata.value.form.name;
                    if (k.field == null) {
                        var obj = new Object() as any;
                        fromdata.value.data.forEach((key: any) => {
                            for (let keys in key.data) {
                                if (keys == "name") {
                                    obj[key.data[keys]] = key.data['value'];
                                }
                            }
                        });

                        fromdata.value.field = obj;

                    }


                    debugger
                    rules.value = k.rules;
                    flowevent.value = currentdata.value.buttons;
                    if (res.data.length > 0) {
                        res.data.forEach((item: any) => {
                            let o = new Object() as any;
                            o.text = item.name;
                            o.value = item.id;
                            step.value.push(o);
                        });
                    }


                    if (
                        isflow.value &&
                        query.value.instanceid != null &&
                        query.value.instanceid != undefined &&
                        query.value.instanceid != ""
                    ) {
                        getcomment();
                    }

                    // msgType.value = "top";
                    // message.value = res.msg;
                    // currentInstance.refs.popupMessage.open();

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




const getmoment = (s: any) => {
    return moment(s).format('YYYY年MM月DD日')
}
render();


</script>
<style lang="less" scoped>

.commentcontent  img,image{
    width: 100% !important;
}

.title {
    text-align: center;
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 20px;
    margin-top: 12px;
}

.describe {
    font-size: 14px;
    margin-bottom: 12px;
}

.footer {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 10px;
    box-sizing: border-box;
    background-color: #ffffff;
    border-top: 1px solid whitesmoke;
    line-height: 60px;
    height: 60px;

    .footer-button {
        right: 10px;
        position: absolute;
    }
}
</style>
