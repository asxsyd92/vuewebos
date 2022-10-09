import axios, { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios';
import { useUserStore } from "../store/user";
import { layer } from '@layui/layui-vue';
import router from '../router'
import Qs from 'qs'
type TAxiosOption = {
    timeout: number;
    baseURL: string;
}
 
const config: TAxiosOption = {
    timeout: 50000,
    baseURL: ""
}
let layerid: any;
class Http {
    service;
    constructor(config: TAxiosOption) {
        this.service = axios.create(config)
         debugger;
        /* 请求拦截 */
        this.service.interceptors.request.use((config: AxiosRequestConfig) => {
            const userInfoStore = useUserStore();
            if (userInfoStore.token) {
                (config.headers as AxiosRequestHeaders).Authorization ="bearer " + userInfoStore.token as string
            } else {
                if(router.currentRoute.value.path!=='/login') {
                    router.push('/login');
                }
            }
            return config
        }, error => {
            return Promise.reject(error);
        })

        /* 响应拦截 */
        this.service.interceptors.response.use((response: AxiosResponse<any>) => {
            if (layerid != null) {
                layer.close(layerid);
            }
            debugger
            switch (response.status) {
                case 200:
                    return response.data;
                case 500:
                    return response.data;
                case 401:
                    layer.confirm(
                    '会话超时, 请重新登录', 
                    { icon : 2, yes: function(){
                        router.push('/login');
                        layer.closeAll()
                    }});
                    return response;
                default:
                    break;
            }
        }, error => {
            if(error.response.status==401){
                layer.confirm(
                    '会话超时, 请重新登录', 
                    { icon : 2, yes: function(){
                        router.push('/login');
                        layer.closeAll()
                    }});
            }else{
                return Promise.reject(error)
            }
       
       
        })
    }

    /* GET 方法 */
    get<T>(url: string, params?: object, _object = {}): Promise<any> {
     
        return this.service.get(url, { params, ..._object })
    }
    /* POST 方法 */
    post<T>(url: string, params?: object, msg?: string): Promise<any> {
  
        if (msg != "" && msg != null&&msg!=undefined) {
            layerid = layer.msg(msg, { icon: 16, time: 30000, shade: true });
        }

        return this.service.post(url,  Qs.stringify(params))
    }
    /* PUT 方法 */
    put<T>(url: string, params?: object, _object = {}): Promise<any> {
        return this.service.put(url, params, _object)
    }
    /* DELETE 方法 */
    delete<T>(url: string, params?: any, _object = {}): Promise<any> {
        return this.service.delete(url, { params, ..._object })
    }
}

export default new Http(config)