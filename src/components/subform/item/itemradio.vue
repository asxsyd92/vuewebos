<template>
    <div>
 <div :class="data.data.col">
    <label class="layui-form-label">{{data.data.label}}</label>
    <div class="layui-input-block">

  <input v-for="li in radio" :key="li.value"  type="radio" :name="data.data.name" :value="li.value" :title="li.title" :checked="li.checked">

    </div>
  </div>

    </div>
</template>
<script>
export default {
  data(){
    return {   radio:[]}
  },
    props: {
    data: {
      type: Object,
      required: true,
   
    },
    model: Object
  }   , mounted(){
    var m=this;
    console.log(m);
    //本地数据
    if(m.data.data.type='local'){
       if(m.data.data.input!=null&&m.data.data.input!=undefined&&m.data.data.input!=""){
           try{
             
            let s=   m.data.data.input.split(';');
            layui.$(s).each(function (i, it) {
              var d=new Object();
            let ss=it.split(",");
            d.title=ss[0];
            d.value=ss[1];
            if(ss.length>2){
              if(ss[2]=='false'){
                  d.checked=false;
              }else if(ss[2]=='true'){
                d.checked=true;
              }
           
              
              }

              //赋值选择
              if(m.data.data.value+""==d.value){
                d.checked=true;
              }
               m.radio.push(d);
             })
     
           }catch(e){
             console.log(m.data.data.name+"radio配置不正确");
           }
        

       }
    }
    //字典数据
    else{
          var m = this;
        m.$post(m.host + "/api/form/GetDictionaryByCode", { id:data.data.input }).then(res => {
          console.log(res); }).catch(resp => {
          if (resp.success) {
           m.radio=resp.data;
   
          } else {
            layui.layer.alert(resp.msg, { icon: 2, title: '温馨提示' });
          }

        })

    }
    
     setTimeout(function(){
          layui.form.render(); //更新全部
     },10);
    
    }
}
</script>

