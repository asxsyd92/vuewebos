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
                  <button @click="show()" type="button" class="layui-btn layui-btn-normal layui-btn-sm"> 预 览</button>
                </header>
                <form class="layui-form" :fromData="list2">
                  <draggable class="dragArea list-group" :list="list2" group="people" @change="log" animation="300">
                    <comfrom @click.native="clickComponent(li)" class="list-group-item" v-for="li in list2" :key="li.id"
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
        list2: [ ], 
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
      if (window.localStorage.data != undefined) {
        m.list2 = JSON.parse(window.localStorage.data)

      }



      console.log('3')

      //window.localStorage.data
      layui.form.on('submit(delsubmit)', function (data) {
        var id = m.sets.id;
        let temp = Enumerable.from(m.list2).where(i => i.id != id).toArray();
        m.list2 = temp;
      });
      //监听提交
      layui.form.on('submit(setsubmit)', function (data) {
        var id = m.sets.id;
        let temp = Enumerable.from(m.list2).firstOrDefault(i => i.id == id);

        temp.data = data.field;
        var newArr = m.list2.filter(item => {
          if (item.id == id) {
            item.data = data.field;
          }
          console.log(item);
          // if (tag.id !== item.id) {
          //   return true
          // }
        })
        //     Enumerable.from(m.list2).forEach(function(value, index){
        //          layui. layer.alert(JSON.stringify(value), {
        //       title: '最终的提交信息'
        //     })
        //       console.log("值="+value+",索引="+index);
        //        //  document.write("值="+value+",索引="+index);   
        //  });

        //m.list2[0].data=data.field;
        layui.layer.alert(JSON.stringify(newArr), {
          title: '最终的提交信息'
        })
        console.log(m.list2);
        layui.layer.alert(JSON.stringify(m.list2), {
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
          console.log(1);
          layui.form.val('setings', item.data);
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
        m.dialogdata=m.list2;
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

        window.localStorage["data"] = JSON.stringify(m.list2);
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