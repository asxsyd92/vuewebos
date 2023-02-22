<template>
            <onlyoffice :config="config">

            </onlyoffice>
</template>

<script lang="ts" setup>
import onlyoffice from '../../../components/formitem/item/onlyoffice.vue';
import { ref } from 'vue';
// import { DocumentEditor } from "@onlyoffice/document-editor-vue";


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
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkb2N1bWVudCI6eyJrZXkiOiJLaGlyejZ6VFBkZmQ3IiwicGVybWlzc2lvbnMiOnsiY29tbWVudCI6dHJ1ZSwiY29tbWVudEdyb3VwcyI6eyJlZGl0IjpbIkdyb3VwMiIsIiJdLCJyZW1vdmUiOlsiIl0sInZpZXciOiIifSwiY29weSI6dHJ1ZSwiZGVsZXRlQ29tbWVudEF1dGhvck9ubHkiOmZhbHNlLCJkb3dubG9hZCI6dHJ1ZSwiZWRpdCI6dHJ1ZSwiZWRpdENvbW1lbnRBdXRob3JPbmx5IjpmYWxzZSwiZmlsbEZvcm1zIjp0cnVlLCJtb2RpZnlDb250ZW50Q29udHJvbCI6dHJ1ZSwibW9kaWZ5RmlsdGVyIjp0cnVlLCJwcmludCI6dHJ1ZSwicmV2aWV3Ijp0cnVlLCJyZXZpZXdHcm91cHMiOlsiR3JvdXAxIiwiR3JvdXAyIiwiIl19LCJ1cmwiOiJodHRwczovL2V4YW1wbGUuY29tL3VybC10by1leGFtcGxlLWRvY3VtZW50LmRvY3gifSwiZWRpdG9yQ29uZmlnIjp7ImNhbGxiYWNrVXJsIjoiaHR0cHM6Ly9leGFtcGxlLmNvbS91cmwtdG8tY2FsbGJhY2suYXNoeCIsIm1vZGUiOiJlZGl0IiwidXNlciI6eyJncm91cCI6Ikdyb3VwMSIsImlkIjoiNzhlMWU4NDEiLCJuYW1lIjoiU21pdGgifX19.irYst9vmsLoQtC-95A-6W8DnbqGXCbmcxJajfbPh6tQ"
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
                 pluginsData: ['http://127.0.0.1:4000/plugins/overprint/config.json']
            } 
    

        }
    })


</script>