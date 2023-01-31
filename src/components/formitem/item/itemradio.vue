
    <template>



      <lay-col :md="data.data.col" style="margin-bottom: 20px;"  :style="'display:'+data.data.display">

    <lay-form-item  class="layui-form-item" :label="data.data.label" :prop="data.data.name" :required="required">
      <div v-if="data.data.showtext == 'true'">
            <span class="showtext">{{showtext.title}}</span>
          </div>
          <div v-else>
     <lay-radio v-for=" (li,index) in radio" :key="index" v-model="value[data.data.name]" :name="data.data.name"  :value="li.value" >{{li.title}} </lay-radio>
    

          </div>
   </lay-form-item>

</lay-col>


</template>
<script lang="ts">
import Vue from "vue";
export default {
  name: "itemradio",
};
</script>
<script lang="ts" setup>
  import http from "../../../api/http";
    import { ref,reactive,watch  } from "vue";
interface ItemradioProps {
  data: any;
  value:any;
}

const props = withDefaults(defineProps<ItemradioProps>(), {
  data:Object, value:Object
});
const showtext=ref({}) as any;
const data = ref(props.data);
const value = ref(props.value);
const required=ref(true);
if (data.value.data.required == "true") {
  required.value = true;
} else {
  required.value = false;
}
value.value[data.value.data.name]=value.value[data.value.data.name]+"";
const radio=ref([]) as any;
   
     

   
    const render = function () {

        //本地数据
    if(data.value.data.type='local'){
       if(data.value.data.data!=null&&data.value.data.data!=undefined&&data.value.data.data!=""){
           try{
             
            let s=   data.value.data.data.split(';');
           s.forEach((item:string) => {
              var d=new Object() as any;
            let ss=item.split(",");
            console.log(ss);
            if(ss[0]==""){
              return;
            }
            d.title=ss[0];
            d.value=ss[1].toString();
          
            // if(ss.length>2){
            //   if(ss[2]=='false'){
            //       d.checked=false;
            //   }else if(ss[2]=='true'){
            //     d.checked=true;
            //   }
           
              
            //   }

               radio.value.push(d);
             
             });
       let v=radio.value.filter((ele:any) => ele.value == value.value[data.value.data.name].toString());
              showtext.value=v.length==0?{title:'未知',value:'-99'}:v[0];
      console.log(value.value);
           }catch(e){
           
             console.log(data.value.data.name+"radio配置不正确");
           }
        

       }
    }
    //字典数据
    else{
     
        http.post( "/api/form/GetDictionaryByCode", { id:data.value.data.input }).then(resp => {
               if (resp.success) {
                 radio.value=resp.data;
                 showtext.value=radio.value.filter((ele:any) => ele.value == value.value[data.value.data.name]);
          }  }).catch(resp => {
     

        })

    }
    }

       render();
   
</script>
