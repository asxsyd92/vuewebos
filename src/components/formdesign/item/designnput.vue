<template>
<div>

<div v-if="data.type=='input'||data.type=='color'||data.type=='icon'"   >

    <lay-form-item  :placeholder="data.data.placeholder" class="layui-form-item" :label="data.data.label">
 
      <lay-input v-model="data.data.col" disabled="disabled"></lay-input>
    </lay-form-item>



</div>
<div v-if="data.type=='textarea'||data.type=='ueditor'"   >
  <lay-form-item :placeholder="data.data.placeholder"  class="layui-form-item"  :label="data.data.label">
      <lay-textarea  v-model="data.data.col" disabled="disabled"></lay-textarea>
    </lay-form-item></div>
</div>

</template>
<script lang="ts">
import Vue from "vue";
export default {
  name: "designnput",
};
</script>
<script lang="ts" setup>
import { ref,reactive   } from "vue";
interface IdesignnputProps {
  data: any
}
const props = withDefaults(defineProps<IdesignnputProps>(), {
  data:Object
});

const data = ref(props.data);


</script>
