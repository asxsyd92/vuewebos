<template>
<div>

  <itemnput v-if="data.type=='input'" :data="data" :value="value"></itemnput>
<itemradio v-if="data.type=='radio'" :data="data" :value="value"></itemradio>
 <itemcolor v-if="data.type=='color'" :data="data" :value="value"></itemcolor>
  <itemicon v-if="data.type=='icon'" :data="data" :value="value"></itemicon>
  <itemselect v-if="data.type=='select'||data.type=='xmselect'" :data="data" :value="value"></itemselect>
   <ueditor v-if="data.type=='ueditor'" :data="data" :value="value"></ueditor>
    <!-- <baiduuplod v-if="data.type=='color'" :data="data" :value="value"></baiduuplod>  -->
   <!-- <ueditor v-if="data.type=='ueditor'" :data="data"></ueditor>

  <itemtextarea v-if="data.type=='textarea'" :data="data"></itemtextarea>
  <itemselect v-if="data.type=='select'" :data="data"></itemselect>
 

  <itemxmselect v-if="data.type=='xmselect'" :data="data"></itemxmselect>
 -->
</div>

</template>

<script lang="ts" >
import webfrom from './webfrom';
export default {
   
    components:{ ...webfrom},
  name:"sub",
   props: {
    data: {
      type: Object,
      required: true
    },
        value:{
         type:Object
    }
  },


}
</script>
