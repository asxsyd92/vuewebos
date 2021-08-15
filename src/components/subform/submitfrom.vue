<template>
<div>
  <osinput v-if="data.type=='input'" :data="data"></osinput>
  <osradio v-if="data.type=='radio'" :data="data.data"></osradio>
  <ueditor v-if="data.type=='ueditor'" :data="data.data"></ueditor>
  
</div>

</template>
<script>
import webfrom from '@/components/subform/webfrom.js';

export default {
   
    components:{  ...webfrom},
   // inject: ['formjson'],   
   props: {
    data: {
      type: Object,
      required: true
    },
    model: Object
  },
    // watch: {
    // 'formjson': {
    //   handler(v) {
    //     this.$emit('change', v);
    //   },
    //   deep: true
    // }},
    mounted(){
      debugger;
      console.log(this.data);
      
    }

}
</script>
