<template>
  <div>
    <setinput v-if="data.type=='input'" :data="data"></setinput>
    <settextarea v-if="data.type=='textarea'" :data="data"></settextarea>
    <setueditor v-if="data.type=='ueditor'" :data="data"></setueditor>
    <setradio v-if="data.type=='radio'" :data="data"></setradio>
    <setcheckbox v-if="data.type=='checkbox'" :data="data"></setcheckbox>
    <setselect v-if="data.type=='select'" :data="data"></setselect>
    <setfrom v-if="data.type=='setfrom'" :data="data"></setfrom>
  </div>
</template>
<script>
  import webset from '@/components/subform/webset.js';
  export default {
    components: { ...webset },
    props: {
      data: {
        type: Object,
        required: true
      },
      model: Object
    }, watch: {
      'data': {
        handler(v) {
          console.log(v);
          this.$emit('change', v);
        },
        deep: true
      }
    },
    mounted() {
      debugger;
      console.log(this.data);
    }
  }
</script>