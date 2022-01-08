<template>
<div class="list-group-item" >
    <div class="layui-form-item">
    <label class="layui-form-label">{{li.data.label}}</label>
    <div class="layui-input-block">

      <input v-if="li.data.showtext=='false'" :value="li.type" disabled="disabled" :type="li.data.type"  :name="li.data.name" :id="li.data.name" :lay-verify="required" :autocomplete="li.data.autocomplete" :placeholder="li.data.placeholder" class="layui-input">
      <span v-if="li.data.showtext=='true'" style="line-height: 2.5;">{{li.data.value}}</span>
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