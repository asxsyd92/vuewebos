<template>
<div class="layui-card">
    <div class="layui-container">
       <div style="height:50px"></div>
               <form class="layui-form" lay-filter="commonsubmit">
          <submitfrom  v-for="li in data" :key="li.id" :data="li" ></submitfrom>
    
        <div class="layui-form-item">
    <div class="layui-input-block">
      <button type="submit" class="layui-btn layui-btn-normal layui-btn-sm" lay-submit="" lay-filter="_submit">立即提交</button>
      <button type="reset" class="layui-btn layui-btn-primary" layui-btn-sm>重置</button>
    </div>

    </div>
     </form>
 </div>
</div>
 
</template>
<script>
  import submitfrom from "@/components/subform/submitfrom";
export default {
        components: {
      submitfrom
    },  data(){return {
  data:JSON.parse( window.localStorage.data)

    }},   
   // inject: ['formjson'],

    //  props: {
    // data: {
    //   type: Object,
    //   required: true
    // }
  //},  
    mounted(){
      setTimeout(function(){
         layui.form.render(); //更新全部
      },100)
      
      console.log(this.data);
           layui. form.on('submit(_submit)', function(data){
          console.log(data);
        layui. layer.alert(JSON.stringify(data.field), {
      title: '最终的提交信息'
    })
    return false;
           })
    }
}
</script>
