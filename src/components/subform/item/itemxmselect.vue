<template>
  <div :class="data.data.col" :style="'display:'+data.data.display">
    <div class="layui-form-item">
      <label class="layui-form-label">{{data.data.label}}</label>
      <div class="layui-input-block">
        <div v-if="data.data.showtext=='false'" :id="data.data.name"  :name="data.data.name" ></div>
        <span v-if="data.data.showtext=='true'" style="line-height: 2.5;">{{data.data.value}}</span>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        disabled: false
      }
    },
    props: {
      data: {
        type: Object,
        required: true
      },
      model: Object
    }, mounted() {
     
      var m = this;
      m.init();
      this.disabled = this.data.data.disabled == 'true' ? true : false
     
    }, methods: {
      init() {
        var m = this;
        m.$post(m.host + "/api/form/GetDictionaryByCode", { id: m.data.data.data }).then(res => {
          console.log(res);


        }).catch(resp => {
          if (resp.success) {
            console.log(0)
            xmselect.render({
              // 这里绑定css选择器
              el: '#' + m.data.data.name,
              title: m.data.data.name, 
              initValue: m.data.data.value,
              layVerify: 'required',
              layVerType: 'msg',
              // 渲染的数据
              data: resp.data,
            })
          } else {
            layui.layer.alert(resp.msg, { icon: 2, title: '温馨提示' });
          }



        })

      }

    }

  }
</script>