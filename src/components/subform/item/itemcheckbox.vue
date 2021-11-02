<template>
<div :class="data.data.col" :style ="'display:'+data.data.display">
    <div class="layui-form-item">
    <label class="layui-form-label">{{data.data.label}}</label>
    <div class="layui-input-block">

      <input v-for=" item in checkbox" :key="item.name" type="checkbox" :name="item.name" :title="item.value">
   <span v-if="data.data.showtext=='true'" style="line-height: 2.5;">{{data.data.value}}</span>
    </div>
  </div>
  </div>
</template>
<script>
export default { 
  data(){
    return {
      disabled:false,checkbox:[]
    }
},
  props: {
    data: {
      type: Object,
      required: true
    },
    model: Object
  }   , mounted(){
  var m=this;
    var str=m.data.data.input;
             if (typeof str == 'string') {
            try {
                var obj=JSON.parse(str);
      m.checkbox=obj;
           
            
            } catch(e) {
          
             
            }
        }else{
          m.checkbox=str;
        }
    this.disabled=this.data.data.disabled=='true'?true :false

      layui.form.render(); //更新全部
    } 
}
</script>