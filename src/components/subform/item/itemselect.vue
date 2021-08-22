<template>
<div :class="data.data.col" :style ="'display:'+data.data.display">
    <div class="layui-form-item">
    <label class="layui-form-label">{{data.data.label}}</label>
    <div class="layui-input-block">
 <select v-if="data.data.showtext=='false'" :name="data.data.name" :lay-verify="data.data.required=='true'?'':'required'" >
  <option v-for="li in data.data.input"  :key="li.value"  :value="li.value">{{li.title}}</option>
 </select>
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
    layui.form.render(); //更新全部
    this.disabled=this.data.data.disabled=='true'?true :false
      console.log(this.data);
    }
}
</script>