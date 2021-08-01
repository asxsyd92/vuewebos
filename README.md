# webos

> webos免开发版vue版

## Build Setup

第一步：安装vue
$ npm install -g vue-cli     //npm下载vue的资源
第二步：创建webos项目
$ vue init webpack webos  // 通过npm下载webpack + vue框架
第三步：cd webos
$ npm install  //下载依赖包(一般启动前都需要的) 
$ npm run dev //启动npm
第四步：安装layui
$ npm install  layui-src
第五步：在main.js中import layui
import layui from 'layui-src'

