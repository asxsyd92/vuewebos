<template>

<osinput v-if="data.type=='input'" :data="data"></osinput>
</template>
<script>
import webset from '@/components/subform/webset.js';
export default {
    components:{...webset},
 //   inject: ['settinglist'],  
       props: {
    data: {
      type: Object,
      required: true
    },
    model: Object
  },    watch: {
    'data': {
      handler(v) {
        console.log(v);
        this.$emit('change', v);
      },
      deep: true
    }},
    mounted(){
      debugger;
      console.log(this.data);
    }
}
</script>
