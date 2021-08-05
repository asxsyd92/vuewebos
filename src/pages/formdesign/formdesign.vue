<template>

  <div>

    <div class="layui-row">

      <div class="layui-col-xs3 fdtools ">

        <div class="layui-col-md12">
          <div class="layui-card">
            <div class="layui-card-header">表单组件</div>
            <div class="layui-card-body">
              <draggable class="dragArea list-group"
                :group="{ name: 'people', pull: 'clone', put: false }" :clone="clone" @change="log"   animation="300" >
           

               <submitfrom v-for="li in fromdata" :key="li.name" :data="li" ></submitfrom>
              </draggable>
            </div>
          </div>
        </div>
        <div class="layui-col-md12">
          <div class="layui-card">
            <div class="layui-card-header">辅助组件</div>
            <div class="layui-card-body">
              结合 layui 的栅格系统<br>
              轻松实现响应式布局
            </div>
          </div>
        </div>
        <div class="layui-col-md12">
          <div class="layui-card">
            <div class="layui-card-header">布局组件</div>
            <div class="layui-card-body">
              结合 layui 的栅格系统<br>
              轻松实现响应式布局
            </div>
          </div>
        </div>

      </div>

      <div class="layui-col-xs5 fdtools">
        <div class="layui-col-md12">
         <div class="layui-card"> 
            <div class="layui-card-header">画布</div>
            <div class="layui-card-body">
              <form class="layui-form" :fromData="list2" >
              <draggable class="dragArea list-group"  group="people"   animation="300" >
                <comfrom class="list-group-item"   v-for="li in list2" :key="li.name" :data="li" @change="contentChange" @select-change="contentSelectChange"></comfrom>
              </draggable>
              </form>
             </div>
         </div> 
        </div>


      </div>
      <div class="layui-col-xs2 fdtools">
        <div class="layui-col-md12">
          <div class="layui-card">
            <div class="layui-card-header">属性</div>
            <div class="layui-card-body">
  
            </div>
          </div>
        </div>
      </div>

    </div>

  </div>


</template>

<script>
  import draggable from "vuedraggable";
  import _ from 'lodash';
  import submitfrom from "@/components/subform/submitfrom";
  import comfrom from "@/pages/formdesign/comfrom";
  let idGlobal = 8;
  export default {
    name: "custom-clone",
    display: "Custom Clone",
    order: 3,
    components: {
      draggable,submitfrom,comfrom
    },
    data() {
      return {
        list1: [
          { name: "dog 1", id: 1 },
          { name: "dog 2", id: 2 },
          { name: "dog 3", id: 3 },
          { name: "dog 4", id: 4 }
        ],
        list2: [
      {
            "col":"layui-col-md12",
            "label":"标题444",
           "type":"text",
           "name":"name1",
           "autocomplete":"off",
           "placeholder":"placeholder",
           "inputclass":"layui-input"
          }
        ],fromdata:[
           {
            "col":"layui-col-md12",
            "label":"标题2",
           "type":"text",
           "name":"name2",
           "autocomplete":"off",
           "placeholder":"placeholder",
           "inputclass":"layui-input"
          },    {
            "col":"layui-col-md12",
            "label":"标题1",
           "type":"text",
           "name":"name4",
           "autocomplete":"off",
           "placeholder":"placeholder",
           "inputclass":"layui-input"
          }
        ]
      };
    },  mounted () {
        console.log('3')
    
  },  provide() {
    return {
      fromData:this. list2,
      contentSelectChange: this.contentSelectChange
    }
  
  },  watch: {
     list2(val, oldVal){//普通的watch监听
         console.log("a: "+val, oldVal);
     },
    list2: {
      handler(v) {
        this.$emit('change', v);
      },
      deep: true
    }
  },
    methods: {
        clickComponent:function(item) {
              layer.msg('密码不能为空');
                layer.msg(JSON.stringify(item));
      console.log(this);
      // this.formData.formDataList.forEach(f => {
      //   if (f.name === 'Layout') {
      //     f.setting.colList.forEach(c => {
      //       if(c) {console.log("abc:", c)
      //         c && (c.makeStyle.active = false)
      //       }
      //     });
      //   }
      //   if (f === item) f.makeStyle.active = true;
      //   else f.makeStyle.active = false;
      // });
     //this.$emit('select-change', item);
    },    contentSelectChange(item) {
        console.log(item)
    },
    contentChange(list) {
      console.log(list)
    },
      log: function (evt) {
        console.log(evt);
      },

          clone(obj) {
            console.log(obj)
      const newObj = Object.assign(_.cloneDeep(obj), list2);
      return newObj;
    },
    }
  };
</script>

<style>
  .fdtools {
    margin-bottom: 15px;
    border-radius: 2px;
    background-color: #fff;
    box-shadow: 5px 5px 5px 0 rgba(0, 0, 0, .05);
    -webkit-box-shadow: #d4d2d2 0px 0px 10px;
    -moz-box-shadow: #d4d2d2 0px 0px 10px;
    margin: 2px;
  }
</style>