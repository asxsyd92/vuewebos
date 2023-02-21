<template>
    <DocumentEditor id="docEditor" documentServerUrl="http://webos.asxsyd92.com/7.3.2-8/" :config="config"
        :events_onDocumentReady="onDocumentReady" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { DocumentEditor } from "@onlyoffice/document-editor-vue";


const config = ref(
{
        document: {
            directUrl: "",
            fileType: "docx",

            key: Date.parse(new Date().toString())+""+"|"+"new.docx",
			title:"new.docx",
            permissions:
			{
            copy: true
            },
       

            url: "http://asxsyd92.com/asxsyd92upload/new.docx",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkb2N1bWVudCI6eyJrZXkiOiJLaGlyejZ6VFBkZmQ3IiwicGVybWlzc2lvbnMiOnsiY29tbWVudCI6dHJ1ZSwiY29tbWVudEdyb3VwcyI6eyJlZGl0IjpbIkdyb3VwMiIsIiJdLCJyZW1vdmUiOlsiIl0sInZpZXciOiIifSwiY29weSI6dHJ1ZSwiZGVsZXRlQ29tbWVudEF1dGhvck9ubHkiOmZhbHNlLCJkb3dubG9hZCI6dHJ1ZSwiZWRpdCI6dHJ1ZSwiZWRpdENvbW1lbnRBdXRob3JPbmx5IjpmYWxzZSwiZmlsbEZvcm1zIjp0cnVlLCJtb2RpZnlDb250ZW50Q29udHJvbCI6dHJ1ZSwibW9kaWZ5RmlsdGVyIjp0cnVlLCJwcmludCI6dHJ1ZSwicmV2aWV3Ijp0cnVlLCJyZXZpZXdHcm91cHMiOlsiR3JvdXAxIiwiR3JvdXAyIiwiIl19LCJ1cmwiOiJodHRwczovL2V4YW1wbGUuY29tL3VybC10by1leGFtcGxlLWRvY3VtZW50LmRvY3gifSwiZWRpdG9yQ29uZmlnIjp7ImNhbGxiYWNrVXJsIjoiaHR0cHM6Ly9leGFtcGxlLmNvbS91cmwtdG8tY2FsbGJhY2suYXNoeCIsIm1vZGUiOiJlZGl0IiwidXNlciI6eyJncm91cCI6Ikdyb3VwMSIsImlkIjoiNzhlMWU4NDEiLCJuYW1lIjoiU21pdGgifX19.irYst9vmsLoQtC-95A-6W8DnbqGXCbmcxJajfbPh6tQ"
        },
        editorConfig: {
            callbackUrl: "http://asxsyd92.com/api/office/Callback?filename=new.docx&useraddress=asxsyd92.com",
            lang: "zh",
            status: 2,
            canAutosave:true,
            mode:"edit",
			toolbarHideFileName: false,
            toolbarNoTabs: false,
          //  customization: { forcesave:false } 
            //这是时不保存
            customization: {
                forcesave: true
            }
    
        }
	}


);
// if (config.value.editorConfig.createUrl) {
//             config.value.events.onRequestSaveAs = onRequestSaveAs;
//         }
// const config = {
//     "documentType": "text",
// "type":"desktop",
//     "document": {
//         "fileType": "docx",
//         "key": "VlR3VHA3REJQT1lFWm5xWUloeFlQUE9OZVVVd0g5MFdiREJOclA1ZmtocGNiYVBKQ3VmNFAxWXZSVlB5dHd4ejNCUFdhdUJoZXpRakhB_ee12bbb656a19fb826297963a9fe20a2",
//         "title": "111(8).docx",
//         "url": "http://127.0.0.1:4000/api/office/Callback",
// "permissions": {
// "reader":true,
// "download": true ,
// "edit": true ,
// "print":  true,
// "review":true,
// "rename":false,
// "changeHistory":true,
// "fillForms":true,
// "comment":true
//         }
//     },
//     "editorConfig": {
// "mode":"edit",
// "canAutosave":true,

// "canCoAuthoring":true,
// "callbackUrl": "http://demo.dzzoffice.com/index.php?mod=onlyoffice&do=savefile&path=VlR3VHA3REJQT1lFWm5xWUloeFlQUE9OZVVVd0g5MFdiREJOclA1ZmtocGNiYVBKQ3VmNFAxWXZSVlB5dHd4ejNCUFdhdUJoZXpRakhB&token=VlR3VHA3REJQT1lFWm51WmNoZFpQX3JlTGhKclQ0Z1NiVFpM",
// "createUrl":'',
// "lang": "zh-CN",
// "location":"zh-CN",
// "user": {
// id:'3',
// firstname:'陈曦',
// name:'陈曦'
// }
//    ,"customization": {
// "chat":true,
// "comments":true,
// "goback":false,
// "compactToolbar":true,
// "about": false,
// "leftMenu": true,
// "rightMenu": false,
// "toolbar": true,
//             "header": false,
//             "autosave": true,
// "showReviewChanges": true,
// "forcesave":false,
// }
//     },
// "events": {
// 'onAppReady': function(){},
// 'onDocumentReady': function(){},
// 'onBack': function(){},
// 'onError': function(){},
// 'onSave': function(){}
// }
// };
//
// const config=ref(
//     {

//                 document: {
//                     fileType: "docx",
//                     key: "__1new__1_.docx1676385300161",
//                     type:"desktop",
//                     title: "new (1).docx",
//                 url: "http://localhost/example/download?fileName=new%20(1).docx&useraddress=__1",
//              },

//                 editorConfig: {
//                     callbackUrl: "https://example.com/url-to-callback.ashx",
//                     lang:"zh"
//                 }
//             }

// );
const onDocumentReady = () => {
    console.log("Document is loaded");
}

</script>