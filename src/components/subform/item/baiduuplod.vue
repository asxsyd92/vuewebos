<template>
  <div class="layui-form-item layui-form-text">
    <label class="layui-form-label">{{data.data.label}}</label>

    <div class="layui-input-block">
      <!-- 隐藏编辑器 -->
      <!--  -->
      <vue-ueditor-wrap class="ueditor-ins" ref="ueditor" :config='config' 
        @beforeInit="addCustomUI" style="display: none;">
      </vue-ueditor-wrap>
      <input :name="data.data.name" :value="data.data.value" style="display: none;"/>
    
      <div v-if="data.data.type=='image'">
        <div class="online">
             <ul class="list photos">
               <li v-for="(li,index) in imagelist" :key="index">
                   <img  :src="li" style="height:100px;width:auto" >
               </li>
    
            </ul>
        </div>
         <button type="button" class="layui-btn layui-btn-normal  layui-btn-sm " @click="showimg()">选择</button>
      </div>
    <div v-else>
          <div class="online">
            <ul class="list">
              <li v-for="(li,index) in filelist" :key="index"  >
                <div class="file-wrapper"><i class="fa fa-file-zip-o fa-5x file-preview"></i><span class="file-title">{{li}}</span></div>
              </li>
            </ul>
      
        </div>
         <button type="button" class="layui-btn layui-btn-normal  layui-btn-sm " @click="showfile()">选择</button>
    </div>
    </div>
  </div>


</template>

<script>


  // 1、引入VueUeditorWrap组件
  import VueUeditorWrap from 'vue-ueditor-wrap' // ES6 Module
  // const VueUeditorWrap = require('vue-ueditor-wrap') // CommonJS

  let _that = null

  export default {
    name: 'ueditor',
    // 2、注册组件
    components: {
      VueUeditorWrap
    },
    data() {
      return {
        // 3、v-model绑定数据
        imagelist: '',
         filelist: '',
        editorId: "",
        // 4、根据项目需求自行配置,具体配置参见ueditor.config.js源码或 http://fex.baidu.com/ueditor/#start-start
        config: {
          // 编辑器不自动被内容撑高
          autoHeightEnabled: false,
          // 初始容器高度
          initialFrameHeight: '0px',
          // 初始容器宽度
          // initialFrameWidth: '100%',
          // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
          serverUrl: '/api/ueditor/upload?asxsyd92user=' + window.localStorage.userid,
          // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
          UEDITOR_HOME_URL: '../../../../common/ueditor/',
          toolbars: [["insertimage", "attachment"]],
          // 配合最新编译的资源文件，你可以实现添加自定义Request Headers,详情https://github.com/HaoChuan9421/ueditor/commits/dev-1.4.3.3
          headers: {
            'Authorization': "bearer " + localStorage._token,
          }
        }
      }
    },
    created() {
      _that = this
    },
    props: {
      data: {
        type: Object,
        required: true
      },
      model: Object
    },
    mounted() {
      this.showData();

      // console.log('%c注意：本Demo提供的serverUrl是为了方便小伙伴们体验图片文件等上传功能。\n请勿在生产环境使用此serverUrl！！！', 'background:#f33;color:#fff')
    },
    watch: {


    },
    methods: {
      showimg() {
        var m=this;

        var uploadEditor = window.UE.getEditor(this.editorId);
        uploadEditor.ready(function () {
          uploadEditor.addListener("beforeInsertImage", _beforeInsertImage);
          // uploadEditor.addListener("afterUpfile", _afterUpfile);
        });

        var dialog = uploadEditor.getDialog("insertimage");
        if (this.name != null && this.name != undefined) {
          var id = this.name.split("_")[1];
          updata_id = id;
        }
        dialog.title = '多图上传';
        dialog.render();
        dialog.open();

    function _beforeInsertImage(t, result) {

    var imageHtml = [];
     layui.$.each(result, function (index, item, arr) {
     imageHtml.push(item.src);
     });
     m.imagelist=imageHtml;
     m.data.data.value=imageHtml.join(",");
 

  }
      },showfile(){
             var m=this;

        var uploadEditor = window.UE.getEditor(this.editorId);
        uploadEditor.ready(function () {
        uploadEditor.addListener("afterUpfile", _afterUpfile);
        });
      var dialog = uploadEditor.getDialog("attachment");
        if(this.name!=null&&this.name!=undefined){
           var id= this.name.split("_")[1];
           updata_id=id
         }
        dialog.title = '附件上传';
        dialog.render();
        dialog.open();
  function _afterUpfile(t, result) {
    var fileHtml = [];
   layui.$.each(result, function (index, item, arr) {
      fileHtml.push(item.url);
    });
     m.filelist=fileHtml;
     m.data.data.value=fileHtml.join(",");
 

  }
      },
      // 6. 查看绑定的数据
      showData() {
        if(this.data.data.type=='image'){
       var list = this.data.data.value == null ? null : this.data.data.value.split(",");
        if (list != null && list != "") {
          this.imagelist = list;
        } else {
          this.imagelist = [];
        }
        setTimeout(function () {
                                         layui. layer.photos({
                photos: ".photos",
                anim: 5
            });
           }, 500);
      
        }else{
       var list = this.data.data.value == null ? null : this.data.data.value.split(",");
        if (list != null && list != "") {
          this.filelist = list;
        } else {
          this.filelist = [];
        }

        }
   
  
      },
      // 7. 借助 beforeInit 钩子，你可以实现对 UEditor 的二次开发，会在 scripts 加载完毕之后、编辑器初始化之前触发，以 编辑器 id 和 配置参数 作为入参
      addCustomUI(editorId, editorConfig) {
        this.editorId = editorId;
      }

    }
  }

</script>

<style lang="less">

  .flow-default {
    width: 600px;
    height: 400px;
    overflow: auto;
    font-size: 0;
  }

  .flow-default li {
    display: inline-block;
    margin: 0 5px;
    font-size: 14px;
    width: 48%;
    margin-bottom: 10px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    background-color: #eee;
  }

  .flow-default img {
    width: 100%;
    height: 100%;
  }

  .site-demo-flow {
    width: 600px;
    height: 300px;
    overflow: auto;
    text-align: center;
  }

  .site-demo-flow img {
    width: 40%;
    height: 200px;
    margin: 0 2px 5px 0;
    border: none;
  }

  .ueditor-container {
    width: 100%;
    height: 100%;
    padding: 0 15px;

    .ueditor-ins {
      width: 100%;
      height: calc(100% - 15px);
      margin-bottom: 15px;

      &>div {
        width: 100%;
        height: 100%;
      }

      .edui-editor {
        width: 100%;
        height: 100%;
      }
    }
  }

 



/* 图片管理样式 */
.online {
    width: 100%;
 
    padding: 10px 0 0 0;
}
.online #fileList{
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    position: relative;
}
.online ul {
    display: block;
    list-style: none;
    margin: 0;
    padding: 0;
}
.online li {
    float: left;
    display: block;
    list-style: none;
    padding: 0;
    width: 113px;
    height: 113px;
    margin: 0 0 9px 9px;
    *margin: 0 0 6px 6px;
    background-color: #eee;
    overflow: hidden;
    cursor: pointer;
    position: relative;
}
.online li.clearFloat {
    float: none;
    clear: both;
    display: block;
    width:0;
    height:0;
    margin: 0;
    padding: 0;
}
.online li img {
    cursor: pointer;
}
.online li div.file-wrapper {
    cursor: pointer;
    position: absolute;
    display: block;
    width: 111px;
    height: 111px;
    border: 1px solid #eee;
   // background: url("./images/bg.png") repeat;
}
.online li div span.file-title{
    display: block;
    padding: 0 3px;
    margin: 3px 0 0 0;
    font-size: 12px;
    height: 13px;
    color: #555555;
    text-align: center;
    width: 107px;
    white-space: nowrap;
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
}
.online li .icon {
    cursor: pointer;
    width: 113px;
    height: 113px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    border: 0;
    background-repeat: no-repeat;
}
.online li .icon:hover {
    width: 107px;
    height: 107px;
    border: 3px solid #1094fa;
}
.online li.selected .icon {
   // background-image: url(images/success.png);
    //background-image: url(images/success.gif) \9;
    background-position: 75px 75px;
}
.online li.selected .icon:hover {
    width: 107px;
    height: 107px;
    border: 3px solid #1094fa;
    background-position: 72px 72px;
}


/* 在线文件的文件预览图标 */
i.file-preview {
    display: block;
    margin: 10px auto;
    width: 70px;
    height: 70px;
    //background-image: url("./images/file-icons.png");
   // background-image: url("./images/file-icons.gif") \9;
    background-position: -140px center;
    background-repeat: no-repeat;
    color:rgba(30, 159, 255, 1);
}
i.file-preview.file-type-dir{
    background-position: 0 center;
}
i.file-preview.file-type-file{
    background-position: -140px center;
}
i.file-preview.file-type-filelist{
    background-position: -210px center;
}
i.file-preview.file-type-zip,
i.file-preview.file-type-rar,
i.file-preview.file-type-7z,
i.file-preview.file-type-tar,
i.file-preview.file-type-gz,
i.file-preview.file-type-bz2{
    background-position: -280px center;
}
i.file-preview.file-type-xls,
i.file-preview.file-type-xlsx{
    background-position: -350px center;
}
i.file-preview.file-type-doc,
i.file-preview.file-type-docx{
    background-position: -420px center;
}
i.file-preview.file-type-ppt,
i.file-preview.file-type-pptx{
    background-position: -490px center;
}
i.file-preview.file-type-vsd{
    background-position: -560px center;
}
i.file-preview.file-type-pdf{
    background-position: -630px center;
}
i.file-preview.file-type-txt,
i.file-preview.file-type-md,
i.file-preview.file-type-json,
i.file-preview.file-type-htm,
i.file-preview.file-type-xml,
i.file-preview.file-type-html,
i.file-preview.file-type-js,
i.file-preview.file-type-css,
i.file-preview.file-type-php,
i.file-preview.file-type-jsp,
i.file-preview.file-type-asp{
    background-position: -700px center;
}
i.file-preview.file-type-apk{
    background-position: -770px center;
}
i.file-preview.file-type-exe{
    background-position: -840px center;
}
i.file-preview.file-type-ipa{
    background-position: -910px center;
}
i.file-preview.file-type-mp4,
i.file-preview.file-type-swf,
i.file-preview.file-type-mkv,
i.file-preview.file-type-avi,
i.file-preview.file-type-flv,
i.file-preview.file-type-mov,
i.file-preview.file-type-mpg,
i.file-preview.file-type-mpeg,
i.file-preview.file-type-ogv,
i.file-preview.file-type-webm,
i.file-preview.file-type-rm,
i.file-preview.file-type-rmvb{
    background-position: -980px center;
}
i.file-preview.file-type-ogg,
i.file-preview.file-type-wav,
i.file-preview.file-type-wmv,
i.file-preview.file-type-mid,
i.file-preview.file-type-mp3{
    background-position: -1050px center;
}
i.file-preview.file-type-jpg,
i.file-preview.file-type-jpeg,
i.file-preview.file-type-gif,
i.file-preview.file-type-bmp,
i.file-preview.file-type-png,
i.file-preview.file-type-psd{
    background-position: -140px center;
}
</style>