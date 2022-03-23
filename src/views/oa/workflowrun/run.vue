<template>
  <div class="showfrom">
    <div class="layui-card">
      <div class="layui-container">
        <form :class="fromtype" :lay-filter="table">
          <div class="layui-input-block layui-footer">
            <button type="submit" class="layui-btn layui-btn-normal layui-btn-sm" lay-submit=""
              lay-filter="_submit">立即提交</button>
            <button type="reset" class="layui-btn layui-btn-primary layui-btn-sm" layui-btn-sm>重置</button>
            <button type="button" class="layui-btn layui-btn-primary layui-btn-sm" @click="close()"
              layui-btn-sm>关闭</button>
          </div>
          <submitfrom v-for="li in fromdata.data" :key="li.id" :data="li"></submitfrom>
          <div class="layui-form-item">
          </div>
        </form>
            <div v-if="commentlist.length>0">
         <blockquote class="layui-elem-quote layui-text">处理意见</blockquote>
          <div class="layui-timeline" v-for="(value, index) in commentlist" :key="index">
            <div class="layui-timeline-item"> <i class="layui-icon layui-timeline-axis"></i>
              <div class="layui-timeline-content layui-text">
                <div class="layui-timeline-title">
                  {{ value.stepname }}
                </div>
                <div>
                  {{ value.comment }}
                  <div style="text-align: right;">{{value.sendername }}</div>
                  <div style="text-align: right;">{{value.sendertime }}</div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>

    <script type="text/html" id="send">
        <from class="layui-form" lay-filter="send">
<blockquote class="layui-elem-quote layui-text">
 请选择处理步骤
</blockquote>
  <div class="layui-form-item" pane="">
    <label class="layui-form-label">步骤</label>
    <div class="layui-input-block" id="nextstep">

    </div>
  </div>
  <blockquote class="layui-elem-quote layui-text">
 请选择处理人
</blockquote>
<div id="sends" class="xm-select-demo"></div>

     <div class="layui-input-block">
            <button type="submit" class="layui-btn layui-btn-normal layui-btn-sm" lay-submit="" lay-filter="_send">发送</button>
    </div>
          </from>
        </script>

  </div>

</template>

<style>
  .showfrom {
    top: 86px;
    position: relative;
  }

  .layui-footer {
    z-index: 400;
    width: 100%;
    position: fixed;
    right: 0;
    top: 85px;
    height: 44px;
    line-height: 22px;
    background-color: #fff;
    text-align: center;
    padding: 10px 0;
  }
</style>

<script>

  import submitfrom from "@/components/subform/submitfrom";


  import popupmessage from "@/components/uni-popup/components/uni-popup-message/uni-popup-message";

  import Enumerable from 'linq'
  export default {
    components: {
      submitfrom, popupmessage
    }, data() {
      return {
        field: {},
        query: new Object(),
        senduser: [],
        currentStep: {},
        currentdata: {},
        neextdata: {},
        fromdata: [],
        fromtype: '',
        table: "",
        msgType: "",
        message: "",
        title: '',
        isflow: false,
        from: [],
        fromdata: [],
        stepcheck: [],
        step: [],
        checkedKeys: [],
        user: [],
        isShow: false,
        groupName: "",
        grouplist: [],
        signature: false,
        comment: "",
        commentlist: [],
        nextstep: [],
        props: function () {
          return {
            label: 'title'
          }
        },
        ready: true, // 这里用于自主控制loading加载状态，避免异步正在加载数据的空档显示“暂无数据”
        treeData: []

      }
    },


    watch: {
      '$route'(to, from) { //监听路由是否变化
        console.log(this);
        if (to.fullPath.indexOf("run") > 0) {
        //  this.init();
        }

      }
    },
    mounted() {
      console.log("run");
      var m = this;
      m.query.flowid = m.$route.query.flowid;
      m.query.instanceid = m.$route.query.instanceid;
      m.query.taskid = m.$route.query.taskid;
      m.query.stepid = m.$route.query.stepid; //$("#stepid").val();
      m.query.groupid = m.$route.query.groupid;
      if (m.query.flowid != null && m.query.flowid != undefined && m.query.flowid != "") {
        m.isflow = true;

      } else {
        m.query.formid = m.$route.query.formid;
      }
      m.init();
    },
    methods: {
      send(data) {
        var m = this;
        if (m.nextstep.length == 0) {
         
          var opts = {};
          opts.type = "completed";
          opts.steps = [];
          m.$post(m.host + "/api/workflowtasks/sendTask", { table: m.table, data: JSON.stringify(data.field), query: JSON.stringify(m.query), params1: JSON.stringify(opts) }, "正在处理...").then(res => {
          }).catch(resp => {
            if (resp.success) {

              layui.layer.alert(resp.msg, {
                skin: 'layui-layer-molv' //样式类名
                , closeBtn: 0
              }, function (index, layero) {
                layui.layer.close(index);
          
                m.$claostabs(m);

              });

            } else {
              layui.layer.alert(resp.msg, {
                skin: 'layui-layer-molv' //样式类名
                , closeBtn: 0
              }, function (index, layero) {
                layui.layer.close(index);
              
                m.$claostabs(m);

              });
            }
          });
          return false;

        } else {
          m.$post(m.host + "/api/organiz/GetOrganizeById", { id: "" }, "请稍等...").catch(res => {
            if (res.success) {

              var sendindex = layui.layer.open({
                type: 1,
                title: '发送',

                shade: 0.8,

                area: ['80%', '80%'],
                content: document.getElementById("send").innerHTML,
                success: function () {
                  console.log(res.data);
                  var html = "";
                  layui.$.each(m.nextstep, function (i, value) {
                    html += '<input type="radio" name="bz" lay-skin="primary" title="' + value.name + '" value="' + value.id + '"  >'

                  });
                  layui.$("#nextstep").html(html);

                  var sends = xmselect.render({
                    el: '#sends',
                    autoRow: true,
                    filterable: true,
                    clickClose: true,
                    name: "users",
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
                    filterable: true,
                    height: 'auto',
                    data: res.data
                  })

                  layui.form.on('submit(_send)', function (resp) {


                    if (resp.field.bz == null || resp.field.bz == undefined) {
                      layui.layer.msg("请选择步骤");
                      return false;
                    }
                    if (resp.field.users == "") {
                      layui.layer.msg("请选择处理人员");
                      return false;

                    }
                    var opts = {};
                    opts.type = "submit";
                    opts.steps = [];
                    opts.steps.push({ id: resp.field.bz, member: resp.field.users });
                    m.$post(m.host + "/api/workflowtasks/sendTask", { table: m.table, data: JSON.stringify(data.field), query: JSON.stringify(m.query), params1: JSON.stringify(opts) }, "正在发送...").then(res => {
                    }).catch(resp => {
                      if (resp.success) {

                        layui.layer.alert(resp.msg, {
                          skin: 'layui-layer-molv' //样式类名

                        }, function (index, layero) {
                          layui.layer.close(index);
                          layui.layer.close(sendindex);
                          m.$claostabs(m);
                          // var id = $(window.frameElement).attr('tab-id');
                          // top.window.element.tabDelete('xbs_tab', id);
                        });

                      } else {
                        top.layer.alert(resp.msg, {
                          skin: 'layui-layer-molv' //样式类名

                        }, function (index, layero) {
                          layui.layer.close(index);
                          layui.layer.close(sendindex);
                          m.$claostabs(m);
                        });
                      }
                    });

                    console.log(data);
                    console.log(resp);
                    return false;
                  });
                  layui.form.render();
                }
              });



            }
          });
          return false;
        }
      },
      close() {
        var m = this;
        m.$claostabs(m);
      },
      init() {
        console.log("show");

        var m = this;
        if (m.isflow) {
          //初始化流程在初始化表单
          m.$post(m.host + "/api/workflowtasks/FlowInit", { flowid: m.query.flowid, stepid: m.query.stepid, instanceid: m.query.instanceid }, "正在初始化").then(res => {


          }).catch(res => {
            if (res.success) {
              console.log(res);
              m.currentdata = res.currentdata;
              if (m.currentdata.signatureType == 0 || m.currentdata.signatureType == "0") {
                m.signature = true;
              }
              var k = JSON.parse(res.formdata.designhtml);
              m.fromdata = k;
              m.fromtype = k.from.data.type;
              m.table = k.from.data.table;
              m.nextstep = res.data;
              if (res.data.length > 0) {
                res.data.forEach(item => {
                  let o = new Object();
                  o.text = item.name;
                  o.value = item.id;
                  m.step.push(o);
                });
              }

              console.log(m.step);
              if (m.isflow && m.query.instanceid != null && m.query.instanceid != undefined && m.query.instanceid != "") {
                m.getcomment();
              }



            } else {

              layer.msg(data.msg, { icon: 2 });
            }

          });
        }
        else {
          m.getform();
        }


        layui.form.on('submit(_submit)', function (data) {

          m.send(data);
          return false;
        });

      }, change(e) {
        console.log('当前模式：' + e.type + ',状态：' + e.show);
      },
      getcomment() {
        var m = this;
        m.$post(m.host + "/api/workflowtasks/getcomment", { query: JSON.stringify(m.query) },"正在处理").then(res => {


          }).catch(res => {
          if (res.success) {
            m.commentlist = res.data;
          }
        });
      },
      ///获取表单
      getform() {
        var m = this;
        m.$post(m.host + "/api/form/getFormJson", { key: m.query.formid }, "请稍等").then(res => {


          }).catch(res => {
          if (res.success) {
            var k = JSON.parse(res.data.designhtml);
            m.fromdata = k;
            console.log(m.fromdata);
            m.bindfield();
            if (m.query.instanceid != null && m.query.instanceid != undefined && m.query.instanceid != "") {
              getTabelDate();
            }
          } else {


            layer.msg(data.msg, { icon: 2 });
          }

        }).catch(resp => {


        });
      },
    }
  }
</script>