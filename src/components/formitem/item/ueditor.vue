<template>
   <!-- <div class="layui-form-item layui-form-text">
    <label class="layui-form-label">{{data.data.label}}</label>
  
    <div class="layui-input-block">
    <vue-ueditor-wrap class="ueditor-ins"
                      ref="ueditor" 
                     :name="data.data.name"
                      v-model="value[data.data.name]"
                      :destroy="false" 
                      :config="config" 
        
                      @ready="ready" 
         
                      >
    </vue-ueditor-wrap>
    </div>
  </div> -->

    <lay-form-item :placeholder="data.data.placeholder" class="layui-form-item" :label="data.data.label" :prop="data.data.name">
 <vue-ueditor-wrap class="ueditor-ins"
                      ref="ueditor" 
                     :name="data.data.name"
                      v-model="value[data.data.name]"
                      :destroy="false" 
                      :config="config" 
        
                      @ready="ready" 
         
                      >
    </vue-ueditor-wrap>
    </lay-form-item>
</template>

<script lang="ts">
import Vue from "vue";
export default {
  name: "ueditor",
};
</script>
<script lang="ts" setup>
    import { ref,reactive ,onMounted  } from "vue";
    import { useUserStore } from "../../../store/user";
interface ItemradioProps {
  data: any;
  value:any;
}
const props = withDefaults(defineProps<ItemradioProps>(), {
  data:Object, value:Object
});


const user = useUserStore();
        
 const  config =ref({
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 初始容器高度
        initialFrameHeight: '500px',
        // 初始容器宽度
       // initialFrameWidth: '100%',
        // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
        serverUrl: '/api/ueditor/upload?asxsyd92user='+user.userInfo.userid,
        // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
      UEDITOR_HOME_URL: '/ueditor/',
        toolbars: [[
            'fullscreen', 'source', '|', 'undo', 'redo', '|',
            'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
            'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
            'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
            'directionalityltr', 'directionalityrtl', 'indent', '|',
            'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
            'link', 'unlink', 'anchor', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
            'simpleupload', 'insertimage', 'emotion', 'scrawl', 'insertvideo', 'music', 'attachment', 'map', 'gmap', 'insertframe', 'insertcode', 'webapp', 'pagebreak', 'template', 'background', '|',
            'horizontal', 'date', 'time', 'spechars', 'snapscreen', 'wordimage', '|',
            'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts', '|',
            'print', 'preview', 'searchreplace', 'drafts', 'help'
        ]],
        // 配合最新编译的资源文件，你可以实现添加自定义Request Headers,详情https://github.com/HaoChuan9421/ueditor/commits/dev-1.4.3.3
        headers: {
         'Authorization':"bearer " +  user.token,
        }
      });
      const ready=function(editorInstance:any){
      
      console.log(`实例${editorInstance.key}已经初始化:`, editorInstance)

      //先改变一下编辑器的高度
      changeEditorHeight();
      //窗口大小改变的回调,编辑器的高度跟着变
      window.onresize = function(){
        changeEditorHeight();

    
      }
      }
     const  changeEditorHeight=function(){
      //拿到工具栏的高度
      var toolbarbox :any,iframeholder:any,eduieditor:any;
       toolbarbox = document.querySelector(".edui-editor-toolbarbox") ;
      if(toolbarbox!=null&&toolbarbox!=undefined){
      var toolbarboxHeight = toolbarbox.offsetHeight
        
      var allDeltaHeight = toolbarboxHeight + 23 + 'px'

       iframeholder = document.querySelector(".edui-editor-iframeholder")
      iframeholder.style.height = '400px';
         eduieditor = document.querySelector(".edui-editor") ;
      if(eduieditor!=null&&eduieditor!=undefined){
          eduieditor.style.width = `calc(100% - 20px)`;
          iframeholder.style.width = `calc(100% - 20px)`
      }
    
      }

    }
// interface Data {
//     [key:string]:null
// }
// export default ({
 
//       props: {  //指定接收的值，必须指定类型
//     data: {
//       type:Object
//     },
//     value:{
//          type:Object
//     }
//   } ,setup(props:Data) {
//          const {data,value} = toRefs(props) as any;
         
//  const  config =ref({
//         // 编辑器不自动被内容撑高
//         autoHeightEnabled: false,
//         // 初始容器高度
//         initialFrameHeight: '500px',
//         // 初始容器宽度
//        // initialFrameWidth: '100%',
//         // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
//         serverUrl: '/api/ueditor/upload?asxsyd92user='+window.localStorage.userid,
//         // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
//       UEDITOR_HOME_URL: '/UEditor/',
//         toolbars: [[
//             'fullscreen', 'source', '|', 'undo', 'redo', '|',
//             'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
//             'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
//             'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
//             'directionalityltr', 'directionalityrtl', 'indent', '|',
//             'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
//             'link', 'unlink', 'anchor', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
//             'simpleupload', 'insertimage', 'emotion', 'scrawl', 'insertvideo', 'music', 'attachment', 'map', 'gmap', 'insertframe', 'insertcode', 'webapp', 'pagebreak', 'template', 'background', '|',
//             'horizontal', 'date', 'time', 'spechars', 'snapscreen', 'wordimage', '|',
//             'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts', '|',
//             'print', 'preview', 'searchreplace', 'drafts', 'help'
//         ]],
//         // 配合最新编译的资源文件，你可以实现添加自定义Request Headers,详情https://github.com/HaoChuan9421/ueditor/commits/dev-1.4.3.3
//         headers: {
//          'Authorization':"bearer " +  localStorage._token,
//         }
//       });
//       const ready=function(editorInstance:any){
      
//       console.log(`实例${editorInstance.key}已经初始化:`, editorInstance)

//       //先改变一下编辑器的高度
//       changeEditorHeight();
//       //窗口大小改变的回调,编辑器的高度跟着变
//       window.onresize = function(){
//         changeEditorHeight();

    
//       }
//       }
//      const  changeEditorHeight=function(){
//       //拿到工具栏的高度
//       var toolbarbox :any,iframeholder:any,eduieditor:any;
//        toolbarbox = document.querySelector(".edui-editor-toolbarbox") ;
//       if(toolbarbox!=null&&toolbarbox!=undefined){
//       var toolbarboxHeight = toolbarbox.offsetHeight
        
//       var allDeltaHeight = toolbarboxHeight + 23 + 'px'

//        iframeholder = document.querySelector(".edui-editor-iframeholder")
//       iframeholder.style.height = '400px';
//          eduieditor = document.querySelector(".edui-editor") ;
//       if(eduieditor!=null&&eduieditor!=undefined){
//           eduieditor.style.width = `calc(100% - 20px)`;
//           iframeholder.style.width = `calc(100% - 20px)`
//       }
    
//       }

//     }
//     return {

//       // 更多 UEditor 配置，参考 http://fex.baidu.com/ueditor/#start-config
//     config,
//     ready
//     }
//   },
// });
</script>
<style lang="less">
.ueditor-container{
  width: 90%;
  height: 100%;
  padding: 0 15px;

  .ueditor-ins{
    width: 90%;
    height: calc(100% - 15px);
    margin-bottom: 15px;

    &>div{
      width: 100%;
      height: 100%;
    }

    .edui-editor{
      width: 100%;
      height: 100%;
    }
  }
}


</style>