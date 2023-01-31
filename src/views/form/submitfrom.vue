<template>
  <div style="height: 100%; width: 100%">
    <div style="height: calc(100% - 60px); width: 100%; overflow-y: auto;overflow-x: hidden;">
      <lay-card style="">
        <h1 class="title">{{ fromdata.form == undefined ? "" : fromdata.form.name }}</h1>
      </lay-card>
      <lay-container :fluid="true" style="padding: 10px; padding-top: 0px; position: relative">
        <lay-card>
          <lay-form :model="fromdata.field" ref="layFormRef">
            <lay-row>
            <div v-for="(item, index) in fromdata.data" :key="index">
              <subform :data="item" :value="fromdata.field"></subform>
            </div>
          </lay-row>
          </lay-form>
        </lay-card>
      </lay-container>
    </div>
    <div class="footer">
      <div class="footer-button">
        <button type="submit" class="layui-btn layui-btn-normal layui-btn-sm" @click="validate">立即提交</button>
        <button type="reset" class="layui-btn layui-btn-primary layui-btn-sm" @click="clearValidate">重置</button>
        <button type="button" class="layui-btn layui-btn-primary layui-btn-sm" @click="reset">关闭</button>

      </div>
    </div>
  </div>
</template>

<script lang="ts" >
import { ref, onMounted } from 'vue'
import { layer } from '@layui/layer-vue'
import { useRoute, useRouter } from "vue-router";
import { useAppStore } from "../../store/app";
import http from '../../api/http';
import HelpTabs from "../../utils/HelpTabs"
import subform from '../../components/formitem/subform.vue';
export default {
  components: { subform },
  setup() {
    //const { change, close, currentPath } = useTab();
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
              content: item.message
            });
            //layer.msg(item.message, { icon: 2, time: 1000 })
          });


          return;
        }
        var url = "";

        if (fromdata.value.form.url != "" && fromdata.value.form.url != undefined && fromdata.value.form.url != null) {
          url = fromdata.value.form.url;
        } else {
          url = "/api/form/FormCommonTaskSave";
        }
        http.post(url, { table: fromdata.value.form.table, data: JSON.stringify(model), istask: true, fromid: route.query.fromid }).then(res => {
          console.log(res);

          if (res.success) {
            layer.notifiy({
              title: "温馨提示",
              content: res.msg
            });

            HelpTabs.close(appStore, route.fullPath, router);
          } else {
            layer.notifiy({
              title: "温馨提示",
              content: res.msg
            });


          }

        }).catch(resp => {
          layer.notifiy({
            title: "温馨提示",
            content: "网络错误"
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
    const a_close = () => {
      HelpTabs.close(appStore, route.fullPath, router);
    }
    //渲染表单
    const render = function () {

      http.post("/api/form/getFormJson", { fromid: route.query.fromid, instanceid: route.query.instanceid }, "请稍等").then(res => {


        if (res.success) {
          var k = JSON.parse(res.data.designhtml);
          console.log(k);
          fromdata.value = k;
          if (k.field == null) {
            var obj = new Object() as any;
            fromdata.value.data.forEach((key: any) => {
              for (let keys in key.data) {
                if (keys == "name") {
                  obj[key.data[keys]] = key.data['value'];
                }
              }
            });

            fromdata.value.field = obj;

          }


          console.log(fromdata.value);
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
      fromdata,
      a_close
    }
  }
}
</script>

<style lang="less" scoped>
.title {
  text-align: center;
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 20px;
  margin-top: 12px;
}

.describe {
  font-size: 14px;
  margin-bottom: 12px;
}

.footer {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
  background-color: #ffffff;
  border-top: 1px solid whitesmoke;
  line-height: 60px;
  height: 60px;

  .footer-button {
    right: 10px;
    position: absolute;
  }
}
</style>
