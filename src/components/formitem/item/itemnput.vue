<template>
<div :class="data.data.col" >

<div v-if="data.type=='input'"   >
<div v-if="data.data.type=='number'" :style="'display:'+data.data.display">
    <lay-form-item  :label="data.data.label" :prop="data.data.name" :class="data.data.col" :required="required">
 
  <lay-input-number v-model="value[data.data.name]"  :placeholder="data.data.placeholder" ></lay-input-number>
    </lay-form-item>

</div>
<div v-if="data.data.type=='password'" :style="'display:'+data.data.display">
    <lay-form-item   :label="data.data.label" :prop="data.data.name" :required="required">
 
   <lay-input-password v-model="value[data.data.name]"  :placeholder="data.data.placeholder" ></lay-input-password>
    </lay-form-item>

</div>
<div v-else-if="data.data.type=='date'||data.data.type=='datetime'" :style="'display:'+data.data.display">
    <lay-form-item   :label="data.data.label" :prop="data.data.name" :required="required">
 
       <lay-date-picker v-model="value[data.data.name]" :placeholder="data.data.placeholder"></lay-date-picker>
    </lay-form-item>
</div>
<div v-else-if="data.data.type=='text'">
    <lay-form-item   :label="data.data.label" :prop="data.data.name" :style="'display:'+data.data.display"  :required="required">
 
  <lay-input  v-model="value[data.data.name]" :placeholder="data.data.placeholder" ></lay-input>
    </lay-form-item>
</div>
</div>
<div v-if="data.data.type=='textarea'"   :style="'display:'+data.data.display">
  <lay-form-item    :label="data.data.label" :prop="data.data.name" :required="required">
      <lay-textarea v-model="value[data.data.name]"  :placeholder="data.data.placeholder"></lay-textarea>
    </lay-form-item></div>
</div>

</template>
<script lang="ts">
import Vue from "vue";
import { values } from 'xe-utils';
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
const required=ref(false);
const data = ref(props.data);
const value = ref(props.value);
if(data.value.data.required=="true"){
  required.value=true;
}
console.log(data.value)
if(data.value.data.type=='date'||data.value.data.type=='datetime'){
     if(value.value[data.value.data.name]==""){
      value.value[data.value.data.name]=new Date();
     }

}

</script>
