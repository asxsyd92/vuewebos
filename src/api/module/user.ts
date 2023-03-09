
import http from 'webosutils/lib/http';
export const login = function(url:string,loginForm: any,msg:string) {


    return http.post(url, loginForm,msg)
}

export const menu = function() {
    return http.post("/api/users/GetAppList",{},"正在加载") 
}

export const permission = function() {
    return http.get('/user/permission') 
}