
import { layer } from "@layui/layui-vue";
import utils from '../utils/utils';
import http from '../api/http';
import { h } from "vue";
class FlowUtils {
    fieldSource=[] as any;
    btValue=[] as any;
    btSource=[] as any;
    resetfield=(v:any,flowjson:any,fieldSource:any)=>{
  
            if (flowjson.value.databases.table == null || flowjson.value.databases.table == "" || flowjson.value.databases.table == undefined) {
              layer.notifiy({
                title: "温馨提示",
                content: "请先在流程基础信息中配置表"
              });
              return;
            }
            http.post("/api/workflow/GetFields", { table: flowjson.value.databases.table }, "请稍等...").then(res => {
              if (res.success) {
                var fields = [];
                //重置表字段
                fieldSource.value=[] ;
                console.log(res);
                for (var i = 0; i < res.data.length; i++) {
                  var o = new Object() as any;
                  o.check = "0";
                  o.status = "0";
                  o.field = res.data[i].f_name.toLowerCase();
                  fields.push(o);
                  o.value=res.data[i].value;
                  fieldSource.value.push(o);
                }
                v.fieldStatus= fields;
                layer.notifiy({
                  title: "温馨提示",
                  content: res.msg
                });
              } else {
                layer.notifiy({
                  title: "温馨提示",
                  content: res.msg
                })
              }
        
            });
          
    }
    setflow(d: any,setflowmode:any) {
        setflowmode.value = d.value;
        this. fieldSource= d.value.fieldStatus;
         if(setflowmode.value.buttons.length>0){
          setflowmode.value.buttons.forEach((item:any)=>{
    
        this. btValue.push(item.id);
          });
         }

      }
/**
 * 加载流程按钮
 */
      getbutton=()=>{
        http.post("/api/workflowtasks/getListButton", { }).then(res => {
          if (res.success) {
              this.btSource=res.data;
          } else {
            layer.msg(res.msg, { icon: 2 });
          }
        }).catch(res => {
          layer.msg("网络错误，请重试", { icon: 2 });
        })
      }

      addfom=(forms:any)=>{
        //加载表单
      http.post("/api/common/GetCommonList", { tab: "SysFormDesign", page: 1, limit: 1000 }).then(res => {
        if (res.success) {
          forms.value = [];
          res.data.forEach((tab: any) => {
            var o = new Object() as any;
            o.label = tab.title;
            o.value = tab.id;
            forms.value.push(o);
          });
        } else {
          layer.msg(res.msg, { icon: 2 });
        }
      }).catch(res => {
        layer.msg("网络错误，请重试", { icon: 2 });
      })
    }
    adddictionary=(flowtype:any)=>{

      http.post("/api/form/GetDictionaryByCode", { id: "FlowTypes" }).then(res => {
        if (res.success) {
          flowtype.value = [];
  
          flowtype.value = utils.TreeTtoList(res.data,[]);

        } else {
          layer.msg(res.msg, { icon: 2 });
        }
      }).catch(res => {
        layer.msg("网络错误，请重试", { icon: 2 });
      })
  
    }
}
export default new FlowUtils()