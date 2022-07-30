<template>
  <lay-panel>

    <div class="layui-card " ref="submitfrom">
      <div class="layui-container">
    <lay-button-group>
      <lay-button type="default" size="sm" @click="validate">立即提交</lay-button>
      <lay-button type="default" size="sm" @click="clearValidate">重置</lay-button>
    </lay-button-group>
        <!-- <div class="layui-input-block layui-footer">
          <button type="submit" class="layui-btn layui-btn-normal layui-btn-sm" @click="validate">立即提交</button>
          <button type="reset" class="layui-btn layui-btn-primary layui-btn-sm" @click="clearValidate">重置</button>
          <button type="button" class="layui-btn layui-btn-primary layui-btn-sm" @click="reset">关闭</button>
        </div> -->
        <lay-form :model="fromdata.field" ref="layFormRef">
          <lay-line border-style="dashed" border-width="6px">
            <div style="font-size:large"> {{ fromdata.name }}</div>
          </lay-line>
          <div v-for="(item, index) in fromdata.data" :key="index">
            <subform :data="item" :value="fromdata.field"></subform>
          </div>
        </lay-form>
      </div>
      <div class="setheight"></div>
    </div>
  </lay-panel>
</template>

<script lang="ts">

import { ref, onMounted} from 'vue'
import { layer } from '@layui/layer-vue'
import { useRoute, useRouter } from "vue-router";
import { useAppStore } from "../../store/app";
import http from "../../utils/http";
import HelpTabs from "../../utils/HelpTabs"
import subform from '../../components/formitem/subform.vue';


export default {
  components: { subform },
  setup() {
    const appStore = useAppStore();
    const router = useRouter();
    const route = useRoute();
    const fromdata = ref({ name: "" }) as any;
    const validateModel = ref({});
    const layFormRef = ref(null) as any;
    // 校验
    const validate = function () {
      layFormRef.value.validate((isValidate: any, model: any, errors: any) => {
        if (!isValidate) {
          errors.forEach((item: any) => {
                  layer.notifiy({
                        title: "温馨提示",
                        content:item.message
                    });
            //layer.msg(item.message, { icon: 2, time: 1000 })
          });


          return;
        }
        var url="";
   
        if(fromdata.value.form.url!=""&&fromdata.value.form.url!=undefined&&fromdata.value.form.url!=null){
          url=fromdata.value.form.url;
        }else{
          url="/api/form/FormCommonTaskSave";
        }
        http.post(url, { table: fromdata.value.form.table, data: JSON.stringify(model), istask: true, fromid: route.query.fromid }).then(res => {
          console.log(res);

          if (res.success) {
              layer.notifiy({
                        title: "温馨提示",
                        content:res.msg
                    });
            HelpTabs.close(appStore, route.fullPath, router);
          } else {
              layer.notifiy({
                        title: "温馨提示",
                        content:res.msg
                    });
          

          }

        }).catch(resp => {
            layer.notifiy({
                        title: "温馨提示",
                        content:"网络错误"
                    });
    

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
          fromdata.value = k;
          if (k.field == null) {
            var obj = new Object();
            fromdata.value.data.forEach((key: any) => {
              for (let keys in key.data) {
                if (keys == "name") {
                  obj[key.data[keys]] = key.data['value'];
                }
              }
            });

            fromdata.value.field = obj;

          }


          console.log( fromdata.value);
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
      fromdata
    }
  }
}
</script>
<style>


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
