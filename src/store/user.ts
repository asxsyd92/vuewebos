import { defineStore } from 'pinia'
import { menu, permission } from "../api/module/user";
import {editmenu} from "../library/treeUtil";
export const useUserStore = defineStore({
  id: 'user',
  state: () => {
    return {
      token: {},
      userInfo: {name:"",userid:"",orname:"",orid:"",account:"",picture:"",isLogin:"",community:"",orgname:""},
      permissions: [],
      menus: [],
    }
  },
  actions: {
    async loadMenus(){
      const resp = await menu();
      if (resp.success) {

        this.menus = editmenu(resp.data);
      }
    },
    async loadPermissions(){
      const { data, code } = await permission();
      if(code == 200) {
        this.permissions = data;
      }
    }
  },
  persist: {
    storage: localStorage,
    paths: ['token', 'userInfo', 'permissions', 'menus' ],
  }
})