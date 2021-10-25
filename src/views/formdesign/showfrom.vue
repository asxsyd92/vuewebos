<template>
<div class="showfrom">  
<div class="layui-card">
    <div class="layui-container">
    <form :class="from.type" :lay-filter="from.name">
          <div class="layui-input-block layui-footer">
      <button type="submit" class="layui-btn layui-btn-normal layui-btn-sm" lay-submit="" lay-filter="_submit">立即提交</button>
      <button type="reset" class="layui-btn layui-btn-primary layui-btn-sm" layui-btn-sm>重置</button>
       <button type="button" class="layui-btn layui-btn-primary layui-btn-sm" @click="close()" layui-btn-sm>关闭</button>
    </div>
          <submitfrom  v-for="li in data" :key="li.id" :data="li" ></submitfrom>
    
        <div class="layui-form-item">


    </div>
     </form>
 </div>
</div>
 </div>
</template>
<style>
.showfrom{
  top: 86px;
  position: relative;
}
		.layui-footer {
			z-index: 400;
			width: 100%;
			position: fixed;
			right: 0;
			top: 85px;
			height: 44px;
			line-height: 22px;
			background-color: #fff;
			text-align: center;
			padding: 10px 0;
		}
</style>

<script>

  import submitfrom from "@/components/subform/submitfrom";

    import Enumerable from 'linq'
export default {
        components: {
      submitfrom
    },  data(){
      return {
  data:[],
   from:[]
    }},   
 
watch: {
                '$route'(to, from) { //监听路由是否变化
               console.log(this);
               if(to.fullPath.indexOf("showfrom")>0){
      this.init();
               }
      
                }
            },
    mounted(){
this.init();
    },
        methods: {
          close(){
            var m=this;
             m.$claostabs(m);
          },
          getTabelDate(id,k){
               var m=this;
       m.$post(m.host + "/api/tasks/GetFormData", { key: id,tab:k.from.data.table }).then(res => {

                }).catch(data => {
                  if(data.success){
           Enumerable.from(k.data).where(i => i.type == 'ueditor').toArray().filter(item => {
                item.data.value=data.data[item.data.name]
                console.log(item); });
          Enumerable.from(k.data).where(i => i.type == 'input'||i.type=='textarea').toArray().filter(item => {
                item.data.value=data.data[item.data.name]
                console.log(item); })
                  }
  
            m.data=k.data;
                     m.from=k.from.data;
               layui. form.val(m.from.name, data.data);
                });
          },init(){
  console.log("show");
      var m=this;
         var lay = layer.msg('请稍等...', { icon: 16, shade: 0.5, time: 20000000 });
        m.$post(m.host + "/api/form/getFormJson", { key: m.$route.params.fromid }).then(res => {
                    console.log(res);


                }).catch(data => {

                    layer.close(lay);
                    if (data.success) {
                      var k=JSON.parse(data.data.designhtml);
                      console.log(k);
                
                     //处理表单
                     var instanceid=m.$route.params.key;
                     if(instanceid!=null&&instanceid!=undefined&&instanceid!=""){
                     m.  getTabelDate(instanceid,k);
                     }else{
                     m.data=k.data;
                     m.from=k.from.data;
                     }
                    } else {
                
                        layer.msg(data.msg, { icon: 2 });
                        return;
                    }
                })
      console.log(this.data);
      layui. form.on('submit(_submit)', function(data){
              var lay = layer.msg('保存中...', { icon: 16, shade: 0.5, time: 20000000 });
              m.$post(m.host + "/api/form/FormCommonTaskSave",  { table: m.from.table, data: JSON.stringify(data.field), istask: true,fromid:m.$route.params.fromid }).then(res => {
                    console.log(res);


                }).catch(resp => {

                    layer.close(lay);
                if (resp.success) {
                    m.$claostabs(m);
                    layui.layer.alert(resp.msg, {
                        skin: 'layui-layer-lan'
                        , closeBtn: 0
                        , anim: 4 //动画类型
                    });

                  
                } else {
         
                   layui.layer.alert(resp.msg, {
                        skin: 'layui-layer-lan'
                        , closeBtn: 0
                        , anim: 4 //动画类型
                    });
                }
                })
    return false;
           })
          }
        }
}
</script>
