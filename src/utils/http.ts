import axios, { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios'
import { layer } from "@layui/layer-vue"
import Qs from 'qs'
type TAxiosOption = {
    timeout: number;
    baseURL: string;
}
 
const config = {
    timeout: 5000,
    baseURL: ""
}
 var layerid: any;
class Http {


    service;
    constructor(config: TAxiosOption) {
     
        this.service = axios.create(config)
        /* 请求拦截 */
        this.service.interceptors.request.use((config: AxiosRequestConfig) => {
      
            if (localStorage.getItem('token')) {
                (config.headers as AxiosRequestHeaders).Authorization ="bearer "+ localStorage.getItem('token') as string
 
            }
            return config
        }, error => {
  
            console.log("error");
            return Promise.reject(error);
        })

        /* 响应拦截 */
        this.service.interceptors.response.use((response: AxiosResponse<any>) => {
            const data = response.data
          
            if(layerid!=null){
                layer.close(layerid);
            }
     
            // 错误处理 to do
            return response.data
        }, error => {
           
            if(layerid!=null){
                layer.close(layerid);
            }
      
            if(error.response.status==401){
                localStorage.clear();
            window.location.href="/login";
              
                return;
            }
            console.log(  Object.keys(error))
        console.log(this);
            return Promise.reject(error)
        })
    }

    /* GET 方法 */
    get<T>(url: string, params?: object, _object = {}): Promise<any> {
        return this.service.get(url, { params, ..._object })
    }
    /* POST 方法 */
    post<T>(url: string, params?: object,msg?:string): Promise<any> {
        if(msg!=""&&msg!=null){
            layerid= layer.msg(msg, { icon : 16, time: 15000});
        }
       
        return this.service.post(url,Qs.stringify( params),)
    }
    /* PUT 方法 */
    put<T>(url: string, params?: object, _object = {}): Promise<any> {
        return this.service.put(url, params, _object)
    }
    /* DELETE 方法 */
    delete<T>(url: string, params?: any, _object = {}): Promise<any> {
        return this.service.delete(url, { params, ..._object })
    }
     getQuery(url:any) {
        const index = url.indexOf('?');
        const obj = {};
        if(index === -1) return obj;
        const queryStr = url.slice(index + 1);
        const arr = queryStr.split('&');
        for(var item of arr) {
          const keyValue = item.split('=');
          obj[keyValue[0]] = keyValue[1]
        }
        return obj;
      }
}

export default new Http(config)