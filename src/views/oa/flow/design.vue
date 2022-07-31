<template>
  <div class="design">
    <lay-button-group>
      <lay-button type="default" size="lg" @click="methods.flow">流程属性</lay-button>
      <lay-button type="default" size="lg" @click="methods.save('save')">保存</lay-button>
      <lay-button type="default" size="lg" @click="methods.save('install')">安装</lay-button>
      <lay-button type="default" size="lg" @click="methods.save('uninstall')">卸载</lay-button>
      <lay-button type="default" size="lg" @click="methods.save('delete')">卸载</lay-button>
    </lay-button-group>

    <div class="flow_region">


      <div class="nodes-wrap">
        <div v-for="item in nodeTypeList" :key="item.type" class="node" draggable="true"
          @dragstart="methods.drag(this, item)">
          <div class="log">
            <!-- <img :src="item.logImg" alt=""> -->
          </div>
          <div class="name">{{ item.typeName }}</div>
        </div>
      </div>
      <div id="flowWrap" ref="flowWrap" class="flow-wrap" @drop="methods.drop($event)"
        @dragover="methods.allowDrop($event)">
        <div id="flow">
          <div v-show="auxiliaryLine.isShowXLine" class="auxiliary-line-x"
            :style="{ width: auxiliaryLinePos.width, top: auxiliaryLinePos.y + 'px', left: auxiliaryLinePos.offsetX + 'px' }">
          </div>
          <div v-show="auxiliaryLine.isShowYLine" class="auxiliary-line-y"
            :style="{ height: auxiliaryLinePos.height, left: auxiliaryLinePos.x + 'px', top: auxiliaryLinePos.offsetY + 'px' }">
          </div>
          <flowNode v-for="item in data.steps" :id="item.id" :key="item.id" :nodedata="item" @setname="methods.setname"
            @deleteNode="methods.deleteNode" @changeLineState="methods.changeLineState" @setflow="methods.setflow">
          </flowNode>
        </div>
      </div>


      <!-- 双击时打开步骤属性 -->
      <lay-layer move="true" :btn="setflowbtn" :closeBtn="false" :area="['70%', '80%']" :shadeClose="false"
        @submit="submit" title="步骤设置" v-model="setflowvisible">
        <div class="layui-container laymodle">
          <lay-tab type="brief" v-model="tabcurrent">
            <lay-tab-item title="基本信息" id="1">
              <lay-form :model="setflowmode" class="layui-form layui-form-pane">
                <div class="layui-col-md12">
                  <lay-form-item label="步骤id：" prop="id">
                    <lay-input v-model="setflowmode.id" disabled="disabled"></lay-input>
                  </lay-form-item>
                </div>
                <div class="layui-col-md12">
                  <lay-form-item label="步骤名称：" prop="name">
                    <lay-input v-model="setflowmode.name"></lay-input>
                  </lay-form-item>
                </div>

                <div class="layui-col-md12">
                  <lay-form-item label="工时" prop="workTime">
                    <lay-input v-model="setflowmode.worktime"></lay-input>
                  </lay-form-item>
                </div>

                <div class="layui-col-md12">
                  <lay-form-item label="意见显示：" prop="opinionDisplay">
                    <lay-radio v-model="setflowmode.opinionDisplay" name="opinionDisplay" value="0" label="是">
                    </lay-radio>
                    <lay-radio v-model="setflowmode.opinionDisplay" name="opinionDisplay" value="1" label="否">
                    </lay-radio>
                  </lay-form-item>
                </div>

                <div class="layui-col-md12">
                  <lay-form-item label="是否归档：" prop="countersignature">
                    <lay-radio v-model="setflowmode.archives" name="archives" value="0" label="是"></lay-radio>
                    <lay-radio v-model="setflowmode.archives" name="archives" value="1" label="否"></lay-radio>
                  </lay-form-item>
                </div>


                <div class="layui-col-md12">
                  <lay-form-item label="表单">
                    <lay-select v-model="setflowmode.forms.id" :items="forms"></lay-select>
                  </lay-form-item>
                </div>

                <div class="layui-col-md24">
                  <lay-form-item label="审签类型：" prop="signatureType">
                    <lay-radio v-model="setflowmode.signatureType" name="signatureType" value="0" label="无签批意见栏">
                    </lay-radio>
                    <lay-radio v-model="setflowmode.signatureType" name="signatureType" value="1"
                      label="有签批意见-无须签章">
                    </lay-radio>
                    <lay-radio v-model="setflowmode.signatureType" name="signatureType" value="2"
                      label="有签批意见-须签章">
                    </lay-radio>
                  </lay-form-item>
                </div>
              </lay-form>
            </lay-tab-item>
            <lay-tab-item title="策略" id="2">
              <!-- 策略               -->
              <lay-form :model="setflowmode" class="layui-form layui-form-pane">
                <div class="layui-col-md14">
                  <lay-form-item label="流转类型:" prop="flowType">
                    <lay-radio v-model="setflowmode.behavior.flowType" name="flowType" value="0" label="单一分支流转">
                    </lay-radio>
                    <lay-radio v-model="setflowmode.behavior.flowType" name="flowType" value="1" label="系统控制">
                    </lay-radio>
                    <lay-radio v-model="setflowmode.behavior.flowType" name="flowType" value="2" label="多个分支流转">
                    </lay-radio>

                  </lay-form-item>
                </div>
                <div class="layui-col-md8">

                  <lay-form-item label="运行时选择:" prop="runSelect">
                    <lay-radio v-model="setflowmode.behavior.runSelect" name="runSelect" value="1" label="允许">
                    </lay-radio>
                    <lay-radio v-model="setflowmode.behavior.runSelect" name="runSelect" value="0" label="不允许">
                    </lay-radio>
                  </lay-form-item>
                </div>

                <div class="layui-col-md8">
                  <lay-form-item label="处理者类型:" prop="handlerType">
                    <lay-select v-model="setflowmode.behavior.handlerType">
                      <lay-select-option value="0" label="所有成员"></lay-select-option>
                      <lay-select-option value="1" label="部门"></lay-select-option>
                      <lay-select-option value="2" label="岗位"></lay-select-option>
                      <lay-select-option value="3" label="工作组"></lay-select-option>
                      <lay-select-option value="4" label="人员"></lay-select-option>
                      <lay-select-option value="5" label="发起者"></lay-select-option>
                      <lay-select-option value="6" label="前一步骤处理者"></lay-select-option>
                      <lay-select-option value="7" label="某一步骤处理者"></lay-select-option>
                      <lay-select-option value="8" label="字段值"></lay-select-option>
                      <lay-select-option value="9" label="发起者领导"></lay-select-option>
                      <lay-select-option value="10" label="发起者分管领导"> </lay-select-option>
                      <lay-select-option value="11" label="前一步处理者领导"></lay-select-option>
                      <lay-select-option value="12" label="前一步处理者分管领导"></lay-select-option>
                    </lay-select>

                  </lay-form-item>
                </div>
                <div class="layui-col-md8">

                  <lay-form-item label="选择范围:" prop="selectRange">
                    <lay-input v-model="setflowmode.behavior.selectRange"></lay-input>
                  </lay-form-item>
                </div>
                <div class="layui-col-md8">

                  <lay-form-item label="处理者步骤:" prop="handlerStep">
                    <lay-input v-model="setflowmode.behavior.handlerStep"></lay-input>
                  </lay-form-item>
                </div>
                <div class="layui-col-md8">

                  <lay-form-item label="值字段:" prop="valueField">
                    <lay-input v-model="setflowmode.behavior.valueField"></lay-input>
                  </lay-form-item>
                </div>
                <div class="layui-col-md8">

                  <lay-form-item label="默认处理者:" prop="defaultHandler">
                    <lay-input v-model="setflowmode.behavior.defaultHandler"></lay-input>
                  </lay-form-item>
                </div>
                <div class="layui-col-md24">
                  <lay-form-item label="退回策略:" prop="backModel">
                    <lay-radio v-model="setflowmode.behavior.backModel" name="backModel" value="0" label="不能退回">
                    </lay-radio>
                    <lay-radio v-model="setflowmode.behavior.backModel" name="backModel" value="1" label="根据处理策略退回">
                    </lay-radio>
                  </lay-form-item>
                </div>
                <div class="layui-col-md24">
                  <lay-form-item label="处理策略:" prop="hanlderModel">
                    <lay-radio v-model="setflowmode.behavior.hanlderModel" name="hanlderModel" value="0"
                      label="所有人必须同意">
                    </lay-radio>
                    <lay-radio v-model="setflowmode.behavior.hanlderModel" name="hanlderModel" value="1" label="一人同意即可">
                    </lay-radio>
                    <lay-radio v-model="setflowmode.behavior.hanlderModel" name="hanlderModel" value="2" label="依据人数比例">
                    </lay-radio>
                    <lay-radio v-model="setflowmode.behavior.hanlderModel" name="hanlderModel" value="3" label="独立处理">
                    </lay-radio>
                  </lay-form-item>
                </div>
                <div class="layui-col-md12">
                  <lay-form-item label="退回类型:" prop="backType">
                    <lay-radio v-model="setflowmode.behavior.backType" name="backType" value="0" label="退回前一步">
                    </lay-radio>
                    <lay-radio v-model="setflowmode.behavior.backType" name="backType" value="1" label="退回第一步">
                    </lay-radio>
                    <lay-radio v-model="setflowmode.behavior.backType" name="backType" value="2" label="退回某一步">
                    </lay-radio>

                  </lay-form-item>
                </div>

                <div class="layui-col-md10">
                  <lay-form-item label="策略百分比:" prop="percentage">
                    <lay-input v-model="setflowmode.behavior.percentage"></lay-input>

                  </lay-form-item>
                </div>
                <div class="layui-col-md6">
                  <lay-form-item label="退回步骤:" prop="backStep">
                    <lay-input v-model="setflowmode.behavior.backStep"></lay-input>

                  </lay-form-item>
                </div>
                <div class="layui-col-md18">
                  <lay-form-item label="会签策略:" prop="countersignature">
                    <lay-radio v-model="setflowmode.behavior.countersignature" name="countersignature" value="0"
                      label="不会签">
                    </lay-radio>
                    <lay-radio v-model="setflowmode.behavior.countersignature" name="countersignature" value="1"
                      label="所有步骤同意">
                    </lay-radio>
                    <lay-radio v-model="setflowmode.behavior.countersignature" name="countersignature" value="2"
                      label="一个步骤同意即可">
                    </lay-radio>
                    <lay-radio v-model="setflowmode.behavior.countersignature" name="countersignature" value="3"
                      label="依据比例">
                    </lay-radio>
                  </lay-form-item>
                </div>
                <div class="layui-col-md12">
                  <lay-form-item label="会签百分比:" prop="countersignaturePercentage">
                    <lay-input v-model="setflowmode.behavior.countersignaturePercentage"></lay-input>

                  </lay-form-item>
                </div>
                <div class="layui-col-md12">
                  <lay-form-item label="抄送:" prop="copyFor">
                    <lay-input v-model="setflowmode.behavior.copyFor"></lay-input>

                  </lay-form-item>
                </div>
              </lay-form>
            </lay-tab-item>
            <lay-tab-item title="字段" id="3">
              <!-- 字段 -->
              <lay-button type="default" size="sm" @click="methods.resetfield(setflowmode)">重置</lay-button>
              <lay-table :columns="fieldcolumns" :data-source="fieldSource" >

       
               <template v-slot:eoperator="{ data }">
                 <lay-switch v-model="data.status" onswitch-value="0" unswitch-value="1" onswitch-text="编辑"  unswitch-text="只读"></lay-switch>
              
               </template>
             <template v-slot:doperator="{ data }">
                <lay-switch v-model="data.check" onswitch-value="0" unswitch-value="1" onswitch-text="不检查"  unswitch-text="检查"></lay-switch>
               </template>
    </lay-table>
      
            </lay-tab-item>
            <lay-tab-item title="按钮" id="4">
              <div style="padding:20px">按钮</div>
            </lay-tab-item>
          </lay-tab>


        </div>
      </lay-layer>
      <!-- 流程属性 -->
      <lay-layer move="true" :btn="flowbtn" :closeBtn="false" :area="['70%', '85%']" :shadeClose="false"
        @submit="flowsubmit" title="流程属性" v-model="flowvisible">
        <div class="layui-container laymodle">

          <lay-form :model="flowjson" class="layui-form layui-form-pane">
            <div class="layui-col-md12">
              <lay-form-item label="流程id：" prop="id">
                <lay-input v-model="flowjson.id" disabled="disabled"></lay-input>
              </lay-form-item>
            </div>

            <div class="layui-col-md12">

              <lay-form-item label="流程名称：" prop="name">
                <lay-input v-model="flowjson.name"></lay-input>
              </lay-form-item>
            </div>
            <div class="layui-col-md6">
              <lay-form-item label="完成后移出" prop="removeCompleted">
                <lay-input v-model="flowjson.removeCompleted"></lay-input>
              </lay-form-item>
            </div>


            <div class="layui-col-md18">
              <lay-form-item label="流程备注：" prop="debug">
                <lay-radio v-model="flowjson.debug" name="debug" value="0" label="关闭">
                </lay-radio>
                <lay-radio v-model="flowjson.debug" name="debug" value="1" label="（开启）有调试窗口">
                </lay-radio>
                <lay-radio v-model="flowjson.debug" name="debug" value="2" label="（开启）无调试窗口">
                </lay-radio>
              </lay-form-item>
            </div>
            <div class="layui-col-md12">
              <lay-form-item label="调试人员" prop="debugUsers">
                <lay-input v-model="flowjson.debugUsers"></lay-input>
              </lay-form-item>
            </div>

            <div class="layui-col-md12">
              <lay-form-item label="实例管理人" prop="instanceManager">
                <lay-input v-model="flowjson.instanceManager"></lay-input>
              </lay-form-item>
            </div>
            <div class="layui-col-md12">
              <lay-form-item label="分类：" prop="note">
                <lay-select v-model="flowjson.type" :items="flowtype"></lay-select>
              </lay-form-item>
            </div>
            <div class="layui-col-md12">
              <lay-form-item label="流程备注：" prop="note">
                <lay-input v-model="flowjson.note"></lay-input>
              </lay-form-item>
            </div>
            <div class="layui-col-md12">
              <lay-form-item label="创建人：" prop="note">
                <lay-input v-model="flowjson.manager"></lay-input>
              </lay-form-item>
            </div>
            <div class="layui-col-md12">
              <lay-form-item label="表：" prop="table">
                <lay-input v-model="flowjson.titleField.table"></lay-input>
              </lay-form-item>
            </div>
            <div class="layui-col-md12">
              <lay-form-item label="完成标识：" prop="field">
                <lay-input v-model="flowjson.titleField.field"></lay-input>
              </lay-form-item>

            </div>
            <div class="layui-col-md12">
              <lay-form-item label="连接：" prop="link">
                <lay-input v-model="flowjson.titleField.link"></lay-input>
              </lay-form-item>

            </div>
            <div class="layui-col-md12">
              <lay-form-item label="连接：" prop="links">
                <lay-input v-model="flowjson.databases.link"></lay-input>
              </lay-form-item>

            </div>
            <div class="layui-col-md12">
              <lay-form-item label="连接名称：" prop="linkName">
                <lay-input v-model="flowjson.databases.linkName"></lay-input>
              </lay-form-item>

            </div>
            <div class="layui-col-md12">
              <lay-form-item label="主键：" prop="primaryKey">
                <lay-input v-model="flowjson.databases.primaryKey"></lay-input>
              </lay-form-item>

            </div>
            <div class="layui-col-md12">
              <lay-form-item label="表：" prop="table">
                <lay-input v-model="flowjson.databases.table"></lay-input>
              </lay-form-item>

            </div>
          </lay-form>
        </div>
      </lay-layer>

    </div>
  </div>
</template>
<script lang="ts" setup>
import http from "../../../utils/http";
import { useUserStore } from "../../../store/user";


import { layer } from '@layui/layer-vue';
import flowNode from "../../../components/flow/node-item.vue"
import { ref, nextTick, getCurrentInstance } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import panzoom from "panzoom";
import jsPlumb from 'jsPlumb';
import utils from "../../../utils/utils";
import { jsplumbSetting, jsplumbConnectOptions, jsplumbSourceOptions, jsplumbTargetOptions } from '../../../utils/flowconfig'
import { nodeTypeList } from '../../../utils/flowinit';
const $jsPlumbs = jsPlumb.jsPlumb;
var instance = "" as any;
const currentItem = ref(null) as any;
const route = useRoute();
const nodeTypeObj = [] as any;
const data = ref({}) as any;
const flowjson = ref({}) as any;
const currentInstance = getCurrentInstance() as any;
const auxiliaryLine = { isShowXLine: false, isShowYLine: false };
const auxiliaryLinePos = { width: '100%', height: '100%', offsetX: 0, offsetY: 0, x: 20, y: 20 };
const commonGrid = [5, 5] as any;
const user = useUserStore();
const initNodeTypeObj = () => {
  nodeTypeList.map((v: any) => {
    nodeTypeObj[v.type] = v
  })
}

const initflow = () => {
  //新增
  if(route.query.id==null||route.query.id==undefined||route.query.id==''){


      let newjson="{\"databases\":{\"link\":\"\",\"linkName\":\"\",\"primaryKey\":\"\",\"table\":\"\"},\"debug\":\"0\",\"debugUsers\":\"\",\"id\":\"\",\"instanceManager\":\"\",\"lines\":[],\"manager\":\"\",\"name\":\"\",\"note\":\"\",\"removeCompleted\":\"0\",\"steps\":[],\"titleField\":{\"field\":\"\",\"link\":\"\",\"table\":\"\"},\"type\":\"\"}";
      flowjson.value = JSON.parse(newjson);;
      flowjson.value.instanceManager = user.userInfo.userid;
      flowjson.value.debugUsers = user.userInfo.userid;
      flowjson.value.manager = user.userInfo.userid;
      let o = new Object() as any;
      if(flowjson.value.lines==null||flowjson.value.lines==undefined||flowjson.value.lines==''){
       o.lines=[];
      }else{
       o.lines= flowjson.value.lines;
      }
     
      o.steps = flowjson.value.steps;
      data.value = o;
      methods.fixNodesPosition();
      nextTick(() => {
        methods.init();
      })
 


  }
  //编辑
  else{

  http.post('/api/workflow/GetJSON', { flowid: route.query.id }).then((res) => {
    console.log(res);
    if (res.success) {

      flowjson.value = JSON.parse(res.data);;
      flowjson.value.instanceManager = user.userInfo.userid;
      flowjson.value.debugUsers = user.userInfo.userid;
      flowjson.value.manager = user.userInfo.userid;
      let o = new Object() as any;
      if(flowjson.value.lines==null||flowjson.value.lines==undefined||flowjson.value.lines==''){
       o.lines=[];
      }else{
       o.lines= flowjson.value.lines;
      }
     
      o.steps = flowjson.value.steps;
      data.value = o;
      methods.fixNodesPosition();
      nextTick(() => {
        methods.init();
      })
    } else {
      layer.notifiy({
        title: "温馨提示",
        content: res.msg
      })
    }




  }).catch((res) => {
    layer.notifiy({
      title: "温馨提示",
      content: "网络错误"
    })
  });
  }
}

const methods = {
  init() {
    //加载表单
     this.addfom();
     
    //加载流程分类
    this.adddictionary();
    $jsPlumbs.getInstance().ready(() => {
      // 导入默认配置
      console.log(jsplumbSetting);
      instance = $jsPlumbs.getInstance().importDefaults(jsplumbSetting);
      //完成连线前的校验

      instance.bind("beforeDrop", (evt: any) => {
        let res = () => { } //此处可以添加是否创建连接的校验， 返回 false 则不添加； 
        return res
      })
      // 连线创建成功后，维护本地数据
      instance.bind("connection", (evt: any) => {
        methods.addLine(evt)
      });
      //连线双击删除事件
      instance.bind("dblclick", (conn: any, originalEvent: any) => {
        methods.confirmDelLine(conn)
      })
      //断开连线后，维护本地数据
      instance.bind("connectionDetached", (evt: any) => {
        methods.deleLine(evt)
      })

      methods.loadEasyFlow();
      // 会使整个jsPlumb立即重绘。
      instance.setSuspendDrawing(false, true);
    });
    methods.initPanZoom();
  },
  // 加载流程图
  loadEasyFlow() {
    // 初始化节点
    for (let i = 0; i < data.value.steps.length; i++) {
      let node = data.value.steps[i];
      console.log(node);
      console.log("node");
      // 设置源点，可以拖出线连接其他节点
      instance.makeSource(node.id, jsplumbSourceOptions);
      // // 设置目标点，其他源点拖出的线可以连接该节点
      instance.makeTarget(node.id, jsplumbTargetOptions);
      //instance.draggable(node.id);
      methods.draggableNode(node.id)
    }

    // 初始化连线
    instance.unbind("connection"); //取消连接事件
    for (let i = 0; i < data.value.lines.length; i++) {
      let line = data.value.lines[i];
      instance.connect(
        {
          source: line.from,
          target: line.to
        },
        jsplumbConnectOptions
      );
    }
    instance.bind("connection", (evt: any) => {
      let from = evt.source.id;
      let to = evt.target.id;
      data.value.lines.push({
        from: from,
        to: to,
        noaccordMsg: "连线名称",
        id: utils.GenNonDuplicateID(),
        customMethod: "",
        sql: ""
      });
    });
  },
  draggableNode(nodeId: any) {

    instance.draggable(nodeId, {
      grid: commonGrid,
      drag: (params: any) => {
        methods.alignForLine(nodeId, params.pos)
      },
      start: () => {

      },
      stop: (params: any) => {

        auxiliaryLine.isShowXLine = false
        auxiliaryLine.isShowYLine = false
        methods.changeNodePosition(nodeId, params.pos);

      }
    })
  },
  //移动节点时，动态显示对齐线
  alignForLine(nodeId: any, position: any) {
    console.log("alignForLine");
    console.log(data);
    let showXLine = false, showYLine = false
    data.value.steps.some((el: any) => {
      if (el.id !== nodeId && el.position.x == position[0]) {
        auxiliaryLinePos.x = position[0] + 60;
        showYLine = true
      }
      if (el.id !== nodeId && el.position.y == position[1]) {
        auxiliaryLinePos.y = position[1] + 20;
        showXLine = true
      }
    })
    console.log(data);
    auxiliaryLine.isShowYLine = showYLine
    auxiliaryLine.isShowXLine = showXLine
  },
  changeNodePosition(nodeId: any, pos: any) {
    console.log(data);
    console.log(pos);
    data.value.steps.some((v: any) => {
      if (nodeId == v.id) {
        v.position.x = pos[0];
        v.position.y = pos[1];
        return true
      } else {
        return false
      }
    })
  },
  drag(ele: any, item: any) {
    currentItem.value = item;
  },
  drop(event: any) {
    console.log("drop");
    const containerRect = instance.getContainer().getBoundingClientRect();
    const scale = methods.getScale();
    let x = (event.pageX - containerRect.left - 60) / scale;
    let y = (event.pageY - containerRect.top - 20) / scale;
    let temp = {
      "archives": "0",
      "archivesParams": "",
      "behavior": {
        "backModel": "1",
        "backStep": "",
        "backType": "0",
        "copyFor": "",
        "countersignature": "0",
        "countersignaturePercentage": "",
        "defaultHandler": "",
        "flowType": "1",
        "handlerStep": "",
        "handlerType": "0",
        "hanlderModel": "0",
        "percentage": "",
        "runSelect": "1",
        "selectRange": "",
        "valueField": ""
      },
      "buttons": [{
        "id": "",
        "sort": 0
      }],
      "countersignature": 0,
      "event": {
        "backAfter": "",
        "backBefore": "",
        "submitAfter": "",
        "submitBefore": ""
      },
      "expiredPrompt": "1",
      "fieldStatus": [{
        "check": "0",
        "field": "id",
        "status": "0"
      }],
      "forms": {
        "id": "",
        "name": "",
        "srot": 0,
        "type": ""
      },
      "id": utils.GenNonDuplicateID(),
      "limitTime": "",
      "name": "新建步骤",
      "note": "",
      "opinionDisplay": "1",
      "otherTime": "",
      "position": {
        "height": 50,
        "width": 108,
        "x": x,
        "y": y
      },
      "signatureType": "0",
      "type": "normal",
      "workTime": ""

    };
    // var temp = {
    //   ...currentItem.value,
    //   id: utils.GenNonDuplicateID(),
    //   top: (Math.round(top / 20)) * 20 + "px",
    //   left: (Math.round(left / 20)) * 20 + "px"
    // };
    methods.addNode(temp);
  },
  addLine(line: any) {
    let from = line.source.id;
    let to = line.target.id;
    data.value.lines.push({
      from: from,
      to: to,
      customMethod: "",
      sql: "",
      id: utils.GenNonDuplicateID(),
      noaccordMsg: ""
    });
  },
  confirmDelLine(line: any) {
    // $Modal.confirm({
    //   title: '删除连线',
    //   content: "<p>确认删除该连线？</p>",
    //   onOk: () => {
    //    instance.deleteConnection(line)
    //   }
    // })
  },
  deleLine(line: any) {
    data.value.lines.forEach((item: any, index: any) => {
      if (item.from === line.sourceId && item.to === line.targetId) {
        data.value.lines.splice(index, 1)
      }
    })
  },
  // dragover默认事件就是不触发drag事件，取消默认事件后，才会触发drag事件
  allowDrop(event: any) {
    event.preventDefault();
  },
  getScale() {
    let scale1;
    if (instance.pan) {
      const { scale } = instance.pan.getTransform();
      scale1 = scale;
    } else {
      const matrix = window.getComputedStyle(instance.getContainer()).transform as any;
      scale1 = matrix.split(", ")[3] * 1;
    }
    instance.setZoom(scale1);
    return scale1;
  },
  // 添加新的节点
  addNode(temp: any) {
    data.value.steps.push(temp);
    nextTick(() => {
      instance.makeSource(temp.id, jsplumbSourceOptions);
      instance.makeTarget(temp.id, jsplumbTargetOptions);
      methods.draggableNode(temp.id)
    });
  },

  initPanZoom() {
    console.log("initPanZoom");
    const mainContainer = instance.getContainer() as any;
    if (mainContainer) {
      const mainContainerWrap = mainContainer.parentNode;
      const pan = panzoom(mainContainer, {
        smoothScroll: false,
        bounds: true,
        // autocenter: true,
        zoomDoubleClickSpeed: 1,
        minZoom: 0.5,
        maxZoom: 2,
        //设置滚动缩放的组合键，默认不需要组合键
        beforeWheel: (e) => {
          console.log(e)
          // let shouldIgnore = !e.ctrlKey
          // return shouldIgnore
        },
        beforeMouseDown: function (e) {
          console.log("beforeMouseDown")
          // allow mouse-down panning only if altKey is down. Otherwise - ignore
          var shouldIgnore = e.ctrlKey;
          return shouldIgnore;
        }

      });
      instance.mainContainerWrap = mainContainerWrap;
      instance.pan = pan;
      // 缩放时设置jsPlumb的缩放比率
      pan.on("zoom", (e: any) => {
        const { x, y, scale } = e.getTransform();
        instance.setZoom(scale);
        //根据缩放比例，缩放对齐辅助线长度和位置
        auxiliaryLinePos.width = (1 / scale) * 100 + '%'
        auxiliaryLinePos.height = (1 / scale) * 100 + '%'
        auxiliaryLinePos.offsetX = -(x / scale)
        auxiliaryLinePos.offsetY = -(y / scale)
      });
      pan.on("panend", (e: any) => {
        const { x, y, scale } = e.getTransform();
        auxiliaryLinePos.width = (1 / scale) * 100 + '%'
        auxiliaryLinePos.height = (1 / scale) * 100 + '%'
        auxiliaryLinePos.offsetX = -(x / scale)
        auxiliaryLinePos.offsetY = -(y / scale)
      })

      // 平移时设置鼠标样式
      mainContainerWrap.style.cursor = "grab";
      mainContainerWrap.addEventListener("mousedown", function wrapMousedown() {
        mainContainerWrap.style.cursor = "grabbing";

        mainContainerWrap.addEventListener("mouseout", function wrapMouseout() {
          mainContainerWrap.style.cursor = "grab";

        });
      });
      mainContainerWrap.addEventListener("mouseup", function wrapMouseup() {
        mainContainerWrap.style.cursor = "grab";

      });
    }

  },

  setname(nodeId: any, name: any) {
    data.value.steps.some((v: any) => {
      if (v.id === nodeId) {
        v.name = name
        return true
      } else {
        return false
      }
    })
  },

  //删除节点
  deleteNode(node: any) {
    data.value.steps.some((v: any, index: any) => {
      if (v.id === node.id) {

        data.value.steps.splice(index, 1)
        instance.remove(v.id)
        return true
      } else {
        return false
      }
    })
  },

  //更改连线状态
  changeLineState(nodeId: any, val: any) {
    console.log(val)
    let lines = instance.getAllConnections()
    lines.forEach((line: any) => {
      if (line.targetId === nodeId || line.sourceId === nodeId) {
        if (val) {
          line.canvas.classList.add('active')
        } else {
          line.canvas.classList.remove('active')
        }
      }
    })
  },

  //初始化节点位置  （以便对齐,居中）
  fixNodesPosition() {
    console.log("fixNodesPosition");
    console.log(data);
    if (data.value.steps && currentInstance.refs.flowWrap) {
      const nodeWidth = 120
      const nodeHeight = 40
      let wrapInfo = currentInstance.refs.flowWrap.getBoundingClientRect()
      let maxLeft = 0, minLeft = wrapInfo.width, maxTop = 0, minTop = wrapInfo.height;
      let nodePoint = {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      }
      let fixTop = 0, fixLeft = 0;
      data.value.steps.forEach((el: any) => {
        let top = el.position.y;
        let left = el.position.x;
        maxLeft = left > maxLeft ? left : maxLeft
        minLeft = left < minLeft ? left : minLeft
        maxTop = top > maxTop ? top : maxTop
        minTop = top < minTop ? top : minTop
      })
      nodePoint.left = minLeft
      nodePoint.right = wrapInfo.width - maxLeft - nodeWidth
      nodePoint.top = minTop
      nodePoint.bottom = wrapInfo.height - maxTop - nodeHeight;

      fixTop = nodePoint.top !== nodePoint.bottom ? (nodePoint.bottom - nodePoint.top) / 2 : 0;
      fixLeft = nodePoint.left !== nodePoint.right ? (nodePoint.right - nodePoint.left) / 2 : 0;

      data.value.steps.map((el: any) => {
        let top = el.position.y + fixTop;
        let left = el.position.x + fixLeft;
        el.position.y = (Math.round(top / 20)) * 20;
        el.position.x = (Math.round(left / 20)) * 20;
      })
    }
  },
  //设置步骤
  setflow(d: any) {
    setflowmode.value = d.value;
     fieldSource.value= d.value.fieldStatus;
    console.log(d.value);
    //res.data.forEach((tab: any) => {}
    setflowvisible.value = !setflowvisible.value
  },
  //设置流程属性
  flow() {
    // flowmode.value = nodes.value;

    flowvisible.value = !flowvisible.value
  },
  save(op: String) {
    flowjson.value.lines=data.value.lines;
    http.post("/api/workflow/Save", { json: JSON.stringify(flowjson.value), op: op }, "正在保存").then(res => {
      if (res.success) {
        layer.notifiy({
          title: "温馨提示",
          content: res.msg
        });
      } else {
        layer.notifiy({
          title: "温馨提示",
          content: res.msg
        })
      }

    });
  },
  resetfield(v:any) {
    if (flowjson.value.databases.table == null || flowjson.value.databases.table == "" || flowjson.value.databases.table == undefined) {
      layer.notifiy({
        title: "温馨提示",
        content: "请先在流程基础信息中配置表"
      });
      return;
    }
    http.post("/api/workflow/GetFields", { table: flowjson.value.databases.table }, "请稍等...").then(res => {
      if (res.success) {
        var fields = [];
        //重置表字段
        fieldSource.value=[];
        console.log(res);
        for (var i = 0; i < res.data.length; i++) {
          var o = new Object() as any;
          o.check = "0";
          o.status = "0";
          o.field = res.data[i].f_name.toLowerCase();
          fields.push(o);
          o.value=res.data[i].value;
          fieldSource.value.push(o);
        }
        v.fieldStatus= fields;
        layer.notifiy({
          title: "温馨提示",
          content: res.msg
        });
      } else {
        layer.notifiy({
          title: "温馨提示",
          content: res.msg
        })
      }

    });
  },
  addfom(){
      //加载表单
    http.post("/api/common/GetCommonList", { tab: "SysFormDesign", page: 1, limit: 1000 }).then(res => {
      if (res.success) {
        forms.value = [];
        res.data.forEach((tab: any) => {
          var o = new Object() as any;
          o.label = tab.title;
          o.value = tab.id;
          forms.value.push(o);
        });
      } else {
        layer.msg(res.msg, { icon: 2 });
      }
    }).catch(res => {
      layer.msg("网络错误，请重试", { icon: 2 });
    })
  },
  adddictionary(){

    http.post("/api/form/GetDictionaryByCode", { id: "FlowTypes" }).then(res => {
      if (res.success) {
        flowtype.value = [];

        flowtype.value = utils.TreeTtoList(res.data,[]);
        // res.data.forEach((tab: any) => {
        //   var o = new Object() as any;
        //   o.label = tab.name;
        //   o.value = tab.id;
        //   flowtype.value.push(o);
        // });
        console.log(forms.value)
      } else {
        layer.msg(res.msg, { icon: 2 });
      }
    }).catch(res => {
      layer.msg("网络错误，请重试", { icon: 2 });
    })

  }
}




//流程设置开始
const forms = ref([]) as any;
const flowtype = ref([]) as any;

const setflowmode = ref(null) as any;
const setflowvisible = ref(false);
const submit = () => {

}
const tabcurrent = ref("1");
const flowcurrent = ref("1");
const setflowbtn = [

  {
    text: "确定",
    callback: () => {
      console.log(setflowmode.value.fieldStatus);
      setflowmode.value.fieldStatus=fieldSource.value;
      console.log(setflowmode.value);
      setflowvisible.value = false;
    },
  },
];
//步骤属性
const flowmode = ref(null) as any;
const flowvisible = ref(false);
const flowsubmit = () => {

}
const fieldcolumns= ref([ {title:"字段名称", width:"20%", key:"field"}, {title:"描述", width:"20%", key:"value"},{title:"编辑", width:"10%", customSlot:"eoperator",key:"eoperator" },{title:"只读", width:"10%", customSlot:"doperator",key:"doperator" }]);
const fieldSource=ref([]);
const flowbtn = [
  {
    text: "确定",
    callback: () => {
      flowvisible.value = false;
    },
  },
];
initflow();
</script>

<style lang="less" scoped>
.design {
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.797)
}

.flow_region {
  display: flex;
  width: 99%;
  height: 99%;
  margin: 20px auto;
  border: 1px solid #ccc;

  .nodes-wrap {
    width: 150px;
    height: 100%;
    border-right: 1px solid #ccc;
    background: white;

    .node {
      display: flex;
      height: 40px;
      width: 80%;
      margin: 5px auto;
      border: 1px solid #ccc;
      line-height: 40px;

      &:hover {
        cursor: grab;
      }

      &:active {
        cursor: grabbing;
      }

      .log {
        width: 40px;
        height: 40px;
      }

      .name {
        width: 0;
        flex-grow: 1;
      }
    }
  }

  .flow-wrap {
    height: 100%;
    position: relative;
    overflow: hidden;
    outline: none !important;
    flex-grow: 1;
    background-image: url("../../../assets/point.png");

    #flow {
      position: relative;
      width: 100%;
      height: 100%;

      .auxiliary-line-x {
        position: absolute;
        border: .5px dashed #2ab1e8;
        z-index: 9999;
      }

      .auxiliary-line-y {
        position: absolute;
        border: .5px dashed #2ab1e8;
        z-index: 9999;
      }
    }
  }
}
</style>

<style lang="less">
.jtk-connector.active {
  z-index: 9999;

  path {
    stroke: #150042;
    stroke-width: 1.5;
    animation: ring;
    animation-duration: 3s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    stroke-dasharray: 5;
  }
}

@keyframes ring {
  from {
    stroke-dashoffset: 50;
  }

  to {
    stroke-dashoffset: 0;
  }
}
</style>