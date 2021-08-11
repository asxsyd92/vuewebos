<template>
  <div :v-if="data!=null">

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
      <label class="layui-form-label">提示</label>
      <div class="layui-input-block">
        <input type="text" name="placeholder" :value="data.placeholder" class="layui-input">
      </div>
    </div>
     
      
      <div class="layui-form-item">
      <label class="layui-form-label">类型</label>
      <div class="layui-input-block">
        <select name="type">
          <option value="text">text</option>
          <option value="password">password</option>
          <option value="datetime">datetime</option>
          <option value="datetime">date</option>
        </select>
      </div>
    </div>
       <div class="layui-form-item">
      <label class="layui-form-label">文本框样式</label>
      <div class="layui-input-block">
        <select name="inputclass">
          <option value="layui-input">layui-input</option>
                <option value="layui-inline">layui-inline</option>
        </select>
      </div>
    </div>
    <div class="layui-form-item">
      <label class="layui-form-label">样式</label>
      <div class="layui-input-block">
        <select name="col">
          <option value="layui-col-md1">layui-col-md1</option>
          <option value="layui-col-md2">layui-col-md2</option>
          <option value="layui-col-md3">layui-col-md3</option>
          <option value="layui-col-md4">layui-col-md4</option>
          <option value="layui-col-md5">layui-col-md5</option>
          <option value="layui-col-md6">layui-col-md6</option>
          <option value="layui-col-md7">layui-col-md7</option>
          <option value="layui-col-md8">layui-col-md8</option>
          <option value="layui-col-md9">layui-col-md9</option>
          <option value="layui-col-md10">layui-col-md10</option>
          <option value="layui-col-md11">layui-col-md11</option>
          <option value="layui-col-md12">layui-col-md12</option>
        </select>
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
    //  watch: {
    // 'data': {
    //   handler(v) {
    //     console.log(v);
    //     this.data=v;
    //     this.$emit('change', v);
    //     layui.form.render(); //更新全部
    //   console.log(this.data.data);
    //  layui.form.val('setings',this.data.data );
    //   },
    //   deep: true
    // }},
    props: {
      data: {
        type: Object,
        required: true
      },
      model: Object
    }, mounted() {
      //this.ids=this.data.id;
    //   layui.form.render(); //更新全部
    //   console.log(this.data.data);
    //  layui.form.val('setings',this.data.data );
    }
  }
</script>