<template>
    <div>
        <script id="barwebinfo" type="text/html">
    <a class="layui-btn layui-btn-normal layui-btn-xs" lay-event="edit">编辑</a>
    <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>
    <a class="layui-btn layui-btn layui-btn-xs" lay-event="seo">SEO优化</a>
    </script>
        <script id="toolbarwebinfo" type="text/html">
    <div class="layui-btn-container">
        <input class="layui-btn layui-btn-normal  layui-btn-sm" type="text" name="title" id="title" placeholder="请输入表单名称" style="text-align: left;color: #009688; background-color: #fff;" />

        <button class="layui-btn layui-btn-normal  layui-btn-sm" lay-event="a_search">查询</button>
        <button class="layui-btn layui-btn-normal  layui-btn-sm" lay-event="a_add">新增</button>
          <button class="layui-btn layui-btn-normal  layui-btn-sm" lay-event="a_seo">添加推送</button>
        <!-- <button class="layui-btn layui-btn-normal  layui-btn-sm" lay-event="a_add">添加</button> -->
    </div>
    </script>
        <table class="layui-hide" id="webinfolist" lay-filter="webinfolist"></table>
    </div>
</template>
<script>
    var $ = layui.$;
    export default {
        name: "webinfolist",
        data() {
            return {
                table: null,
                tableId: "_webinfolist"
            }
        },
        created() { }
        , watch: {
            '$route'(to, from) { //监听路由是否变化


                this.init();


            }
        },
        mounted() {
            //初始化
            this.init();
            console.log("webinfo");

        }, methods: {
            init() {
                var m = this;
                m.table = layui.table;
                //第一个实例
                m.tablerender();
                //监听工具条
                m.tool();
                //菜单搜索栏
                m.toolbar();
            },
            tablerender() {
                var m = this;
                m.table.render({
                    elem: '#webinfolist'
                    , id: m.tableId
                    , height: 'full'
                    , method: "post"
                    , toolbar: '#toolbarformdesign'
                    , headers: { "Authorization": "bearer " + window.localStorage["_token"] }
                    , url: m.host + '/api/tasks/WaitList?title=&type=' + m.$route.query.zhuanti + '&desc=AddTime desc'
                    , page: { theme: '#1E9FFF' }
                    , toolbar: '#toolbarwebinfo'
                    , cols: [[
                        { field: 'title', title: '标题' }
                        , { field: 'sendername', title: '处理人' }
                        , { field: 'addtime', title: '时间' }
                        , { fixed: 'right', title: '操作', toolbar: '#barwebinfo' }
                    ]]
                });
            },
            toolbar() {
                var m = this;
                m.table.on('toolbar(webinfolist)', function (obj) {
                    var checkStatus = m.table.checkStatus(obj.config.id);
                    switch (obj.event) {
                        case 'a_search':
                            var title = $("#title").val();
                            //搜索page设置为0
                            m.table.reload(m.tableId, {
                                url: m.host + '/api/tasks/WaitList'
                                , where: { page: 1, type: m.$route.query.zhuanti,title:title } //设定异步数据接口的额外参数
                            });
                            $("#title").val(title);
                            break;
                        case 'a_add':// add(-1);
                            if (m.$route.query.fromid == null || m.$route.query.fromid == undefined) {
                                layui.layer.msg("未找到fromid", { icon: 2 });
                                return false;
                            }
                            var query = new Object();
                            query.fromid = m.$route.query.fromid;
                            query.operation = 'add';
                            query.zhuanti = m.$route.query.zhuanti;
                            m.$router.push({ path: "/formdesign/showfrom", query: query })
                            break;
                        case 'a_seo':
                            layui.layer.prompt({ title: '请输入本站可访问的地址' }, function (pass, index) {
                                layui.layer.close(index);
                                if(pass.indexOf("http")<=-1){
                                 layui.layer.msg("输入地址不正确，请重试：http://asxsyd92.com", { icon: 2 });
                                return false;
                                }
                                m.$post(m.host + "/api/portalsite/seo", { url: pass }, "正在处理预计10分钟后生效").then(res => {
                                    console.log(res);
                                }).catch(res => {

                                    if (res.success) {
                                        layui.layer.msg(res.msg, { icon: 1 });

                                    } else {

                                        layui.layer.msg(res.msg, { icon: 2 });
                                        return;
                                    }
                                })
                            });

                    }
                });
            },
            tool() {
                var m = this;
                m.table.on('tool(webinfolist)', function (obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
                    var data = obj.data; //获得当前行数据
                    var layEvent = obj.event; //获得 lay-event 对应的值
                    var tr = obj.tr; //获得当前行 tr 的DOM对象
                    var ids = '';   //选中的Id
                    $(data).each(function (index, item) {
                        ids += item.id + ',';
                    });
                    if (layEvent === 'del') { //删除
                        var msg = obj ? '确认删除【' + data.title + '】吗？' : '确认删除选中数据吗？';
                        layui.layer.confirm(msg, { icon: 3, title: '删除' + data.title }, function (index) {
                            layui.layer.close(index);
                            //向服务端发送删除指令

                            m.$post(m.host + '/api/tasks/DelFormData', { table: data.t_table, instanceid: data.instanceid, id: data.id }, "正在处理中..").then(res => {
                            }).catch(resp => {

                                if (resp.success) {
                                    //obj.del(); //删除对应行（tr）的DOM结构
                                    table.reload(m.tableId, {});
                                    layui.layer.alert(resp.msg, { title: '温馨提示' });
                                } else {
                                    layui.layer.alert(resp.msg, { title: '温馨提示' });
                                }


                            });

                        });
                    }

                    else if (layEvent === 'edit') { //编辑

                        if (!data.id) return;
                        var query = new Object();
                        query.fromid = data.fromid;
                        query.instanceid = data.instanceid;
                        query.zhuanti = m.$route.query.zhuanti;
                        m.$router.push({ path: "/formdesign/showfrom", query: query })

                    } else if (layEvent === "seo") {

                        m.$post(m.host + "/api/portalsite/seo", { url:  "http://asxsyd92.com/news/newsdetail?id=" + data.instanceid }, "正在处理预计10分钟后生效").then(res => {
                            console.log(res);
                        }).catch(res => {

                            if (res.success) {
                                layui.layer.msg(res.msg, { icon: 1 });

                            } else {

                                layui.layer.msg(res.msg, { icon: 2 });
                                return;
                            }
                        })
                    }


                });
            }

        }
    }
</script>