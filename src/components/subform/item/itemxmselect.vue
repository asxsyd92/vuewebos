<template>

  <div :class="data.data.col" :style="'display:'+data.data.display">
    <div class="layui-form-item">
      <label class="layui-form-label">{{data.data.label}}</label>
      <div class="layui-input-block">
        <div v-if="data.data.showtext=='false'" :id="data.data.name"  :name="data.data.name"  class="xm-select-demo"></div>
        <span v-if="data.data.showtext=='true'" style="line-height: 2.5;">{{data.data.value}}</span>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        disabled: false,
        zhuanti:[],
      }
    },
    props: {
      data: {
        type: Object,
        required: true
      },
      model: Object
    }, mounted() {
     console.log("xmselect");
      var m = this;
      m.init();
      this.disabled = this.data.data.disabled == 'true' ? true : false
     
    }, methods: {
      init() {
        var m = this;
        try{
           var zt=m.$root.$route.query.zhuanti;
           m.zhuanti.push(zt);
        }catch(e){

        }
        
        m.$post(m.host + "/api/form/GetDictionaryByCode", { id: m.data.data.data }).then(res => {
          console.log(res);


        }).catch(resp => {
          if(m.data.data.value!=null&&m.data.data.value!=undefined){
                var z=m.data.data.value.split(",");
                m.zhuanti.concat(z);
          }
     
         
          if (resp.success) {
            console.log(0)
            xmselect.render({
              // 这里绑定css选择器
              el: '#' + m.data.data.name,
        
               name: m.data.data.name,
              initValue: m.zhuanti,
              layVerify: 'required',
              layVerType: m.data.data.name,
              // 渲染的数据
              data: resp.data,
              clickClose: true,
               autoRow: true,
                    filterable: true,
                
                    tree: {
                      show: true,
                      showFolderIcon: true,
                      showLine: true,
                      indent: 20,
                      expandedKeys: [-3],
                    },
                    toolbar: {
                      show: true,
                      list: ['ALL', 'REVERSE', 'CLEAR']
                    },
      
                    height: 'auto',
              
            })
          } else {
            layui.layer.alert(resp.msg, { icon: 2, title: '温馨提示' });
          }



        })

      }

    }

  }
</script>