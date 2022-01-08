<template>
<div :class="data.data.col" :style ="'display:'+data.data.display">
    <div class="layui-form-item">
    <label class="layui-form-label">{{data.data.label}}</label>
    <div class="layui-input-block">
 <select v-if="data.data.showtext=='false'" :name="data.data.name" :lay-verify="data.data.required=='true'?'':'required'" >
  <option v-for="li in select"  :key="li.value" :checked="li.checked" :value="li.value">{{li.title}}</option>
 </select>
      <span v-if="data.data.showtext=='true'" style="line-height: 2.5;">{{data.data.value}}</span>
    </div>
  </div>
  </div>
</template>
<script>
export default { 
  data(){
    return {
      disabled:false,
      select:[]
    }
},
  props: {
    data: {
      type: Object,
      required: true
    },
    model: Object
  }  , mounted(){
    var m=this;
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
            if(ss.length>2){ d.checked=true;}else{ d.checked=false;}
               m.select.push(d);
             })

           }catch(e){
             console.log(m.data.data.name+"select配置不正确");
           }
        

       }
    }
    //字典数据
    else{
          var m = this;
        m.$post(m.host + "/api/form/GetDictionaryByCode", { id:m.data.data.input }).then(res => {
          console.log(res); }).catch(resp => {
          if (resp.success) {
           m.select=resp.data;
   
          } else {
            layui.layer.alert(resp.msg, { icon: 2, title: '温馨提示' });
          }

        })

    }

      layui.form.render(); //更新全部
    }
}
</script>