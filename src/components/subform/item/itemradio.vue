<template>

    <div>
 <div :class="data.data.col">
    <label class="layui-form-label">{{data.data.label}}</label>
    <div class="layui-input-block">

  <input v-for="li in radio" :key="li.value"  type="radio" :name="data.data.name" :value="li.value" :title="li.title" :checked="li.checked">

    </div>
  </div>

    </div>
</template>
<script>
export default {
  data(){
    return {   radio:[]}
  },
    props: {
    data: {
      type: Object,
      required: true,
   
    },
    model: Object
  }   , mounted(){
    var m=this;
    var str=m.data.data.input;
             if (typeof str == 'string') {
            try {
                var obj=JSON.parse(str);
      m. radio=obj;
            
            
            } catch(e) {
              
             
            }
        }else{
          m.  radio=str;
        }

      layui.form.render(); //更新全部
    }
}
</script>

