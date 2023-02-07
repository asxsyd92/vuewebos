
import { layer } from "@layui/layui-vue";
import utils from '../utils/utils';
import http from '../api/http';

class ListUtils {
    /**
     * 获取列表数据
     * @param config table配置文件
     * @param url 请求地址
     * @param data 参数
     */
    getList = (config: any, url: string, data: Object) => {

        config.loading = true;
        http.post(url, data).then((res: any) => {
            config.loading = false

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
     * @param path 路由地址：/sys/log
     * @param config loading配置文件
     * @param area 弹窗大小
     * @param toolbarbuttons 顶部按钮
     * @param rowbuttons 列表按钮
     */
    getButton = (path: string, config: any, buttons: any) => {
        return new Promise((resolve, reject) => {



            http.post("/api/common/getRoleBuutton", { pathname: path }).then((res: any) => {
                config.loading = false

                if (res.success) {
                    if (res.data.length > 0) {
                        buttons.value.area = [res.data[0].areax, res.data[0].areay]
                    }

                    buttons.value.toolbarbuttons = res.data.filter((item: any) => { return item.type == 1 });
                    buttons.value.rowbuttons = res.data.filter((item: any) => { return item.type == 2 });
                    debugger
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
    searchEvent = ( config: any, search: any) => {
        if (config.pagerConfig) {

            this.getList(config, search.value.api, { type: search.value.type, title: search.value.name, page: config.pagerConfig.currentPage, limit: config.pagerConfig.pageSize });

        }
    }

    /**
     * 自定义表单弹窗模块编辑功能
     * @param popform 弹窗组件
     * @param ent 事件
     * @param row 该行编辑数据数据Object
     * @param data 请求时需打开的数据包含回调函数
     * @param listbutton 按钮
     * @param suppdata 补充的数据或者赋值的数据
     */
    editRowEvent = (popform: any, ent: any, row: any, data: object, listbutton: any, suppdata: object) => {

        utils.openform(ent.title, ent.animation, popform, data, listbutton.value.area, suppdata);


    }
    /**
    * 自定义表单弹窗模块克隆功能
    * @param popform 弹窗组件
    * @param ent 事件
    * @param row 该行编辑数据数据Object
    * @param data 请求时需打开的数据包含回调函数
    * @param listbutton 按钮
    * @param suppdata 补充的数据或者赋值的数据
    */
    cloneRowEvent = (popform: any, ent: any, row: any, data: object, listbutton: any, suppdata: object) => {
        utils.openform(ent.name + "【" + row.title + "】" + "的配置", ent.animation, popform, data, listbutton.value.area, suppdata);


    }
    /**
    * 自定义表单弹窗模块新增功能
    * @param popform 弹窗组件
    * @param ent 事件
    * @param data 请求时需打开的数据包含回调函数
    * @param listbutton 按钮
    * @param suppdata 补充的数据或者赋值的数据
    */

    addEvent = (popform: any, ent: any, data: object, listbutton: any, suppdata: object) => {
        utils.openform(ent.title, ent.animation, popform, data, listbutton.value.area, suppdata);



    }

    /**
     * 删除并更新列表列表
     * @param ent 事件
     * @param row 删除的行
     * @param search 搜索方法
     * @param config 配置
     * @param searchpara 查询参数
     */
    removeRowEvent = async (ent: any, row: any, search: Function, config: any, searchpara: any) => {

        layer.confirm("您确定要删除该数据",
            {
                btn:
                    [
                        {
                            text: '确认', callback: function (id: any) {
                                http.post(ent.api, { id: row.id }).then((res: any) => {
                                    if (res.success) {
                                        layer.close(id);
                                        search( config, searchpara);
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


}
export default new ListUtils;
