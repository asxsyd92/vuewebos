import { defineStore } from 'pinia'


export const useAppStore = defineStore({
  id: 'app',
  state: () => {
    return {
      tab: true,
      tabs:[{ title: "首页", id: "/console", closable: false }],
      current:"console",
      level: true,
      inverted: true,
      routerAlive: true,
      theme: 'light',
      themeVariable: {
        "--global-checked-color": "#5fb878",
        "--global-primary-color": "#1e9fff",
        "--global-normal-color": "#1e9fff",
        "--global-danger-color": "#ff5722",
        "--global-warm-color": "#ffb800",
      } as any,
    }
  },
  persist: {
      enabled: true,
      strategies: [
        {
          key: 'tab',
          storage: localStorage
        },{
          key: 'theme',
          storage: localStorage
        }
      ]
  }
})