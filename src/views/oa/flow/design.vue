<template>
  <div class="design">
    <lay-button-group>
      <lay-button type="default" size="lg" @click="methods.flow">流程属性</lay-button>
      <lay-button type="default" size="lg">保存</lay-button>
      <lay-button type="default" size="lg">发布</lay-button>
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
                  <lay-form-item label="审签类型：" prop="countersignature">
                    <lay-radio v-model="setflowmode.countersignature" name="countersignature" value="0" label="无签批意见栏">
                    </lay-radio>
                    <lay-radio v-model="setflowmode.countersignature" name="countersignature" value="1"
                      label="有签批意见-无须签章">
                    </lay-radio>
                    <lay-radio v-model="setflowmode.countersignature" name="countersignature" value="2"
                      label="有签批意见-须签章">
                    </lay-radio>
                  </lay-form-item>
                </div>
              </lay-form>
            </lay-tab-item>
            <lay-tab-item title="策略" id="2">
              <div style="padding:20px">策略</div>
            </lay-tab-item>
            <lay-tab-item title="字段" id="3">
              <div style="padding:20px">字段</div>
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
                <lay-input v-model="flowjson.databases[0].link"></lay-input>
              </lay-form-item>

            </div>
            <div class="layui-col-md12">
              <lay-form-item label="连接名称：" prop="linkName">
                <lay-input v-model="flowjson.databases[0].linkName"></lay-input>
              </lay-form-item>

            </div>
            <div class="layui-col-md12">
              <lay-form-item label="主键：" prop="primaryKey">
                <lay-input v-model="flowjson.databases[0].primaryKey"></lay-input>
              </lay-form-item>

            </div>
            <div class="layui-col-md12">
              <lay-form-item label="表：" prop="table">
                <lay-input v-model="flowjson.databases[0].table"></lay-input>
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
  http.post('/api/workflow/GetJSON', { flowid: route.query.id }).then((res) => {
    console.log(res);
    flowjson.value = res;
    flowjson.value.instanceManager = user.userInfo.userid;
    flowjson.value.debugUsers = user.userInfo.userid;
    flowjson.value.manager = user.userInfo.userid;
    let o = new Object() as any;
    o.lines = flowjson.value.lines;
    o.steps = flowjson.value.steps;
    data.value = o;

    methods.fixNodesPosition();
    nextTick(() => {
      methods.init();
    })

  }).catch((res) => {

  });
}

const methods = {
  init() {
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
        console.log(forms.value)
      } else {
        layer.msg(res.msg, { icon: 2 });
      }
    }).catch(res => {
      layer.msg("网络错误，请重试", { icon: 2 });
    })

    //加载流程分类
    http.post("/api/form/GetDictionaryByCode", { id: "FlowTypes" }).then(res => {
      if (res.success) {
        flowtype.value = [];

        flowtype.value = utils.TreeTtoList(res.data);
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
      if (el.id !== nodeId && el.position.x == position[0] + 'px') {
        auxiliaryLinePos.x = position[0] + 60;
        showYLine = true
      }
      if (el.id !== nodeId && el.position.y == position[1] + 'px') {
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
      "forms": [{
        "id": "",
        "name": "",
        "srot": 0,
        "type": ""
      }],
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
        el.position.y = (Math.round(top / 20)) * 20 + 'px'
        el.position.x = (Math.round(left / 20)) * 20 + 'px'
      })
    }
  },
  setflow(nodes: any) {
    setflowmode.value = nodes.value;

    setflowvisible.value = !setflowvisible.value
  },
  flow() {
    // flowmode.value = nodes.value;

    flowvisible.value = !flowvisible.value
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
      setflowvisible.value = false;
    },
  },
];
//流程属性
const flowmode = ref(null) as any;
const flowvisible = ref(false);
const flowsubmit = () => {

}

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