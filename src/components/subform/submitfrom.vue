<template>
<div>
  
  <iteminput v-if="data.type=='input'" :data="data"></iteminput>
  <itemradio v-if="data.type=='radio'" :data="data"></itemradio>
  <ueditor v-if="data.type=='ueditor'" :data="data"></ueditor>
  <itemcheckbox v-if="data.type=='checkbox'" :data="data"></itemcheckbox>
  <itemtextarea v-if="data.type=='textarea'" :data="data"></itemtextarea>
  <itemselect v-if="data.type=='select'" :data="data"></itemselect>
  <itemcolor v-if="data.type=='color'" :data="data"></itemcolor>
  <itemicon v-if="data.type=='icon'" :data="data"></itemicon>
  <itemxmselect v-if="data.type=='xmselect'" :data="data"></itemxmselect>
  <baiduuplod v-if="data.type=='baiduuplod'" :data="data"></baiduuplod>
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
     
     
      
    }

}
</script>
