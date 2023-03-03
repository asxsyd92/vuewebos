<template>
    <lay-col :md="data.data.col" style="margin-bottom: 20px;">
            <!-- 隐藏编辑器 -->
        <!--  -->
        <VueUeditorWrap
        :editor-id="data.data.name+'ueditor'"
         :ref="data.data.name+'ueditor'"
         :name="data.data.name+'ueditor'"
         :destroy="true" 
          :config="config" 
          style="display: none;" 
         >
        </VueUeditorWrap>
        <input v-model="value[data.data.name]" style="display: none;" />
        <lay-form-item :placeholder="data.data.placeholder" 
        class="layui-form-item" :label="data.data.label" 
        :prop="data.data.name">
    
        <div v-if="data.data.type =='image'">
            <div class="online">
                <lay-carousel v-model="active" style="width:33%;height:100px" v-if="imagelist.length>0" >
                 
                    <lay-carousel-item v-for="(item,index) in imagelist" :id="index+''" :key="index">
                        <img  :src="item" style="width:100%;height:100%">
                    </lay-carousel-item>
                  </lay-carousel>
            </div>
            <button type="button" class="layui-btn layui-btn-normal  layui-btn-sm " @click="showimg(data.data.name+'ueditor')">请选择图片</button>
          </div>
          <div v-else>
            <div class="online">
              <ul class="list">
                <li v-for="(li,index) in filelist" :key="index">
                  <div class="file-wrapper">
                    <a :href="li" target="_blank">
                    <i class="fa fa-file-zip-o fa-5x file-preview"></i><span
                      class="file-title"></span>
                    </a>
                </div>

                </li>
              </ul>
    
            </div>
            <button type="button" class="layui-btn layui-btn-normal  layui-btn-sm "  @click="showfile(data.data.name+'ueditor')">请选择附件</button>
          </div>
   
    </lay-form-item>

</lay-col>
  </template>
  <script lang="ts">
import Vue from "vue";
export default {
  name: "baiduuplod",
};
</script>
  
  <script lang="ts" setup>
    import { ref } from "vue";
    import { useUserStore } from "../../../store/user";
    import VueUeditorWrap from 'vue-ueditor-wrap/lib/vue-ueditor-wrap/index';
    import con from "../../../config";
    interface IbaiduuplodProps {
      data: any;
      value: any;
    }
    const props = withDefaults(defineProps<IbaiduuplodProps>(), {
      data: Object, value: Object
    });
    const active = ref("0");
  
    const imagelist = ref([]) as any;
    const filelist = ref([]) as any;
    const data = ref(props.data);
    const value = ref(props.value);
   
    const user = useUserStore();
    //处理赋值
    if(data.value.data.type =='image'){
        if(value.value[data.value.data.name]!="" ){
            imagelist.value=value.value[data.value.data.name].split(",")
        }
    }else{
        if(value.value[data.value.data.name]!="" ){
            filelist.value=value.value[data.value.data.name].split(",")
        }
    }
    const config = ref(
        {
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false, 
        elementPathEnabled:false,
        // 初始容器高度
        initialFrameHeight: '500px',
    
        // 初始容器宽度
        initialFrameWidth: '100%',
        // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
        serverUrl: con.host+'/api/ueditor/upload?asxsyd92user='+user.userInfo.userid,
        // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
        UEDITOR_HOME_URL: '/ueditor/',
        toolbars: [[ 'insertimage', 'attachment' ]],
        // 配合最新编译的资源文件，你可以实现添加自定义Request Headers,详情https://github.com/HaoChuan9421/ueditor/commits/dev-1.4.3.3
        headers: {
         'Authorization':"bearer " +  user.token,
        }
      }
    );
  
    const showimg =  (id :any)=> {

      var win = window as any;
  
     var uploadEditor = win.UE.getEditor(id,{
      zIndex: 99999    
     });
      uploadEditor.addListener("beforeInsertImage", _beforeInsertImage);
      var dialog = uploadEditor.getDialog("insertimage");
  
      dialog.title = '多图上传';
      dialog.render();
      dialog.open();
      function _beforeInsertImage(t: any, result: any) {

        result.forEach((item: any) => {
       
          imagelist.value.push(item.src);
        })
        if(imagelist.value.length>0){
            value.value[data.value.data.name] = imagelist.value.join(",");
        }
        dialog.close();
      }
     
    }
    const showfile =  (id :any)=> {
  
  
        var win = window as any;
      var uploadEditor =  win.UE.getEditor(id,{
      zIndex: 99999    
     });
      uploadEditor.addListener("afterUpfile", _afterUpfile);
      var dialog = uploadEditor.getDialog("attachment");
      dialog.title = '附件上传';
      dialog.render();
      dialog.open();
  
  
  
  
      function _afterUpfile(t: any, result: any) {
        result.forEach((item: any) => {
          filelist.value.push(item.url);
        })
        if(filelist.value.length>0){
            value.value[data.value.data.name] = filelist.value.join(",");
        }
        dialog.close();
      }
    }
    // 6. 查看绑定的数据
    const showData =  ()=> {
      if (data.value.data.data.type == 'image') {
        var list = data.value.data.value == null ? null : data.value.data.value.split(",");
        if (list != null && list != "") {
          imagelist.value = list;
        } else {
          imagelist.value = [];
        }
        // setTimeout(function () {
        //   layer.photos({
        //     photos: ".photos",
        //     anim: 5
        //   });
        // }, 500);
  
      } else {
        var list = data.value.data.value == null ? null : data.value.data.value.split(",");
        if (list != null && list != "") {
          filelist.value = list;
        } else {
          filelist.value = [];
        }
  
      }
  
  
    }
    // // 7. 借助 beforeInit 钩子，你可以实现对 UEditor 的二次开发，会在 scripts 加载完毕之后、编辑器初始化之前触发，以 编辑器 id 和 配置参数 作为入参
    // const ready = function (editorInstance: any) {
  
    //    var win = window as any;
    //    var uploadEditor = win.UE.getEditor(editorInstance.key);
  
    //   uploadEditor.ready(function () {
    //    // uploadEditor.addListener("beforeInsertImage", _beforeInsertImage);
    //   });
    
    // }
  
  
  </script>
  <style lang="less">
  .ueditor-container {
    width: 90%;
    height: 100%;
    padding: 0 15px;

    .ueditor-ins {
      width: 90%;
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
  </style>