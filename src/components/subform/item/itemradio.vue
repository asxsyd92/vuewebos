<template>

    <div>
 <div :class="data.data.col">
    <label class="layui-form-label">{{data.data.label}}</label>
    <div class="layui-input-block">

  <input v-for="li in data.data.input" :key="li.value"  :type="data.data.type" :name="data.data.name" :value="li.value" :title="li.title" :checked="li.checked">

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
      console.log(this.data.data);
      layui.form.render(); //更新全部
    }
}
</script>

