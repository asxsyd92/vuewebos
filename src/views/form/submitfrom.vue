<template>
<lay-panel class="submitfrom">

  <div class="layui-card " ref="GlobalTab">
    <div class="layui-container">
 
        <div class="layui-input-block layui-footer">
            <button type="submit" class="layui-btn layui-btn-normal layui-btn-sm"  @click="validate">立即提交</button>
            <button type="reset" class="layui-btn layui-btn-primary layui-btn-sm" @click="clearValidate">重置</button>
            <button type="button" class="layui-btn layui-btn-primary layui-btn-sm" @click="reset" >关闭</button>
          </div>

  
     
      <lay-form :model="validateModel" ref="layFormRef" required>
        <lay-line border-style="dashed" border-width="6px" ><div style="font-size:large"> {{fromdata.name}}</div></lay-line>
        <div v-for="(item, index) in data" :key="index">
          <subform :data="item" :value="validateModel"></subform>
        </div>
        <!-- <lay-form-item>
          <lay-button @click="validate">提交</lay-button>
          <lay-button @click="clearValidate">清除校验</lay-button>
          <lay-button @click="reset">重置表单</lay-button>
        </lay-form-item>-->
      </lay-form> 
    </div>
        <div class="setheight"></div>
  </div>
</lay-panel>
</template>

<script lang="ts">

  import { ref, reactive, onMounted,getCurrentInstance,withDefaults,defineProps   } from 'vue'
  import { layer } from '@layui/layer-vue'
  import { useRoute, useRouter } from "vue-router";
import { useAppStore } from "../../store/app";
  import http from "../../utils/http";
import HelpTabs from "../../utils/HelpTabs"
  import subform from '../../components/formitem/subform.vue';
 

  export default {
    components: {subform },
    setup() {
      const appStore = useAppStore();
      const instance = getCurrentInstance() as any;
      const router = useRouter();
      const route = useRoute();
      const data = ref([]);

      const fromdata = ref({name:""}) as any;
      const validateModel = ref({});
      var datamodel = {};


      const layFormRef = ref(null) as any;
      // 校验
      const validate = function () {
        layFormRef.value.validate((isValidate:any, model:any, errors:any) => {
          if(!isValidate){
            errors.forEach((item:any) => {
             layer.msg(item.message, { icon: 2, time: 1000 })
            });
        
         
            return;
          }
               http.post("/api/form/FormCommonTaskSave", { table: fromdata.value.table, data: JSON.stringify(model), istask: true, fromid:  route.query.fromid }).then(res => {
            console.log(res);

            if (res.success) {
              layer.msg(res.msg, { icon : 1, time: 1000});
          HelpTabs.close(appStore,route.fullPath,router);
            } else {
             layer.msg(res.msg, { icon : 2, time: 1000});
          
            }

          }).catch(resp => {
           layer.msg("网络错误", { icon : 2, time: 1000})
          
          })
    
        })
      }

      // 清除校验
      const clearValidate = function () {
        layFormRef.value.clearValidate();
      }

      // 重置表单
      const reset = function () {
        layFormRef.value.reset();

      }

      //渲染表单
      const render = function () {

        http.post("/api/form/getFormJson", { fromid: route.query.fromid, instanceid: route.query.instanceid }, "请稍等").then(res => {


          if (res.success) {
            var k = JSON.parse(res.data.designhtml);
            console.log(k);
            data.value = k.data;
            fromdata.value = k.form;
            console.log(data.value);
            console.log(fromdata.value);
            // var obj = new Object();
            // k.data.forEach((item:any) => {
            //   Object.defineProperty(obj, item.data.name, {
            //     value: item.data.value,
            //     writable: true,
            //     enumerable: true,
            //     configurable: true
            //   });

            // }
            // );

            validateModel.value = k.field;
              console.log("sss");
               console.log(k.field);
          } else {

            //layer.msg(res.msg, { icon: 2 });
            return;
          }
        }).catch(res => {



        })
      }

      onMounted(() => {
        render();
      })
      return {
        validateModel,
        layFormRef,
        validate,
        clearValidate,
        reset,
        subform,
        data,
        fromdata
      }
    }
  }
</script>
<style>
.submitfrom {
    top: 40px;
    position: relative;
}
.global-content {
    height: calc(100% - 42px);
    position: relative;
    top: 45px;
    width: 99%;
    overflow-y: auto;
}
  .global-content .layui-footer {
    z-index: 400;
    width: 100%;
    position: fixed;
    right: 0;
    top: 100px;
    height: 44px;
    line-height: 22px;
  background-color: #fff;
    text-align: center;
    padding: 10px 0;
  }
</style>
