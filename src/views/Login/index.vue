<template>
  <div class="login-wrap">
    <div class="login-root">
      <div class="login-main">
        <img class="login-one-ball"
          src="../../assets/imges/fca1d5960ccf0dfc8e32719d8a1d80d2.png" />
        <img class="login-two-ball"
          src="../../assets/imges/4bcf705dad662b33a4fc24aaa67f6234.png" />
        <div class="login-container">
          <lay-tab type="brief" v-model="method" @change="change">
            <lay-tab-item title="用户名" id="1">
              <lay-form-item :label-width="0">
                <lay-input placeholder="用户名" v-model="loginForm.username"></lay-input>
              </lay-form-item>
              <lay-form-item :label-width="0">
                <lay-input placeholder="密码" password type="password" v-model="loginForm.password"></lay-input>
              </lay-form-item>
              <lay-form-item :label-width="0">
                <lay-input placeholder="验证码" password v-model="loginForm.code" style="width:70%"></lay-input>
                <img :src="codeimg" @click="getnewcode" />
              </lay-form-item>
              <lay-form-item :label-width="0">
                <lay-checkbox name="like" v-model="remember" skin="primary" label="1">记住密码</lay-checkbox>
              </lay-form-item>
              <lay-form-item :label-width="0">
                <lay-button type="primary" fluid="true" @click="loginSubmit">登录</lay-button>
              </lay-form-item>
            </lay-tab-item>
            <lay-tab-item title="二维码" id="2">
              <div class="qrcode"><canvas ref="canvas" /></div>
            </lay-tab-item>
          </lay-tab>
          <lay-line>其他登录方式</lay-line>
          <ul class="other-ways">
            <li>
              <div class="line-container">
                <img class="icon" src="../../assets/login/w.svg" />
                <p class="text">微信</p>
              </div>
            </li>
            <li>
              <div class="line-container">
                <img class="icon" src="../../assets/login/q.svg" />
                <p class="text">钉钉</p>
              </div>
            </li>
            <li>
              <div class="line-container">
                <img class="icon" src="../../assets/login/a.svg" />
                <p class="text">Gitee</p>
              </div>
            </li>
            <li>
              <div class="line-container">
                <img class="icon" src="../../assets/login/f.svg" />
                <p class="text">Github</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import qrcode from 'qrcode'
import { login } from '../../api/module/user';
import { defineComponent, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from '../../store/user';
import { layer } from "@layui/layer-vue";
import CryptoJS from "crypto-js";
// import JSEncrypt from "jsencrypt";
import AES from "crypto-js/aes";
import moment from 'moment';

import http from '../../api/http';
import config from '../../config';

//   setup() {
const router = useRouter();
const userStore = useUserStore();
const ws = ref(null) as any;
const connected = ref(false);
const method = ref("1");
const codeimg = ref("");
const remember = ref(false);
const loginForm = ref({ username: "", password: "", code: "" })
const canvas = ref(null);

var win = window as any;
 const url = ref(config.ws+'/websocket.ws/login/getcode');
const loginSubmit = async () => {
  let logindata = new Object() as any;
  logindata.user = Encrypt(loginForm.value.username);
  logindata.pw = Encrypt(loginForm.value.password);
  logindata.code = Encrypt(loginForm.value.code);
  let layerid = layer.msg("正在登录", { icon: 16, time: 30000, shade: true });
  let resp = await login("/api/login/Login", logindata, "正在登录");
  layer.close(layerid);
  if (resp.success) {
    layer.msg(resp.msg, { icon: 1 }, async () => {
      userStore.userInfo.name = resp.name;
      userStore.token = resp.access_token;
      userStore.userInfo.userid = resp.userid;
      userStore.userInfo.orname = resp.orname;
      userStore.userInfo.orid = resp.orid;
      userStore.userInfo.account = resp.account;
      userStore.userInfo.picture = resp.picture;
      userStore.userInfo.isLogin = resp.isLogin;
      userStore.userInfo.community = resp.community;
      await userStore.loadMenus();
      await userStore.loadPermissions();
      router.push('/');
    })
  } else {
    layer.msg(resp.msg, { icon: 2 });
    getnewcode();
  }
}
const getnewcode = function () {
  console.log(Date.parse(new Date().toString()));
  codeimg.value =config.host+ "/api/login/getCode?v=" + Date.parse(new Date().toString())
}
const Encrypt = function (word: any) {
  let key = "webos" + moment(new Date()).format("YYYYMMDD") + "591"; //十六位十六进制数作为密钥
  var keys = CryptoJS.enc.Utf8.parse(key);
  var srcs = CryptoJS.enc.Utf8.parse(word);
  var encrypted = CryptoJS.AES.encrypt(srcs, keys, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
  return encrypted.toString();
}
const change = (id: any) => {

  if (id == "2") {

    getqrcode(Date.parse(new Date().toString()));
  }

}
const getqrcode = (u: any) => {
  connect();

}
getnewcode();
const connect = () => {
  // 连接服务器

  if (!win.WebSocket) {
    layer.msg('您的浏览器不支持WebSocket', { icon: 2 });
    return console.log('您的浏览器不支持WebSocket');
  }
  if (!connected.value) {

    initi();
  } else {
    send();
  }



}
const send = () => {
  var o = { type: "login" };
  ws.value.send(JSON.stringify(o));
}
const initi = () => {
  ws.value = new WebSocket(url.value);
  // 建立连接
  ws.value.onopen = () => {
    // 发送数据
    connected.value = true;
    heartCheck.start();
    send();
  };
  // 客户端接收服务端返回的数据
  ws.value.onmessage = (evt: any) => {
    var r = JSON.parse(evt.data) as any;
    if (r.type == 'login') {
      http.post("/api/applets/ByOpenId", { openid: r.data }).then(resp => {
        userStore.userInfo.name = resp.data.name;
        userStore.token = resp.token;
        userStore.userInfo.userid = resp.data.userid;
        userStore.userInfo.orname = resp.data.orname;
        userStore.userInfo.orid = resp.data.orid;
        userStore.userInfo.account = resp.data.account;
        userStore.userInfo.picture = resp.data.picture;
        userStore.userInfo.isLogin = resp.data.isLogin;
        userStore.userInfo.community = resp.data.community;
        userStore.loadMenus();

        userStore.loadPermissions();
        router.push('/');
      });
    } else {
      var options = new Object() as any;
      options.with = 500;
      options.height = 500;
      qrcode.toCanvas(canvas.value, r.data, options);
    }

  };
  // 发生错误时
  ws.value.onerror = (evt: any) => {
    layer.msg(evt, { icon: 2 });
    connected.value = false;
    console.log("websocket错误：", evt);
  };
  // 关闭连接
  ws.value.onclose = (evt: any) => {
    layer.msg(evt, { icon: 2 });
    connected.value = false;
    console.log("websocket关闭：", evt);
  };
}

//心跳检测
var heartCheck = {
  timeout: 3000, //每隔三秒发送心跳
  severTimeout: 5000, //服务端超时时间
  timeoutObj: null,
  serverTimeoutObj: null,
  start: function () {

    heartCheck.timeoutObj && clearTimeout(heartCheck.timeoutObj);
    heartCheck.serverTimeoutObj && clearTimeout(heartCheck.serverTimeoutObj);
    heartCheck.timeoutObj = setTimeout(function () {
      //这里发送一个心跳，后端收到后，返回一个心跳消息，
      //onmessage拿到返回的心跳就说明连接正常
      var o = { type: "heartcheck" };
     ws.value.send(JSON.stringify(o));
      //计算答复的超时时间
      heartCheck.serverTimeoutObj = setTimeout(function () {
        ws.close();
      }, heartCheck.severTimeout);
    }, heartCheck.timeout)
  }
} as any
</script>

<style scoped>
.login-one-ball {
  opacity: 0.4;
  position: absolute;
  max-width: 568px;
  left: -400px;
  bottom: 0px;
}

.qrcode {
  text-align: center;
}

.login-two-ball {
  opacity: 0.4;
  position: absolute;
  max-width: 320px;
  right: -200px;
  top: -60px;
}

.login-wrap {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: auto;
  z-index: 9;
  background-image: url(https://assets.codehub.cn/micro-frontend/login/f7eeecbeccefe963298c23b54741d473.png);
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
}

.login-wrap :deep(.layui-input-block) {
  margin-left: 0 !important;
}

.login-root {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  width: 100%;
  min-width: 320px;
  background-color: initial;
}

.login-main {
  position: relative;
  display: block;
}

.logo-container {
  max-width: calc(100vw - 28px);
  margin-bottom: 40px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-container .logo {
  display: inline-block;
  height: 30px;
  width: 143px;
  background: url() no-repeat 50%;
  background-size: contain;
  cursor: pointer;
}

.login-container {
  padding: 30px;
  position: relative;
  overflow: hidden;
  width: 400px;
  max-width: calc(100vw - 28px);
  border: 1.5px solid #fff;
  border-radius: 8px;
  background: hsla(0, 0%, 100%, 0.5);
  backdrop-filter: blur(30px);
}

.login-container .layui-tab-head {
  background: transparent;
}

.login-container .layui-input-wrapper {
  margin-top: 10px;
  margin-bottom: 10px;
}

.login-container .layui-input-wrapper {
  margin-top: 12px;
  margin-bottom: 12px;
}

.login-container .assist {
  margin-top: 5px;
  margin-bottom: 5px;
  letter-spacing: 2px;
}

.login-container .layui-btn {
  margin: 10px 0px 10px 0px;
  letter-spacing: 2px;
  height: 40px;
}

.login-container .layui-line-horizontal {
  letter-spacing: 2px;
  margin-bottom: 34px;
  margin-top: 24px;
}

.other-ways {
  display: flex;
  justify-content: space-between;
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 14px;
  font-weight: 400;
}

.other-ways li {
  width: 100%;
}

.line-container {
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
}

.line-container .icon {
  height: 28px;
  width: 28px;
  margin-right: 0;
  vertical-align: middle;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 2px 0 rgb(9 30 66 / 4%), 0 1px 4px 0 rgb(9 30 66 / 10%), 0 0 1px 0 rgb(9 30 66 / 10%);
}

.line-container .text {
  display: block;
  margin: 12px 0 0;
  font-size: 12px;
  color: #8592a6;
}

:deep(.layui-tab-title .layui-this) {
  background-color: transparent;
}
</style>
