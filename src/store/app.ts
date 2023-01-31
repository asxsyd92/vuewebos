import { defineStore } from 'pinia'

export const useAppStore = defineStore({
  id: 'app',
  state: () => {
    return {
      tab: true,
      isgrey:false,
      tabs:[{ title: "工作台", id: "/workspace/workbench", closable: false }],
      logo: true,
      level: true,
      inverted: false,
      routerAlive: true,
      collapse: false,
      theme: 'light',
      breadcrumb: true,
      sideTheme: 'light',
      greyMode: false,
      accordion: true,
      themeVariable: {
        "--global-checked-color": "#5fb878",
        "--global-primary-color": "#009688",
        "--global-normal-color": "#1e9fff",
        "--global-danger-color": "#ff5722",
        "--global-warm-color": "#ffb800",
      },
    }
  },
  persist: {
    storage: localStorage,
    paths: ['tab', 'tabs','theme', 'logo', 'level', 'inverted', 'breadcrumb', 'sideTheme', 'greyMode', 'accordion' , 'themeVariable'],
  }
})