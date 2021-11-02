<template>
<div :class="data.data.col" :style ="'display:'+data.data.display">
    <div class="layui-form-item">

   <label class="layui-form-label">{{data.data.label}}</label>
                <div class="layui-input-inline" style="margin-left: 30px;">
                <input  :name="data.data.name" :value="data.data.value" :id="data.data.name" :lay-verify="data.data.required=='true'?'':'required'"  :class="data.data.inputclass" >
               </div>
                <div class="layui-inline" >
                    <div :id="'_s'+data.data.name"></div>
                </div>
  </div>
  </div>
</template>
<script>
export default { 
  data(){
    return {
        rgb:"",
      disabled:false
    }
},
  props: {
    data: {
      type: Object,
      required: true
    },
    model: Object
  }   , mounted(){
   
     this.init();
    this.disabled=this.data.data.disabled=='true'?true :false
     
    },methods:{
     init(){
         var m=this;
         if(m.data.data.value!=null&&m.data.data.value!=""){
             m.rgb=m.data.data.value;
         }
          layui.colorpicker.render({
          elem: '#'+'_s'+m.data.data.name
        , color:m.rgb==""? 'rgba(7, 155, 140, 1)':m.rgb
        , format: 'rgb'
        , predefine: true
        , alpha: true
        , done: function (color) {
          m.data.data.value=color;
     
        }
        , change: function (color) {
        }
    });
}
    }
}
</script>
<style>
layui-colorpicker {
    width: 40px;
    height: 26px;
    border: 1px solid #eee;
    padding: 2px;
    line-height: 30px;
    display: inline-block;
    cursor: pointer;
    transition: all .3s;
    -webkit-transition: all .3s;
}
</style>
