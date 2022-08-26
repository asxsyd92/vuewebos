
<template>
  <div id="index" ref="appRef" class="index_home" >
    <div class="bg">
    
      <div class="host-body">
        <!-- 头部 s -->
        <div class="d-flex jc-center title_wrap">
          <div class="zuojuxing"></div>
          <div class="youjuxing"></div>
          <div class="guang"></div>
          <div class="d-flex jc-center">
            <div class="title">
              <span class="title-text">Webos可视化监控平台</span>
            </div>
          </div>
          <div class="timers ">
    <span style="font-family: digital-7; color: #4cff00">{{ showtime }}</span>
            <span style="font-family: digital-7; color: #4cff00" class="date"
              >{{ datatime }}
            </span>
          </div>
     
        </div>
        <!-- 头部 e-->
        <!-- 内容  s-->
          <router-view></router-view>
        <!-- 内容 e -->
      </div>
    </div>
    <Setting ref="setting"/>
  </div>
</template>

<script  lang="ts" setup>
import {  ref } from 'vue';


const datatime=ref("");
const showtime=ref("");
    const dateRender = function () {
      try {
        setInterval(function () {
          var da = new Date();
          datatime.value =
            da.getFullYear() + "-" + (da.getMonth() + 1) + "-" + da.getDate();
          showtime.value =
            da.getHours() +
            ":" +
            da.getMinutes() +
            ":" +
            da.getSeconds() +
            " 星期" +
            "日一二三四五六".charAt(da.getDay());
        }, 100);
      } catch (e) {
        console.log(e);
      }
    };
    dateRender();

</script>

<style lang="scss" >
@import  '../../assets/bigscreen/css/public.scss';
@import "../../assets/bigscreen/css/index.scss";
@import "../../assets/bigscreen/css/home.scss";
@import url('@kjgl77/datav-vue3/dist/style.css');

// 内容
.contents {
  .contetn_left,
  .contetn_right {
    width: 540px;
    box-sizing: border-box;
    // padding: 16px 0;
  }

  .contetn_center {
    width: 720px;
  }

  //左右两侧 三个块
  .contetn_lr-item {
    height: 310px;
  }

  .contetn_center_top {
    width: 100%;
  }

  // 中间
  .contetn_center {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .contetn_center-bottom {
    height: 315px;
  }

  //左边 右边 结构一样
  .contetn_left,
  .contetn_right {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    position: relative;

  
  }
}


@keyframes rotating {
    0% {
        -webkit-transform: rotate(0) scale(1);
        transform: rotate(0) scale(1);
    }
    50% {
        -webkit-transform: rotate(180deg) scale(1.1);
        transform: rotate(180deg) scale(1.1);
    }
    100% {
        -webkit-transform: rotate(360deg) scale(1);
        transform: rotate(360deg) scale(1);
    }
}
</style>
