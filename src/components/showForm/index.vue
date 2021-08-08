<template>
<div>
  <div> qis</div>
  <tp-form-box class="tpf-sf-tp-form" :formData="formData">
    <which-component v-for="li in formData.formDataList" :key="li.fieldId" :data="li" type="ShowForm" :prop="li.fieldId" :model="formData.model"></which-component>
  </tp-form-box>

  </div>
</template>

<script>
import WhichComponent from '../componentList/WhichComponent';
import TpFormBox from '../componentList/common/FormBox';
export default {
  name: 'TpForm',
  components: { WhichComponent, TpFormBox },
  provide() {
    return {
      formData: this.formData
    }
  },
  props: {
    formData: {
      type: Object,
      required: true
      /**
       * formDataList: [],
       * formStyle: { }
       */
    }
  }
}
</script>