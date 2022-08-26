<template>
<div>


  <div  class="left_boottom_wrap beautify-scroll-def">
  <!-- <svg width="460" height="310" class="dv-border-svg-container"><path fill="transparent" d="
        M 5 20 L 5 10 L 12 3  L 60 3 L 68 10
        L 440 10 L 455 25
        L 455 305 L 20 305
        L 5 290 L 5 20
      " stroke="#6586ec"></path><path fill="transparent" stroke-width="3" stroke-linecap="round" stroke-dasharray="10, 5" d="M 16 9 L 61 9" stroke="#6586ec"></path><path fill="transparent" d="M 5 20 L 5 10 L 12 3  L 60 3 L 68 10" stroke="#2cf7fe"></path><path fill="transparent" d="M 455 280 L 455 305 L 430 305" stroke="#2cf7fe"></path></svg>
  -->
  <vue3-seamless-scroll :list="list" width="450" class="scroll" :step="1">
    <div class="item" v-for="(item, index) in list" :key="index">
      <span>{{ item.title }}</span>
      <span>{{ item.date }}</span>
    </div>
  </vue3-seamless-scroll>
</div>
</div>
</template>
<script>

import { ref, reactive,toRefs } from "vue";
import { Vue3SeamlessScroll } from "vue3-seamless-scroll";
export default {
  name: "index",
  components: {
    Vue3SeamlessScroll,
  },
  setup() {

    const state = reactive({
      list: [
        {
          title: "无缝滚动第一行无缝滚动第一行",
          date: "2017-12-16",
        },
        {
          title: "无缝滚动第二行无缝滚动第二行",
          date: "2017-12-16",
        },
        {
          title: "无缝滚动第三行无缝滚动第三行",
          date: "2017-12-16",
        },
        {
          title: "无缝滚动第四行无缝滚动第四行",
          date: "2017-12-16",
        },
        {
          title: "无缝滚动第五行无缝滚动第五行",
          date: "2017-12-16",
        },
        {
          title: "无缝滚动第六行无缝滚动第六行",
          date: "2017-12-16",
        },
        {
          title: "无缝滚动第七行无缝滚动第七行",
          date: "2017-12-16",
        },
        {
          title: "无缝滚动第八行无缝滚动第八行",
          date: "2017-12-16",
        },
        {
          title: "无缝滚动第九行无缝滚动第九行",
          date: "2017-12-16",
        },
      ],
    });
    return {
      ...toRefs(state),
    };
  },
};
</script>
<style lang='scss' scoped>
.scroll {
  height: 200px;
  width: 500px;
  margin: 0px auto;
  overflow: hidden;
}

.scroll .item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3px 0;
}
</style>