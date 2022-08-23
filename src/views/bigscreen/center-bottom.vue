<template>
  <div class="center_bottom">
    <Echart :options="options" id="bottomLeftChart" :echarts="echarts" class="echarts_bottom"></Echart>
  </div>
</template>

<script lang="ts" setup>
import * as echarts from "echarts";
import http from "../../utils/http";
import Echart from "../../components/echart/Echart.vue";
import { ref } from 'vue';
const newData=ref({"category":["绵阳市","克孜勒苏柯尔克孜自治州","阜阳市","陇南市","承德市","邯郸市","崇左市","舟山市","三亚市","绥化市","黑河市","克拉玛依市","许昌市","丽江市","湖州市","淮安市","营口市","阿克苏地区","忻州市","澳门半岛","阿勒泰地区","朔州市","天津市","三亚市","重庆市","抚州市","三门峡市","离岛","日喀则地区","彰化县"],"barData":[92,81,67,89,20,70,31,69,93,79,54,31,22,87,61,36,43,65,26,30,58,40,20,87,50,87,65,75,33,27],"lineData":[150,120,99,132,35,77,94,120,109,178,100,69,108,106,156,64,68,90,92,38,85,102,39,124,68,161,141,164,41,79],"rateData":["61","68","68","67","57","91","33","57","85","44","54","45","20","82","39","56","63","72","28","79","68","39","51","70","74","54","46","46","80","34"]}) as
 any;
const options=ref(null) as any;
const getData=()=>{


      options.value = {
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(0,0,0,.6)",
          borderColor: "rgba(147, 235, 248, .8)",
          textStyle: {
            color: "#FFF",
          },
          formatter: function (params:any) {
              // 添加单位
              console.log(params);
                var result = params[0].name + "<br>";
                params.forEach(function (item:any) {
                    if (item.value) {
                      if(item.seriesName=="安装率"){
                        result += item.marker + " " + item.seriesName + " : " + item.value + "%</br>";
                      }else{
                        result += item.marker + " " + item.seriesName + " : " + item.value + "个</br>";
                      }
                    } else {
                        result += item.marker + " " + item.seriesName + " :  - </br>";
                    }
                });
                return result;
              }
        },
        legend: {
          data: ["已安装", "计划安装", "安装率"],
          textStyle: {
            color: "#B4B4B4"
          },
          top: "0"
        },
        grid: {
          left: "50px",
          right: "40px",
          bottom: "30px",
          top: "20px",
        },
        xAxis: {
          data: newData.value.category,
          axisLine: {
            lineStyle: {
              color: "#B4B4B4"
            }
          },
          axisTick: {
            show: false
          }
        },
        yAxis: [
          {
            splitLine: { show: false },
            axisLine: {
              lineStyle: {
                color: "#B4B4B4"
              }
            },

            axisLabel: {
              formatter: "{value}"
            }
          },
          {
            splitLine: { show: false },
            axisLine: {
              lineStyle: {
                color: "#B4B4B4"
              }
            },
            axisLabel: {
              formatter: "{value}% "
            }
          }
        ],
        series: [
          
          {
            name: "已安装",
            type: "bar",
            barWidth: 10,
            itemStyle: {
              normal: {
                barBorderRadius: 5,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#956FD4" },
                  { offset: 1, color: "#3EACE5" }
                ])
              }
            },
            data: newData.barData
          },
          {
            name: "计划安装",
            type: "bar",
            barGap: "-100%",
            barWidth: 10,
            itemStyle: {
              normal: {
                barBorderRadius: 5,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "rgba(156,107,211,0.8)" },
                  { offset: 0.2, color: "rgba(156,107,211,0.5)" },
                  { offset: 1, color: "rgba(156,107,211,0.2)" }
                ])
              }
            },
            z: -12,
            data: newData.value.lineData
          },
          {
            name: "安装率",
            type: "line",
            smooth: true,
            showAllSymbol: true,
            symbol: "emptyCircle",
            symbolSize: 8,
            yAxisIndex: 1,
            itemStyle: {
              normal: {
                color: "#F02FC2"
              }
            },
            data: newData.value.rateData
          },
        ]
      }
}
getData();
</script>
<style lang="scss" >
.center_bottom {
  width: 100%;
  height: 100%;

  .echarts_bottom {
    width: 100%;
    height: 100%;
  }
}
</style>