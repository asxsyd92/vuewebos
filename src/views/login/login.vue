<template>
  <div class="login">
    <lay-form :model="validateModel" ref="layFormRef" required>
      <!-- <lay-form-item label="账户" prop="username">
      <lay-input v-model="validateModel.username"></lay-input>
    </lay-form-item>
    <lay-form-item label="密码" prop="password">
      <lay-input v-model="validateModel.password" type="password">></lay-input>
    </lay-form-item>


    <lay-form-item>
      <lay-button @click="validate">登录</lay-button>

    </lay-form-item> -->

      <div class="login">
        <div class="box png">
          <div class="logo png"></div>
          <div class="input">
            <div class="log">
              <div class="name">
                <label>用户名</label>
                <input class="text" v-model="validateModel.username" type="text" />
              </div>
              <div class="pwd">
                <label>密　码</label>
                <input class="text" v-model="validateModel.password" type="password" />
              </div>
              <div class="pwd">
                <label>验证码</label>
                <input type="text" v-model="validateModel.code" class="text" placeholder="请输入验证码" tabindex="1"
                  style="width:40%" /><img :src="codeimg" @click="getnewcode" />
                <div class="check"></div>
                <input type="button" class="submit" @click="validate" value="登录" />

              </div>

              <div class="tip"></div>
            </div>
          </div>

        </div>
        <div class="air-balloon ab-1 png"></div>
        <div class="air-balloon ab-2 png"></div>
        <div class="footer"></div>
      </div>
    </lay-form>
  </div>
</template>

<script>
  import { useUserStore } from "../../store/user";
  import { ref, reactive, onMounted } from 'vue'
  import { useRouter, useRoute } from 'vue-router';
  import { layer } from '@layui/layer-vue'
  import CryptoJS from "crypto-js";
  import JSEncrypt from "jsencrypt";
  import AES from "crypto-js/aes";
  import moment from 'moment';
  import http from "../../utils/http";

  export default {
    setup() {
     const userStore = useUserStore();
      const codeimg = ref("");
      const layFormRef = ref(null);
       const router = useRouter();
      const validateModel = reactive({
        username: "",
        password: "",
        code: ""
      })

      onMounted(() => {
        getnewcode();
      })

      const Encrypt = function (word) {
        let key = "webos" + moment(new Date()).format("YYYYMMDD") + "591"; //十六位十六进制数作为密钥
        var keys = CryptoJS.enc.Utf8.parse(key);
        var srcs = CryptoJS.enc.Utf8.parse(word);
        var encrypted = CryptoJS.AES.encrypt(srcs, keys, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
        return encrypted.toString();
      }
      // 校验
      const validate = function () {
        layFormRef.value.validate((isValidate, data, errors) => {

          console.log(data.code);
          if (data.username.length <= 0) {
            layer.msg("用户名不能为空！", { icon: 2, time: 1000 })
            //layer.tips('用户名不能为空！', '#user');
            return false;
          }
          if (data.password.length <= 0) {
            layer.msg("密码不能为空！", { icon: 2, time: 1000 })
            //layer.tips('密码不能为空！', '#password');
            return false;
          }
          if (data.code.length <= 0) {
            layer.msg("验证码不能为空！", { icon: 2, time: 1000 })
            // layer.tips('验证码不能为空！', '#code');
            return false;
          }

          var user = Encrypt(data.username);
          var password = Encrypt(data.password);
          var code = Encrypt(data.code);
          http.post("/api/login/Login", { user: user, pw: password, code: code }, "正在登陆...").then(res => {
            console.log(res);
            if (res.success) {
              userStore.userInfo.name=res.user;
              userStore.token=res.access_token;
               userStore.userInfo.userid=res.userid;
               userStore.userInfo.orname=res.orname;
               userStore.userInfo.orid=res.orid;
               userStore.userInfo.account=res.account;
               userStore.userInfo.picture=res.picture;
              userStore.userInfo.isLogin=res.isLogin;
    
              router.push('/');
            } else {
              getnewcode();
              layer.msg(res.msg, { icon: 2 });
            }

          }).catch(data => {
                getnewcode();
              layer.msg("网络错误，请重试", { icon: 2 });
          })
        })
        //  var index=  layer.open({
        //     type: 1,
        //     title:"表单提交结果", 
        //     content: `<div style="padding: 10px"><p>是否通过 : ${isValidate}</p> <p>表单数据 : ${JSON.stringify(model)} </p> <p>错误信息 : ${JSON.stringify(errors)}</p></div>`, 
        //     shade: false,
        //     isHtmlFragment: true,
        //     btn : [{ text: '确认', callback() { 
        //       layer.close(index) ;
        //       getnewcode();
        //       }}],
        //     area : '500px'
        //   });
        // });
      }

      // 清除校验
      const clearValidate = function () {
        layFormRef.value.clearValidate();
      }

      // 重置表单
      const reset = function () {
        layFormRef.value.reset();
        validateModel.code = ""
      }
      const getnewcode = function () {
        console.log(Date.parse(new Date()));

        codeimg.value = "/api/login/getCode?v=" + Date.parse(new Date())
      }



      return {
        validateModel,
        layFormRef,
        validate,
        clearValidate,
        reset,
        getnewcode,
        codeimg
      }


    }
  }
</script>
<style>
  @import '../../styles/login/css/main.css';
</style>