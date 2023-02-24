
import { layer } from "@layui/layui-vue";
import utils from '../utils/utils';
import http from '../api/http';
import { h } from "vue";
class ListUtils {



    /**
     * 获取列表数据
     * @param config table配置文件
     * @param url 请求地址
     * @param data 参数
     */
    getList = (config: any, url: string, data: Object) => {
       var i= layer.msg("加载中...", { icon : 16, time: 1000});
 
        http.post(url, data).then((res: any) => {
 
            layer.close(i);
            if (res.success) {
                config.data = res.data;

                if (config.pagerConfig) {
                    config.pagerConfig.total = res.count
                }
            }
        });

    }
    /**
     * 获取按钮
     * @param appid 路由地址：菜单id
     * @param config loading配置文件
     * @param buttons 按钮
     */
    getButton = (appid: any, config: any, buttons: any) => {
        return new Promise((resolve, reject) => {



            http.post("/api/common/getRoleBuutton", { appid: appid }).then((res: any) => {
                config.loading = false

                if (res.success) {
          
                    buttons.value.toolbarbuttons = res.data.filter((item: any) => { return item.type == 1 });
                    buttons.value.rowbuttons = res.data.filter((item: any) => { return item.type == 2 });
                   
                    var data = res.data.find((e: any) => e.events == "searchEvent");
                    var o = new Object() as any;
                    if (data == null) {
                        o.msg = "你没有查询权限";
                        o.success = false;
                        o.data = null;
                    } else {
                        if (data.api == '') {
                            o.msg = "请求未配置，请联系管路有";
                            o.success = false;
                            o.data = data;
                        } else {
                            o.msg = "获取成功";
                            o.success = true;
                            o.data = data;
                
                        }

                    }
                    resolve(o);
                }
            }).catch((res: any) => {
                layer.notifiy({
                    title: "Error",
                    content: "按钮获取失败，请刷新重试！",
                    icon: 2
                })
            });;
        });
    }

    //类别查询功能
    searchEvent = (config: any, search: any,data:Object) => {
        if (config.pagerConfig) {

            this.getList(config, search.value.api, data);

        }
    }

    /**
     * 自定义表单弹窗模块编辑功能
     * @param popform 弹窗组件
     * @param ent 事件
     * @param row 该行编辑数据数据Object
     * @param data 请求时需打开的数据包含回调函数
     * @param suppdata 补充的数据或者赋值的数据
     */
    editRowEvent = (popform: any, ent: any, row: any, data: object,  suppdata: object) => {

        this.openform(ent.title, ent.animation, popform, data,[ent.areax,ent.areay], suppdata);


    }
    /**
    * 自定义表单弹窗模块克隆功能
    * @param popform 弹窗组件
    * @param ent 事件
    * @param row 该行编辑数据数据Object
    * @param data 请求时需打开的数据包含回调函数
    * @param suppdata 补充的数据或者赋值的数据
    */
    cloneRowEvent = (popform: any, ent: any, row: any, data: object, suppdata: object) => {
        this.openform(ent.name + "【" + row.title + "】" + "的配置", ent.animation, popform, data,[ent.areax,ent.areay], suppdata);


    }
    /**
    * 自定义表单弹窗模块新增功能
    * @param popform 弹窗组件
    * @param ent 事件
    * @param data 请求时需打开的数据包含回调函数
    * @param suppdata 补充的数据或者赋值的数据
    */

    addEvent = (popform: any, ent: any, data: object, suppdata: object) => {
        this.openform(ent.title, ent.animation, popform, data, [ent.areax,ent.areay], suppdata);



    }

    /**
     * 删除并更新列表列表
     * @param ent 事件
     * @param row 删除的行
     * @param search 搜索方法
     * @param config 配置
     * @param searchpara 查询参数
     */
    removeRowEvent = async (ent: any, row: any, searchfun: Function, config: any,search:any, searchpara: any) => {

        layer.confirm("您确定要"+ent.name+"该数据",
            {
                btn:
                    [
                        {
                            text: '确认', callback: function (id: any) {
                                http.post(ent.api, { id: row.id }).then((res: any) => {
                                    if (res.success) {
                                        layer.close(id);
                                        searchfun(config,search,searchpara);
                                        layer.notifiy({ title: "温馨提示", content: res.msg })


                                    } else {
                                        layer.notifiy({ title: "温馨提示", content: res.msg })
                                        layer.close(id);
                                    }
                                }).catch((error: any) => {
                                    layer.notifiy({ title: "温馨提示", content: "网络错误！" })
                                    layer.close(id);
                                })

                            }
                        },
                        { text: '取消', callback: function (id: any) { layer.close(id); } }
                    ]
            })

    }
    previewEvent = async (popform: any, ent: any, row: any) => {
        this.previewform(ent.title, ent.animation, popform, { fromid: ent.formid, instanceid: row.id },[ent.areax,ent.areay]);


    }

    /**
     * 没有确认按钮的表单弹窗
     * @param title 弹窗变态
     * @param anim 弹窗动画
     * @param form 自定义表单组件
     * @param data 包含表单id和数据组件id
     * @param area 弹窗大小
     */
    previewform(title: string, anim: any, form: any, data: object, area: string[]) {

        if (anim == null) {
            anim = 0;
        }
        layer.open({
            title: title,
            area: area,
            content: h(form, data),
            shade: true,
            anim: anim,
            shadeClose: false,
            btn: [
                {
                    text: "取消",
                    callback: (resp: any) => {
                        layer.close(resp);
                    },
                },
            ]
        })

    }

    /**
     * 打开表单
     * @param title 标题
      * @param anim 动画
       * @param form popform组件
      * @param data  fromid:fromid,instanceid:"",callback:Callback 
      * @param area 弹出大小
      * @param suppdata 补充数据提交是会填充data中提交给后台
      */
    openform(title: string, anim: any, form: any, data: any, area: string[], suppdata: Object) {
        var ks = h(form, data) as any;
        if (anim == null) {
            anim = 0;
        }
        layer.open({
            title: title,
            area: area,
            content: ks,
            shade: true,
            anim: anim,
            shadeClose: false,
            btn: [
                {
                    text: "确认",
                    callback: (resp: any) => {

                        ks.component.exposed.validate(suppdata, resp, layer)


                    },
                },
                {
                    text: "取消",
                    callback: (resp: any) => {
                        layer.close(resp);
                    },
                },
            ]
        })

    }

}
export default new ListUtils;
