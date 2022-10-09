import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { treeToList } from "../../library/treeUtil";
import { useUserStore } from "../../store/user";
import { useAppStore } from "../../store/app";
export function useTab() {
  const userStore = useUserStore();
  const appStore = useAppStore();
  const route = useRoute();
  const router = useRouter();
  const currentPath = computed(() => route.fullPath);
  const menus = computed(() => userStore.menus);
  const change = function (id: string) {
    router.push(id);
    refresh();
  };

  const close = function (id: string) {
    appStore.tabs = appStore.tabs.filter((ele) => ele.id != id);
    var k=appStore.tabs.length-1;
    if(k>0){
      router.push(appStore.tabs[k].id)
    }
  };

  watch(route, function () {
    let bool = false;

    appStore.tabs.forEach((tab) => {
      if (tab.id === route.fullPath) {
        bool = true;

      }
    });
    if (!bool) {
      // @ts-ignore
      var d = treeToList(menus.value);
      // @ts-ignore
      var dd = d.filter((ele) => ele.id == route.fullPath);
      var t = "" as string;
      if (dd.length > 0) {
        t = dd[0].title;
      }
      else {
        t = route.meta.title as string;
      }
      var u=route.fullPath;
      if(route.fullPath!="/login"){

        appStore.tabs.push({title:  t, id:u,closable: true   });
      }

      refresh();
    }
  });
  const refresh = function () {
    appStore.routerAlive = false;
    setTimeout(function () {
      appStore.routerAlive = true;
    }, 500);
  };
  return {
    change, close, currentPath
  }
}