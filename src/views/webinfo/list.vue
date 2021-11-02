<template>
    <div>
        <script id="barwebinfo" type="text/html">
    <a class="layui-btn layui-btn-normal layui-btn-xs" lay-event="edit">编辑</a>
    <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>
    </script>
        <script id="toolbarwebinfo" type="text/html">
    <div class="layui-btn-container">
        <input class="layui-btn layui-btn-normal  layui-btn-sm" type="text" name="title" id="title" placeholder="请输入表单名称" style="text-align: left;color: #009688; background-color: #fff;" />
        <button class="layui-btn layui-btn-normal  layui-btn-sm" lay-event="a_search">查询</button>
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
        created() { }
        ,watch: {
                '$route'(to, from) { //监听路由是否变化
            
        
                this.init();
           
      
                }
            },
        mounted() {
     
            let m = this;
             m.init();

        }, methods: {
            init() {
                var m=this;
                var table = layui.table;
                var tableId = "_webinfolist";
                //第一个实例
                table.render({
                    elem: '#webinfolist'
                    , id: tableId
                    , height: 'full'
                    , toolbar: '#toolbarformdesign'
                    , headers: { "Authorization": "bearer " + window.localStorage["_token"] }
                    , url: '/api/tasks/WaitList?title=&type=&desc=AddTime desc'
                    , page: { theme: '#1E9FFF' }
                    , toolbar: '#toolbarwebinfo'
                    , cols: [[
                        { field: 'title', title: '标题' }
                        , { field: 'sendername', title: '处理人' }
                        , { field: 'addtime', title: '时间' }
                        , { fixed: 'right', title: '操作', toolbar: '#barwebinfo' }
                    ]]
                });
                //监听工具条
                table.on('tool(webinfolist)', function (obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
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
                            layer.close(index);
                            //向服务端发送删除指令
                            var lay = layui.layer.msg('正在处理中..', { icon: 16, shade: 0.5, time: 20000000 });
                            m.$post(m.host + '/api/tasks/DelFormData', { table: data.t_table, instanceid: data.instanceid, id: data.id }).then(res => {
                                console.log(res);
                            }).catch(resp => {
                                layui.layer.close(lay);
                                if (resp.success) {
                                    //obj.del(); //删除对应行（tr）的DOM结构
                                    table.reload(tableId, {});
                                    layui.layer.alert(resp.msg, { title: '温馨提示' });
                                } else {
                                    layui.layer.alert(resp.msg, { title: '温馨提示' });
                                }


                            });

                        });
                    }

                    else if (layEvent === 'edit') { //编辑
                     
                        if (!data.id) return;
                        // m.$taber.open({  name:'formdesign', params: {    key:data.id   }});
                        // m.$router.push({ path: "/formdesign/formdesign/" + data.id, })
                        m.$router.push({ path: "/formdesign/showfrom/" + data.fromid + "/" + data.instanceid, })

                    }


                });
                table.on('toolbar(webinfolist)', function (obj) {
                    var checkStatus = table.checkStatus(obj.config.id);
                    switch (obj.event) {
                        case 'a_search':
                            var title = $("#title").val();
                            //搜索page设置为0
                            table.reload(tableId, {
                                url: m.host + '/api/tasks/WaitList?title' + title + "&page=1"
                                , where: {} //设定异步数据接口的额外参数
                            });
                            $("#title").val(title);
                            break;
                        case 'a_add':// add(-1);
                            m.$router.push({ path: "/formdesign/showfrom/" + item.fromid + "/" + item.instanceid, })
                            //   m.$taber.open({  name:'formdesign', params: { }})
                            //  top.xadmin.open('添加角色',  m.host+'/webos/page/base/addSysFormDesign.html?appid=' + appid, 500, 600);
                            break;

                    }
                });
            }
        }
    }
</script>