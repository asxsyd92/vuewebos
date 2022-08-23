
<template>
  <div ref="echartsid" id="echartsid"  :style="{ height: 120, width: 121 }" />
</template>

<script lang="ts" setup>
import * as echarts from "echarts";
  import { ref, reactive, onMounted } from "vue";
import tdTheme from './theme.json' // 引入默认主题
interface IechartProps {
  options: any,echarts: any
}
const props = withDefaults(defineProps<IechartProps>(), {
  options:Object
});
           const chart = ref(new Object()) as any;
const options = ref(props.options);

onMounted(()=>{
    setTimeout(()=>{
    let newpomise= new Promise<void>((resolve, reject) => {
        resolve();
    });
    newpomise.then(()=>{
     var documents=window.document as any;
 
  chart.value = echarts.init(documents.getElementById('bottomLeftChart'))
console.log(chart.value);
     chart.value.setOption(options.value, true)
    })

    },5000)

 
             
})
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
