<template>
<div>

<div v-if="data.type=='input'"   >
<div v-if="data.data.type=='number'" :style="'display:'+data.data.display">
    <lay-form-item  :label="data.data.label" :prop="data.data.name">
 
  <lay-input-number v-model="value[data.data.name]"  :placeholder="data.data.placeholder" ></lay-input-number>
    </lay-form-item>

</div>
<div v-if="data.data.type=='password'" :style="'display:'+data.data.display">
    <lay-form-item   :label="data.data.label" :prop="data.data.name">
 
   <lay-input-password v-model="value[data.data.name]"  :placeholder="data.data.placeholder" ></lay-input-password>
    </lay-form-item>

</div>
<div v-else-if="data.data.type=='date'||data.data.type=='datetime'" :style="'display:'+data.data.display">
    <lay-form-item   :label="data.data.label" :prop="data.data.name">
 
       <lay-date-picker v-model="value[data.data.name]" :placeholder="data.data.placeholder"></lay-date-picker>
    </lay-form-item>
</div>
<div v-else-if="data.data.type=='text'">
    <lay-form-item   :label="data.data.label" :prop="data.data.name" :style="'display:'+data.data.display">
 
  <lay-input  v-model="value[data.data.name]" :placeholder="data.data.placeholder" ></lay-input>
    </lay-form-item>
</div>
</div>
<div v-if="data.data.type=='textarea'"   :style="'display:'+data.data.display">
  <lay-form-item    :label="data.data.label" :prop="data.data.name">
      <lay-textarea v-model="value[data.data.name]"  :placeholder="data.data.placeholder"></lay-textarea>
    </lay-form-item></div>
</div>

</template>
<script lang="ts">
import Vue from "vue";
export default {
  name: "itemnput",
};
</script>
<script lang="ts" setup>
import { ref,reactive   } from "vue";
interface ItemnputProps {
  data: any;
  value:any;
}
const props = withDefaults(defineProps<ItemnputProps>(), {
  data:Object, value:Object
});

const data = ref(props.data);
const value = ref(props.value);


</script>
