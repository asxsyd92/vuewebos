<template>
  <div class="showfrom">
    <div class="layui-card">
      <div class="layui-container">
        <form :class="fromdata.from.data.type" :lay-filter="fromdata.from.data.table">
          <div class="layui-input-block layui-footer">
            <button type="submit" class="layui-btn layui-btn-normal layui-btn-sm" lay-submit="" lay-filter="_submit">立即提交</button>
            <button type="reset" class="layui-btn layui-btn-primary layui-btn-sm" layui-btn-sm>重置</button>
            <button type="button" class="layui-btn layui-btn-primary layui-btn-sm" @click="close()"
              layui-btn-sm>关闭</button>
          </div>
          <submitfrom v-for="li in fromdata.data" :key="li.id" :data="li"></submitfrom>

          <div class="layui-form-item">


          </div>
        </form>
      </div>
    </div>



  <view>
    <!-- 普通弹窗 -->
    <uni-popup ref="popup" background-color="#fff" @change="change">
      <view class="popup-content" :class="{ 'popup-height': msgType === 'left' || msgType === 'right' }">
        <!-- 处理步骤 -->
        <uni-section title="请选择处理步骤" type="line">
          <view class="uni-px-5 uni-pb-5">
            <!-- <view class="text">多选选中：{{JSON.stringify(checkbox1)}}</view> -->
            <uni-data-checkbox multiple v-model="stepcheck" :localdata="step"></uni-data-checkbox>
          </view>
        </uni-section>
        <!-- 接受人员 -->
        <uni-section title="请选择接受人员" type="line">
          <input type="text" disabled="true" class="layui-input layui-btn-sm" ref='groupInput' @click="popOrganization"
            placeholder="请选择组织机构" :value='groupName'>

          <view v-show="isShow" class="top_level">
            <view class="flex_row_center label_text">
              <view style="width: 140rpx;"></view>
              <scroll-view style="height: 200px;" class="ly_tree_style" :scroll-y="true">
                <ly-tree ref="tree" :accordion="true" :props="props" :treeData="treeData" v-if="ready"
                  :showCheckbox="true" nodeKey="id" :checkOnClickNode="true" :expandOnClickNode="false"
                  :defaultExpandAll="false" @check='handleNodeClick'></ly-tree>
              </scroll-view>
            </view>
          </view>
        </uni-section>
        <uni-section v-show="signature" title="处理意见" type="line">
          <uni-easyinput type="textarea" autoHeight v-model="comment" placeholder="请填写处理意见"></uni-easyinput>

        </uni-section>
        <view class="uni-ma-5 uni-pb-5">
          <button type="submit" class="uni-btn" @click="save" size="mini">保存</button>
          <button type="submit" class="uni-btn" @click="submit" size="mini">发送</button>
        </view>

      </view>
    </uni-popup>
  </view>


        <script type="text/html" id="send" >
        <div class="layui-form">
<blockquote class="layui-elem-quote layui-text">
 请选择步骤
</blockquote>
  <div class="layui-form-item" pane="">
    <label class="layui-form-label">原始复选框</label>
    <div class="layui-input-block">
      <input type="checkbox" name="like1[write]" lay-skin="primary" title="写作" >
      <input type="checkbox" name="like1[read]" lay-skin="primary" title="阅读">
      <input type="checkbox" name="like1[game]" lay-skin="primary" title="游戏">
    </div>
  </div>
  <blockquote class="layui-elem-quote layui-text">
 处理人
</blockquote>

     <input type="text" disabled="true" class="layui-input layui-btn-sm" ref='groupInput' @click="popOrganization"
            placeholder="请选择组织机构" :value='groupName'>

     
</div>
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
      submitfrom,popupmessage
    }, data() {
      return {
          field: {},
        query: new Object(),
        senduser: [],
        currentStep: {},
        currentdata: {},
        neextdata: {},
        fromdata: [],
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
          this.init();
        }

      }
    },
    mounted() {
      console.log("run");
      var m=this;
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
        m.$post(m.host + "/api/organiz/GetOrganizeById", { id: "" }, "请稍等...").catch(res => {
          if (res.success) {
              
                layui.layer.open({
                    type: 1,
                    title: '修改密码',
                    shadeClose: true,
                    shade: 0.8,
            
                    area: ['35%', '55%'],
                    content: document.getElementById("send").innerHTML,
                    success:function(){
                      layui.form.render();
                    }
                });
            m.treeData = res.data;
            m.msgType = 'top'
            // open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
            //m.$refs.popup.open('top')

          }
        });
        return false;
      },
      close() {
        var m = this;
        m.$claostabs(m);
      },
      getTabelDate(id, k) {
        var m = this;
        m.$post(m.host + "/api/tasks/GetFormData", { key: id, tab: k.from.data.table }).then(res => {

        }).catch(data => {
          if (data.success) {
            //对所有表单赋值
            Enumerable.from(k.data).toArray().filter(item => {
              try {
                item.data.value = data.data[item.data.name];
              } catch {
                item.data.value = "";
              }
            });


          }

          m.data = k.data;
          m.from = k.from.data;
          layui.form.val(m.from.name, data.data);
        });
      }, init() {
        console.log("show");
      
        var m = this;
        if (m.isflow) {
          //初始化流程在初始化表单
          m.$post(m.host + "/api/workflowtasks/FlowInit", { flowid: m.query.flowid, stepid: m.query.stepid, instanceid: m.query.instanceid }).then(res => {
 

          }).catch(res => {
           if (res.success) {
              console.log(res);
              m.currentdata = res.currentdata;
              if (m.currentdata.signatureType == 0 || m.currentdata.signatureType == "0") {
                m.signature = true;
              }
              var k = JSON.parse(res.formdata.designhtml);
              m.fromdata = k;
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
             if(m.isflow&&m.query.instanceid!=null&&m.query.instanceid!=undefined&&m.query.instanceid!=""){
                m.getcomment();
              }
              //m.bindfield();
              
          
              m.msgType = "top";
              m.message = res.msg;
            //  m.$refs.popupMessage.open();


            } else {
              m.msgType = "top";
              m.message = res.msg;
            //  m.$refs.popupMessage.open();
            }

          });
        }
        else {
          m.getform();
        }
        // var lay = layer.msg('请稍等...', { icon: 16, shade: 0.5, time: 20000000 });
        // m.$post(m.host + "/api/form/getFormJson", { key: m.$route.query.fromid }).then(res => {
        //   console.log(res);


        // }).catch(data => {

        //   layer.close(lay);
        //   if (data.success) {
        //     var k = JSON.parse(data.data.designhtml);
        //     console.log(k);

        //     //处理表单
        //     var instanceid = m.$route.query.key;
        //     if (instanceid != null && instanceid != undefined && instanceid != "") {
        //       m.getTabelDate(instanceid, k);
        //     } else {
        //       m.data = k.data;
        //       m.from = k.from.data;
        //     }
        //   } else {

        //     layer.msg(data.msg, { icon: 2 });
        //     return;
        //   }
        // })
       
        layui.form.on('submit(_submit)', function (data) {
     
          m.send(data);
          return false;
          });
        //   console.log(555);
        //   var lay = layer.msg('保存中...', { icon: 16, shade: 0.5, time: 20000000 });
        //   var opts = {};
        //   opts.type = "save";
        //   opts.steps = [];
        //   m.$post(m.host + "/api/workflowtasks/sendTask", { table: m.fromdata.from.data.table, data: JSON.stringify(data.field), query: JSON.stringify(m.query), params1: JSON.stringify(opts) }).then(res => {
        //     console.log(res);


        //   }).catch(resp => {

        //     layer.close(lay);
        //     if (resp.success) {
        //       m.$claostabs(m);
        //       layui.layer.alert(resp.msg, {
        //         skin: 'layui-layer-lan'
        //         , closeBtn: 0
        //         , anim: 4 //动画类型
        //       });


        //     } else {

        //       layui.layer.alert(resp.msg, {
        //         skin: 'layui-layer-lan'
        //         , closeBtn: 0
        //         , anim: 4 //动画类型
        //       });
        //     }
        //   })
        //   return false;
        // })
      },     change(e) {
        console.log('当前模式：' + e.type + ',状态：' + e.show);
      },
           getcomment() {
        var m = this;
        m.$post(m.host + "/api/workflowtasks/getcomment", { query: JSON.stringify(m.query) }).then(res => {
          if (res.success) {
            m.commentlist = res.data;
          }
        });
      },
           ///获取表单
      getform() {
        var m = this;
        m.$post(m.host + "/api/form/getFormJson", { key: m.query.formid }, "请稍等").then(res => {
          if (res.success) {
            var k = JSON.parse(res.data.designhtml);
            m.fromdata = k;
            console.log(m.fromdata);
            m.bindfield();
            if (m.query.instanceid != null && m.query.instanceid != undefined && m.query.instanceid != "") {
              getTabelDate();
            }
          } else {
            
            m.msgType = "top";
            m.message = res.msg;
           // m.$refs.popupMessage.open();
          }

        }).catch(resp => {


        });
      },
    }
  }
</script>