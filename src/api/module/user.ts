import Http from '../http';

export const login = function(url:string,loginForm: any,msg:string) {


    return Http.post(url, loginForm,msg)
}

export const menu = function() {
    return Http.post("/api/users/GetAppList",{},"正在加载") 
}

export const permission = function() {
    return Http.get('/user/permission') 
}