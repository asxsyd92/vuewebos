<template>
  <lay-fullscreen
    v-slot="{ enter, exit, toggle, isFullscreen }"
    @fullscreenchange="fullscreen"
  >
    <lay-config-provider :themeVariable="appStore.themeVariable" :theme="appStore.theme">
      <!-- header -->
      <lay-header>
        <lay-menu class="layui-layout-left">
          <lay-menu-item @click="collapse">
            <lay-icon v-if="collapseState" type="layui-icon-spread-left"></lay-icon>
            <lay-icon v-else type="layui-icon-shrink-right"></lay-icon>
          </lay-menu-item>
          <lay-menu-item @click="refresh">
            <lay-icon type="layui-icon-refresh-one"></lay-icon>
          </lay-menu-item>
        </lay-menu>

        <lay-menu class="layui-layout-right">
          <li class="layui-nav-item">
            <span style="font-family: digital-7; color: #4cff00">{{ showtime }}</span>
            <span style="font-family: digital-7; color: #4cff00" class="date"
              >{{ datatime }}
            </span>
          </li>
          <li class="layui-nav-item">
            <a href="javascript:void(0)">
              <lay-switch
                class="switch"
                v-model="appStore.theme"
                onswitch-value="dark"
                unswitch-value="light"
                onswitch-color="rgba(255, 255, 255, 0.05)"
                unswitch-color="rgba(255, 255, 255, 0.05)"
              >
                <template #onswitch-icon>
                  <light-icon></light-icon>
                </template>
                <template #unswitch-icon>
                  <dark-icon></dark-icon>
                </template>
              </lay-switch>
            </a>
          </li>
          <!-- <lay-dropdown>
              <lay-menu-item>
                <lay-icon type="layui-icon-notice"></lay-icon>
              </lay-menu-item>
              <template #content> 内容 </template>
            </lay-dropdown> -->
          <lay-dropdown>
            <lay-menu-item>
              <lay-icon type="layui-icon-username"></lay-icon>
            </lay-menu-item>
            <template #content>
              <lay-dropdown-menu>
                <lay-dropdown-menu-item>用户信息</lay-dropdown-menu-item>
                <lay-dropdown-menu-item v-if="isFullscreen == false" @click="enter()"
                  >进入全屏</lay-dropdown-menu-item
                >
                <lay-dropdown-menu-item v-else @click="exit()"
                  >退出全屏</lay-dropdown-menu-item
                >
                <lay-dropdown-menu-item @click="mima()">密码修改</lay-dropdown-menu-item>
                <lay-dropdown-menu-item @click="loginexit()"
                  >注销登录</lay-dropdown-menu-item
                >
                  <lay-dropdown-menu-item @click="big"
                  >大平监控</lay-dropdown-menu-item
                >
              </lay-dropdown-menu>
            </template>
          </lay-dropdown>
          <div style="position: relative; display: inline-block">
            <lay-menu-item @click="changeVisible">
              <lay-icon type="layui-icon-more-vertical"></lay-icon>
            </lay-menu-item>
          </div>
        </lay-menu>
      </lay-header>
      <lay-layout :class="[collapseState ? 'collapse' : '']">
        <!-- side -->
        <lay-side :width="sideWidth">
          <lay-scroll style="height: 100%">
            <GlobalMenu :collapse="collapseState"></GlobalMenu>
          </lay-scroll>
        </lay-side>
        <lay-layout>
          <!-- content -->
          <lay-body>
            <GlobalTab></GlobalTab>
            <GlobalContent></GlobalContent>
          </lay-body>
          <lay-footer></lay-footer>
        </lay-layout>
      </lay-layout>
      <GlobalSetup v-model="visible"></GlobalSetup>
    </lay-config-provider>
    <lay-layer
      title="密码修改"
      v-model="mmvisible"
      move="true"
      :btn="mmbtn"
      :closeBtn="false"
      :area="['50%', '35%']"
      :shadeClose="false"
      @submit="submit"
    >
      <lay-form :model="mmmodel" ref="layFormRef1" style="width: 99%">
        <lay-form-item label="原密码" prop="oldpassword">
          <lay-input v-model="mmmodel.oldpassword" type="password"></lay-input>
        </lay-form-item>
        <lay-form-item label="新密码" prop="newpassword">
          <lay-input v-model="mmmodel.newpassword" type="password"></lay-input>
        </lay-form-item>
        <lay-form-item label="确认密码" prop="conpassword">
          <lay-input v-model="mmmodel.conpassword" type="password"></lay-input>
        </lay-form-item>
      </lay-form>
    </lay-layer>
  </lay-fullscreen>
</template>
<script>
import { ref, onMounted } from "vue";
import DarkIcon from "../components/darkIcon.vue";
import LightIcon from "../components/lightIcon.vue";
import { useAppStore } from "../store/app";
import GlobalSetup from "./Global/GlobalSetup.vue";
import GlobalContent from "./Global/GlobalContent.vue";
import GlobalTab from "./Global/GlobalTab.vue";
import GlobalMenu from "./Global/GlobalMenu.vue";
import { layer } from "@layui/layer-vue";
import { useRoute, useRouter } from "vue-router";
import http from "../utils/http";

export default {
  components: {
    GlobalSetup,
    GlobalContent,
    GlobalTab,
    GlobalMenu,
    DarkIcon,
    LightIcon,
  },
  setup() {
    const mmmodel = {
      oldpassword: "",
      newpassword: "",
      conpassword: "",
    };
    const rules = ref({
      newpassword: {
        validator(rule, value, callback, source, options) {
          if (value.length < 1) {
            callback(new Error(`${rule.field}太过于年轻`));
          } else {
            return true;
          }
        },
      },
      conpassword: {
        validator(rule, value, callback, source, options) {
          if (value.length < 1) {
            callback(new Error(`${rule.field}太过于年轻`));
          } else {
            return true;
          }
        },
      },
    });
    const visible = ref(false);
    const mmvisible = ref(false);
    const router = useRouter();
    const appStore = useAppStore();
    const collapseState = ref(false);
    const sideWidth = ref("230px");
    const showtime = ref("");
    const datatime = ref("");
    const layFormRef1 = ref(null);
    const mmbtn = [
      {
        text: "确认",
        callback: (e) => {
          submit();
        },
      },
      {
        text: "取消",
        callback: () => {
          mmvisible.value = false;
        },
      },
    ];
    const submit = () => {
      layFormRef1.value.validate((isValidate, model, errors) => {
        if (model.oldpassword.length <= 0) {
          layer.msg("原密码不能为空", { icon: 2, time: 1000 });
          return false;
        }
        if (model.newpassword.length <= 0) {
          //tips层-左
          layer.msg("新密码不能为空", { icon: 2, time: 1000 });

          return false;
        }
        if (model.newpassword !== model.conpassword || model.conpassword == "") {
          //tips层-左
          layer.msg("两次密码不一致", { icon: 2, time: 1000 });

          return false;
        }

        http
          .post(
            "/api/users/EditPw",
            { old: model.oldpassword, pw: model.conpassword },
            "请稍等"
          )
          .then((res) => {
            console.log(res);
            if (res.success === true) {
              mmvisible.value = false;
              layer.msg(res.msg, { icon: 1, time: 1000 });
              localStorage.clear();
              appStore.tabs.value = [{ title: "首页", id: "/console", closable: false }];

              window.location = "/login";
            } else {
              layer.msg(res.msg, { icon: 2, time: 1000 });
              return false;
            }
          })
          .catch((resp) => {
            layer.msg("网络错误", { icon: 2, time: 1000 });
          });

        return false;
        console.log(model);
      });
    };
    const changeVisible = function () {
      visible.value = !visible.value;
    };
    const fullscreen = function (isFullscreen) {
      console.log(isFullscreen);
    };
    // 侧边状态
    const collapse = function () {
      collapseState.value = !collapseState.value;
      sideWidth.value = collapseState.value ? "60px" : "230px";
    };
    const mima = () => {
      mmvisible.value = !mmvisible.visible;
    };
    const loginexit = () => {
      var inex = layer.confirm("你真的要退出登录吗？", {
        btn: [
          {
            text: "退出",
            callback: () => {
              localStorage.clear();
              appStore.tabs.value = [{ title: "首页", id: "/console", closable: false }];
              layer.close(inex);
              window.location = "/login";
            },
          },
          {
            text: "取消",
            callback: () => {
              layer.close(inex);
            },
          },
        ],
      });
    };
    // 路由刷新
    const refresh = function () {
      appStore.routerAlive = false;
      setTimeout(function () {
        appStore.routerAlive = true;
      }, 500);
    };
    const close = function (path) {
      appStore.tabs = appStore.tabs.filter((ele) => ele.id != path);
      var i = appStore.tabs.length - 1;
      if (i > 0) {
        var id = appStore.tabs[i].id;
        router.push(id);
      }
    };
    onMounted(() => {
      dateRender();
    });
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
    const big=()=>{
      window.open("/bigscreen", "_blank");
    }
    // return instance
    return {
      sideWidth,
      changeVisible,
      collapseState,
      collapse,
      appStore,
      refresh,
      visible,
      showtime,
      datatime,
      dateRender,
      fullscreen,
      mima,
      loginexit,
      mmbtn,
      visible,
      mmvisible,
      mmmodel,
      rules,
      layFormRef1,
      submit,big
    };
  },
};
</script>

<style>
.layui-layout .layui-header .layui-form-switch {
  border: 1px solid rgba(60, 60, 60, 0.29);
  background-color: #f1f1f1 !important;
  margin-top: -8px;
}
.layui-layout .layui-header .layui-form-switch svg {
  position: absolute;
  width: 12px;
  height: 12px;
  top: 3px;
  left: 3px;
}
</style>
