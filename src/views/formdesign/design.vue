<template>
<div >
  <inputs  :data="data"> </inputs>
</div>
 
</template>
<script>
  import inputs from "@/components/subform/design/inputs";
export default {
        components: {
      inputs
    },     
   // inject: ['formjson'],
    watch: {
    'formjson': {
      handler(v) {
        console.log(this.formjson);
        this.$emit('change', v);
      },
      deep: true
    }
  },   props: {
    data: {
      type: Object,
      required: true
    }
  },    mounted(){
      console.log(this.formjson);
    }
}
</script>
