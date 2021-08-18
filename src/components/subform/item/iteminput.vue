<template>
<div :class="data.data.col" :style ="'display:'+data.data.display">
    <div class="layui-form-item">
    <label class="layui-form-label">{{data.data.label}}</label>
    <div class="layui-input-block">

      <input v-if="data.data.showtext=='false'" :type="data.data.type" :disabled="disabled" :name="data.data.name" :lay-verify="data.data.required=='false'?'':'required'" :autocomplete="data.data.autocomplete" :placeholder="data.data.placeholder" :class="data.data.inputclass">
      <span v-if="data.data.showtext=='true'" style="line-height: 2.5;">{{data.data.value}}</span>
    </div>
  </div>
  </div>
</template>
<script>
export default { 
  data(){
    return {
      disabled:false
    }
},
  props: {
    data: {
      type: Object,
      required: true
    },
    model: Object
  }   , mounted(){
    console.log(this.data);
  
    this.disabled=this.data.data.disabled=='true'?true :false
      console.log(this.data);
    }
}
</script>