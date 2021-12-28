<template>
  <div :class="data.data.col" :style="'display:'+data.data.display">
    <div class="layui-form-item">
      <div v-if="data.type=='textarea'">
        <div class="layui-form-item layui-form-text">
          <label class="layui-form-label">{{data.data.label}}</label>
          <div class="layui-input-block">
            <textarea :disabled="disabled" :name="data.data.name" :id="data.data.name" :lay-verify="required" :autocomplete="data.data.autocomplete"
            :placeholder="data.data.placeholder"  class="layui-textarea" :value="data.data.value"></textarea>
          </div>
        </div>

      </div>
      <div v-if="data.type=='input'">
        <label class="layui-form-label">{{data.data.label}}</label>
        <div class="layui-input-block">
          <input v-if="data.data.showtext=='false'" :value="data.data.value" :type="data.data.type" :disabled="disabled"
            :name="data.data.name" :id="data.data.name" :lay-verify="required" :autocomplete="data.data.autocomplete"
            :placeholder="data.data.placeholder" :class="data.data.inputclass">
          <span v-if="data.data.showtext=='true'" style="line-height: 2.5;">{{data.data.value}}</span>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        disabled: false,
        required: false
      }
    },
    props: {
      data: {
        type: Object
      },
      model: Object
    }, mounted() {
console.log("input");
      this.init();


    }, methods: {
      init() {
        var m = this;
        m.disabled = m.data.data.disabled == 'true' ? true : false;
        m.required = m.data.data.required == 'true' ? true : false;
        if (m.data.data.type == "date") {
          layui.laydate.render({
            elem: '#' + m.data.data.name
          });
        }
        if (m.data.data.type == "datetime") {
          layui.laydate.render({
            elem: '#' + m.data.data.name
          });
        }
        if (m.required) {
          layui.form.verify({
            function(value, item) { //value：表单的值、item：表单的DOM对象


              if (value.length <= 0) {
                return m.data.data.placeholder;
              }


            }

          });
        }
      }
    }
  }
</script>