<template>
<div>

  <designnput v-if="data.type=='input'||data.type=='textarea'||data.type=='ueditor'||data.type=='color'||data.type=='icon'||data.type=='baiduuplod'||data.type=='onlyoffice'" :data="data" ></designnput>
  <designradio v-if="data.type=='radio'" :data="data"></designradio>
  <designselect v-if="data.type=='select'" :data="data"></designselect>
  <designcheckbox v-if="data.type=='checkbox'" :data="data"></designcheckbox>

<!-- <itemradio v-if="data.type=='radio'" :data="data" ></itemradio>
 <itemcolor v-if="data.type=='color'" :data="data" ></itemcolor>
  <itemicon v-if="data.type=='icon'" :data="data" ></itemicon>
  <itemcheckbox v-if="data.type=='checkbox'||data.type=='select'||data.type=='xmselect'" :data="data" ></itemcheckbox>
   <ueditor v-if="data.type=='ueditor'" :data="data" ></ueditor> -->
    <!-- <baiduuplod v-if="data.type=='color'" :data="data" ></baiduuplod>  -->
   <!-- <ueditor v-if="data.type=='ueditor'" :data="data"></ueditor>

  <itemtextarea v-if="data.type=='textarea'" :data="data"></itemtextarea>
  <itemselect v-if="data.type=='select'" :data="data"></itemselect>
 

  <itemxmselect v-if="data.type=='xmselect'" :data="data"></itemxmselect>
 -->
</div>

</template>

<script lang="ts" >
import design from './design';

export default {
   
    components:{ ...design},
  name:"subdesign",
   props: {
    data: {
      type: Object,
      required: true
    }
  },


}
</script>
