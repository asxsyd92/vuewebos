<template>
  <div>
    <div class="layui-row">
      <div class="layui-col-space12">
        <div class="layui-col-xs3 fdtools ">

          <div class="layui-col-md12">
            <!-- <div class="layui-card"> -->
              <div class="layui-card-header">表单组件</div>
              <div class="layui-card-body">
                <div class="layui-row">
                  <div class="layui-col-ms3 ">
                    <ul class="layui-row fly-shortcut">
                      <draggable class="dragArea list-group" :list="fromdata" :clone="clone" animation="300"
                        :group="{ name: 'people', pull: 'clone', put: false,sort: true, }" @change="log">
                        <li v-for="li in fromdata" :key="li.id" :data="li" class="layui-col-xs3 layui-col-xs3 flyli"> <span><i
                              :class=" 'fa '+ li.icon"></i><cite>{{li.name}}</cite></span> </li>
                      </draggable>
                    </ul>
                  </div>
                <!-- </div> -->

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
            <!-- <div class="layui-card"> -->
              <div class="layui-card-header">表单生成器</div>
              <div class="layui-card-body">
                <header class="el-header _fc-m-tools">
                   <button @click="attribute()" type="button" class="layui-btn layui-btn-normal layui-btn-sm">表单属性</button>
                  <button @click="show()" type="button" class="layui-btn layui-btn-normal layui-btn-sm">预览</button>
                </header>
                <form class="layui-form" :fromData="list2.data">
                  <draggable class="dragArea list-group" :list="list2" group="people" @change="log" animation="300">
                    <comfrom @click.native="clickComponent(li)" class="list-group-item" v-for="li in list2.data" :key="li.id"
                      :data="li" @change="contentChange" @select-change="contentSelectChange"></comfrom>
                  </draggable>
                </form>
              </div>
            <!-- </div> -->
          </div>


        </div>
        <div class="layui-col-xs3 fdtools">
          <div class="layui-col-md12">
            <!-- <div class="layui-card"> -->
              <div class="layui-card-header">属性</div>
              <div class="layui-card-body">
                <div class="layui-form" lay-filter="setings">
                  <setting :data="sets" v-if="sets!=null||sets!=undefined"></setting>
                </div>

              </div>
            <!-- </div> -->
          </div>
        </div>
      </div>
    </div>
  <div id="_webosdialog" style="display:none">
    <div v-if="dialogdata.length>0">
  <submitfrom  v-for="li in dialogdata" :key="li.id" :data="li" ></submitfrom>
    </div>

  </div>
  </div>


</template>

<script>
  import draggable from "vuedraggable";
  import fromjson from '@/assets/js/data.js'
  import _ from 'lodash';
  import Enumerable from 'linq'
  import submitfrom from "@/components/subform/submitfrom";
  import comfrom from "@/pages/formdesign/comfrom";
  import setting from "@/components/subform/setting";
  let idGlobal = 8;
  export default {
    name: "custom-clone",
    display: "Custom Clone",
    order: 3,
    components: {
      draggable, submitfrom, comfrom, setting
    },
    data() {
      return {
        sets: null,
        seleid: "",dialogdata:[],
        list2: {data:[], from:{ data:{ name:'',type:"layui-form"},type:'setfrom' }}, 
        fromdata: fromjson.data
           };
    }, 
      updated () {
        console.log( this.$els);
                console.log('更新之后')
                console.log(this.$refs.self)
              }
    ,mounted() {
      var m = this;
      console.log(this.fromdata);
       var lay = layer.msg('请稍等...', { icon: 16, shade: 0.5, time: 20000000 });
   
      if(m.$tab.params.key!=null&&m.$tab.params.key!=undefined){
            m.$post(m.host + "/api/form/getFormJson", { key: m.$tab.params.key }).then(res => {
                    console.log(res);


                }).catch(data => {

                    layer.close(lay);
                    if (data.success) {
                      var kfrom=JSON.parse(data.data.designhtml);
                     m.list2.data=kfrom.data;
                     m.list2.from=kfrom.from;
                    } else {
                
                        layer.msg(data.msg, { icon: 2 });
                        return;
                    }
                })
      }

     layui.form.on('submit(setingfrom)', function (data) {
           m.list2.from.data=data.field;
           console.log(m.list2);
      });
      layui.form.on('submit(delsubmit)', function (data) {
        var id = m.sets.id;
        let temp = Enumerable.from(m.list2.data).where(i => i.id != id).toArray();
        m.list2.data = temp;
      });
      //监听提交
      layui.form.on('submit(setsubmit)', function (data) {
        var id = m.sets.id;
        let temp = Enumerable.from(m.list2.data).firstOrDefault(i => i.id == id);

    if(temp.type=='select'){
    data.field.input=JSON.parse(data.field.input);
    console.log( data.field.input);
    }
    
    
        var newArr = m.list2.data.filter(item => {
          if (item.id == id) {
            item.data = data.field;
          }
          console.log(item);
 
        })

        layui.layer.alert(JSON.stringify(newArr), {
          title: '最终的提交信息'
        })
        console.log(m.list2);
        layui.layer.alert(JSON.stringify(m.list2.data), {
          title: '最终的提交信息'
        })
        return false;
      });
    },
    provide() {
      return {
        formjson: [],
        settinglist: this.sets,
        contentSelectChange: this.contentSelectChange
      }

    },
    watch: {

      list2: {
        handler(v) {
          this.$emit('click.native', v);
        },
        deep: true
      }
    },
    methods: {
      attribute(){
        var m=this;
        m.sets = m.list2.from;
        m.$emit('change', m.sets );
           setTimeout(function () {
           layui.form.val('setings',m.sets.data);

           });
          
      },
      add(obj) {
        console.log(obj)
        // const newObj = Object.assign(_.cloneDeep(obj.data), list2);
        // const newObj = Object.assign(_.cloneDeep(obj), {id: `${obj.name}_${new Date().getTime()}`});
        return newObj;

      },
      clickComponent: function (item) {

        this.sets = item;
        this.$emit('change', item);
        layui.form.render(); //更新全部
     

        setTimeout(function () {
          var str=item.data.input;
             if (typeof str == 'string') {
            try {
                var obj=JSON.parse(str);
                var i=item.data.input=obj;
                console.log('转换成功：'+obj);
            
            } catch(e) {
                console.log('error：'+str+'!!!'+e);
             
            }
        }else{
           var ks= JSON.stringify(item.data.input);
               var i=item.data.input=ks;
        }
      
          layui.form.val('setings',item.data);
        }, 100);
        console.log(2);
        layui.form.render(); //更新全部
        console.log(3);
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
        const newObj = Object.assign(_.cloneDeep(obj), { id: `${obj.id}_${new Date().getTime()}` });
        return newObj;
        //  var m= this;
        //   console.log(obj)
        //   const newObj = Object.assign(_.cloneDeep(obj), m.list2);
        //   return newObj;
      },
      show() {
        var m = this;
        m.dialogdata=m.list2.data;
        console.log( m.dialogdata);
        setTimeout(() => {
                layui.layer.open({
                    type: 1,
                    title: '表单预览',
                    shadeClose: true,
                    shade: 0.8,
            
                    area: ['35%', '55%'],
                    content: document.getElementById("_webosdialog").innerHTML
                });
        }, 10);
        var key="";
      if(m.$tab.params.key!=null&&m.$tab.params.key!=undefined){
        key=m.$tab.params.key;
      }
             var lay = layer.msg('保存中...', { icon: 16, shade: 0.5, time: 20000000 });
    m.$post(m.host + "/api/form/saveFormJson", { key: key,title:"测试",data: JSON.stringify(m.list2) }).then(res => {
                    console.log(res);


                }).catch(data => {

                    layer.close(lay);
                    if (data.success) {
                     m.list2.data=JSON.parse(data.designhtml);
                    } else {
                
                        layer.msg(data.msg, { icon: 2 });
                        return;
                    }
                })
       
      }
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
      margin: 5px;
      line-height: 25px;
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

  ._fc-m-tools {
    height: 40px;
    align-items: center;
    display: flex;
    justify-content: flex-end;
    border: 1px solid #ECECEC;
    border-top: 0 none;
  }

  .el-header {
    padding: 0 20px;
    box-sizing: border-box;
    flex-shrink: 0;
  }



  header {
    display: block;
  }

  ._fc-designer {
    height: 100%;
    min-height: 500px;
    overflow: hidden;
    cursor: default;
    position: relative;
  }
</style>