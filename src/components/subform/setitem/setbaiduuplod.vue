<template>
  <div :v-if="data!=null&&data!=undefined">

  <div class="layui-form-item">
      <label class="layui-form-label">中文名称</label>
      <div class="layui-input-block">
      
        <input type="text" name="label" :value="data.label" class="layui-input">
      </div>
    </div>
    <div class="layui-form-item">
      <label class="layui-form-label">name</label>
      <div class="layui-input-block">
        <input type="text" name="name" :value="data.name"   class="layui-input">
      </div>
    </div>
      <div class="layui-form-item">
      <label class="layui-form-label">文件类型</label>
      <div class="layui-input-block">
        <select name="type">
          <option value="image">图片</option>
          <option value="file">文件</option>

        </select>
      </div>
    </div>
   <div class="layui-form-item">
      <label class="layui-form-label">数量</label>
      <div class="layui-input-block">
  
        <select name="input">
          <option value="1">1张或1个</option>
          <option value="2">2张或2个</option>
          <option value="3">3张或3个</option>
         <option value="4">4张或4个</option>
        <option value="5">5张或5个</option>
        <option value="">不限</option>
        </select>
      </div>
    </div>

       <div class="layui-form-item">
      <label class="layui-form-label">上传限制</label>
      <div class="layui-input-block">
      <input type="text" name="inputclass" :value="data.inputclass" class="layui-input" placeholder="上传正则表达式">
 
      </div>
    </div>

  
  <div class="layui-form-item">
    <div class="layui-input-block">
      <button type="submit" class="layui-btn layui-btn-normal layui-btn-sm" lay-submit="" lay-filter="setsubmit">保存</button>

 <button type="submit" class="layui-btn layui-btn-danger layui-btn-sm" lay-submit="" lay-filter="delsubmit">移除</button>


    </div>
  </div>
  </div>
</template>
<script>
  export default {
 data(){
     return {

     }
 },

    props: {
      data: {
        type: Object,
        required: true
      },
      model: Object
    }, mounted() {
    

    }
  }
</script>