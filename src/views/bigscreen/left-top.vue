
<template>
    <ul class="user_Overview flex" v-if="pageflag">
        <li class="user_Overview-item" style="color: #00fdfa">
            <div class="user_Overview_nums allnum ">
                <!-- <dv-digital-flop :config="config" style="width:100%;height:100%;" /> -->
                <lay-count-up  :startVal="0" :endVal="userOverview.alarmNum" :decimalPlaces="0"></lay-count-up>
            </div>
            <p>总设备数</p>
        </li>
        <li class="user_Overview-item" style="color: #07f7a8">
            <div class="user_Overview_nums online">
          
                    <lay-count-up :startVal="0" :endVal="userOverview.offlineNum" :decimalPlaces="0"></lay-count-up>
            </div>
            <p>在线数</p>
        </li>
        <li class="user_Overview-item" style="color: #e3b337">
            <div class="user_Overview_nums offline">
                <!-- <dv-digital-flop :config="offlineconfig" style="width:100%;height:100%;" /> -->
         
                 
                    <lay-count-up :startVal="0" :endVal="userOverview.onlineNum" :decimalPlaces="0"></lay-count-up>
            </div>
            <p>掉线数</p>
        </li>
        <li class="user_Overview-item" style="color: #f5023d">
            <div class="user_Overview_nums laramnum">
   
                       <lay-count-up :startVal="0" :endVal="userOverview.totalNum" :decimalPlaces="0"></lay-count-up>
           
                <!-- <dv-digital-flop :config="laramnumconfig" style="width:100%;height:100%;" /> -->
            </div>
            <p>告警次数</p>
        </li>
    </ul>
    <!-- <Reacquire v-else @onclick="getData" line-height="200px">
        重新获取
    </Reacquire> -->
</template>

<script lang="ts" setup>
import http from "../../utils/http";
import utils from "../../utils/utils";

import { ref } from 'vue';
let style = {
    fontSize: 24
}


const options = ref(null) as any;
const userOverview = ref({ alarmNum: 0, offlineNum: 0, onlineNum: 0, totalNum: 0, }) as any;
const pageflag = ref(true) as any;
const timer = ref(true) as any;
const config = ref({
    number: [100],
    content: '{nt}',
    style: {
       ...style,
        // stroke: "#00fdfa",
        fill: "#00fdfa",
    },
}) as any;

const onlineconfig = ref({
    number: [4],alarmNum: 0, offlineNum: 0, onlineNum: 0, totalNum: 0,
    content: '{nt}',
    style: {
        ...style,
        // stroke: "#07f7a8",
        fill: "#07f7a8",
    }
}) as any;
   const offlineconfig = ref({
                number: [5],alarmNum: 0, offlineNum: 0, onlineNum: 0, totalNum: 0,
                content: '{nt}',
                style: {
                    ...style,
                    // stroke: "#e3b337",
                    fill: "#e3b337",
                },
            }) as any;
   const  laramnumconfig = ref({number: [6],alarmNum: 0, offlineNum: 0, onlineNum: 0, totalNum: 0,
                content: '{nt}',
                style: {
                    ...style,
                    // stroke: "#f5023d",
                    fill: "#f5023d",
                }}) as any;

          const    switper=()=> {
             setInterval(function(){
           userOverview.value.alarmNum=  utils.random(0,100);
              userOverview.value.offlineNum=  utils.random(0,100);
                 userOverview.value.onlineNum=  utils.random(0,100);
                    userOverview.value.totalNum=  utils.random(0,100);
             }, 5000);
             
        }
        switper();
</script>
<style lang='scss' >
.user_Overview {
    li {
        flex: 1;

        p {
            text-align: center;
            height: 16px;
            font-size: 16px;
        }

        .user_Overview_nums {
            width: 100px;
            height: 100px;
            font-family: digital-7; 
            text-align: center;
            line-height: 100px;
            font-size: 22px;
            margin: 50px auto 30px;
            background-size: cover;
            background-position: center center;
            position: relative;

            &::before {
                content: '';
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
            }

            &.bgdonghua::before {
                animation: rotating 14s linear infinite;
            }
        }

        .allnum {

            // background-image: url("./../../assets/imges/left_top_lan.png");
            &::before {
                background-image: url("./../../assets/imges/left_top_lan.png");

            }
        }

        .online {
            &::before {
                background-image: url("./../../assets/imges/left_top_lv.png");

            }
        }

        .offline {
            &::before {
                background-image: url("./../../assets/imges/left_top_huang.png");

            }
        }

        .laramnum {
            &::before {
                background-image: url("./../../assets/imges/left_top_hong.png");

            }
        }
    }
}
</style>