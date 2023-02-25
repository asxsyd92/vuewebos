<template>
            <onlyoffice :config="config">

            </onlyoffice>
</template>

<script lang="ts" setup>
import onlyoffice from '../../../components/formitem/item/onlyoffice.vue';
import { ref } from 'vue';


const config = ref(
    {
        document: {
            directUrl: "",
            fileType: "docx",

            key: Date.parse(new Date().toString()) + "" + "|" + "new.docx",
            title: "new.docx",
            permissions:
            {
                copy: true
            },


            url: "http://asxsyd92.com/asxsyd92upload/new.docx",
      },
        editorConfig: {
            callbackUrl: "http://asxsyd92.com/v1/api/office/Callback?filename=new.docx&useraddress=asxsyd92.com",
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
            plugins:{
                 autostart: ["asc.{c5000037-b1f1-11ed-9b42-00ffb2e81da2}"],
                 pluginsData: ['http://webos.asxsyd92.com/plugins/overprint/config.json']
            } 
    

        }
    })


</script>