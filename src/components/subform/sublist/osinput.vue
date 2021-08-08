<template>
<div :class="data.data.col">
    <div class="layui-form-item">
    <label class="layui-form-label">{{data.data.label}}</label>
    <div class="layui-input-block">
      <input :type="data.data.type" :name="data.data.name" :lay-verify="data.data.name" :autocomplete="data.data.autocomplete" :placeholder="data.data.placeholder" :class="data.data.inputclass">
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

  //   inject: ['data'],  
  // name: 'osinput',
  props: {
    data: {
      type: Object,
      required: true
    },
    model: Object
  }   , mounted(){
      console.log(this.data);
    }
}
</script>