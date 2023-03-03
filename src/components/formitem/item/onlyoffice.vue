<template>


    <div ref="office" style="height: 500px;">
        <lay-input style="display: none;" v-model="value[data.data.name]" placeholder="文件id，通过该id获取文档信息"></lay-input>
        <div :id="'onlyoffice'+data.data.name">
        </div>

    </div>
</template>

<script lang="ts">
export default {
    name: "onlyoffice",

};
</script>
<script lang="ts" setup>
import { ref, onMounted, onBeforeMount } from "vue";
import utils from "../../../utils/utils";
import config from "../../../config";
import http from "../../../api/http";
interface ItemcolorProps {
    data: any;
    value: any;
}
console.log("onlyoffice");
debugger
const props = withDefaults(defineProps<ItemcolorProps>(), {
    data: Object, value: Object
});
const data = ref(props.data);
const value = ref(props.value);
const office = ref(null);
const win = window as any;

//如果文档时空则新建一个文档
if (value.value[data.value.data.name] == "") {
    //获取一个新的文档
    http.post("/api/office/getNewDocument", { filetype: data.value.data.data }).then(res => {
        if (res.success) {
            value.value[data.value.data.name]=res.data.id;
            var fig = {
                document: {
                    directUrl: "",
                    fileType: data.value.data.data,

                    key: res.data.id,
                    title: res.data.title,
                    permissions:
                    {
                        copy: true
                    },

                    url: config.documenturl + res.data.url,
                },
                editorConfig: {
                    callbackUrl: config.documentcallbackUrl + "/api/office/Callback",
                    lang: "zh",
                    status: 2,
                    canAutosave: true,
                    mode: "edit",
                    toolbarHideFileName: false,
                    toolbarNoTabs: false,
                    //  customization: { forcesave:false } 
                    //这是时不保存
                    customization: {
                        forcesave: true
                    },
                    plugins: {
                        autostart: ["asc.{c5000037-b1f1-11ed-9b42-00ffb2e81da2}"],
                        pluginsData: ['http://service.asxsyd92.com:8090/7.3.2-8/sdkjs-plugins/redchromatography/overprint/config.json']
                    }


                }
            }
            var docEditor = new win.DocsAPI.DocEditor("onlyoffice"+data.value.data.name, fig);

        }else{
        
            console.log("获取新文档失败");
        }
    }).catch(res => {
        console.log("网络错误");
    });
}else{
    http.post("/api/office/getDocumentById", { id: value.value[data.value.data.name] }).then(res => {
        if (res.success) {

            var fig = {
                document: {
                    directUrl: "",
                    fileType: data.value.data.data,

                    key: res.data.id,
                    title: res.data.title,
                    permissions:
                    {
                        copy: true
                    },

                    url: config.documenturl + res.data.url,
                },
                editorConfig: {
                    callbackUrl: config.documentcallbackUrl + "/api/office/Callback",
                    lang: "zh",
                    status: 2,
                    canAutosave: true,
                    mode: "edit",
                    toolbarHideFileName: false,
                    toolbarNoTabs: false,
                    //  customization: { forcesave:false } 
                    //这是时不保存
                    customization: {
                        forcesave: true
                    },
                    plugins: {
                        autostart: ["asc.{c5000037-b1f1-11ed-9b42-00ffb2e81da2}"],
                        pluginsData: ['http://service.asxsyd92.com:8090/7.3.2-8/sdkjs-plugins/redchromatography/overprint/config.json']
                    }


                }
            }
            var docEditor = new win.DocsAPI.DocEditor("onlyoffice"+data.value.data.name, fig);

        }
    }).catch(res => {
        console.log("网络错误");
    });
}
onMounted(() => {
    console.log(office)


})
</script>