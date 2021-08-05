<template>
    <submitfrom :data="fromData"></submitfrom>
</template>
<script>
  import submitfrom from "@/components/subform/submitfrom";
export default {
        components: {
      submitfrom
    },inject: ['fromData'],  watch: {
    'fromData': {
      handler(v) {
        this.$emit('change', v);
      },
      deep: true
    }
  },   props: {
    data: {
      type: Object,
      required: true
    }
  }
}
</script>
