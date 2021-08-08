<template>

  <div>

    <div class="layui-row">
<div class="layui-col-space12">
      <div class="layui-col-xs3 fdtools ">

        <div class="layui-col-md12">
          <div class="layui-card">
            <div class="layui-card-header">表单组件</div>
            <div class="layui-card-body">
              <!-- <draggable class="dragArea list-group"
                :group="{ name: 'people', pull: 'clone', put: false }"  @change="log"   animation="300" > -->

              <div class="layui-row">
                <div class="layui-col-xs6 ">
                  <ul class="layui-row layui-col-space10 fly-shortcut">
                    <draggable class="dragArea list-group" :list="fromdata"
                      :group="{ name: 'people', pull: 'clone', put: false }" @change="log">
                      <li v-for="li in fromdata" :key="li.id" :data="li" class="layui-col-sm6 layui-col-xs6"> <span><i
                            :class=" 'fa '+ li.icon"></i><cite>{{li.name}}</cite></span> </li>
                    </draggable>
                  </ul>
                  <!-- <div class="grid-demo" ></div> -->
                </div>
              </div>
              <!-- <submitfrom ></submitfrom> -->

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
            <div class="layui-card-header">表单生成器</div>
            <div class="layui-card-body">
              <form class="layui-form" :fromData="list2">
                <draggable class="dragArea list-group" :list="list2" group="people" @change="log">
                  <comfrom @click.native="clickComponent(li)" class="list-group-item" v-for="li in list2" :key="li.id"
                    :data="li" @change="contentChange" @select-change="contentSelectChange"></comfrom>
                </draggable>
              </form>
            </div>
          </div>
        </div>


      </div>
      <div class="layui-col-xs3 fdtools">
        <div class="layui-col-md12">
          <div class="layui-card">
            <div class="layui-card-header">属性</div>
            <div class="layui-card-body">
               <div class="layui-form"   lay-filter="setings">
                  <setting :data="sets" v-if="sets!=null||sets!=undefined"></setting>
               </div>
        
            </div>
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
  import setting from "@/components/subform/setting";
  let idGlobal = 8;
  export default {
    name: "custom-clone",
    display: "Custom Clone",
    order: 3,
    components: {
      draggable, submitfrom, comfrom,setting
    },
    data() {
      return {
       sets: null,
        list2: [

        ], fromdata: [{
          icon: "fa fa-edit",
          name: "输入框",
          id: "1",type:"input",
          data: {
            "col": "layui-col-md12",
            "label": "标题2",
            "type": "text",
            "name": "name2",
            "autocomplete": "off",
            "placeholder": "placeholder",
            "inputclass": "layui-input",
            "value":"",
            "data":[],
            "input":[]
          }
        }, {
          icon: "fa fa-dot-circle-o",
          name: "单选框",
          id: "2",
          type:"radio",
          data: {
            "col": "layui-col-md12",
            "label": "单选框",
            "type": "radio",
            "name": "name",
            "autocomplete": "off",
            "placeholder": "placeholder",
            "inputclass": "layui-input",
            "value":"",
            "data":"",
            "input":[{
                 value:"1",
                 title:"男",
                 checked:true,
                 disabled:false
            },{
                 value:"2",
                 title:"女",
                 checked:false,
                 disabled:false
            }
            
            ],
          }
        },
        {
          icon: "fa fa-edit",
          name: "复选框",
          id: "3",type:"checkbox",
          data: {
            "col": "layui-col-md12",
            "label": "复选框",
            "type": "text",
            "name": "name2",
            "autocomplete": "off",
            "placeholder": "placeholder",
            "inputclass": "layui-input",
            "value":"",
            "data":[],
            "input":[]
          }
        },
        {
          icon: "fa fa-edit",
          name: "原始复选框",
          id: "4",type:"checkbox",
          data: {
            "col": "layui-col-md12",
            "label": "原始复选框",
            "type": "text",
            "name": "name2",
            "autocomplete": "off",
            "placeholder": "placeholder",
            "inputclass": "layui-input",
            "value":"",
            "data":[],
            "input":[]
          }
        }
        ]
      };
    }, mounted() {
      console.log('3')
  //监听提交
 layui. form.on('submit(setsubmit)', function(data){
   layui. layer.alert(JSON.stringify(data.field), {
      title: '最终的提交信息'
    })
    return false;
  });
    },
    provide() {
      return {
        formjson: this.list2,settinglist:this.sets,
        contentSelectChange: this.contentSelectChange
      }

    },
    watch: {
      list2(val, oldVal) {//普通的watch监听
        console.log("a: " + val, oldVal);
      },
      list2: {
        handler(v) {
          this.$emit('change', v);
        },
        deep: true
      }
    },
    methods: {
      add(obj) {
        console.log(obj)
        const newObj = Object.assign(_.cloneDeep(obj.data), list2);
        return newObj;
      },
      clickComponent: function (item) {

       this.sets=item;
       // layer.msg(JSON.stringify(item));

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
      }, contentSelectChange(item) {
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

  .fly-shortcut {
    margin: 5px 0;
  }

  .fly-shortcut li {
    text-align: center;
  }

  .fly-shortcut li .layui-icon {

    display: inline-block;
    width: 100%;
    height: 60px;
    line-height: 60px;
    text-align: center;
    color: #fff;
    border-radius: 2px;
    font-size: 30px;
    transition: all .3s;
    -webkit-transition: all .3s;
  }

  .fly-shortcut li cite {
    position: relative;
    top: 2px;
    display: block;
    color: #666;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 14px;
  }

  .fly-shortcut li:hover .layui-icon {
    opacity: 0.9;
  }

  .fly-shortcut li .layui-icon {
    background-color: #2F9688;
  }
</style>