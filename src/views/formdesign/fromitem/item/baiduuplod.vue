<template>
  <div class="layui-form-item layui-form-text">
    <label class="layui-form-label">{{data.data.label}}</label>

    <div class="layui-input-block">
      <!-- 隐藏编辑器 -->
      <!--  -->
      <vue-ueditor-wrap class="ueditor-ins" :ref="data.data.name+'ueditor'" @ready="ready"  :config="config" style="display: none;">
      </vue-ueditor-wrap>
      <input v-model="value[data.data.name]" style="display: none;" />

      <div v-if="data.data.type =='image'">
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
            <li v-for="(li,index) in filelist" :key="index">
              <div class="file-wrapper"><i class="fa fa-file-zip-o fa-5x file-preview"></i><span
                  class="file-title">{{li}}</span></div>
            </li>
          </ul>

        </div>
        <button type="button" class="layui-btn layui-btn-normal  layui-btn-sm " @click="showfile()">选择</button>
      </div>
    </div>

</div>
</template>

<script lang="ts">



 
  export default {
    name: "baiduuplod",
 
  };
</script>
<script lang="ts" setup>
  import { ref, reactive, onMounted } from "vue";
  interface ItemradioProps {
    data: any;
    value: any;
  }
  const props = withDefaults(defineProps < ItemradioProps > (), {
    data: Object, value: Object
  });


  const imagelist = ref([]) as any;
  const filelist = ref([]) as any;
  const editorId = ref("") as any;
  const data = ref(props.data);
  const value = ref(props.value);


  const config = ref({
    // 编辑器不自动被内容撑高
    autoHeightEnabled: false,
    // 初始容器高度

    // 初始容器宽度
    // initialFrameWidth: '100%',
    // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
    serverUrl: '/api/ueditor/upload?asxsyd92user=' + window.localStorage.userid,
    // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
    UEDITOR_HOME_URL: '../../ueditor/',
    toolbars: [["insertimage", "attachment"]],
    // 配合最新编译的资源文件，你可以实现添加自定义Request Headers,详情https://github.com/HaoChuan9421/ueditor/commits/dev-1.4.3.3
    headers: {
      'Authorization': "bearer " + localStorage.token,
    }
  });

  const showimg = function () {

    var win = window as any;


    var dialog = uploadEditor.getDialog("insertimage");

    dialog.title = '多图上传';
    dialog.render();
    dialog.open();
    function _beforeInsertImage(t: any, result: any) {
      result.forEach((item: any) => {
        imagelist.value.push(item.src);
      })
      value.data.data.value = imagelist.value.join(",");
    }
  }
  const showfile = function () {


      var win = window as any;
    var uploadEditor = win.UE.getEditor(editorId.value);
    uploadEditor.addListener("afterUpfile", _afterUpfile);
    var dialog = uploadEditor.getDialog("attachment");
    dialog.title = '附件上传';
    dialog.render();
    dialog.open();




    function _afterUpfile(t: any, result: any) {
      result.forEach((item: any) => {
        filelist.value.push(item.src);
      })
      value.data.data.value = filelist.value.join(",");
    }
  }
  // 6. 查看绑定的数据
  const showData = function () {
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
  // 7. 借助 beforeInit 钩子，你可以实现对 UEditor 的二次开发，会在 scripts 加载完毕之后、编辑器初始化之前触发，以 编辑器 id 和 配置参数 作为入参
  const ready = function (editorInstance: any) {


     var uploadEditor = win.UE.getEditor(editorInstance.key);
    uploadEditor.ready(function () {
      uploadEditor.addListener("beforeInsertImage", _beforeInsertImage);
    });
  
  }


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