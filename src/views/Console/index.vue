<template>
  <lay-container fluid="true" style="padding:10px">
  
  <div class="home">
<lay-notice-bar leftIcon="layui-icon-mute" rightIcon="layui-icon-close" text="所有发生过的都是既定的。是应该发生。只能发生。" mode="closeable" background="#ecf5ff"	></lay-notice-bar>
    <div style="padding: 20px; background-color: #F2F2F2;">
      <div class="layui-row layui-col-space15">
        <div class="layui-col-md6">
          <div class="layui-card">
            <div class="layui-card-header">待办事项</div>
            <div class="layui-card-body">
              <iframe frameborder="0" src="https://v.qq.com/txp/iframe/player.html?vid=r0170juydzu" allowFullScreen="true"></iframe>
              <!-- <video src=""></video> -->
            </div>
          </div>
        </div>
        <div class="layui-col-md6">
          <div class="layui-card">
            <div class="layui-card-header">基础雷达图</div>
            <div class="layui-card-body" style="height: 250px">
             
            </div>
          </div>
        </div>
        <div class="layui-col-md12">
          <div class="layui-card">
            <div class="layui-card-header">标题</div>
            <div class="layui-card-body">
             <div id="myEcharts" :style="{ width: '100%', height: '500px' }"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </lay-container>
</template>
<script lang="ts" setup>
import { defineComponent,onMounted,onUnmounted } from "vue";
import * as echarts from "echarts";
import { anyTypeAnnotation } from "@babel/types";

    /// 声明定义一下echart
    let echart = echarts;

    onMounted(() => {
      initChart();
    });

    onUnmounted(() => {
      echart.dispose;
    });
	
    // 基础配置一下Echarts
    const initChart=()=> {
      var documents=window.document as any;
      let chart = echart.init(documents.getElementById("myEcharts"), "dark");
      // 把配置和数据放这里
      chart.setOption({
        xAxis: {
          type: "category",
          data: [
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十一月",
            "十二月"
          ]
        },
        tooltip: {
          trigger: "axis"
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [
              820,
              932,
              901,
              934,
              1290,
              1330,
              1320,
              801,
              102,
              230,
              4321,
              4129
            ],
            type: "line",
            smooth: true
          }
        ]
      });
      window.onresize = function() {
        //自适应大小
        chart.resize();
      };
    }

</script>
