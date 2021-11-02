<template>
<div :class="data.data.col" :style ="'display:'+data.data.display">
    <div class="layui-form-item">

   <label class="layui-form-label" style="margin-left: 30px;">{{data.data.label}}</label>
                <div class="layui-input-inline" >
                <input  :name="data.data.name" :value="data.data.value" :id="data.data.name" :lay-verify="data.data.required=='true'?'':'required'"  :class="data.data.inputclass" >
               </div>
      
  </div>
  </div>
</template>
<script>
export default { 
  data(){
    return {
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
  
       
         layui. iconPicker.render({
            // 选择器，推荐使用input
            elem: '#'+m.data.data.name,
            // fa 图标接口
            url: "/common/variables.less",
            // 是否开启搜索：true/false，默认true
            search: true,
            // 是否开启分页：true/false，默认true
            page: true,
            // 每页显示数量，默认12
            limit: 12,
            // 点击回调
            click: function (data) {
                m.data.data.value=data.icon;
            },
            // 渲染成功后的回调
            success: function (d) {
         
            }
        });
   
}
    }
}
</script>
<style>
.layui-iconpicker .layui-anim{
  width: 260px;
}
</style>
