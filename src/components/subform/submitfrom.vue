<template>
<div>
  
  <iteminput v-if="data.type=='input'" :data="data"></iteminput>
  <itemradio v-if="data.type=='radio'" :data="data"></itemradio>
  <ueditor v-if="data.type=='ueditor'" :data="data"></ueditor>
  <itemcheckbox v-if="data.type=='checkbox'" :data="data"></itemcheckbox>
  <itemtextarea v-if="data.type=='textarea'" :data="data"></itemtextarea>
    <itemselect v-if="data.type=='select'" :data="data"></itemselect>
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
