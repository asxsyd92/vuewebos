<template>

<div >

    <lay-form-item :label="data.data.label">
      <lay-radio  name="specialty" label="1" disabled="disabled" >写作</lay-radio>
      <lay-radio  name="specialty" label="2" disabled="disabled">画画</lay-radio>
      <lay-radio  name="specialty" label="3" disabled="disabled">编码</lay-radio>
    </lay-form-item>
</div>

</template>
<script lang="ts">
export default {
  name: "designradio",
};
</script>
<script lang="ts" setup>
import { ref   } from "vue";
interface IdesignradioProps {
  data: any
}
const props = withDefaults(defineProps<IdesignradioProps>(), {
  data:Object
});

const data = ref(props.data);


</script>
