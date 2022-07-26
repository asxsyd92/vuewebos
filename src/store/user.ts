import { defineStore } from 'pinia'


export const useUserStore = defineStore({
  id: 'user',
  state: () => {
    return {
      token: {},
      userInfo: {name:"",userid:"",orname:"",orid:"",account:"",picture:"",isLogin:""},
    }
  },
  persist: {
      enabled: true,
      strategies: [
        {
          key: 'token',
          storage: localStorage
        },{
          key: 'userInfo',
          storage: localStorage
        }
      ]
  }
})