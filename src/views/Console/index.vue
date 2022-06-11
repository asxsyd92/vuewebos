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
              <table id="mainwait" ></table>
            </div>
          </div>
        </div>
        <div class="layui-col-md6">
          <div class="layui-card">
            <div class="layui-card-header">基础雷达图</div>
            <div class="layui-card-body" style="height: 250px">
              <chartlint ref="chart_line_one" />
            </div>
          </div>
        </div>
        <div class="layui-col-md12">
          <div class="layui-card">
            <div class="layui-card-header">标题</div>
            <div class="layui-card-body">
              <div id="container3" style="height: 250px"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </lay-container>
</template>
<script lang="ts">
  import chartlint from '../../components/chart/chartlint.vue'
  export default {
    name: 'Home',
    data() {
      return {
        table: new Object(),
        name: '张雪',
        xData: ['2020-02', '2020-03', '2020-04', '2020-05'],
        yData: [30, 132, 80, 134],
      }
    },
  // watch: {
  //           '$route'(to, from) { //监听路由是否变化
  //               console.log(this);
  //               if (to.fullPath.indexOf("/") > -1) {
  //                   this.getwait();
  //               }

  //           }
  //       },
    components: {
      chartlint
    }, mounted() {
      // this.getwait();
      // this.chuli();
      // const { name, xData, yData } = this
      // console.log(this.$refs)
      // this.$refs.chart_line_one.initChart(name, xData, yData)
    }
    , methods: {
      getwait() {
        // var m = this;
        // m.table = layui.table;
        // m.table.render({
        //   elem: '#mainwait'
        //   , height: 'full'
        //     ,method:"post"
        //   , headers: { "Authorization": "bearer " + window.localStorage["_token"] }
        //   , url: m.host + '/api/workflowtasks/WaitList?limit=5' //数据接口
        //   , cols: [[

        //     { field: 'title', title: '名称' },
        //     { field: 'sendername', title: '发送人' }
        //     , { field: 'stepname', title: '步骤名称' }
        //     , { fixed: 'right', title: '操作', toolbar: '#barhome' }
        //   ]]
        // });

      }, chuli() {
        // var m=this;
        // m.table.on('tool(mainwait)', function (obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
        //   var data = obj.data; //获得当前行数据
        //   var layEvent = obj.event; //获得 lay-event 对应的值
        //   var tr = obj.tr; //获得当前行 tr 的DOM对象
        //   var ids = '';   //选中的Id
        //   layui.$(data).each(function (index, item) {
        //     ids += item.id + ',';
        //   });
        //    if (layEvent === 'edit') { //编辑
        //     console.log("edit");
        //     if (!data.id) return;
        //     // m.$taber.open({  name:'wait', params: {    key:data.id   }});
        //     var query = new Object();
        //     query.instanceid = data.instanceid;
        //     query.taskid = data.id;
        //     query.groupid = data.groupid;
        //     query.flowid = data.flowid;
        //     query.stepid = data.stepid;

        //     m.$router.push({ path: "/oa/workflowrun/run", query: query })
        //   }


        // });
      }
    }
  }
</script>
