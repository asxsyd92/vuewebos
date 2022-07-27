
    <template>


<div  :class="data.data.col"  :style="'display:'+data.data.display">

    <lay-form-item  class="layui-form-item" :label="data.data.label" :prop="data.data.name">
    <lay-radio v-for=" (li,index) in radio" :key="index" v-model="value[data.data.name]" :name="data.data.name"  :value="li.value" >{{li.title}} </lay-radio>
    </lay-form-item>

</div>


</template>
<script lang="ts">
import Vue from "vue";
export default {
  name: "itemradio",
};
</script>
<script lang="ts" setup>
    import http from "../../../utils/http";
    import { ref,reactive  } from "vue";
interface ItemradioProps {
  data: any;
  value:any;
}
const props = withDefaults(defineProps<ItemradioProps>(), {
  data:Object, value:Object
});

const data = ref(props.data);
const value = ref(props.value);

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
            d.value=ss[1];
            if(!Number.isNaN( d.value)){
               d.value=Number.parseFloat(d.value);
            }
            // if(ss.length>2){
            //   if(ss[2]=='false'){
            //       d.checked=false;
            //   }else if(ss[2]=='true'){
            //     d.checked=true;
            //   }
           
              
            //   }

               radio.value.push(d);
             })
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
   
          }  }).catch(resp => {
     

        })

    }
    }

       render();
// import { ref,reactive ,onMounted,toRefs  } from "vue";
// interface Data {
//     [key:string]:null
// }
// export default {
  
//     name: "itemnput",

//   props: {  //指定接收的值，必须指定类型
//     data: {
//       type:Object
//     },
//     value:{
//          type:Object
//     }
//   },
//   setup(props:Data)
//   { 
//       const radio=ref([]);
//      const {data,value} = toRefs(props) as any;
     
//       onMounted(() => {
//         render();
//       })
  
//    const render = function () {

//         //本地数据
//     if(data.value.data.type='local'){
//        if(data.value.data.input!=null&&data.value.data.input!=undefined&&data.value.data.input!=""){
//            try{
             
//             let s=   data.value.data.input.split(';');
//            s.forEach((item:any) => {
//               var d:any;
//             let ss=item.split(",");
//             d.title=ss[0];
//             d.value=ss[1];
//             if(ss.length>2){
//               if(ss[2]=='false'){
//                   d.checked=false;
//               }else if(ss[2]=='true'){
//                 d.checked=true;
//               }
           
              
//               }

//                radio.value.push(d as never);
//              })
     
//            }catch(e){
//              console.log(data.value.data.name+"radio配置不正确");
//            }
        

//        }
//     }
//     //字典数据
//     else{
     
//         http.post( "/api/form/GetDictionaryByCode", { id:data.value.data.input }).then(resp => {
//                if (resp.success) {
//                  radio.value=resp.data;
   
//           }  }).catch(resp => {
     

//         })

//     }

//  }

//  return {
//     radio
//  }
//   }

// }
</script>
