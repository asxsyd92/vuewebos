<template>
<div class="list-group-item" >
    <div class="layui-form-item">
    <label class="layui-form-label">{{data.data.label}}</label>
    <div class="layui-input-block">

      <input v-if="data.data.showtext=='false'" :value="data.type" disabled="disabled" :type="data.data.type"  :name="data.data.name" :id="data.data.name" :lay-verify="required" :autocomplete="data.data.autocomplete" :placeholder="data.data.placeholder" class="layui-input">
      <span v-if="data.data.showtext=='true'" style="line-height: 2.5;">{{data.data.value}}</span>
    </div>
  </div>
  </div>
</template>
<script>
export default { 
  data(){
    return {
      disabled:false,
      required:false
    }
},
  props: {
    data: {
      type: Object
    },
    model: Object
  }   , mounted(){
 

    },methods:{

    }
}
</script>