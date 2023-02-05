import { layer } from "@layui/layui-vue";
import { InsideDataZoomComponentOption } from "echarts";
import {h} from "vue";
import http from "../api/http";
class Utils {


    /* 获取随机数 方法 */
    random(min: number, max: number) {

        return Math.floor(Math.random() * (max - min)) + min;

    }

    //生成guid
    GenNonDuplicateID() {

   
            return (this.S4()+this.S4()+"-"+this.S4()+"-"+this.S4()+"-"+this.S4()+"-"+this.S4()+this.S4()+this.S4());
       
        // return Number(
        //     Math.random()
        //     .toString()
        //     .substr(3, randomLength) + Date.now()
        // ).toString(36);
    }
    S4(){
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }

    TreeTtoList(da: Array<any>,data: Array<any>){
   

        da.forEach((item: any) => {
            if (item.children.length > 0) {
               this. TreeTtoList(item.children,data);
            }
            //data.push(item);
          });
          return data;
    }

    //   debounce(fn:any, delay:any) {
    //     var timer:any;
    //     return function () {
    //       var context = this;
    //       var args = arguments;
    //       clearTimeout(timer);
    //       timer = setTimeout(function () {
    //         fn.apply(context, args);
    //       }, delay);
    //     };
    //   }
      /**
       * @param {date} time 需要转换的时间
       * @param {String} fmt 需要转换的格式 如 yyyy-MM-dd、yyyy-MM-dd HH:mm:ss
       */
       formatTime(time:any, fmt:any) {
        if (!time) return '';
        else {
          const date = new Date(time);
          const o = {
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'H+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds(),
            'q+': Math.floor((date.getMonth() + 3) / 3),
            S: date.getMilliseconds(),
          } as any;
          if (/(y+)/.test(fmt))
            fmt = fmt.replace(
              RegExp.$1,
              (date.getFullYear() + '').substr(4 - RegExp.$1.length)
            );
          for (const k in o) {
            if (new RegExp('(' + k + ')').test(fmt)) {
              fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length === 1
                  ? o[k]
                  : ('00' + o[k]).substr(('' + o[k]).length)
              );
            }
          }
          return fmt;
        }
      }
      /**
      * 打开表单
      * @param title 标题
       * @param anim 动画
        * @param form popform组件
       * @param data  fromid:fromid,instanceid:"",callback:Callback 
       * @param area 弹出大小
       * @param suppdata 补充数据提交是会填充data中提交给后台
       */
      openform(title :string,anim:any,form :any,data:any,area:string[],suppdata :Object){
        var ks=h(form, data) as any;
        if(anim==null){
          anim=0;
        }
      layer.open({
          title: title,
          area: area,
          content: ks,
          shade: true,
          anim:anim,
          shadeClose:false,
          btn: [
      {
        text: "确认",
        callback: (resp:any) => {

            ks.component.exposed.validate(suppdata,resp,layer)
      
        
        },
      },
      {
        text: "取消",
        callback: (resp:any)  => {
          layer.close(resp);
        },
      },
      ]
        })
      
      }
  //加载按钮
  finbuuton(path:string,depOptions:any) {
    depOptions.loading = false;
    var obj={
      area:["50%","50%"],
      toolbarbuttons:[],
      rowbuttons:[],
      success:true
  };

    return new Promise((resolve, reject) => {
      http.post("/api/common/getRoleBuutton", { pathname: path }).then(res => {
        depOptions.loading = false
      
        if (res.success) {
            if(res.data.length>0){
              obj.area=[res.data[0].areax,res.data[0].areay]
        }
    
        obj.toolbarbuttons=res.data.filter((item:any) => {  return item.type == 1 });
       
 
        obj.rowbuttons=res.data.filter((item:any) =>{return item.type == 2});
        obj.success=true;
        resolve(obj);
      
                        }
                    } ).catch(res=>{
                      obj.success=false;
                      reject(obj)
                    });;
   
      })


    
  }


}

export default new Utils()