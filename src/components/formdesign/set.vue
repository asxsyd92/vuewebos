<template>
<div>

  <setinput v-if="data.type=='input'||data.type=='textarea'" :data="data" :setdata="setdata"></setinput>
  <setradio v-if="data.type=='radio'" :data="data" :setdata="setdata"></setradio>
  <setselect v-if="data.type=='select'" :data="data" :setdata="setdata"></setselect>
  <setcheckbox v-if="data.type=='checkbox'" :data="data" :setdata="setdata"></setcheckbox>
  <setform v-if="data.type=='table'" :data="data" :setdata="setdata"></setform>

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
import set from './set';
export default {
      
    components:{ ...set},
  name:"set",
   props: {
    data: {
      type: Object,
      required: true
    },setdata: {
      type: Function,
      default: () => {
        return Function
      }

  }

   }
}
</script>
