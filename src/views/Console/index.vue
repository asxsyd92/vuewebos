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
import { defineComponent } from "vue";
 import chartlint from '@/components/chart/chartlint.vue'
export default defineComponent({
  setup() {

    return {

    };
  },
});
</script>
