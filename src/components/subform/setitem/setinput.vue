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
      <label class="layui-form-label">提示</label>
      <div class="layui-input-block">
        <input type="text" name="placeholder" :value="data.placeholder" class="layui-input">
      </div>
    </div>
       <div class="layui-form-item">
      <label class="layui-form-label">值</label>
      <div class="layui-input-block">
              <select  name="value">
           <option value="">空值</option>
          <option value="@_SYS_GETUSERID">获取当前用户id</option>
          <option value="@_SYS_GETUSERNAME">获取当前用户名</option>
          <option value="@_SYS_GETUSERNICKNAME">获取当前用户昵称</option>
          <option value="@_SYS_ORGID">获取当前组织id</option>
          <option value="@_SYS_ORGNAME">获取当前组织</option>
          <option value="@_SYS_DATETIME">获取当前时间</option>
          <option value="00000000-0000-0000-0000-000000000000">获取空Guid</option>
          <option value="@_SYS_GW">获取当前岗位名称</option>
        </select>
        <!-- <input type="text" name="value" :value="data.value" class="layui-input"> -->
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
          <option value="number">number</option>
          <option value="number">textarea</option>
          
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

<!-- <div class="layui-form-item">
    <label class="layui-form-label">是否只读</label>
    <div class="layui-input-block">
      <input type="radio" name="readonly" value="false" title="否" checked="">
      <input type="radio" name="readonly" value="true" title="是">
    </div>
  </div> -->
  <div class="layui-form-item">
    <label class="layui-form-label">是否可编辑</label>
    <div class="layui-input-block">
      <input type="radio" name="disabled" value="false" title="否" checked="">
      <input type="radio" name="disabled" value="true" title="是">
    </div>
  </div>
    <div class="layui-form-item">
    <label class="layui-form-label">是否必填</label>
    <div class="layui-input-block">
      <input type="radio" name="required" value="false" title="否" checked="">
      <input type="radio" name="required" value="true" title="是">
    </div>
  </div>
    <div class="layui-form-item">
    <label class="layui-form-label">文本显示</label>
    <div class="layui-input-block">
      <input type="radio" name="showtext" value="false" title="否" checked="">
      <input type="radio" name="showtext" value="true" title="是">
    </div>
  </div>
    <div class="layui-form-item">
    <label class="layui-form-label">是否隐藏</label>
    <div class="layui-input-block">
      <input type="radio" name="display" value="block" title="否" checked="">
      <input type="radio" name="display" value="none" title="是">
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