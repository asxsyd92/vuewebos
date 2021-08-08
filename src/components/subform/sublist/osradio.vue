<template>
<!-- <div >
    <div class="layui-form-item">
    <label class="layui-form-label"></label>
    <div class="layui-input-block">
      <input :type="data.type" :name="data.name" :lay-verify="data.name" :autocomplete="data.autocomplete" :placeholder="data.placeholder" :class="data.inputclass">
    </div>
  </div>
  </div> -->
    <div>
 <div :class="data.col">
    <label class="layui-form-label">{{data.label}}</label>
    <div class="layui-input-block">

  <input v-for="li in data.input" :key="li.value"  :type="data.type" :name="data.name" :value="li.value" :title="li.title" :checked="li.checked">

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
  }   , mounted(){
      console.log(this.data);
      layui.form.render(); //更新全部
    }
}
</script>

