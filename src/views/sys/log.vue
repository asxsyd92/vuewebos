<template>
    <div>
 <script id="toolbarDemo" type="text/html">
    <div class="layui-btn-container">

        <input class="layui-btn layui-btn-normal  layui-btn-sm" type="text" name="title" id="title" placeholder="请输入标题" style="text-align: left;color: #009688; background-color: #fff;" />
        <button class="layui-btn layui-btn-normal  layui-btn-sm" lay-event="a_search">查询</button>
        <button class="layui-btn layui-btn-normal  layui-btn-sm" lay-event="getCheckLength">处理</button>
        <button class="layui-btn layui-btn-normal  layui-btn-sm" lay-event="isAll">退出</button>
    </div>
</script>
<script id="barDemo" type="text/html">
    <a class="layui-btn layui-btn-primary layui-btn-xs" lay-event="detail">查看</a>
    <a class="layui-btn layui-btn-normal layui-btn-xs" lay-event="edit">处理</a>
    <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>
</script>
        <table class="layui-hide" id="loglist" lay-filter="loglist"></table>
    </div>
</template>
<script>
    var $ = layui.$;
    export default {
        name: "loglist",
        created() { },
        watch: {
            '$route'(to, from) { //监听路由是否变化
                console.log(this);
                if (to.fullPath.indexOf("log") > 0) {
                    this.init();
                }

            }
        }, methods: {
            init() {
                   let m = this;
                var table = layui.table;
                var tableId = "_loglist";
                //第一个实例
             table.render({
        id: tableId,
        elem: '#loglist'
        , url: '/api/log/getLogList?title=&type='
        , totalRow: true,
        method:'post' //这里可以写post请求,默认get
        //, height: 'full'
        ,  headers: { "Authorization": "bearer " + window.localStorage["_token"] },
        height: 'full', //自适应高度
        size: 'sm',   //表格尺寸，可选值sm lg
        //skin: '',   //边框风格，可选值line row nob
        //even:true,  //隔行变色
        page: {theme: '#1E9FFF'},
        height: 'full' ,
        limits: [ 20, 30, 40, 50, 70, 100], toolbar: '#toolbarDemo',
        limit: 14, even: true , //隔行背景,

        cols: [[
            { type: 'checkbox', fixed: 'left' }
            //, { field: 'id', title: 'id',  fixed: 'left', unresize: true, sort: true, totalRowText: '合计' }
            , { field: 'title', title: '标题' }
            //, {
            //    field: 'email', title: '邮箱', width: 150, edit: 'text', templet: function (res) {
            //        return '<em>' + res.email + '</em>'
            //    }
            //}
            , { field: 'writetime', title: '发生时间', sort: true }
            , { field: 'username', title: '操作人',  sort: true }
            , { field: 'ipaddress', title: 'IP地址', sort: true}
            //, { field: 'stepname', title: '流程', sort: true, totalRow: true }
            //, { field: 'sign', title: '签名' }
            //, { field: 'city', title: '城市', width: 100 }
            //, { field: 'ip', title: 'IP', width: 120 }
            //, { field: 'joinTime', title: '加入时间', width: 120 }
            , { fixed: 'right', title: '操作', toolbar: '#barDemo', }
        ]],done: function(res, curr, count){
            //如果是异步请求数据方式，res即为你接口返回的信息。
            //如果是直接赋值的方式，res即为：{data: [], count: 99} data为当前页数据、count为数据总长度
            console.log(res);
            
            //得到当前页码
            console.log(curr); 
            
            //得到数据总量
            console.log(count);
          }
    });
            //监听工具条
    table.on('tool(WaitList)', function (obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值
        var tr = obj.tr; //获得当前行 tr 的DOM对象
        var ids = '';   //选中的id
        $(data).each(function (index, item) {
            ids += item.id + ',';
        });
        if (layEvent === 'del') { //删除
            deleteRole(ids, obj);
        } else if (layEvent === 'detail') {
            var query = "";
            query = query + "&taskid=" + data.id + "&groupid=" + data.groupid;
            top.window.xadmin.add_tab(data.title, '/webos/page/from/Debug/' + data.urls.toString().trim() + '.html?key=' + data.instanceid + "&flowid=" + data.flowid + "&stepid=" + data.stepid + query+"&prevew=true");

        }
        else if (layEvent === 'edit') { //编辑
            console.log(data);
            if (!data.id) return;
            var content;
            // var index = layer.load(1);
            //从桌面打开
             query = "";
            query = query + "&taskid=" + data.id + "&groupid=" + data.groupid;
            top.window.xadmin.add_tab(data.title, '/webos/page/from/Debug/' + data.urls.toString().trim() + '.html?key=' + data.instanceid + "&flowid=" + data.flowid + "&stepid=" + data.stepid + query);
        }
    });
    table.on('toolbar(WaitList)', function (obj) {

        var checkStatus = table.checkStatus(obj.config.id);
        switch (obj.event) {
            case 'a_search':
                var title = $("#title").val();
                //搜索page设置为0
                reloadTable();
                $("#title").val(title);
                break;
        }
    });
    //表格重载
    function reloadTable() {
        table.reload(tableid, {});
    }

    //打开添加页面
    function addRole() {

    }
    //删除角色
    function deleteRole(ids, obj) {
        var msg = obj ? '确认删除角色【' + obj.data.title + '】吗？' : '确认删除选中数据吗？';
        layer.confirm(msg, { icon: 3, title: '删除系统角色' }, function (index) {
            layer.close(index);
            //向服务端发送删除指令
            //向服务端发送删除指令
            $.post("/api/form/DelFormData", { key: obj.data.instanceid, table: obj.data.t_table }, function (resp) {

                if (resp.success) {
                    //刷新表格
                    if (obj) {
                        layer.msg('删除成功', {
                            icon: 1,
                            time: 2000
                        });
                        obj.del(); //删除对应行（tr）的DOM结构
                    } else {
                        layer.msg('向服务端发送删除指令后刷新表格即可', {
                            time: 100
                        });
                        reloadTable();  //直接刷新表格
                    }
                }
            })

        });
    }
    //绑定按钮事件
    $('#addRole').on('click', addRole);
    $('#deleteRole').on('click', function () {
        var checkStatus = table.checkStatus(tableid);
        var checkCount = checkStatus.data.length;
        if (checkCount < 1) {
            layer.msg('请选择一条数据', {
                time: 2000
            });
            return false;
        }
        var ids = '';
        $(checkStatus.data).each(function (index, item) {
            ids += item.id + ',';
        });
        deleteRole(ids);
    });
    $('#reloadTable').on('click', reloadTable);
            }
        },
        mounted() {

         var m=this;
           m.init();

        }
    }
</script>