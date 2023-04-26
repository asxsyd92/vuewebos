
<template>
    <div class="form-designer">
        <lay-scroll height="100%" class="form-designer-left">
            <div class="title">表单组件</div>
            <div class="items" ref="leftRef">
                <draggable :list="tools" animation="300" :clone="cloneDog"
                    :group="{ name: 'people', pull: 'clone', put: false, sort: true, }" item-key="name">
                    <template #item="{ element }">
                        <div class="item leftItem">
                            <i :class="'fa ' + element.icon + ' fa-2x'"></i>
                            <cite>{{ element.name }}</cite>
                        </div>

                    </template>
                </draggable>
            </div>
        </lay-scroll>
        <div class="centerArea">
            <div class="topBar">
                <div class="topBar-btn-item" @click="showfrom">
                    <lay-icon type="layui-icon-play" size="15px"></lay-icon>
                    <span>保存</span>
                </div>
                <div class="topBar-btn-item" @click="viewJson">
                    <lay-icon type="layui-icon-fonts-code" size="20px"></lay-icon>
                    <span>查看JSON</span>
                </div>
                <div class="topBar-btn-item">
                    <lay-icon type="layui-icon-list" size="23px"></lay-icon>
                    <span>查看代码</span>
                </div>
                <div class="topBar-btn-item">
                    <lay-icon type="layui-icon-delete" size="23px" color="red"></lay-icon>
                    <span style="color:red">清空</span>
                </div>
            </div>
            <lay-scroll height="100%" class="form-designer-center">
                <draggable :list="confirm" group="people" item-key="name">
                    <template #item="{ element, index }">
                        <div>

                            <subdesign @dblclick="set(element, index)" :itemKey="element.data.name" class="list-group-item1"
                                :data="element">
                            </subdesign>
                        </div>
                    </template>
                </draggable>
            </lay-scroll>
        </div>
        <lay-scroll height="100%" class="form-designer-right">
            <sets :data="needdata" :setdata="setdata"></sets>

        </lay-scroll>
        <Monaco v-model:show="showMonaco" v-model:showSubmit="showMonacoSubmit" @submit="monacoSubmit" ref="monacoRef"></Monaco>
    </div>
</template>

<script lang="ts" setup>
import draggable from "vuedraggable";
import subdesign from "webos-form-design/src/components/formdesign/subdesign.vue"
// import subdesign from '../../../components/formdesign/subdesign.vue';
import sets from 'webos-form-design/src/components/formdesign/set.vue';
import Monaco from '../../../components/monaco/Monaco.vue';

import _ from 'lodash';
import http from "webosutils/lib/http";
import { watch, ref, onMounted,shallowRef } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import toolsdata from '../../../assets/toolsdata';
import { layer } from '@layui/layer-vue';

const needdata = ref({});

const router = useRouter();
const route = useRoute();
const tools = ref(toolsdata.data);
const groups = ref({ name: 'people', pull: 'clone', put: false });
const form = ref({}) as any;
const formdata = ref({}) as any;
const confirm = ref([]) as any;
const openKeys2 = ref("0");

const layers = layer as any;
const log = (evt: any) => {

}
const monacoRef = shallowRef();
const showMonaco = ref(false);
const showMonacoSubmit = ref(false);
//monaco提交回调
const monacoSubmit=(data:any)=>{
  //@ts-ignore
  console.log(data);
 // formArray.value[editInfo.value.index].formItemProps[editInfo.value.key]=JSON.parse(data);
}
//查看json
const viewJson = () => {
    var rules = new Object() as any;
 
    var fromid: any;
    if (route.query.fromid != null && route.query.fromid != undefined && route.query.fromid != "add") {
        fromid = route.query.fromid;
    }

    //规则处理
    formdata.value["data"] = confirm.value;
    formdata.value["form"] = form.value;
    confirm.value.forEach((item: any) => {
        for (let key in item.data) {

            if (key == "name") {
                if (item.data.required == true || item.data.required == "true") {

                    //var m = new Object();
                    var e = [{ required: true, errorMessage: item.data.label + "不能为空" }];
                    rules[item.data.name] = { rules: e }
                }

            }
            formdata.value["rules"] = rules;

        }
    })
  monacoRef.value.setValue('json', JSON.stringify(formdata.value))
  showMonaco.value = true;
}
onMounted(() => {

    if (route.query.fromid != null && route.query.fromid != undefined && route.query.fromid != "add") {
        http.post("/api/form/getFormJsonById", { fromid: route.query.fromid }, "正在加载表单信息")
            .then(res => {
                if (res.success) {
                    var f = JSON.parse(res.data.designhtml);
                    form.value = f.form;
                    confirm.value = f.data;
                    //console.log(confirm.value);
                }
            }).catch(res => {
                layer.msg("网络错误", { icon: 2 });
            })
    }
})
const cloneDog = (obj: any) => {

    const newObj = Object.assign(_.cloneDeep(obj), { id: `${obj.id}_${new Date().getTime()}` });
    return newObj;

}
const set = (evt: any, v: number) => {

    needdata.value = {};
    setTimeout(function () {
        needdata.value = evt;
    }, 100);
}
const generate = () => {

    if (form.value.table == null || form.value.table == undefined || form.value.table == '') {
        layer.notifiy({
            title: "温馨提示",
            content: "未配置表单属性，请先点击表单属性→表，进行设置！"
        });
    } else {
        //


        layer.confirm("此操作会将已设置表单重置，原有表单会被清空，你是否确认操作？", {
            btn: [{
                text: '确定', callback: (e: any) => {
                    http.post("/api/form/FormTable", { table: form.value.table }, "正在加载").then(res => {
                        if (res.success) {
                            confirm.value = [];
                            res.data.forEach((value: any) => {

                                var o = new Object() as any;
                                o.icon = "fa fa-edit";
                                o.name = value.column_name.toLowerCase();
                                o.id = value.column_name.toLowerCase();
                                o.type = "input";
                                var dd = new Object() as any;
                                dd.id = o.id;
                                dd.col = "12";
                                dd.label = value.column_comment;
                                dd.type = "text";
                                dd.name = o.id;
                                dd.autocomplete = "off";
                                dd.placeholder = "请输入" + value.column_comment.toLowerCase();
                                dd.inputclass = "layui-input";
                                dd.disabled = "block";
                                dd.showtext = "false";
                                dd.required = "false";
                                dd.display = "block";
                                dd.value = "";
                                dd.data = "";
                                dd.input = "";
                                o.data = dd;
                                confirm.value.push(o);
                                // f.push(o);
                            });
                        }
                    }
                    ).catch(res => {

                    })
                    layer.close(e);
                }
            }, {
                text: '取消', callback: (e: any) => {
                    layer.close(e);
                }
            }]
        })
    }


}
const attribute = () => {
    if (form.value.table == null || form.value.table == undefined) {
        var t = new Object() as any;
        t.type = "table";
        t.table = "";
        t.style = "layui-form";
        t.url = "/api/";
        t.mode = "api";
        t.name = "请修改表单名称";
        needdata.value = t;
    } else {
        needdata.value = form.value;
    }

}
const setdata = (val: any, a: any) => {
    if (val.type == "table") {

        form.value = val;
        layers.msg("更新成功", { icon: 1 });
        needdata.value = {};

    }
    else {
        if (a == "save") {
            console.log(confirm.value);
            needdata.value = {};
            var con = confirm.value;

            confirm.value = [];
            setTimeout(function () {
                confirm.value = con;
            }, 500);

            layers.msg("更新成功", { icon: 1 });
        }

        else {

            confirm.value = confirm.value.filter((item: any) => {
                return item !== val;
            });
            var con = confirm.value;
            confirm.value = [];
            setTimeout(function () {
                confirm.value = con;
            }, 500);
            layers.msg("移出成功", { icon: 1 });

        }

    }

}
const showfrom = () => {
    var rules = new Object() as any;
    if (form.value.table == undefined) {
        layer.msg("请先设置表单属性", { icon: 2 });
        return;
    }
    var fromid: any;
    if (route.query.fromid != null && route.query.fromid != undefined && route.query.fromid != "add") {
        fromid = route.query.fromid;
    }

    //规则处理
    formdata.value["data"] = confirm.value;
    formdata.value["form"] = form.value;
    confirm.value.forEach((item: any) => {
        for (let key in item.data) {

            if (key == "name") {
                if (item.data.required == true || item.data.required == "true") {

                    //var m = new Object();
                    var e = [{ required: true, errorMessage: item.data.label + "不能为空" }];
                    rules[item.data.name] = { rules: e }
                }

            }
            formdata.value["rules"] = rules;

        }
    })
    http.post("/api/form/saveFormJson", { key: fromid, tab: form.value.table, title: form.value.name, data: JSON.stringify(formdata.value) }, "正在保存").then(res => {
        if (res.success) {
            layer.msg(res.msg, { icon: 1 });
        } else {

            layer.msg(res.msg, { icon: 2 });
            return;
        }
    }).catch(ex => {
        layer.msg("网络异常", { icon: 1 });
    });



    //  layers.open({ title: "标题", content: JSON.stringify(formdata.value) });
}
const publishfrom = () => {

}
watch(confirm.value, (val: any) => {

    setTimeout(function () {
        var con = confirm.value;
        confirm.value = con;
    }, 1000);


});
// return {
//     publishfrom, tools, log, groups, openKeys2, setdata, set, generate, attribute, showfrom, confirm, needdata, cloneDog
// }


//     }
// }

</script>
<style lang="less">
.form-designer {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;

    .form-designer-left {
        width: 25%;
        height: 100%;
        overflow-y: scroll;
        overflow-x: hidden;

        .item {
            display: inline-flex;
            align-items: center;
            flex-flow: column;
            justify-content: center;
            background: rgb(255, 255, 255);
            color: rgb(0, 0, 0);
            min-width: 70px;
            width: 33.33%;
            height: 70px;
            line-height: 1;
            text-align: center;
            transition: all 0.2s ease 0s;
            cursor: pointer;
            user-select: none;
            margin-top: 3px;
            transform: scale(0.9);
        }

        .item:hover {
            background-color: var(--global-checked-color);
            color: white;
            transform: scale(1.1);
        }
    }

    .centerArea {
        width: 50%;
        height: 100%;
        border-left: 1px solid #eeeeee;
        border-right: 1px solid #eeeeee;

        .topBar {
            width: 100%;
            height: 50px;
            outline: 1px solid #eeeeee;
            display: flex;
            justify-content: flex-end;
            padding: 0 10px;
            box-sizing: border-box;
            overflow: hidden;

            .topBar-btn-item {
                cursor: pointer;
                display: inline-flex;
                align-items: center;
                transition: all 0.3s ease-in-out;
                position: relative;
                margin-left: 15px;

                i {
                    margin-right: 5px;
                }
            }

            .topBar-btn-item:hover {
                transform: scale(1.1);
            }
        }
    }

    .form-designer-center {
        width: 100%;
        height: 100%;
        overflow-y: scroll;
        padding: 10px 15px;
        box-sizing: border-box;

        .form-item {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .form-item-action {
                margin: 0 20px;
                display: flex;
            }

            .layui-input-number {
                margin-left: 0px;
            }
        }

        .chooseItem {
            outline: 1px dashed var(--global-checked-color);
        }

        .hidde-error-text {
            .layui-error-message {
                display: none;
            }

            .layui-form-select .layui-input {
                border-color: #eeeeee !important;
            }
        }

        .form-designer-empty {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        .layui-textarea-wrapper {
            width: 100%;
        }
    }

    .form-designer-right {
        width: 25%;
        height: 100%;
        overflow-y: scroll;

        .option-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-right: 20px;
            padding-bottom: 5px;
            box-sizing: border-box;

            .layui-input-wrapper {
                margin-right: 5px;
            }
        }

        .add-option {
            color: var(--global-checked-color);
            cursor: pointer;
            line-height: 38px;
        }
    }

    .title {
        height: 50px;
        line-height: 50px;
        font-weight: bold;
        text-align: center;
    }

    .iconfont {
        font-size: 24px;
        padding-bottom: 10px;
    }

    .form-designer-right-tab {
        .layui-unselect {
            display: none;
        }
    }

    .monacoMask {
        width: 100%;
        height: 100%;
        position: fixed;
        background-color: #00000054;
        z-index: 98;
    }

    .monacoContanier {
        width: 60%;
        height: 100%;
        position: fixed;
        right: 0;
        top: 0;
        background-color: white;
        transition: all 0.3s ease-in-out;
        z-index: 99;

        .monacoRef {
            width: 100%;
            height: 100%;
        }

        .monacoTopBar {
            display: flex;
            justify-content: flex-end;
            padding: 10px 10px;
            box-sizing: border-box;
            align-items: center;
            border-bottom: 1px solid #eeeeee;
            border-left: 1px solid #eeeeee;
            height: 60px;
            position: relative;
            margin-top: 95px;
            .btn {
                display: inline-flex;
                align-items: center;
                cursor: pointer;
                margin-left: 10px;
            }

            .title {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                font-size: 14px;
                font-weight: bold;
                left: 10px;
            }
        }
    }
}</style>
