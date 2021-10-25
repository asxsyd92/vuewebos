<template>
        <div>
<script id="toolbarDemo" type="text/html">
    <div class="layui-btn-container">

        <input class="layui-btn layui-btn-normal  layui-btn-sm" type="text" name="title" id="title" placeholder="请输入标题" style="text-align: left;color: #009688; background-color: #fff;" />
        <select id="selectqs"  lay-ignore style="font-size: 16px; margin-right: 10px; margin-bottom: 10px;    height: 30px;   text-align: left; color: #009688; background-color: #fff;"></select>
        <button class="layui-btn layui-btn-normal  layui-btn-sm" lay-event="a_search">查询</button>
        <button class="layui-btn layui-btn-normal  layui-btn-sm" lay-event="a_map">生成地图</button>
        
    </div>
</script>
   <script id="barDemo" type="text/html">
        <a class="layui-btn layui-btn-primary layui-btn-xs" lay-event="detail">查看</a>
        <a class="layui-btn layui-btn-primary layui-btn-xs" lay-event="baidu">推送</a>
        <a class="layui-btn layui-btn-normal layui-btn-xs" lay-event="edit">编辑</a>
        <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>
    </script>

      <table :id="commonlistData.id" :lay-filter="commonlistData.filter"></table>

    </div>
</template>


<script>

export default {
    name:"commonlist"
,mounted:function(){
var _this=this;
console.log(_this);
 var table = layui.table, form = layui.form,
        $ = layui.$, table=layui.table,
        tableId = 'tableid'; 
    var listtask = "";

    //表格渲染
    table.render({
        height: 'full',
        id: tableId,
        elem: _this.commonlistData.elem,
        url:_this.commonlistData. url,
        headers: { "Authorization": "bearer " + window.localStorage["_token"] },

        size:_this.commonlistData.size,// '',   //表格尺寸，可选值sm lg
        //skin: '',   //边框风格，可选值line row nob
        even:_this.commonlistData.even,  //隔行变色
        page: _this.commonlistData.page,
        limits: _this.commonlistData.limits, toolbar: '#toolbarDemo',
        limit: 15,
        cols:[_this.commonlistData.data] , done: function () {
    
        }
    });


      //监听工具条
    table.on('tool(roletable)', function (obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值
        if (layEvent === 'del') { //删除
            deleteRole(data, obj);
        } else if (layEvent === 'detail') {
            ///index.html#/newsDetail/4e89e309-42bd-4892-b9a9-f819994f1699
            layer.open({
                type: 2, shade: 0, title: '查看文章', maxmin: true, //开启最大化最小化按钮
                area: ['90%', '90%'],
                content: '/News/NewsDetail?id=' + data.id //这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
                , success: function (layero) {
                }, cancel: function () {

                }
            });
        } else if (layEvent === 'baidu') {
            var msg = obj ? '确认推送【' + data.instanceid + '】吗？' : '确认删除选中数据吗？';
            top.layer.confirm(msg, { icon: 3, title: '推送' + data.title }, function (index) {
                layer.close(index);
                //向服务端发送删除指令
                var lay = top.layer.msg('正在提交百度蜘蛛请耐心等待...', { icon: 16, shade: 0.5, time: 20000000 });
                $.get('/api/Baidu/BaiduXML', { data: data.instanceid }, function (data) {
                    top.layer.close(lay);
                    layer.alert(data, { title: '温馨提示' });

                });

            });

        }
        else if (layEvent === 'edit') { //编辑
            console.log(data);
            if (!data.id) return;
            var content;
     console.log(_this);
    _this. add_tab(data);
        // _this.$taber.open({
        //         name:'showfrom',
        //         title:data.title,
        //         params: {
        //            key:data.fromid,
        //            instanceid:data.instanceid
        //         }});
//_this.selected = 11
           // _this.$taber.open({
            //        _this.$taber.open({
            //     name:"showfrom",
            //     key:data.instanceid,
            //     params: {
            //         title: "编辑详情",
            //         fromid:data.fromid,
            //         instanceid:data.instanceid

            //     }
            // })
           // window.location.href = '/webos/page/from/Debug/' + data.t_table + '.html?key=' + data.instanceid;
            //  window.top.xadmin.add_tab('编辑' + data.Title, '/webos/page/from/Debug/' + data.t_Table + '.html?key=' + data.InstanceID);


        }
    });
    table.on('toolbar(roletable)', function (obj) {
        switch (obj.event) {
            case 'a_search':
                var title = $("#title").val();
                var tp = $("#selectqs").val();
                //搜索page设置为0
                table.reload(tableId, {
                    url: '/api/tasks/WaitList?title=' + title + "&type="+T+"&desc=AddTime desc"
                    , where: {} //设定异步数据接口的额外参数
                });
                $("#title").val(title);
                setTimeout(function () {
                    $("#selectqs").val(tp);
                }, 2000);

                break;
            case 'a_map':
           
      
                var lay = top.layer.msg('正在生成地图...', { icon: 16, shade: 0.5, time: 20000000 });
                common.post('/api/tasks/generateMap', { }, function (data) {
                    top.layer.close(lay);
                    top.    layer.alert(data.msg, { title: '温馨提示' });

                },function(error){
                    top.layer.close(lay);
                    top.  layer.alert(error, { title: '温馨提示' });
                },"正在生成地图");

                break;
        };
    });
    },methods:{


        add_tab (item) {
            console.log(item);
            var m=this;
                   //m.$router.push({    path: "/formdesign/showfrom/" + item.fromid + "/" + item.instanceid,});
                        m.$router.push({  path: "/formdesign/formdesign/" +item.id})
            // m.$taber.open({
            //     name:"showfrom",
            //     key:item.instanceid,
            //     id:item.instanceid,
            //     params: {
            //         title: item.title,
                    
            //         fromid:item.fromid,
            //         instanceid:item.instanceid
            //     }
            // })
        }  
    }
    //接收父组件传过来的数据
    ,inject: ['commonlistData'],   

}
</script>
