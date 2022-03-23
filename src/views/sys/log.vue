<template>
    <div>
        <script id="toolbarDemo" type="text/html">
    <div class="layui-btn-container">

        <input class="layui-btn layui-btn-normal  layui-btn-sm" type="text" name="title" id="title" placeholder="请输入标题" style="text-align: left;color: #009688; background-color: #fff;" />
       <button class="layui-btn layui-btn-normal  layui-btn-sm" lay-event="a_search">查询</button>

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
        data() {
            return {
                table: null,
                tableId: "_loglist",
            }
        },
        created() { },
        watch: {
            '$route'(to, from) { //监听路由是否变化
                if (to.fullPath.indexOf("log") > 0) {
                    this.init();
                }

            }
        }, methods: {


            init() {
                let m = this;
                m.table = layui.table;
                m.tableId = "_loglist";
                //第一个实例
                m.tablerender();
                //监听工具条
                m.tool();
                //菜单搜索栏
                m.toolbar();

            }
            ,
            tablerender() {
                var m = this;
                m.table.render({
                    id: m.tableId,
                    elem: '#loglist'
                    , url: m.host + '/api/log/getLogList'
         
                    ,
                    method: 'post' //这里可以写post请求,默认get
              
                    , headers: { "Authorization": "bearer " + window.localStorage["_token"] },
             
                    page: { theme: '#1E9FFF' },
                    height: 'full',
                
                    toolbar: '#toolbarDemo',
                

                    cols: [[
                     { field: 'title', title: '标题' }
            
                        , { field: 'writetime', title: '发生时间', sort: true }
                        , { field: 'username', title: '操作人', sort: true }
                        , { field: 'ipaddress', title: 'IP地址', sort: true }
         
                        , { fixed: 'right', title: '操作', toolbar: '#barDemo', }
                    ]], done: function (res, curr, count) {
                        //如果是异步请求数据方式，res即为你接口返回的信息。
                        //如果是直接赋值的方式，res即为：{data: [], count: 99} data为当前页数据、count为数据总长度
                        console.log(res);

                        //得到当前页码
                        console.log(curr);

                        //得到数据总量
                        console.log(count);
                    }
                });
            }
            ,
            tool() {
                var m = this;
                m.table.on('tool(loglist)', function (obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
                    var data = obj.data; //获得当前行数据
                    var layEvent = obj.event; //获得 lay-event 对应的值
                    var tr = obj.tr; //获得当前行 tr 的DOM对象
                    var ids = '';   //选中的id
                    $(data).each(function (index, item) {
                        ids += item.id + ',';
                    });
                    if (layEvent === 'del') { //删除

                    } else if (layEvent === 'detail') {

                    }
                    else if (layEvent === 'edit') { //编辑
                    }
                });

            },
            toolbar() {
                var m = this;
                m.table.on('toolbar(loglist)', function (obj) {

                    var checkStatus = m.table.checkStatus(obj.config.id);
                    switch (obj.event) {
                        case 'a_search':
                            var title = $("#title").val();
                            //搜索page设置为0
                            m.reloadTable(title);
                            $("#title").val(title);
                            break;
                    }
                });
                //表格重载

            },
            reloadTable(title) {
                var m = this;
                m.table.reload(m.tableId, {
                    url: m.host + '/api/log/getLogList'
                    , where: { page: 1, title: title } //设定异步数据接口的额外参数
                });
            }
        },
        mounted() {

            this.init();

        }
    }
</script>