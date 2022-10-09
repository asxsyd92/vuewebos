
<template>
<div>

    <div ref="maps" id="maps" :class="className" :style="{ width: '100%', height: '500px' }"/>

     </div>
</template>

<script lang="ts" setup>
import http from "../../api/http";
  import { ref, reactive, onMounted } from "vue";
import * as echarts from "echarts";
import tdTheme from './theme.json' // 引入默认主题
interface IMapProps {
  data: any
}
const props = withDefaults(defineProps<IMapProps>(), {
  data:Object
});

const data = ref(props.data);
console.log(data);

        const className = ref("");
       const mapid =ref(null) as  any;
        //let chart = echarts.init(document.getElementById("id"));
        const id = ref("");
  
            const chart = ref(new Object()) as any;
        const width = ref("");
        const height = ref("");
        const options = ref({});
        echarts.registerTheme('tdTheme', tdTheme); // 覆盖默认主题
       
    onMounted(()=>{

          let mapjson = echarts.getMap('china');
      if (!mapjson) {
          http.get('/mapjson/china.json').then((res: any) => {
            echarts.registerMap("china", res);
             var documents=window.document as any;
   
               chart.value = echarts.init(documents.getElementById('maps'))
                chart.value.setOption(
                  {"backgroundColor":"rgba(0,0,0,0)","tooltip":{"show":false},"legend":{"show":false},"visualMap":{"left":20,"bottom":20,"pieces":[{"gte":1000,"label":"1000个以上"},{"gte":600,"lte":999,"label":"600-999个"},{"gte":200,"lte":599,"label":"200-599个"},{"gte":50,"lte":199,"label":"49-199个"},{"gte":10,"lte":49,"label":"10-49个"},{"lte":9,"label":"1-9个"}],"inRange":{"color":["#c3d7df","#5cb3cc","#8abcd1","#66a9c9","#2f90b9","#1781b5"]},"textStyle":{"color":"#fff"}},"geo":{"map":"china","roam":false,"selectedMode":false,"zoom":1.42,"top":140,"aspectScale":0.78,"tooltip":{"show":false},"label":{"show":false},"itemStyle":{"areaColor":"rgba(0,0,0,0)","borderColor":"rgba(0,0,0,0)"},"emphasis":{"disabled":true}},"series":[{"name":"MAP","type":"map","mapType":"china","aspectScale":0.78,"data":[{"name":"海南省","value":268},{"name":"广东省","value":143},{"name":"湖南省","value":37},{"name":"宁夏回族自治区","value":608},{"name":"贵州省","value":54},{"name":"河南省","value":460},{"name":"青海省","value":110},{"name":"辽宁省","value":865}],"selectedMode":false,"zoom":1.42,"geoIndex":1,"top":140,"tooltip":{"show":true,"backgroundColor":"rgba(0,0,0,.6)","borderColor":"rgba(147, 235, 248, .8)","textStyle":{"color":"#FFF"}},"label":{"show":false,"color":"#000","rich":{},"emphasis":{"show":false}},"itemStyle":{"borderColor":"rgba(147, 235, 248, .8)","borderWidth":1,"areaColor":{"type":"radial","x":0.5,"y":0.5,"r":0.8,"colorStops":[{"offset":0,"color":"rgba(147, 235, 248, 0)"},{"offset":1,"color":"rgba(147, 235, 248, .2)"}],"globalCoord":false},"shadowColor":"rgba(128, 217, 248, .3)","shadowOffsetX":-2,"shadowOffsetY":2,"shadowBlur":10,"emphasis":{"areaColor":"#389BB7","borderWidth":1}}},{"data":[{"name":"海南省","value":[109.754859,19.189767,268]},{"name":"广东省","value":[113.429919,23.334643,143]},{"name":"湖南省","value":[111.711649,27.629216,37]},{"name":"宁夏回族自治区","value":[106.169866,37.291332,608]},{"name":"贵州省","value":[106.880455,26.826368,54]},{"name":"河南省","value":[113.619717,33.902648,460]},{"name":"青海省","value":[96.043533,35.726403,110]},{"name":"辽宁省","value":[122.604994,41.299712,865]}],"type":"effectScatter","coordinateSystem":"geo","legendHoverLink":true,"showEffectOn":"render","rippleEffect":{"scale":6,"color":"rgba(255,255,255, 1)","brushType":"fill"},"tooltip":{"show":true,"backgroundColor":"rgba(0,0,0,.6)","borderColor":"rgba(147, 235, 248, .8)","textStyle":{"color":"#FFF"}},"label":{"fontSize":11,"offset":[0,2],"position":"bottom","textBorderColor":"#fff","textShadowColor":"#000","textShadowBlur":10,"textBorderWidth":0,"color":"#FFF","show":true},"itemStyle":{"color":"rgba(255,255,255,1)","borderColor":"rgba(2255,255,255,2)","borderWidth":4,"shadowColor":"#000","shadowBlur":10}}]})
          }).catch((res:any)=>{});

      }

    
 
    })

  
//          setup(props) {
//               props: {
//     className: {
//       type: String,
//       default: 'chart'
//     },
//     id: {
//       type: String,
//       default: 'chart'
//     },
//     width: {
//       type: String,
//       default: '100%'
//     },
//     height: {
//       type: String,
//       default: '100%'
//     },
//     options: {
//       type: Object,
//       default: ()=>({})
//     }
//   }


// export default {
//   name: 'echart',
//   props: {
//     className: {
//       type: String,
//       default: 'chart'
//     },
//     id: {
//       type: String,
//       default: 'chart'
//     },
//     width: {
//       type: String,
//       default: '100%'
//     },
//     height: {
//       type: String,
//       default: '100%'
//     },
//     options: {
//       type: Object,
//       default: ()=>({})
//     }
//   },
//   data () {
//     return {
//       chart: null
//     }
//   },
//   watch: {
//     options: {
//       handler (options) {
//         // 设置true清空echart缓存
//         this.chart.setOption(options, true)
//       },
//       deep: true
//     }
//   },
//   mounted () {
//     // echarts.registerTheme('tdTheme', tdTheme); // 覆盖默认主题
//     this.initChart();
//   },
//   beforeDestroy () {
//     this.chart.dispose()
//     this.chart = null
//   },
//   methods: {
//     initChart () {
//       // 初始化echart
//       this.chart = echarts.init(this.$el, 'tdTheme')
//       this.chart.setOption(this.options, true)
//     }
//   }
// }
</script>

<style>
</style>
