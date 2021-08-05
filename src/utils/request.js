import axios from 'axios'
import Qs from 'qs'

import router from '@/router/index'

axios.defaults.timeout = 10000;
axios.defaults.baseURL = process.env.API_ROOT;

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
axios.defaults.headers.common['Authorization'] = localStorage.token;
//"Authorization": "bearer " + window.localStorage["_token"]
// axios.interceptors.request.use(
//   config => {
//     config.headers = {
//       'Authorization':"bearer " +  localStorage._token
//     }
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );
// http request 拦截器，通过这个，我们就可以把Cookie传到后台
axios.interceptors.request.use(
  config => {
   
    config.headers = {
      'Authorization':"bearer " +  localStorage._token,
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
 
  }
  return config;
    // console.log('请求路径', config.url)
    // if (config.url.indexOf('/222222') != -1) {
    //   config.headers = {
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   }
    //   config.data = Qs.stringify(config.data)
    // } else if (config.url.indexOf('.aliyuncs.com') != -1) {
    //   // 此处设置文件上传，配置单独请求头
    //   config.headers = {
    //     'Content-Type': 'multipart/form-data'
    //   }
    // } else {
    //   config.headers = {
    //     'Content-Type': 'application/json'
    //   }
    //   config.data = Qs.parse(config.data)
    // }
   // config.headers["test"] = "323232323232";
    //return config
  },
  err => {
    return Promise.reject(err)
  }
)

const ERR_CODE_LIST = { //常见错误码列表
  [400]: "请求错误",
  [401]: "登录失效或在其他地方已登录",
  [403]: "拒绝访问",
  [404]: "请求地址出错",
  [408]: "请求超时",
  [500]: "服务器内部错误",
  [501]: "服务未实现",
  [502]: "网关错误",
  [503]: "服务不可用",
  [504]: "网关超时",
  [505]: "HTTP版本不受支持"
}

export function getErrMsg(error) {//通过error处理错误码
  if(!error.response) {//无网络时单独处理
    return {errCode:null, errMsg:"网络不可用，请刷新重试"}
  }
  const errCode = error.response.status //错误码
  const errMsg = ERR_CODE_LIST[errCode] //错误消息

  return {errCode: errCode,errMsg: errMsg ? `${errMsg} [${errCode}]` : error.message}
}


//http response 拦截器
axios.interceptors.response.use(
  response => {
    if (response.data.status == 401 ) {

      // Message.error(response.data.msg || '请求错误')
      router.push('/login'); //跳转
     }
     if (response.data.status == 404 ) {
      const {errCode,errMsg} = getErrMsg(error);
      return Promise.reject(response)
      // Message.error(response.data.msg || '请求错误')
      //router.push('/login'); //跳转
     }
    if (response.data.status !== 1 && response.data.status !== 200) {

           // Message.error(response.data.msg || '请求错误')
            return Promise.reject(response)
          }
     
    return Promise.reject(response)

  },
  error => {
    const {errCode,errMsg} = getErrMsg(error);
    if(errCode == 401){ //登录失效 -> 跳转登录页
      localStorage.clear();
      router.push('/login'); //跳转

    }

 const obj=new Object();
 obj.status=errCode;
 obj.message=errMsg;
 obj.msg=obj.message;
 obj.success=false;
 obj.data=obj;
    return Promise.reject(obj)
  }
)

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

 export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
        params: params
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err)
      })
  })
}


/**
 * 封装post请求
 * @param url
 * @param params
 * @returns {Promise}
 */

//  Form Data
//  headers: {
//    "Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8'
//  }

// Form Data   Request payload//当headers为 json时是 request 方式发送请求    但是如果你们的后台是formData的方式接口 就传一个header进来 就可以 formData  需要qs序列化//因为我们后台是json接受的比较多 所以json在我这里是默认  可以根据自己的情况修改   这个需要json转字符串不然是乱码的
export function post(url, params = {}, headers) {
  return new Promise((resolve, reject) => {
    if (headers == undefined) {
      axios.post(url, Qs.stringify(params), {headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}})
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err.data)
        })
    } else {
      axios.post(url, Qs.stringify(params), headers)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err)
        })
    }

  });
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })
}