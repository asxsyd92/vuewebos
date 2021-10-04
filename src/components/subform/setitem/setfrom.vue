<template>
  <div :v-if="data!=null&&data!=undefined">

  <div class="layui-form-item">
      <label class="layui-form-label">标题</label>
      <div class="layui-input-block">
      
        <input type="text" name="name" :value="data.name" class="layui-input">
      </div>
    </div>
  <div class="layui-form-item">
      <label class="layui-form-label">表名</label>
      <div class="layui-input-block">
      
        <input type="text" name="table" :value="data.table" class="layui-input">
      </div>
    </div>

      <div class="layui-form-item">
      <label class="layui-form-label">表单样式</label>
      <div class="layui-input-block">
        <select name="type">
          <option value="layui-form layui-form-pane">方框风格的表单</option>
          <option value="layui-form">普通表单</option>
        </select>
      </div>
    </div>


  <div class="layui-form-item">
    <div class="layui-input-block">
      <button type="submit" class="layui-btn layui-btn-normal layui-btn-sm" lay-submit="" lay-filter="setingfrom">保存</button>
    </div>
  </div>
  </div>
</template>
<script>
  export default {
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