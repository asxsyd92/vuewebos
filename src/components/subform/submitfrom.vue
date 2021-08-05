<template>
    <subinput  :data="fromData"></subinput>
</template>
<script>
  import subinput from "@/components/subform/sublist/input";
export default {
    data(){
        return {
            data:this.fromData[0]
        }
    },
    components:{subinput},
    inject: ['fromData'],   provide() {
    return {
      data:this.data,
      contentSelectChange: this.contentSelectChange
    }}, 
    watch: {
    'fromData': {
      handler(v) {
        this.$emit('change', v);
      },
      deep: true
    }},mounted(){}

}
</script>
