<template>
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
        <flowNode v-for="item in data.nodeList" :id="item.id" :key="item.id" :node="item"
          @setNodeName="methods.setNodeName" @deleteNode="methods.deleteNode"
          @changeLineState="methods.changeLineState"></flowNode>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import flowNode from "../../../components/flow/node-item.vue"
import { ref, onMounted, nextTick, getCurrentInstance } from 'vue';
import panzoom from "panzoom";
import jsPlumb from 'jsPlumb';
import utils from "../../../utils/utils";
import { jsplumbSetting, jsplumbConnectOptions, jsplumbSourceOptions, jsplumbTargetOptions } from '../../../utils/flowconfig'
import { nodeTypeList } from '../../../utils/flowinit';
const $jsPlumbs = jsPlumb.jsPlumb;
var instance = "" as any;
const currentItem = ref(null) as any;

const nodeTypeObj = [] as any;
const data = {
  nodeList: [{ "type": "start", "typeName": "开始", "nodeName": "开始", "id": "34v56ha2l9c000", "top": "160px", "left": "100px" }, { "type": "dataSet", "typeName": "文件", "nodeName": "文件", "id": "5sdjugrcqhc000", "top": "160px", "left": "315px" }, { "type": "encode", "typeName": "加密", "nodeName": "加密", "id": "3atqi5p6oa4000", "top": "80px", "left": "600px" }, { "type": "personService", "typeName": "个人服务", "nodeName": "个人服务", "id": "49vcu89p5q0000", "top": "245px", "left": "600px" }, { "type": "arrange", "typeName": "清洗", "nodeName": "清洗", "id": "1jhiilb0t2tc00", "top": "180px", "left": "880px" }, { "type": "end", "typeName": "结束", "nodeName": "结束", "id": "1ogr3wzy6zhc00", "top": "180px", "left": "1160px" }],
  lineList: [{ "from": "34v56ha2l9c000", "to": "5sdjugrcqhc000", "label": "连线名称", "id": "5n6pp5xqd6s000", "Remark": "" }, { "from": "5sdjugrcqhc000", "to": "3atqi5p6oa4000", "label": "连线名称", "id": "2a0ya9j1kev400", "Remark": "" }, { "from": "5sdjugrcqhc000", "to": "49vcu89p5q0000", "label": "连线名称", "id": "zoisvo5gpvk00", "Remark": "" }, { "from": "3atqi5p6oa4000", "to": "1jhiilb0t2tc00", "label": "连线名称", "id": "4xkb3dju1g0000", "Remark": "" }, { "from": "49vcu89p5q0000", "to": "1jhiilb0t2tc00", "label": "连线名称", "id": "ldc917l47w000", "Remark": "" }, { "from": "1jhiilb0t2tc00", "to": "1ogr3wzy6zhc00", "label": "连线名称", "id": "478galw3u34000", "Remark": "" }]
}
const selectedList = null;

const currentInstance = getCurrentInstance() as any;
const auxiliaryLine = { isShowXLine: false, isShowYLine: false };
const auxiliaryLinePos = { width: '100%', height: '100%', offsetX: 0, offsetY: 0, x: 20, y: 20 };
const commonGrid = [5, 5] as any;
const selectModuleFlag = false;
const rectAngle = { px: '', py: '', left: 0, top: 0, height: 0, width: 0 };
const initNodeTypeObj = () => {
  nodeTypeList.map((v: any) => {
    nodeTypeObj[v.type] = v
  })
}
const initNode = () => {
  data.lineList = data.lineList
  data.nodeList.map((v: any) => {
    v.logImg = nodeTypeObj[v.type].logImg
    v.log_bg_color = nodeTypeObj[v.type].log_bg_color
    data.nodeList.push(v)
  })
}
onMounted(() => {

  initNodeTypeObj();
  initNode();
  methods.fixNodesPosition();
  nextTick(() => {
    //console.log( currentInstance?.refs);
    methods.init();
  })
});
const methods = {
  init() {

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
      instance.bind("dblclick", (conn:any, originalEvent:any) => {
        methods.confirmDelLine(conn)
      })
      //断开连线后，维护本地数据
      instance.bind("connectionDetached", (evt:any) => {
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
    for (let i = 0; i < data.nodeList.length; i++) {
      let node = data.nodeList[i];
      // 设置源点，可以拖出线连接其他节点
      instance.makeSource(node.id, jsplumbSourceOptions);
      // // 设置目标点，其他源点拖出的线可以连接该节点
      instance.makeTarget(node.id, jsplumbTargetOptions);
      //instance.draggable(node.id);
      methods.draggableNode(node.id)
    }

    // 初始化连线
    instance.unbind("connection"); //取消连接事件
    for (let i = 0; i < data.lineList.length; i++) {
      let line = data.lineList[i];
      instance.connect(
        {
          source: line.from,
          target: line.to
        },
        jsplumbConnectOptions
      );
    }
    instance.bind("connection", (evt:any) => {
      let from = evt.source.id;
      let to = evt.target.id;
      data.lineList.push({
        from: from,
        to: to,
        label: "连线名称",
        id: utils.GenNonDuplicateID(8),
        Remark: ""
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
    data.nodeList.some((el : any)=> {
      if (el.id !== nodeId && el.left == position[0] + 'px') {
        auxiliaryLinePos.x = position[0] + 60;
        showYLine = true
      }
      if (el.id !== nodeId && el.top == position[1] + 'px') {
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
    data.nodeList.some(v => {
      if (nodeId == v.id) {
        v.left = pos[0] + 'px'
        v.top = pos[1] + 'px'
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
    // console.log(PlumbsInstance);
    const containerRect = instance.getContainer().getBoundingClientRect();
    const scale = methods.getScale();
    let left = (event.pageX - containerRect.left - 60) / scale;
    let top = (event.pageY - containerRect.top - 20) / scale;

    var temp = {
      ...currentItem.value,
      id: utils.GenNonDuplicateID(8),
      top: (Math.round(top / 20)) * 20 + "px",
      left: (Math.round(left / 20)) * 20 + "px"
    };
    methods.addNode(temp);
  },
  addLine(line: any) {
    let from = line.source.id;
    let to = line.target.id;
    data.lineList.push({
      from: from,
      to: to,
      label: "连线名称",
      id: utils.GenNonDuplicateID(8),
      Remark: ""
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
    data.lineList.forEach((item: any, index: any) => {
      if (item.from === line.sourceId && item.to === line.targetId) {
        data.lineList.splice(index, 1)
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
    data.nodeList.push(temp);
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
      pan.on("zoom", (e:any) => {
        const { x, y, scale } = e.getTransform();
        instance.setZoom(scale);
        //根据缩放比例，缩放对齐辅助线长度和位置
        auxiliaryLinePos.width = (1 / scale) * 100 + '%'
        auxiliaryLinePos.height = (1 / scale) * 100 + '%'
        auxiliaryLinePos.offsetX = -(x / scale)
        auxiliaryLinePos.offsetY = -(y / scale)
      });
      pan.on("panend", (e:any) => {
        const { x, y, scale } = e.getTransform();
        auxiliaryLinePos.width = (1 / scale) * 100 + '%'
        auxiliaryLinePos.height = (1 / scale) * 100 + '%'
        auxiliaryLinePos.offsetX = -(x / scale)
        auxiliaryLinePos.offsetY = -(y / scale)
      })

      // 平移时设置鼠标样式
      mainContainerWrap.style.cursor = "grab";
      mainContainerWrap.addEventListener("mousedown", function wrapMousedown(_this: any) {
        mainContainerWrap.style.cursor = "grabbing";

        mainContainerWrap.addEventListener("mouseout", function wrapMouseout(_this: any) {
          mainContainerWrap.style.cursor = "grab";
          console.log(mainContainerWrap);
        });
      });
      mainContainerWrap.addEventListener("mouseup", function wrapMouseup(_this: any) {
        mainContainerWrap.style.cursor = "grab";
        console.log(mainContainerWrap);
      });
    }

  },

  setNodeName(nodeId: any, name: any) {
    data.nodeList.some((v) => {
      if (v.id === nodeId) {
        v.nodeName = name
        return true
      } else {
        return false
      }
    })
  },

  //删除节点
  deleteNode(node: any) {
    data.nodeList.some((v, index) => {
      if (v.id === node.id) {
        debugger;
        data.nodeList.splice(index, 1)
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
    if (data.nodeList && currentInstance.refs.flowWrap) {
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
      data.nodeList.forEach(el => {
        let top = Number(el.top.substring(0, el.top.length - 2))
        let left = Number(el.left.substring(0, el.left.length - 2))
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

      data.nodeList.map((el: any) => {
        let top = Number(el.top.substring(0, el.top.length - 2)) + fixTop;
        let left = Number(el.left.substring(0, el.left.length - 2)) + fixLeft;
        el.top = (Math.round(top / 20)) * 20 + 'px'
        el.left = (Math.round(left / 20)) * 20 + 'px'
      })
    }
  },
}





</script>

<style lang="less" scoped>
.flow_region {
  display: flex;
  width: 90%;
  height: 90%;
  margin: 20px auto;
  border: 1px solid #ccc;

  .nodes-wrap {
    width: 150px;
    height: 100%;
    border-right: 1px solid #ccc;

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