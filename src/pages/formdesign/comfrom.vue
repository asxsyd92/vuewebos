<template>
    <subinput :data="data"></subinput>
</template>
<script>
  import subinput from "@/components/subform/input";
export default {
        components: {
      subinput
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
