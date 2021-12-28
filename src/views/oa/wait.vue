<template>
    <div>
        <script id="barwait" type="text/html">
    <a class="layui-btn layui-btn-normal layui-btn-xs" lay-event="edit">处理</a>
    <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>
    </script>
        <script id="toolbarwait" type="text/html">
    <div class="layui-btn-container">
        <input class="layui-btn layui-btn-normal  layui-btn-sm" type="text" name="title" id="title" placeholder="请输入表单名称" style="text-align: left;color: #009688; background-color: #fff;" />
        <button class="layui-btn layui-btn-normal  layui-btn-sm" lay-event="a_search">查询</button>
        <button class="layui-btn layui-btn-normal  layui-btn-sm" lay-event="a_add">添加</button>
    </div>
    </script>
        <table class="layui-hide" id="wait" lay-filter="wait"></table>
    </div>
</template>
<script>
    var $ = layui.$;
    export default {
        name: "waitlist",
        created() { },
        watch: {
            '$route'(to, from) { //监听路由是否变化
                console.log(this);
                if (to.fullPath.indexOf("showfrom") > 0) {
                    this.init();
                }

            }
        }, methods: {
            init() {
                   let m = this;
                var table = layui.table;
                var tableId = "waitlist";
                //第一个实例
                table.render({
                    elem: '#wait'
                    , id: tableId
                    , height: 'full'
                    , toolbar: '#toolbarwait'
                    , headers: { "Authorization": "bearer " + window.localStorage["_token"] }
                    , url: m.host + '/api/workflowtasks/WaitList?' //数据接口
                    , page: { theme: '#1E9FFF' }
                    , cols: [[ //表头
                        //{ field: 'ID', title: 'ID', width: 80, sort: true, fixed: 'left' }
                        { field: 'title', title: '名称' },
                        { field: 'sendername', title: '发送人' },
                        { field: 'sendertime', title: '发送时间' }
                        ,
                        { field: 'status', title: '状态' }
                        ,   { field: 'stepname', title: '步骤名称' }
                        , { fixed: 'right', title: '操作', toolbar: '#barwait' }
                    ]]
                });
                //监听工具条
                table.on('tool(wait)', function (obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
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
                            m.$post(m.host + '/api/form/FormDel', { id: data.id }).then(res => {
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
                        console.log("edit");
                        if (!data.id) return;
                        // m.$taber.open({  name:'wait', params: {    key:data.id   }});
                            var query = new Object();
                               query.instanceid=data.instanceid;
                               query.taskid=data.id;
                               query.groupid=data.groupid;
                               query.flowid=data.flowid;
                            query.stepid=data.stepid;
  
                        m.$router.push({ path: "/oa/workflowrun/run",query:query })
                    }


                });
                table.on('toolbar(wait)', function (obj) {
                    var checkStatus = table.checkStatus(obj.config.id);
                    switch (obj.event) {
                        case 'a_search':
                            var title = $("#title").val();
                            //搜索page设置为0
                            table.reload(tableId, {
                                url: m.host + '/api/workflowtasks/WaitList?title=' + title
                                , where: { page: 1 } //设定异步数据接口的额外参数
                            });
                            $("#title").val(title);
                            break;
                        case 'a_add':// add(-1);
                            m.$router.push({ path: "/wait/wait/_" })
                            //   m.$taber.open({  name:'wait', params: { }})
                            //  top.xadmin.open('添加角色',  m.host+'/webos/page/base/addSyswait.html?appid=' + appid, 500, 600);
                            break;

                    }
                });
            }
        },
        mounted() {

         var m=this;
           m.init();

        }
    }
</script>