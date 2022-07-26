<template>


  <!-- v-click-outside="setNotActive" -->
  <!-- :class="[(isActive || isSelected) ? 'active' : '']" -->
  <div class="node-item" ref="node" :class="[(isActive || isSelected) ? 'active' : '']"
    :style="'top: ' + nodes.position.y + '; left:' + nodes.position.x" @click="setActive" @mouseenter="showAnchor"
    @mouseleave="hideAnchor" @dblclick.prevent="editNode" @contextmenu.prevent="onContextmenu">
    <!-- <div class="log-wrap">
     <img :src="node.logImg" alt="">
    </div> -->
    <div class="name">{{ nodes.name }}</div>
    <!--连线用--//触发连线的区域-->
    <div v-show="mouseEnter">
      <div class="node-anchor anchor-top"></div>
      <div class="node-anchor anchor-right"></div>
      <div class="node-anchor anchor-bottom"></div>
      <div class="node-anchor anchor-left"></div>
    </div>


  </div>
</template>

<script lang="ts" setup>
import { layer } from '@layui/layer-vue'
import { ref, onMounted } from "vue";
const emit = defineEmits(['changeLineState', 'deleteNode',"setflow"])
interface INodeitemProps {
  nodedata: any;
}
const props = withDefaults(defineProps<INodeitemProps>(), {
  nodedata: Object
});

const mouseEnter = ref(true);
const isActive = ref(true);
const isSelected = ref(true);
const nodes = ref(props.nodedata);

//  const flowNodeContainer=ref("top: "+nodes.top+"; left:"+ nodes.left);
onMounted(() => {

  mouseEnter.value = false
});
const showAnchor = () => {
  mouseEnter.value = true;
}
const hideAnchor = () => {

  mouseEnter.value = false
}
const setActive = () => {
  console.log(nodes);
  let win = window as any;
  if (win.event?.ctrlKey) {
    isSelected.value = !isSelected.value;
    return false;
  }
  isActive.value = true;
  isSelected.value = false;
  setTimeout(() => {
    emit("changeLineState", nodes.value.id, true)
  }, 1)
}


const setNotActive = () => {
  console.log('setNotActive');
  let win = window as any;
  if (!win.event.ctrlKey) {
    isSelected.value = false
  }
  if (!isActive.value) {
    return
  }
  emit("changeLineState", nodes.value.id, false)
  isActive.value = false
}
//编辑流程属性
const editNode = () => {
  console.log(nodes);
  emit("setflow", nodes)
}
const deleteNode = () => {
  emit("deleteNode", nodes)
}
const onContextmenu = () => {

}




</script>

<style lang="less" scoped>
@labelColor: #409eff;
@nodeSize: 20px;
@viewSize: 10px;

.node-item {
  position: absolute;
  display: flex;
  height: 40px;
  width: 120px;
  justify-content: center;
  align-items: center;
  border: 1px solid #b7b6b6;
  border-radius: 4px;
  cursor: move;
  box-sizing: content-box;
  z-index: 9995;
  background: white;
  text-align: center;
  &:hover {
    z-index: 9998;

    .delete-btn {
      display: block;
    }
  }

  .log-wrap {
    width: 40px;
    height: 40px;
    border-right: 1px solid #b7b6b6;
  }

  .name {
    flex-grow: 1;
    width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .node-anchor {
    display: flex;
    position: absolute;
    width: @nodeSize;
    height: @nodeSize;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    cursor: crosshair;
    z-index: 9999;
    background: -webkit-radial-gradient(sandybrown 10%, white 30%, #9a54ff 60%);
  }

  .anchor-top {
    top: calc((@nodeSize / 2)*-1);
    left: 50%;
    margin-left: calc((@nodeSize/2)*-1);
  }

  .anchor-right {
    top: 50%;
    right: calc((@nodeSize / 2)*-1);
    margin-top: calc((@nodeSize / 2)*-1);
  }

  .anchor-bottom {
    bottom: calc((@nodeSize / 2)*-1);
    left: 50%;
    margin-left: calc((@nodeSize / 2)*-1);
  }

  .anchor-left {
    top: 50%;
    left: calc((@nodeSize / 2)*-1);
    margin-top: calc((@nodeSize / 2)*-1);
  }
}

.active {
  border: 1px dashed @labelColor;
  box-shadow: 0px 5px 9px 0px rgba(0, 0, 0, 0.5);
  background: white;
  text-align: center;
}
</style>