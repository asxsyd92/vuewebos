<template>

          <lay-card>
            <lay-form :model="fromdata.field" ref="popfrom">
              <lay-row>
              <div v-for="(item, index) in fromdata.data" :key="index">
                <subform :data="item" :value="fromdata.field"></subform>
              </div>
            </lay-row>
            </lay-form>
          </lay-card>
   
  </template>
  <script lang="ts">
  export default {
      name: "popform"
  }
  </script>
  <script lang="ts" setup>
  import { ref, onMounted } from 'vue'
  import { layer } from '@layui/layer-vue'
  import { useRoute, useRouter } from "vue-router";
  import { useAppStore } from "../../store/app";
  import http from '../../api/http';
  import subform from '../../components/formitem/subform.vue';
  interface IdesignselectProps {
    fromid:any, instanceid: any,callback:Function
}
 const props = withDefaults(defineProps<IdesignselectProps>(), {
  fromid:String, instanceid: String,callback:Function
});

      const appStore = useAppStore();

      const fromdata = ref({ name: "" }) as any;
      const validateModel = ref({});
      const popfrom = ref(null) as any;
  
      // 校验
      const validate =  (data:any,layid:any,layers:any)=> {
        


        popfrom.value.validate((isValidate: any, model: any, errors: any) => {
          
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
         var index= layer.msg("加载中...",{icon: 16,shadeClose:false})
          if(data!=null){
            Object.keys(data).forEach(key => {
              model[key]=data[key]
              });
          }

          var url = "";
  
          if (fromdata.value.form.url != "" && fromdata.value.form.url != undefined && fromdata.value.form.url != null) {
            url = fromdata.value.form.url;
          } else {
            url = "/api/form/FormCommonTaskSave";
          }
          http.post(url, { table: fromdata.value.form.table, data: JSON.stringify(model), istask: false, fromid: props.fromid }).then(res => {
            layer.close(index);
            if(res.success){
 
        layers.close(layid);
       }

            props.callback(res,"callback");
        
  
          }).catch(resp => {
            layer.close(index);
            props.callback({success:false,msg:"网络错误",layid:layid,data:resp},"callback");
  
  
          })
  
        })
      }
  
    
      //渲染表单
      const render =  ()=> {
  
        http.post("/api/form/getFormJson", { fromid: props.fromid, instanceid: props.instanceid }, "请稍等").then(res => {
  
  
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
  
          } else {
  
            //layer.msg(res.msg, { icon: 2 });
            return;
          }
        }).catch(res => {
  
  
  
        })
      }
  
      defineExpose({
        validate
})
      onMounted(() => {
        render();
      })

  
  </script>
  
  <style lang="less" scoped>

  </style>
  