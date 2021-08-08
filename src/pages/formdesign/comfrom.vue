<template>
<div >
   <submitfrom  :data="data"></submitfrom>
</div>
 
</template>
<script>
  import submitfrom from "@/components/subform/submitfrom";
export default {
        components: {
      submitfrom
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
