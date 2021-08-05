<template>
<div :class="data.col">
    <div class="layui-form-item">
    <label class="layui-form-label">{{data.label}}</label>
    <div class="layui-input-block">
      <input :type="data.type" :name="data.name" :lay-verify="data.name" :autocomplete="data.autocomplete" :placeholder="data.placeholder" :class="data.inputclass">
    </div>
  </div>
  </div>
</template>
<script>
export default { 
//      provide() {
//     return {
//       formData: this.form,
//       contentSelectChange: this.contentSelectChange
//     }
//   },

    inject: ['data'],  
  name: 'subinput',
  // props: {
  //   fromData: {
  //     type: Object,
  //     required: true
  //   },
  //   model: Object
  // }
}
</script>