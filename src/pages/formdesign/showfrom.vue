<template>
<div class="layui-card">
    <div class="layui-container">
    
    <form :class="from.type" :lay-filter="from.name">
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
    },  data(){
      return {
  data:[],
   from:[]
    }},   

    mounted(){
  
      var m=this;
         var lay = layer.msg('请稍等...', { icon: 16, shade: 0.5, time: 20000000 });
        m.$post(m.host + "/api/form/getFormJson", { key: m.$tab.params.key }).then(res => {
                    console.log(res);


                }).catch(data => {

                    layer.close(lay);
                    if (data.success) {
                      var k=JSON.parse(data.data.designhtml);
                     m.data=k.data;
                     m.from=k.from.data;
                    } else {
                
                        layer.msg(data.msg, { icon: 2 });
                        return;
                    }
                })
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
