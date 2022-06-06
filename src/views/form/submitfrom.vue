<template>

  <div class="layui-card">
    <div class="layui-container">
      <lay-form :model="validateModel" ref="layFormRef" required>
        <div v-for="(item, index) in data" :key="index">
          <subform :data="item" :value="validateModel"></subform>
        </div>
        <lay-form-item>
          <lay-button @click="validate">提交</lay-button>
          <lay-button @click="clearValidate">清除校验</lay-button>
          <lay-button @click="reset">重置表单</lay-button>
        </lay-form-item>
      </lay-form>
    </div>
  </div>

</template>

<script lang="ts">

  import { ref, reactive, onMounted,defineAsyncComponent  } from 'vue'
  import { layer } from '@layui/layer-vue'
  import { useRoute, useRouter } from "vue-router";
  import http from "../../utils/http";
  import subform from '../../components/formitem/subform.vue';
  export default {
    components: {subform },
    setup() {

      const router = useRouter();
      const route = useRoute();
      const data = ref([]);
      const fromdata = ref([]);
      const validateModel = ref({});
      var datamodel = {};


      const layFormRef = ref(null) as any;
      // 校验
      const validate = function () {
        layFormRef.value.validate((isValidate:any, model:any, errors:any) => {
          console.log(model);
          //     var index= layer.open({
          //       type: 1,
          //       title:"表单提交结果", 
          //       content: "", 
          //       shade: false,
          //       isHtmlFragment: true,
          //       btn : [{ text: '确认', callback() {  layer.close(index) }}],
          //       area : '500px'
          //     });
          //   });
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
            data.value = k.data;
            fromdata.value = k.from.data;
            console.log(data.value);
            console.log(fromdata.value);
            var obj = new Object();
            k.data.forEach((item:any) => {
              Object.defineProperty(obj, item.data.name, {
                value: item.data.value,
                writable: true,
                enumerable: true,
                configurable: true
              });

            });

            validateModel.value = reactive(obj);
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