
<template>
<lay-panel>
    <lay-layout class="design">
        <lay-side>
            <lay-collapse v-model="openKeys2" accordion>
                <lay-collapse-item title="表单组件" id="1">
                    <draggable :list="tools" animation="300" :add="add" :clone="cloneDog"
                        :group="{ name: 'people', pull: 'clone', put: false, sort: true, }" item-key="name">
                        <template #item="{ element }">
                            <div class="layui-col-xs3 layui-col-xs3 flyli">
                                <i :class="'fa ' + element.icon + ' fa-2x'"></i>
                                <cite>{{ element.name }}</cite>
                            </div>

                        </template>
                    </draggable>
                </lay-collapse-item>
            </lay-collapse>
        </lay-side>
        <lay-body>
            <div style="  border:1px dashed rgb(0 255 99);min-height: 200px;">
                <header class="el-header _fc-m-tools">
                    <lay-tooltip content="从数据库中生成单个输入框，需要配置表单属性，生成后配置对应组件即可" :is-dark="false"> <button
                            @click="generate()" type="button"
                            class="layui-btn layui-btn-normal layui-btn-sm">从数据中生成表单</button></lay-tooltip>
                    <lay-tooltip content="设置表单属性表单名称等信息" :is-dark="false">
                        <button @click="attribute()" type="button"
                            class="layui-btn layui-btn-normal layui-btn-sm">表单属性</button>
                    </lay-tooltip>
                    <lay-tooltip content="显示预览实际表单" :is-dark="false">
                        <button @click="showfrom()" type="button"
                            class="layui-btn layui-btn-normal layui-btn-sm">预览</button>
                    </lay-tooltip>
                    <lay-tooltip content="发布到正式版" :is-dark="false">
                        <button @click="publishfrom()" type="button"
                            class="layui-btn layui-btn-normal layui-btn-sm">发布</button>
                    </lay-tooltip>
                </header>
                <lay-field title="表单标题">

                    <draggable :list="confirm" group="people">
                        <template #item="{ element, index }">
                            <div>

                                <subdesign @dblclick="set(element, index)" class="list-group-item1" :data="element">
                                </subdesign>
                            </div>
                        </template>
                    </draggable>
                </lay-field>
            </div>
        </lay-body>
        <lay-side style="flex: 0 0 350px; width: 350px;border: 1px dashed rgb(0, 255, 99);overflow: auto;">
            <sets :data="needdata" :setdata="setdata"></sets>
        </lay-side>

    </lay-layout>
</lay-panel>
</template>

<script lang="ts">
import draggable from "vuedraggable";
import subdesign from '../../../components/formdesign/subdesign.vue';
import sets from '../../../components/formdesign/set.vue';
import _ from 'lodash';
import http from "../../../utils/http";
import { watch, ref, onMounted } from 'vue';
import { useRouter, useRoute, RouteMeta } from 'vue-router';
import toolsdata from '../../../assets/toolsdata';
import { layer } from '@layui/layer-vue';
const needdata = ref(new Object());
export default {
    components: {
        draggable, subdesign, sets
    },
    name: "designindex",
    setup() {
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

        onMounted(() => {

            if (route.query.fromid != null && route.query.fromid != undefined && route.query.fromid != "add") {
                http.post("/api/form/getFormJsonById", { fromid: route.query.fromid }, "正在加载表单信息")
                    .then(res => {
                        if (res.success) {
                            var f=JSON.parse(res.data.designhtml);
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

        }
        const attribute = () => {
            if (form.value.table == null || form.value.table == undefined) {
                var t = new Object() as any;
                t.type = "table";
                t.table = "";
                t.style = "layui-form";
                t.url = "/api/";
                t.name = "这是表单名称";
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
                layers.open({ title: "标题", content: JSON.stringify(form.value) });
            }
            else {
                if (a == "save") {
                    console.log(confirm.value);
                    needdata.value = {};
                    var con = confirm.value;

                    confirm.value = [];
                    setTimeout(function () {
                        confirm.value = con;
                    }, 100);

                    layers.msg("更新成功", { icon: 1 });
                }

                else {
                 
                    confirm.value = confirm.value.filter((item: any) => {
                        return item !== val;
                    });

                }

            }

        }
        const showfrom = () => {
            var rules = new Object() as any;
            if (form.value.table==undefined) {
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
         confirm.value.forEach((item:any) => {
            for (let key in item.data) {

                if (key == "name") {
                    if (item.data.required == true || item.data.required == "true") {
                     
                        var m = new Object();
                        var e = [{ required: true, errorMessage:item.data.label + "不能为空" }];
                        m[item.data.name] = { rules: e }

                        rules[item.data.name]=m;
                    }

                }
                formdata.value["rules"] = rules;

            }})
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
        return {
            publishfrom, tools, log, groups, openKeys2, setdata, set, generate, attribute, showfrom, confirm, needdata, cloneDog
        }


    }
}

</script>
<style>
.list-group-item1:active {
    border: 1px dashed #f00;
}


.design .fdtools {
    margin-bottom: 15px;
    border-radius: 2px;
    background-color: #fff;
    box-shadow: 5px 5px 5px 0 rgba(0, 0, 0, .05);
    -webkit-box-shadow: #d4d2d2 0px 0px 10px;
    -moz-box-shadow: #d4d2d2 0px 0px 10px;
    margin: 2px;
}

.design .fly-shortcut {
    margin: 5px 0;
}

.design .fly-shortcut li {
    margin: 5px;
    line-height: 25px;
    text-align: center;
}

.design .fly-shortcut li .layui-icon {

    display: inline-block;
    width: 100%;
    height: 60px;
    line-height: 60px;
    text-align: center;
    color: #fff;
    border-radius: 2px;
    font-size: 30px;
    transition: all .3s;
    -webkit-transition: all .3s;
}

.design .fly-shortcut li cite {
    position: relative;
    top: 2px;
    display: block;
    color: #666;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 14px;
}

.design .fly-shortcut li:hover .layui-icon {
    opacity: 0.9;
}

.design .fly-shortcut li .layui-icon {
    background-color: #2F9688;
}

.design ._fc-m-tools {
    height: 40px;
    align-items: center;
    display: flex;
    justify-content: flex-end;
    border: 1px solid #ECECEC;
    border-top: 0 none;
}

.design .el-header {
    padding: 0 20px;
    box-sizing: border-box;
    flex-shrink: 0;
}



.design header {
    display: block;
}

.design ._fc-designer {
    height: 100%;
    min-height: 500px;
    overflow: hidden;
    cursor: default;
    position: relative;
}
</style>
